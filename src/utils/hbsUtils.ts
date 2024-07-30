import * as hbs from 'hbs';
import { join } from 'path';
import { VIEWS_PATH } from 'src/constants/paths';
const fs = require('fs');

export const HbsUtils = {
  registerPartial(partialName: string, filePath: string) {
    try {
      const partialTemplate = fs.readFileSync(filePath, 'utf8');
      hbs.registerPartial(partialName, partialTemplate);
    } catch (error) {
      console.log('registerPartial error', error);
    }
  },
  registerTodoPartials() {
    this.registerPartial(
      'deleteTodoModal',
      join(VIEWS_PATH, 'todos', 'delete_todo_modal.hbs'),
    );
    this.registerPartial(
      'createTodoModal',
      join(VIEWS_PATH, 'todos', 'create_todo_modal.hbs'),
    );
    this.registerPartial(
      'editTodoModal',
      join(VIEWS_PATH, 'todos', 'edit_todo_modal.hbs'),
    );
    this.registerPartial(
      'todoItemRow',
      join(VIEWS_PATH, 'todos', 'todo_item_row.hbs'),
    );
  },
  initPartials() {
    this.registerTodoPartials();
  },
};
