import { Module, ValidationPipe } from "@nestjs/common";
import { ClothesModule } from "./clothes/clothes.module";
import { ConfigurationModule } from "./modules/config.module";
import { APP_PIPE } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";
import { ShopModule } from "./shop/shop.module";

@Module({
    imports: [ConfigurationModule, ShopModule, ClothesModule, AuthModule],
    providers: [
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                whitelist: true,
                transform: true,
                transformOptions: {
                    strategy: "exposeAll"
                },
                forbidNonWhitelisted: true,
                forbidUnknownValues: false
            })
        }
    ],
    controllers: []
})
export class AppModule {}
