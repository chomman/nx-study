import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTodoDto, TodoService } from '@nx-study/model-typeorm';
import { AppService } from './app.service';

@Controller()
@ApiTags('app')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly todoService: TodoService,
    ) {}

  @Get('hello/:name')
  @ApiParam({ name: 'name' })
  async hello(@Param() params) {
    return `Hello ${params.name || ''}!`;
  }

  @Post('addTodo')
  addTodo(@Body() dto: CreateTodoDto) {
    console.log('addTodo', dto);
    return this.todoService.create(dto);
  }
}
