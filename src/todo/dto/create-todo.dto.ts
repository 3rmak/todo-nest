import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty()
  @IsString()
  @Length(3, 100)
  title: string;
}
