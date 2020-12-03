import { ICreateCategory } from '../../api-interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCategoryDto implements ICreateCategory {
  @ApiProperty({
    required: true,
    example: 'd84a19c8-e763-4c03-8c5a-14111038dcd8'
  })
  @IsNotEmpty()
  @IsUUID()
  budgetId: string;

  @ApiPropertyOptional({
    description: 'category name',
    required: false,
    example: 'Category Name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Links to an optional parent category',
    required: false,
    example: '302e0ddc-7354-4f69-87ae-ba66d17622f2',
  })
  @IsOptional()
  @IsUUID()
  parentId?: string;
}
