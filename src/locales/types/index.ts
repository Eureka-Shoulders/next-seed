import { Actions } from './actions';
import { Common } from './common';
import { Dialogs } from './dialogs';
import { Errors } from './errors';
import { Feedbacks } from './feedbacks';
import { Filters } from './filters';
import { Pages } from './pages';
import { Placeholders } from './placeholders';

export interface Locale {
  actions: Actions;
  common: Common;
  errors: Errors;
  feedbacks: Feedbacks;
  filters: Filters;
  pages: Pages;
  placeholders: Placeholders;
  dialogs: Dialogs;
}
