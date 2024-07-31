import * as hbs from 'hbs';
import { join } from 'path';
import { VIEWS_PATH } from 'src/constants/paths';
import * as fs from 'fs';

export const HbsUtils = {
  compile(filePath: string, context?: any) {
    try {
      const input = fs.readFileSync(filePath, 'utf8');
      const template = hbs.handlebars.compile(input);
      return template(context);
    } catch (error) {
      console.log('hbs compile error', error);
    }
  },
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
    this.registerPartial(
      'commonErrorAlert',
      join(VIEWS_PATH, 'common_error_alert.hbs'),
    );
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
    this.registerPartial(
      'todoFormDataInputs',
      join(VIEWS_PATH, 'todos', 'todo_form_data_inputs.hbs'),
    );
  },
  initPartials() {
    this.registerCommonPartials();
    this.registerTodoPartials();
  },
};
