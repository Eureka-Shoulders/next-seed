import { ThemeOptions } from '@mui/material';
import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { setCookie } from 'nookies';

import darkTheme from '@styles/dark.theme';
import lightTheme from '@styles/light.theme';

export type ThemeType = 'light' | 'dark';

export interface ThemeStoreType {
  theme: ThemeType;
  themes: Record<ThemeType, ThemeOptions>;
  setTheme(theme: ThemeType): void;

  persist(): void;
}

@injectable()
class ThemeStore implements ThemeStoreType {
  theme: ThemeType = 'light';
  themes = {
    light: lightTheme,
    dark: darkTheme,
  };

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setTheme(theme: ThemeType) {
    this.theme = theme;
    this.persist();
  }

  persist() {
    setCookie(null, 'theme', this.theme || 'light', {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
  }
}

export default ThemeStore;
