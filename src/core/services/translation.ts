import TYPES from '@containers/global.types';
import { inject, injectable } from 'inversify';
import en from 'locales/en';
import pt from 'locales/pt';
import { makeAutoObservable } from 'mobx';
import { path, split } from 'ramda';

const locales: Record<string, unknown> = { pt, en };

export interface TranslationServiceType {
  translations: unknown;
  translate: (id: string) => string;
}

@injectable()
class TranslationService implements TranslationServiceType {
  @inject(TYPES.Locale)
  private readonly locale!: string;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  translations = locales[this.locale];

  translate(id: string) {
    const splitPath = split(/[[\].]/);
    const localeValue = path(splitPath(id), this.translations);

    if (typeof localeValue === 'string') {
      return localeValue;
    }

    return `[${id}]`;
  }
}

export default TranslationService;
