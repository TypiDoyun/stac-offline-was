import { AuthGuard } from "@nestjs/passport";

export class MerchantAccessTokenGuard extends AuthGuard("merchant-jwt") {
    constructor() {
        super();
    }
}
