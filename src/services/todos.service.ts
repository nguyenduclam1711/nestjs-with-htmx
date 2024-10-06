import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { DATABASES } from 'src/constants/databases';
import { MODULES } from 'src/constants/modules';
import { Todo, TodoWithoutId } from 'src/schemas/todo';

@Injectable()
export class TodosService {
  constructor(
    @Inject(MODULES.KNEX_CONNECTION)
    private readonly knex: Knex,
  ) {}

  async findTodos() {
    return this.knex(DATABASES.TODOS).select('*').orderBy('id', 'desc');
  }

  async createTodo(payload: TodoWithoutId) {
    return this.knex(DATABASES.TODOS).insert(payload);
  }

  findAll(params?: Partial<Todo>): Promise<Todo[]> {
    return this.knex(DATABASES.TODOS)
      .select('*')
      .where((builder) => {
        if (!params) {
          return;
        }
        if (params.id) {
          builder.where('id', params.id);
        }
        if (params.name) {
          builder.whereILike('name', `%${params.name}%`);
        }
        if (params.email) {
          builder.whereILike('email', `%${params.email}%`);
        }
      })
      .orderBy('id', 'desc');
  }

  async findOne(id: number): Promise<undefined | Todo> {
    const todos = await this.knex(DATABASES.TODOS).where('id', id);
    return todos[0];
  }

  async updateOne(
    id: number,
    payload: TodoWithoutId,
  ): Promise<undefined | Todo> {
    const update = await this.knex(DATABASES.TODOS)
      .update({
        name: payload.name,
        email: payload.email,
      })
      .where('id', id)
      .returning(['*']);
    return update[0];
  }

  async createOne(payload: TodoWithoutId): Promise<Todo> {
    const create = await this.knex(DATABASES.TODOS)
      .insert(payload)
      .returning(['*']);
    return create[0];
  }

  async deleteOne(id: number): Promise<undefined | Todo> {
    const deleteQuery = await this.knex(DATABASES.TODOS)
      .where('id', id)
      .delete()
      .returning(['*']);
    return deleteQuery[0];
  }
}
