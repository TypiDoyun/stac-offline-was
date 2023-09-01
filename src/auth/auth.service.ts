import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import { UserRepository } from "./user/user.repository";
import { UserSignUpDto } from "./dto/user-sign-up.dto";
import { compare, genSalt, hash } from "bcryptjs";
import { FindUserDto } from "./dto/find-user.dto";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { SignInDto } from "./dto/sign-in.dto";
import { ConfigService } from "@nestjs/config";
import { JwtTokens } from "./interfaces/jwt-token.interface";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { MerchantSignUpDto } from "./dto/merchant-sign-up.dto";
import { MerchantRepository } from "./merchant/merchant.repository";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly merchantRepository: MerchantRepository,
        private readonly httpService: HttpService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    public async userSignUp(userSignUpDto: UserSignUpDto): Promise<JwtTokens> {
        if (!(await this.merchantRepository.canCreate(userSignUpDto.id)))
            throw new ConflictException("user id already exists");
        await this.userRepository.createUser(userSignUpDto);

        const tokens = this.getTokens(userSignUpDto.id, false);
        this.updateRefreshToken(userSignUpDto.id, tokens.refreshToken, false);

        return tokens;
    }

    public async merchantSignUp(
        merchantSignUpDto: MerchantSignUpDto
    ): Promise<JwtTokens> {
        const url = `${this.configService.getOrThrow("KAKAO_API_HOST")}?x=${
            merchantSignUpDto.location[1]
        }&y=${merchantSignUpDto.location[0]}`;
        try {
            const pipe = this.httpService
                .get(url, {
                    headers: {
                        Authorization: `KakaoAK ${this.configService.getOrThrow(
                            "KAKAO_API_KEY"
                        )}`
                    }
                })
                .pipe();

            const response = await lastValueFrom(pipe);
            if (!(await this.userRepository.canCreate(merchantSignUpDto.id)))
                throw new ConflictException("user id already exists");
            await this.merchantRepository.createMerchant(
                merchantSignUpDto,
                response.data.documents[0].address_name
            );

            const tokens = this.getTokens(merchantSignUpDto.id, true);
            this.updateRefreshToken(
                merchantSignUpDto.id,
                tokens.refreshToken,
                true
            );

            return tokens;
        } catch (error) {
            if (error.statusCode === 400)
                throw new BadRequestException("can not create merchant");
            else throw error;
        }
    }

    public async signIn(signInDto: SignInDto): Promise<JwtTokens> {
        const { id, password } = signInDto;
        const foundUser = await this.userRepository.findUserById(id);
        const foundMerchant = await this.merchantRepository.findMerchantById(
            id
        );
        const found = foundMerchant ?? foundUser;

        if (found === null) throw new ForbiddenException("user not found");

        const isMerchant = !foundUser;

        const passwordMatches = await compare(password, found.password);
        if (!passwordMatches)
            throw new UnauthorizedException("password mismatch");

        const tokens = this.getTokens(id, isMerchant);
        await this.updateRefreshToken(
            found.id,
            tokens.refreshToken,
            isMerchant
        );

        return tokens;
    }

    public async signOut(id: string) {
        const user = await this.userRepository.findUserById(id);

        if (!user) throw new ForbiddenException("user not found");

        await this.userRepository.updateRefreshToken(id, null);
    }

    public async refreshTokens(
        id: string,
        refreshToken: string
    ): Promise<JwtTokens> {
        const foundUser = await this.userRepository.findUserById(id);
        const foundMerchant = await this.merchantRepository.findMerchantById(
            id
        );
        const found = foundMerchant ?? foundUser;

        if (!found) throw new ForbiddenException("user not found");

        const isMerchant = !foundUser;

        if (!found.currentHashedRefreshToken)
            throw new UnauthorizedException("can not find refresh token");

        const refreshTokenMatches = compare(
            refreshToken,
            found.currentHashedRefreshToken
        );

        if (!refreshTokenMatches)
            throw new UnauthorizedException("refresh token does not match");

        const tokens = this.getTokens(id, isMerchant);

        return tokens;
    }

    public async exists(findUserDto: FindUserDto) {
        const { id } = findUserDto;
        const foundUser = await this.userRepository.findUserById(id);
        const foundMerchant = await this.merchantRepository.findMerchantById(
            id
        );
        const found = foundMerchant ?? foundUser;

        if (!found) return false;
        return true;
    }

    public async updateRefreshToken(
        id: string,
        refreshToken: string,
        isMerchant: boolean
    ) {
        const salt = await genSalt();
        const hashedToken = await hash(refreshToken, salt);
        if (isMerchant)
            await this.merchantRepository.updateRefreshToken(id, hashedToken);
        else await this.userRepository.updateRefreshToken(id, hashedToken);
    }

    public getTokens(id: string, isMerchant: boolean): JwtTokens {
        const payload: JwtPayload = { id, isMerchant };
        const options: JwtSignOptions = { algorithm: "HS256" };
        const tokens: JwtTokens = {
            accessToken: this.jwtService.sign(payload, {
                ...options,
                secret: this.configService.getOrThrow("JWT_ACCESS_SECRET_KEY"),
                expiresIn: this.configService.getOrThrow(
                    "JWT_ACCESS_EXPIRATION_TIME"
                )
            }),
            refreshToken: this.jwtService.sign(payload, {
                ...options,
                secret: this.configService.getOrThrow("JWT_REFRESH_SECRET_KEY"),
                expiresIn: this.configService.getOrThrow(
                    "JWT_REFRESH_EXPIRATION_TIME"
                )
            })
        };

        return tokens;
    }
}
