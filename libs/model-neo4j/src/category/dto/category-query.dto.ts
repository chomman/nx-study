import { ICategoryQuery } from '../../api-interface';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CategoryQueryDto implements ICategoryQuery {
  @IsNotEmpty()
  @IsUUID()
  budgetId: string;

  @IsOptional()
  limit?: number;
}
