import { Theme } from '@mui/material';
import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { parseCookies, setCookie } from 'nookies';

import darkTheme from '@styles/dark.theme';
import lightTheme from '@styles/light.theme';

export interface ThemeStoreType {
  theme: ThemeType;
  themes: Record<ThemeType, Theme>;
  setTheme(theme: ThemeType): void;
  persist(): void;
  hydrate(theme?: ThemeType): void;
}

export type ThemeType = 'light' | 'dark';

@injectable()
class ThemeStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  theme: ThemeType | null = null;
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
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
  }

  hydrate(theme?: ThemeType) {
    const cookies = parseCookies();

    if (cookies.theme) {
      theme = cookies.theme as ThemeType;
    }

    if (theme) {
      this.theme = theme;
    }
  }
}

export default ThemeStore;
