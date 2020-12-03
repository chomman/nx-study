import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ICreateBudget } from '../../api-interface';

export class CreateBudgetDto implements ICreateBudget {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name property given to your budget',
    example: 'Colorado Getaway',
    required: true,
  })
  name: string;
}
