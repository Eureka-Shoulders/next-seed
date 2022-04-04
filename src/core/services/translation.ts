import TYPES from '@containers/global.types';
import { Locale } from 'date-fns';
import { enUS, ptBR } from 'date-fns/locale';
import { inject, injectable } from 'inversify';
import en from 'locales/en';
import pt from 'locales/pt';
import { makeAutoObservable } from 'mobx';
import { path, split } from 'ramda';

const locales: Record<string, unknown> = { pt, en };
const dateFnsLocales: Record<string, Locale> = {
  en: enUS,
  pt: ptBR,
};

export interface TranslationServiceType {
  translations: unknown;
  dateFnsLocale: Locale;
  setLocale: (locale: string) => void;
  translate: (id: string) => string;
}

@injectable()
class TranslationService implements TranslationServiceType {
  locale: string;

  constructor(@inject(TYPES.Locale) locale: string) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.locale = locale;
  }

  setLocale(locale: string) {
    this.locale = locale;
  }

  translate(id: string) {
    const splitPath = split(/[[\].]/);
    const localeValue = path(splitPath(id), this.translations);

    if (typeof localeValue === 'string') {
      return localeValue;
    }

    return `[${id}]`;
  }

  get dateFnsLocale() {
    return dateFnsLocales[this.locale];
  }

  get translations() {
    return locales[this.locale];
  }
}

export default TranslationService;
