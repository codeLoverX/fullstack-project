export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "ROOT",
    database: "userLog",
    synchronize: false,
    logging: true, 
    entities: [User, Student],
    migrations: ["src/migration/**/*.ts"],
    migrationsTableName: "custom_migration_table",
    subscribers: ["src/migration/**/*.ts"],
})