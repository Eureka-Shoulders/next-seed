export const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
export const ONE_WEEK_IN_SECONDS = ONE_DAY_IN_SECONDS * 7;
export const ONE_MONTH_IN_SECONDS = ONE_DAY_IN_SECONDS * 30;
export const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS * 365;

export const PUBLIC_ROUTES = [
  '/404',
  '/500',
  '/login',
  '/register',
  'no-permissions',
  '/reset-password',
  '/recover-password',
  '/entity-not-found',
];

export const defaultCookieConfig = {
  path: '/',
  maxAge: ONE_DAY_IN_SECONDS,
  httpOnly: true,
  sameSite: true,
};
