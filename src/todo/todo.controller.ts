import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoResponseDto } from './dto/todo-response.dto';
import { TodoStatusDto } from './dto/todo-status.dto';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  @ApiOperation({ description: 'create todo' })
  @ApiResponse({ status: 201, type: TodoResponseDto })
  public async createSingleTodo(@Body() body: CreateTodoDto) {
    return this.todoService
      .createTodo(body)
      .then((todo) => new TodoResponseDto(todo));
  }

  @Get()
  @ApiOperation({ description: 'get all todo ' })
  @ApiResponse({ status: 200, type: [TodoResponseDto] })
  public async getAllTodos() {
    return this.todoService
      .getAllTodo()
      .then((todos) =>
        Promise.all(todos.map((todo) => new TodoResponseDto(todo))),
      );
  }

  @Patch('/:todoId')
  @ApiOperation({ description: 'update todo status' })
  @ApiResponse({ status: 200, type: TodoResponseDto })
  public async updateTodoStatus(
    @Body() dto: TodoStatusDto,
    @Param() param: any,
  ): Promise<TodoResponseDto> {
    return this.todoService
      .updateTodoStatus(param.todoId, dto)
      .then((todo) => new TodoResponseDto(todo));
  }

  @Delete('/:todoId')
  @ApiOperation({ description: 'delete todo by id' })
  @ApiResponse({ status: 204 })
  public async deleteTodoById(
    @Param() param: any,
    @Res() response: Response,
  ): Promise<void> {
    await this.todoService.deleteTodoById(param.todoId);
    response.status(HttpStatus.NO_CONTENT).send();
  }
}
