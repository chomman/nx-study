import { IBudget, IDeleteResponse } from '../api-interface'
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs'
import { BudgetService } from './budget.service'
import { CreateBudgetDto, UpdateBudgetDto, BudgetQuery } from './dto'

@Controller('budget')
@ApiTags('budget - neo4j sample')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  @ApiOperation({
    summary: '예산 추가',
    description: `
      예산 추가. 예산은 시스템의 최상위 노드. 예산은 엑셀 문서라고 생각할 수 있다.
      하나의 Excel 문서에 여러 장의 시트를 가질 수 있으므로 시트를 카테고리, 트랜잭션, 계정 등으로 생각해 보십시오.
    `,
  })
  @ApiResponse({
    status: 201,
    description: '새로 추가한 예산이 추가됩니다.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer-authentication'))
  public createNewBudget(@Body() budgetRequest: CreateBudgetDto): Observable<IBudget> {
    console.log('budgetRequest', budgetRequest);
    return this.budgetService.createBudget(budgetRequest)
  }

  @Get()
  @ApiOperation({
    summary: '전체 예산 조회',
    description: '레이블로 표시된 모든 예산 조회',
  })
  @ApiResponse({
    status: 200,
    description: '모든 예산 목록과 그에 속한 속성과 레이블 반환',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer-authentication'))
  public queryBudgets(@Body() query: BudgetQuery): Observable<IBudget[]> {
    return this.budgetService.queryBudgets(query)
  }

  @Get(':id')
  @ApiOperation({
    summary: '단일 예산 조회',
    description: '레이블로 표시된 예산 가져오기',
  })
  @ApiResponse({
    status: 200,
    description: '특정 예산 목록과 그에 속한 속성과 레이블 반환',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer-authentication'))
  public getBudget(@Param('id') id: string): Observable<IBudget> {
    return this.budgetService.getBudget(id)
  }

  @Post(':id')
  @ApiOperation({
    description:`
      단일 예산 업데이트.
      현재 이름 속성만 업데이트하고 나머지 모든 속성은 동일하게 유지.
    `,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer-authentication'))
  public updateExistingBudget(
    @Param('id') budgetId: string,
    @Body() request: UpdateBudgetDto
  ): Observable<IBudget> {
    if (budgetId !== request.id) {
      throw new BadRequestException()
    }
    return this.budgetService.saveBudget(request)
  }

  @ApiOperation({
    summary: '예산 삭제',
    description: `
      이 API는 단일 예산과 그에 속한 항목들을 삭제합니다.
    `,
  })
  @ApiResponse({
    status: 200,
    description:
      '삭제된 노드 수를 나타내는 메시지를 반환합니다. 이 요청 이후에는 데이터를 새로 고쳐야 할 것입니다.',
  })
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard('bearer-authentication'))
  public removeBudgetById(@Param('id') id: string): Observable<IDeleteResponse> {
    return this.budgetService.deleteBudget(id)
  }
}
