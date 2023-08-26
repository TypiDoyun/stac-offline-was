import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "../../auth/user/user.entity";

export const UserField = createParamDecorator(
    (data, context: ExecutionContext): User => {
        const request = context.switchToHttp().getRequest();
        return request.user;
    }
);
