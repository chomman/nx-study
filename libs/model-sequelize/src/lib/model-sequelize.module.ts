import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './db.config';
import { Post } from './models';

@Module({
  imports: [
    SequelizeModule.forRoot({ ...databaseConfig, dialect: 'mysql' }),
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
  ) {
    Logger.log(`model-sequelize database config : ${JSON.stringify(databaseConfig, null, 2)}`);
  }
}
