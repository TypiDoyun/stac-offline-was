import { Module, ValidationPipe } from "@nestjs/common";
import { ClothesModule } from "./clothes/clothes.module";
import { ConfigurationModule } from "./modules/config.module";
import { APP_PIPE } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";

@Module({
    imports: [ConfigurationModule, ClothesModule, AuthModule],
    providers: [
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                whitelist: false,
                transform: true,
                transformOptions: {
                    strategy: "exposeAll"
                },
                forbidUnknownValues: false
            })
        }
    ]
})
export class AppModule {}
