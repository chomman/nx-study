import { IUpdateBudget } from '../../api-interface';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateBudgetDto } from './create-budget.dto';

export class UpdateBudgetDto extends CreateBudgetDto implements IUpdateBudget {
  @IsNotEmpty()
  @IsString()
  id: string;
}
