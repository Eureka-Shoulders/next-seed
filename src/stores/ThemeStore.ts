import { Theme, createTheme } from '@mui/material';
import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { parseCookies, setCookie } from 'nookies';

import darkTheme from '@styles/dark.theme';
import lightTheme from '@styles/light.theme';

export interface ThemeStoreType {
  theme: Theme;
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

  private _theme: ThemeType = 'light';
  themes = {
    light: lightTheme,
    dark: darkTheme,
  };

  setTheme(theme: ThemeType) {
    this._theme = theme;
    this.persist();
  }

  persist() {
    setCookie(null, 'theme', this._theme, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
  }

  hydrate(theme?: ThemeType) {
    const cookies = parseCookies();

    theme = cookies.theme as ThemeType;

    if (theme) {
      this._theme = theme as ThemeType;
    }
  }

  get theme() {
    return createTheme(this.themes[this._theme]);
  }
}

export default ThemeStore;
