import { PickType } from "@nestjs/mapped-types";
import { UserSignUpDto } from "./user-sign-up.dto";

export class FindUserDto extends PickType(UserSignUpDto, ["id"]) { }
