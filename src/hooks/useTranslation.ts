import en from 'locales/en';
import pt from 'locales/pt';
import { useRouter } from 'next/router';
import { path, split } from 'ramda';

export type TranslateFunc = (id: string) => string;

export default function useTranslation() {
  const { locale, defaultLocale, locales: nextLocales } = useRouter();
  const locales: Record<string, unknown> = { pt, en };
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const translations = locales[locale || defaultLocale!];
  const splitPath = split(/[[\].]/);

  function translate(id: string) {
    const localeValue = path(splitPath(id), translations);

    if (typeof localeValue === 'string') {
      return localeValue;
    }

    return `[${id}]`;
  }

  return { translate };
}
