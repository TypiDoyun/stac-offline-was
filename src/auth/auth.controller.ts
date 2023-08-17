import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialDto } from "./dto/auth-credential.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/signup")
    public signUp(
        @Body()
        authCredentialDto: AuthCredentialDto
    ) {
        return this.authService.signUp(authCredentialDto);
    }
}
