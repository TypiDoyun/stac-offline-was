import { ConflictException, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Merchant } from "./merchant.entity";
import { MerchantSignUpDto } from "../dto/merchant-sign-up.dto";
import { genSalt, hash } from "bcryptjs";
import { getDistance } from "src/common/utils";

@Injectable()
export class MerchantRepository {
    private readonly repository: Repository<Merchant>;

    constructor(private readonly dataSource: DataSource) {
        this.repository = this.dataSource.getRepository(Merchant);
    }

    public async createMerchant(merchantSignUpDto: MerchantSignUpDto) {
        const { password } = merchantSignUpDto;

        const salt = await genSalt();
        const hashedPassword = await hash(password, salt);

        const merchant = this.repository.create({
            ...merchantSignUpDto,
            password: hashedPassword
        });

        try {
            return await this.repository.save(merchant);
        } catch (error) {
            if (error.code === 11000)
                throw new ConflictException("existing user id");
            throw error;
        }
    }

    public async findMerchantById(id: string): Promise<Merchant | undefined> {
        return this.repository.findOneBy({ id });
    }

    public async updateRefreshToken(id: string, refreshToken: string) {
        await this.repository.update(
            { id },
            { currentHashedRefreshToken: refreshToken }
        );
    }

    public async findMerchantByLocation(location: number[], distance: number) {
        const merchants = (await this.repository.find()).filter((merchant) => {
            const calcDistance = getDistance(location, merchant.location);
            return calcDistance <= distance;
        });

        return merchants;
    }
}
