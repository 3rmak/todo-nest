import { Injectable, NotFoundException } from '@nestjs/common';

import { Model } from 'mongoose';

import { Todo, TodoModel } from './todo.model';
import { TodoStatusEnum } from './todo-status.enum';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoStatusDto } from './dto/todo-status.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(TodoModel.name) private todoRepository: Model<Todo>,
  ) {}

  public async createTodo(dto: CreateTodoDto): Promise<Todo> {
    return this.todoRepository.create({
      ...dto,
      status: TodoStatusEnum.ACTIVE,
    });
  }

  public async getTodoById(todoId: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ _id: todoId });

    if (!todo) throw new NotFoundException(`no todo with id": ${todoId}`);
    return todo;
  }

  public async getTodoByStatus(status: TodoStatusEnum): Promise<Todo[]> {
    return this.todoRepository.find({ status });
  }

  public async updateTodoStatus(
    todoId: string,
    updateDto: TodoStatusDto,
  ): Promise<Todo> {
    const todo = await this.getTodoById(todoId);
    todo.status = updateDto.status;
    await todo.save();

    return todo;
  }

  public async deleteTodoById(todoId: string): Promise<void> {
    const todo = await this.getTodoById(todoId);
    await todo.delete();
  }
}
