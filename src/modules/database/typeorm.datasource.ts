import { config } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";

config({
    path: ".env"
});

export const options: DataSourceOptions = {
    type: "mongodb",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    authSource: "admin",
    logging: true,
    entities: ["dist/**/*.entity.{js,ts}"]
    // migrations: ["dist/migrations/*{.ts,.js}"],
    // migrationsRun: true,
};

const AppDataSource = new DataSource(options);

export default AppDataSource;
