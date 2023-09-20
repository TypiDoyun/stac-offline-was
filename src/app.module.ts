import { Module, ValidationPipe } from "@nestjs/common";
import { ClothesModule } from "./clothes/clothes.module";
import { ConfigurationModule } from "./modules/config.module";
import { APP_PIPE } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";
import { ShopModule } from "./shop/shop.module";
import { AppController } from "./app.controller";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
    imports: [
        ConfigurationModule,
        ShopModule,
        ClothesModule,
        AuthModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "public"),
            exclude: ["/api*"]
        })
    ],
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
    controllers: [AppController]
})
export class AppModule {}
