import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
//import { Sequelize } from 'sequelize/types';
import { databaseConfig } from './db.config';
import { Post } from './models';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true
    }),
    SequelizeModule.forFeature([Post]),
  ],
  controllers: [],
  providers: [
    Logger
  ],
  exports: [
    SequelizeModule
  ],
})
export class ModelSequelizeModule {
  constructor(
    //private readonly sequelize: Sequelize
  ) {}
}
