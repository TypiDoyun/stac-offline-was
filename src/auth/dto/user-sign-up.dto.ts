import { PickType } from "@nestjs/mapped-types";
import { User } from "../user/user.entity";

export class UserSignUpDto extends PickType(User, [
    "id",
    "username",
    "password",
    "phoneNumber",
    "birthday"
]) {}
