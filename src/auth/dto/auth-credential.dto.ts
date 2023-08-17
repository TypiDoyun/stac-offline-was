import { IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class AuthCredentialDto {
    @IsString()
    @IsNotEmpty()
    @Length(4, 16)
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: "username only accepts alphabet and numbers"
    })
    public username: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 25)
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: "password only accepts alphabet and numbers"
    })
    public password: string;
}
