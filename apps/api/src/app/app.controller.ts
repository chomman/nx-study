import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTodoDto, TodoService } from '@nx-study/model-typeorm';
import { AppService } from './app.service';

@Controller()
@ApiTags('todos')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly todoService: TodoService,
    ) {}

  @Get('todos')
  async getTodo() {
    console.log('todo');
    const result = await this.todoService.findAll();
    console.log(result);
    return result;
  }

  @Post('addTodo')
  addTodo(@Body() dto: CreateTodoDto) {
    console.log('addTodo', dto);
    return this.todoService.create(dto);
  }
}
