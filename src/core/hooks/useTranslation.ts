import TYPES from '@containers/global.types';
import { useInjection } from 'inversify-react';
import en from 'locales/en';
import pt from 'locales/pt';
import { path, split } from 'ramda';

import { TranslationServiceType } from '@core/services/translationService';

export type TranslateFunc = (id: string) => string;

export function serverSideTranslate(locale = '', id: string) {
  const locales: Record<string, unknown> = { pt, en };
  const translations = locales[locale];
  const splitPath = split(/[[\].]/);
  const localeValue = path(splitPath(id), translations);

  if (typeof localeValue === 'string') {
    return localeValue;
  }

  return `[${id}]`;
}

export default function useTranslation() {
  return useInjection<TranslationServiceType>(TYPES.TranslationService);
}
