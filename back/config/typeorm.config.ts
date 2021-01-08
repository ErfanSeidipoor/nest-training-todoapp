import { TypeOrmModuleOptions } from "@nestjs/typeorm";

import keys from "./keys";

export const typeOrmConfig:TypeOrmModuleOptions = {
    type:"postgres",
    host: keys.pgHost,
    port: Number(keys.pgPort),
    username: keys.pgUser,
    password: keys.pgPassword,
    database: keys.pgDatabase,
    entities:[__dirname + "/../**/*.entity{.ts,.js}"],
    synchronize: true,
}