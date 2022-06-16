import { en } from '@locales/en';
import { pt } from '@locales/pt';
import { Locale, LocaleType } from '@locales/types';
import { Locale as DateFnsLocale } from 'date-fns';
import { enUS, ptBR } from 'date-fns/locale';
import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { path, split } from 'ramda';

import TYPES from '@containers/global.types';

export type TranslateFunc = (id: string) => string;

const locales: Record<string, Locale> = { pt, en };
const dateFnsLocales: Record<LocaleType, DateFnsLocale> = {
  en: enUS,
  pt: ptBR,
};

export interface TranslationServiceType {
  translations: Locale;
  dateFnsLocale: DateFnsLocale;
  setLocale: (locale: LocaleType) => void;
  translate: (id: string) => string;
}

@injectable()
export class TranslationService implements TranslationServiceType {
  locale: LocaleType;

  constructor(@inject(TYPES.Locale) locale: LocaleType) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.locale = locale;
  }

  setLocale(locale: LocaleType) {
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

export function serverSideTranslate(locale = '', id: string) {
  const locales: Record<string, Locale> = { pt, en };
  const translations = locales[locale];
  const splitPath = split(/[[\].]/);
  const localeValue = path(splitPath(id), translations);

  if (typeof localeValue === 'string') {
    return localeValue;
  }

  return `[${id}]`;
}
