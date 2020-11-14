import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

const isProductionEnv = process.env.NODE_ENV === 'production';

const pathMigrations = join(__dirname, 'migrations', '**{.ts,.js}');

export const databaseConfig = {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadModels: true,
  synchronize: true
};
