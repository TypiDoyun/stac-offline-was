import { AuthGuard } from "@nestjs/passport";

export class UserAccessTokenGuard extends AuthGuard("jwt") {
    constructor() {
        super();
    }
}
