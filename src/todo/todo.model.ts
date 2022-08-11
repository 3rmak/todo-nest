import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

import { TodoStatusEnum } from './todo-status.enum';

@Schema()
class TodoDocument {
  @Prop({
    required: true,
    trim: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  status: TodoStatusEnum;
}
const todoSchema = SchemaFactory.createForClass(TodoDocument);

export type Todo = TodoDocument & Document;
export const TodoModel = {
  name: 'todo',
  schema: todoSchema,
};
