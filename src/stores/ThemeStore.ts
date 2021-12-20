import { Theme, createTheme } from '@mui/material';
import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

import darkTheme from '@styles/dark.theme';
import lightTheme from '@styles/light.theme';

export interface ThemeStoreType {
  theme: string;
  setTheme(theme: string): void;
  buildTheme(): Theme;
  persist(): void;
  hydrate(): void;
}

type ThemeType = 'light' | 'dark';

@injectable()
class ThemeStore {
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

  buildTheme() {
    const theme = this.themes[this.theme];

    return createTheme(theme);
  }

  persist() {
    localStorage.setItem('theme', this.theme);
  }

  hydrate() {
    const theme = localStorage.getItem('theme');

    if (theme) {
      this.theme = theme as ThemeType;
    }
  }
}

export default ThemeStore;
