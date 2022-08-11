import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

import { TodoModel } from './todo.model';

@Module({
  imports: [MongooseModule.forFeature([TodoModel])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
