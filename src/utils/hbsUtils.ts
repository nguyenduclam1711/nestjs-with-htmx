import * as hbs from 'hbs';
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
};
