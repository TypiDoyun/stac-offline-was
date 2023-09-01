import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    UseInterceptors
} from "@nestjs/common";
import { UserField } from "../../common/decorators/user-field.decorator";
import { User } from "./user.entity";
import { Private } from "src/common/decorators";
import { Merchant } from "../merchant/merchant.entity";

@Controller("user")
export class UserController {
    @Get("/profile")
    @UseInterceptors(ClassSerializerInterceptor)
    @Private()
    public getProfile(@UserField() user: User | Merchant) {
        return user;
    }
}
