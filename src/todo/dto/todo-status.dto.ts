import { ApiProperty } from '@nestjs/swagger';
import { TodoStatusEnum } from '../todo-status.enum';
import { IsEnum } from 'class-validator';

export class TodoStatusDto {
  @ApiProperty({ description: 'todo allowed status values' })
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum;
}
