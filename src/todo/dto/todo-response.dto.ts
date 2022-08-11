import { ApiProperty } from '@nestjs/swagger';

import { Todo } from '../todo.model';
import { TodoStatusEnum } from '../todo-status.enum';

export class TodoResponseDto {
  constructor(todo: Todo) {
    this.id = todo._id;
    this.title = todo.title;
    this.status = todo.status;
  }

  @ApiProperty({ description: 'todo-id' })
  id: string;

  @ApiProperty({ description: 'title' })
  title: string;

  @ApiProperty({ description: 'ACTIVE | COMPLETED' })
  status: TodoStatusEnum;
}
