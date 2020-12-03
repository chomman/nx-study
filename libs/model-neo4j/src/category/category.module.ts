import { Module } from '@nestjs/common'
import { Neo4jModule } from '../neo4j'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
import { CommonAccountModule } from '../extentions';

@Module({
  imports: [Neo4jModule, CommonAccountModule],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
