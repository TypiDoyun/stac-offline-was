import { PickType } from "@nestjs/mapped-types";
import { User } from "../user/user.entity";

export class SignInDto extends PickType(User, ["id", "password"]) { }
