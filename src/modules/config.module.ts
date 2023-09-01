import * as Joi from "joi";

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env`,
            validationSchema: Joi.object({
                PORT: Joi.number().default(3000),
                DB_HOST: Joi.string().required(),
                DB_PORT: Joi.number().required(),
                DB_USER: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                DB_NAME: Joi.string().required(),
                AWS_BUCKET_REGION: Joi.string().required(),
                AWS_BUCKET_NAME: Joi.string().required(),
                AWS_BUCKET_ACCESS_KEY: Joi.string().required(),
                AWS_BUCKET_PRIVATE_KEY: Joi.string().required(),
                JWT_ACCESS_SECRET_KEY: Joi.string().required(),
                JWT_ACCESS_EXPIRATION_TIME: Joi.string().required(),
                JWT_REFRESH_SECRET_KEY: Joi.string().required(),
                JWT_REFRESH_EXPIRATION_TIME: Joi.string().required(),
                BUSINESSMAN_HOST: Joi.string().required(),
                BUSINESSMAN_SECRET_KEY: Joi.string().required(),
                KAKAO_API_HOST: Joi.string().required(),
                KAKAO_API_KEY: Joi.string().required()
            })
        })
    ]
})
export class ConfigurationModule {}
