import * as dotenv from 'dotenv';
import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import { Cat, Todo, User } from './models';

dotenv.config();

const isProductionEnv = process.env.NODE_ENV === 'production';

const pathMigrations = join(__dirname, 'migrations', '**{.ts,.js}');

export const databaseConfig: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Cat, Todo],
  synchronize: true,
  //migrations: [pathMigrations],
  cli: {
    migrationsDir: 'migrations',
  },
  logging: !isProductionEnv ? ['error', 'migration', 'warn'] : false,
};
