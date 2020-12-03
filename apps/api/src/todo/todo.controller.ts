import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTodoDto, TodoService } from '@nx-study/model-typeorm';

@Controller('todos')
@ApiTags('todos')
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
  ) {}

  @Get()
  async getTodo() {
    return this.todoService.findAll();
  }

  @Post('addTodo')
  addTodo(@Body() dto: CreateTodoDto) {
    console.log('addTodo', dto);
    return this.todoService.create(dto);
  }
}
