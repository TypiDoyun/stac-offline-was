import { Injectable } from "@nestjs/common";
import { MerchantRepository } from "./merchant.repository";
import { AuthCredentialDto } from "./dto/auth-credential.dto";

@Injectable()
export class AuthService {
    constructor(private merchantRepository: MerchantRepository) {}

    public async signUp(authCredentialDto: AuthCredentialDto) {
        return this.merchantRepository.createUser(authCredentialDto);
    }
}
