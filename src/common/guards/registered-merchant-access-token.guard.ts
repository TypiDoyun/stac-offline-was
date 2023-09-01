import { AuthGuard } from "@nestjs/passport";

export class RegisteredMerchantAccessTokenGuard extends AuthGuard(
    "registered-merchant-jwt"
) {
    constructor() {
        super();
    }
}
