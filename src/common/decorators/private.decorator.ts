import { UseGuards } from "@nestjs/common";
import { UserAccessTokenGuard } from "../guards";

export const Private = () => UseGuards(UserAccessTokenGuard);
