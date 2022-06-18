import { ThemeOptions } from '@mui/material';
import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { setCookie } from 'nookies';

import { ONE_YEAR_IN_SECONDS, defaultCookieConfig } from '@config/constants';

import darkTheme from '@styles/dark.theme';
import lightTheme from '@styles/light.theme';

export type ThemeType = 'light' | 'dark';

export interface ThemeStoreType {
  theme: ThemeType;
  themes: Record<ThemeType, ThemeOptions>;
  setTheme(theme: ThemeType): void;
  persist(): void;
  toggleTheme(): void;
}

@injectable()
export class ThemeStore implements ThemeStoreType {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  theme: ThemeType = 'light';
  themes = {
    light: lightTheme,
    dark: darkTheme,
  };

  setTheme(theme: ThemeType) {
    this.theme = theme;
    this.persist();
  }

  persist() {
    setCookie(null, 'theme', this.theme || 'light', {
      ...defaultCookieConfig,
      maxAge: ONE_YEAR_IN_SECONDS,
    });
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.persist();
  }
}
