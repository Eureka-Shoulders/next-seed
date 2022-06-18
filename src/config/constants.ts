export const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
export const ONE_WEEK_IN_SECONDS = ONE_DAY_IN_SECONDS * 7;
export const ONE_MONTH_IN_SECONDS = ONE_DAY_IN_SECONDS * 30;
export const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS * 365;
export const DEFAULT_LOCALE = 'en';
export const LOCALES = ['en', 'pt'];

export const defaultCookieConfig = {
  path: '/',
  maxAge: ONE_DAY_IN_SECONDS,
  sameSite: true,
};
