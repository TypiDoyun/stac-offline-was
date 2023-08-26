import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Query,
    UseGuards
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "./user/user.entity";
import {
    PayloadField,
    Private,
    RefreshTokenField,
    UserField
} from "src/common/decorators";
import { RefreshTokenGuard } from "src/common/guards";
import { JwtPayload, JwtTokens } from "./interfaces";
import { FindUserDto, SignInDto, UserSignUpDto } from "./dto";
import { MerchantSignUpDto } from "./dto/merchant-sign-up.dto";
import { ValidateDto } from "./dto/validate.dto";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { lastValueFrom } from "rxjs";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
        private readonly httpService: HttpService
    ) {}

    @Post("/user-signup")
    @HttpCode(HttpStatus.CREATED)
    public async userSignUp(
        @Body()
        userSignUpDto: UserSignUpDto
    ): Promise<JwtTokens> {
        console.log("user-signup request received!");
        return await this.authService.userSignUp(userSignUpDto);
    }

    @Post("/merchant-signup")
    @HttpCode(HttpStatus.CREATED)
    public async merchantSignUp(
        @Body()
        merchantSignUpDto: MerchantSignUpDto
    ) {
        console.log("merchant-signup request received!");
        return await this.authService.merchantSignUp(merchantSignUpDto);
    }

    @Post("/signin")
    @HttpCode(HttpStatus.OK)
    public async signIn(
        @Body()
        signInDto: SignInDto
    ): Promise<JwtTokens> {
        console.log("signin request received!");
        return await this.authService.signIn(signInDto);
    }

    @Post("/signout")
    @HttpCode(HttpStatus.OK)
    @Private()
    public async signOut(@UserField() user: User) {
        console.log("signout request received!");
        return await this.authService.signOut(user.id);
    }

    @Post("/refresh")
    @HttpCode(HttpStatus.OK)
    @UseGuards(RefreshTokenGuard)
    public async refresh(
        @PayloadField() payload: JwtPayload,
        @RefreshTokenField() refreshToken: string
    ): Promise<JwtTokens> {
        console.log("refresh request received!");
        return this.authService.refreshTokens(payload.id, refreshToken);
    }

    @Post("/exists")
    public async exists(
        @Body()
        findUserDto: FindUserDto
    ) {
        console.log("exists request received!");
        return await this.authService.exists(findUserDto);
    }

    @Get("/validate")
    public async validate(@Query() validateDto: ValidateDto): Promise<boolean> {
        const url = `http://${this.configService.getOrThrow(
            "BUSINESSMAN_HOST"
        )}/validate?serviceKey=${this.configService.getOrThrow(
            "BUSINESSMAN_SECRET_KEY"
        )}`;
        try {
            const pipe = this.httpService
                .post(url, {
                    businesses: [
                        {
                            b_no: validateDto.registrationNumber,
                            start_dt: validateDto.openingDate,
                            p_nm: validateDto.representative
                        }
                    ]
                })
                .pipe();

            const response = await lastValueFrom(pipe);
            const valid = response.data.data[0].valid === "01";
            return valid;
        } catch (error) {
            console.log(error);
        }
    }
}
