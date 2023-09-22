import { ConflictException, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Merchant } from "./merchant.entity";
import { MerchantSignUpDto } from "../dto/merchant-sign-up.dto";
import { genSalt, hash } from "bcryptjs";
import { getDistance } from "src/common/utils";
import { ObjectId } from "mongodb";
import { RegisterShopDto } from "../dto/register-shop.dto";

@Injectable()
export class MerchantRepository {
    private readonly repository: Repository<Merchant>;

    constructor(private readonly dataSource: DataSource) {
        this.repository = this.dataSource.getRepository(Merchant);
    }

    public async deleteMerchant(id: ObjectId) {
        return this.repository.delete({
            _id: id
        });
    }

    public async canCreate(id: string) {
        return !(await this.findMerchantById(id));
    }

    public async createMerchant(merchantSignUpDto: MerchantSignUpDto) {
        const { password } = merchantSignUpDto;

        const salt = await genSalt();
        const hashedPassword = await hash(password, salt);

        const merchant = this.repository.create({
            ...merchantSignUpDto,
            password: hashedPassword,
            shop: null
        });

        try {
            return await this.repository.save(merchant);
        } catch (error) {
            if (error.code === 11000)
                throw new ConflictException("user id already exists");
            throw error;
        }
    }

    public async registerShop(
        registerShopDto: RegisterShopDto,
        merchant: Merchant,
        location: number[]
    ) {
        const { name, logo, registrationNumber, address } = registerShopDto;
        const updatedShop = {
            name,
            logo,
            registrationNumber,
            address,
            location,
            ownerId: merchant._id
        };

        await this.repository.update(
            {
                _id: merchant._id
            },
            {
                shop: updatedShop
            }
        );
        return updatedShop;
    }

    public async findMerchantById(id: string): Promise<Merchant | undefined> {
        return this.repository.findOneBy({ id });
    }

    public async findMerchantByOId(
        objectId: ObjectId
    ): Promise<Merchant | undefined> {
        return this.repository.findOneBy({ _id: objectId });
    }

    public async updateRefreshToken(id: string, refreshToken: string) {
        await this.repository.update(
            { id },
            { currentHashedRefreshToken: refreshToken }
        );
    }

    public async findMerchantByLocation(location: number[], distance: number) {
        const merchants = (await this.repository.find()).filter((merchant) => {
            if (!merchant.shop) return false;
            const calcDistance = getDistance(location, merchant.shop.location);
            return calcDistance <= distance;
        });

        console.log("find merchant locations");
        console.log(merchants);

        return merchants;
    }
}
