import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from '../dto';
import { Todo } from '../models';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>,
    ) {}

    async findAll() {
        return this.todoRepository.find();
    }

    create(createTodo: CreateTodoDto) {
        const todo = new Todo();
        todo.title = createTodo.title;
        return this.todoRepository.save(todo);
    }
}