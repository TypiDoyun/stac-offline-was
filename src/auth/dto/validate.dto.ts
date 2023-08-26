import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class ValidateDto {
    @IsNotEmpty()
    @IsNumberString()
    public registrationNumber: string;

    @IsNotEmpty()
    @IsString()
    public representative: string;

    @IsNotEmpty()
    @IsString()
    public openingDate: string;
}
