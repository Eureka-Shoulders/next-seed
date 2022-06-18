import { NextRequest, NextResponse } from 'next/server';

import { DEFAULT_LOCALE, LOCALES } from '@config/constants';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const shouldHandleLocale =
    !PUBLIC_FILE.test(req.nextUrl.pathname) &&
    !req.nextUrl.pathname.includes('/api/') &&
    req.nextUrl.locale === 'default';

  const userLocale = req.headers.get('accept-language')?.split(',')[0];
  let locale = userLocale?.split('-')[0] || DEFAULT_LOCALE;

  if (shouldHandleLocale) {
    const url = req.nextUrl.clone();

    if (!LOCALES.includes(locale)) {
      locale = DEFAULT_LOCALE;
    }

    url.pathname = `/${locale}${req.nextUrl.pathname}`;
    return NextResponse.redirect(url);
  }

  return undefined;
}
