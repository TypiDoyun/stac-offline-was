import { UseGuards } from "@nestjs/common";
import { MerchantAccessTokenGuard } from "../guards";

export const MerchantPrivate = () => UseGuards(MerchantAccessTokenGuard);
