import { DataSource } from "typeorm";

import { Logger, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ConfigurationModule } from "../config.module";

import { options } from "./typeorm.datasource";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigurationModule],
            useFactory: () => options,
            dataSourceFactory: async (opt) => {
                const logger = new Logger("DatabaseModule");
                logger.log("♺ Connecting to DataBase");
                const dataSource = await new DataSource(opt).initialize();
                logger.log("✔ DataBase connect Success");
                return dataSource;
            }
        })
    ]
})
export class DatabaseModule {}
