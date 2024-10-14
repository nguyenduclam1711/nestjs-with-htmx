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
    this.registerPartial(
      'commonHeader',
      join(VIEWS_PATH, 'commons', 'common-header.hbs'),
    );
  },
  registerTodoPartials() {
    this.registerPartial(
      'deleteTodoModal',
      join(VIEWS_PATH, 'pages', 'todos', 'delete-todo-modal.hbs'),
    );
    this.registerPartial(
      'todoItemRow',
      join(VIEWS_PATH, 'pages', 'todos', 'todo-item-row.hbs'),
    );
    this.registerPartial(
      'todoTableItems',
      join(VIEWS_PATH, 'pages', 'todos', 'todo-table-items.hbs'),
    );
    this.registerPartial(
      'createOrEdittodoModal',
      join(VIEWS_PATH, 'pages', 'todos', 'create-or-edit-todo-modal.hbs'),
    );
  },
  registerRegisterPartials() {
    this.registerPartial(
      'registerFormDataInputs',
      join(VIEWS_PATH, 'pages', 'register', 'register-form-data-inputs.hbs'),
    );
  },
  registerLoginPartials() {
    this.registerPartial(
      'loginFormDataInputs',
      join(VIEWS_PATH, 'pages', 'login', 'login-form-data-inputs.hbs'),
    );
  },
  initPartials() {
    this.registerCommonPartials();
    this.registerTodoPartials();
    this.registerRegisterPartials();
    this.registerLoginPartials();
  },
};
