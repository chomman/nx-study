import { Module } from '@nestjs/common';
import { ModelTypeOrmModule } from '@nx-study/model-typeorm';
import { ModelSequelizeModule } from '@nx-study/model-sequelize';
import { AuthModule } from '@nx-study/auth';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { BudgetModule, CategoryModule, ModelNeo4jModule } from '@nx-study/model-neo4j';
import { TodoController } from '../todo';

@Module({
  imports: [
    ModelTypeOrmModule,
    ModelSequelizeModule,
    ModelNeo4jModule,
    BootstrapModule.forRoot({ autoLoadEntities: true }),
    AuthModule,
    BudgetModule,
    CategoryModule
  ],
  controllers: [AppController, TodoController],
  providers: [AppService],
})
export class AppModule {
}
