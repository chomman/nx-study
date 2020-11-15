import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from '@nx-study/utils';
import { Connection } from 'typeorm';
import { databaseConfig } from './db.config';
import { Cat, Todo, User } from './models';
import { TodoService, UserService } from './services';
import { UserSubscriber } from './subscribers/user.subscribers';
//import { UserSubscriber } from './subscribers';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([User, Cat, Todo]),
    UtilsModule
  ],
  providers: [
    Logger,
    TodoService,
    UserService,
    UserSubscriber,
  ],
  exports: [
    TypeOrmModule,
    TodoService,
    UserService,
  ],
})
export class ModelTypeOrmModule {
  constructor(
    private readonly connection: Connection
  ) {
    Logger.log(`model-typeorm database config : ${JSON.stringify(databaseConfig, null, 2)}`);
  }
}
