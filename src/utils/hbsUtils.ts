import * as hbs from 'hbs';
import { join } from 'path';
import { VIEWS_PATH } from 'src/constants/paths';
import * as fs from 'fs';

export const HbsUtils = {
  registerPartial(partialName: string, filePath: string) {
    try {
      const partialTemplate = fs.readFileSync(filePath, 'utf8');
      hbs.registerPartial(partialName, partialTemplate);
    } catch (error) {
      console.log('registerPartial error', error);
    }
  },
  registerCommonPartials() {
    this.registerPartial('commonHeader', join(VIEWS_PATH, 'common_header.hbs'));
  },
  registerTodoPartials() {
    this.registerPartial(
      'deleteTodoModal',
      join(VIEWS_PATH, 'todos', 'delete_todo_modal.hbs'),
    );
    this.registerPartial(
      'todoItemRow',
      join(VIEWS_PATH, 'todos', 'todo_item_row.hbs'),
    );
    this.registerPartial(
      'todoTableItems',
      join(VIEWS_PATH, 'todos', 'todo_table_items.hbs'),
    );
    this.registerPartial(
      'createOrEdittodoModal',
      join(VIEWS_PATH, 'todos', 'create_or_edit_todo_modal.hbs'),
    );
  },
  initPartials() {
    this.registerCommonPartials();
    this.registerTodoPartials();
  },
};
