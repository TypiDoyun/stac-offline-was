import { UseGuards } from "@nestjs/common";
import { RegisteredMerchantAccessTokenGuard } from "../guards/registered-merchant-access-token.guard";

export const RegisteredMerchantPrivate = () =>
    UseGuards(RegisteredMerchantAccessTokenGuard);
