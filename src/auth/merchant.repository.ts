import { DataSource, Repository } from "typeorm";
import { Merchant } from "./merchant.entity";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MerchantRepository {
    private readonly merchantRepository: Repository<Merchant>;

    constructor(private readonly dataSource: DataSource) {
        this.merchantRepository = this.dataSource.getRepository(Merchant);
    }

    public async createUser(authCredentialDto: AuthCredentialDto) {
        const { username, password } = authCredentialDto;
        const user = this.merchantRepository.create({ username, password });

        await this.merchantRepository.save(user);
    }
}
