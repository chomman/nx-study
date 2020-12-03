import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './db.config';
import { Post } from './models';
import { PostService } from './services';
import { PostController } from './controllers';

@Module({
  imports: [
    SequelizeModule.forRoot({ ...databaseConfig, dialect: 'mysql' }),
    SequelizeModule.forFeature([Post]),
  ],
  controllers: [
    PostController
  ],
  providers: [
    Logger,
    PostService
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
