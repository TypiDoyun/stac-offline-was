import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const RefreshTokenField = createParamDecorator(
    (data, context: ExecutionContext): string => {
        const request = context.switchToHttp().getRequest();

        return request.user.refreshToken;
    }
);
