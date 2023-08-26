import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { JwtPayload } from "src/auth/interfaces/jwt-payload.interface";

export const PayloadField = createParamDecorator(
    (data, context: ExecutionContext): JwtPayload => {
        const request = context.switchToHttp().getRequest();

        return request.user;
    }
);
