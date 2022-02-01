import locales from 'locales';
import { NextRouter } from 'next/router';
import { path, split } from 'ramda';

export default function getLocaleString(
  objectPath: string,
  router?: NextRouter
) {
  const localeValue = path(
    split(/[[\].]/, objectPath),
    path([router?.locale || ''], locales)
  );

  if (typeof localeValue === 'string') {
    return localeValue;
  }

  const defaultValue = path(
    split(/[[\].]/, objectPath),
    path([router?.defaultLocale || ''], locales)
  );

  if (typeof defaultValue === 'string') {
    return defaultValue;
  }

  return `[${objectPath}]`;
}
