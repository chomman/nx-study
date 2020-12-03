import { Module } from '@nestjs/common';
import { Neo4jModule } from './neo4j';
import { BudgetModule } from './budget';
import { CategoryModule } from './category';

@Module({
  exports: [
    Neo4jModule,
    BudgetModule,
    CategoryModule
  ],
  providers: [
    Neo4jModule,
    BudgetModule,
    CategoryModule
  ],
})
export class ModelNeo4jModule {}
