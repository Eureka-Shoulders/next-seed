import { NextRequest, NextResponse } from 'next/server';

import { PUBLIC_ROUTES, defaultCookieConfig } from '@config/constants';

// TODO: implement i18n
export function middleware(req: NextRequest): Promise<Response | undefined> | Response | undefined {
  const userToken = req.cookies['user_token'];
  const {
    nextUrl: { origin },
    page: { name: pageName },
  } = req;

  const isPublicPage = !!(pageName && PUBLIC_ROUTES.includes(pageName));

  if (userToken && pageName === '/login') {
    const res = NextResponse.redirect(`${origin}/`);
    res.cookie('isPublicPage', String(isPublicPage), defaultCookieConfig);
    return res;
  }

  if (userToken || isPublicPage) {
    const res = NextResponse.next();
    res.cookie('isPublicPage', String(isPublicPage), defaultCookieConfig);
    return res;
  }

  const res = NextResponse.redirect(`${origin}/login`);

  if (isPublicPage) {
    res.cookie('isPublicPage', String(isPublicPage), defaultCookieConfig);
  }

  return res;
}
