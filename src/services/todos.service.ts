import { Injectable } from '@nestjs/common';

type Todo = {
  id: string;
  name: string;
};

type TodoWithoutId = Omit<Todo, 'id'>;

@Injectable()
export class TodosService {
  private todos: Array<{
    id: number;
    name: string;
  }> = Array.from(Array(10)).map((_, index) => ({
    name: `Todo ${index + 1}`,
    id: index + 1,
  }));
  private incrementalId = this.todos.length;

  findAll() {
    return this.todos;
  }

  private getTodoIndex(id: number) {
    return this.todos.findIndex((todo) => todo.id === id);
  }

  findOne(id: number) {
    const todoIndex = this.getTodoIndex(id);
    if (todoIndex < 0) {
      return;
    }
    return this.todos[todoIndex];
  }

  updateOne(id: number, payload: TodoWithoutId) {
    const todoIndex = this.getTodoIndex(id);
    if (todoIndex < 0) {
      return;
    }
    this.todos[todoIndex] = {
      ...this.todos[todoIndex],
      ...payload,
    };
    return this.todos[todoIndex];
  }

  createOne(payload: TodoWithoutId) {
    this.incrementalId++;
    const newTodo = {
      ...payload,
      id: this.incrementalId,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  deleteOne(id: number) {
    const todoIndex = this.getTodoIndex(id);
    if (todoIndex < 0) {
      throw Error('The todo item does not exists');
    }
    const deleteTodo = this.todos[todoIndex];
    // filter
    for (let i = todoIndex; i < this.todos.length - 1; i++) {
      const temp = this.todos[i];
      this.todos[i] = this.todos[i + 1];
      this.todos[i + 1] = temp;
    }
    this.todos.pop();
    return deleteTodo;
  }
}
