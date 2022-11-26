import { DataSource } from "typeorm";
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: configService.get("POSTGRES_HOST"),
    port: configService.get("POSTGRES_PORT"),
    username: configService.get("POSTGRES_USER"),
    password: configService.get("POSTGRES_PASSWORD"),
    database: configService.get("POSTGRES_DB"),
    synchronize: false,
    logging: true, 
    migrations: ["src/migration/**/*.ts"],
    migrationsTableName: "custom_migration_table",
    subscribers: ["src/migration/**/*.ts"],
})