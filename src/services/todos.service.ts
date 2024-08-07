import { Injectable } from '@nestjs/common';
import { Todo, TodoWithoutId } from 'src/schemas/todo';

@Injectable()
export class TodosService {
  private todos: Array<Todo> = Array.from(Array(10)).map((_, index) => ({
    name: `Todo ${index + 1}`,
    id: index + 1,
    email: `email${index + 1}@gmail.com`,
  }));
  private incrementalId = this.todos.length;

  findAll(params?: Partial<Todo>) {
    return this.todos
      .filter((todo) => {
        if (!params) {
          return true;
        }
        const { email, name, id } = params;
        let condition = true;
        if (id) {
          condition = condition && todo.id === id;
        }
        if (email) {
          condition = condition && todo.email.includes(email);
        }
        if (name) {
          condition = condition && todo.name.includes(name);
        }
        return condition;
      })
      .sort((a, b) => b.id - a.id);
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
      throw Error('The todo item does not exists');
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
