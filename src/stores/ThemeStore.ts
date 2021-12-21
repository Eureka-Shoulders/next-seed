import { Theme } from '@mui/material';
import TYPES from 'containers/global.types';
import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { setCookie } from 'nookies';
import { HydrationData } from 'types';

import darkTheme from '@styles/dark.theme';
import lightTheme from '@styles/light.theme';

export type ThemeType = 'light' | 'dark';

export interface ThemeStoreType {
  theme: ThemeType;
  themes: Record<ThemeType, Theme>;
  setTheme(theme: ThemeType): void;
  persist(): void;
  hydrate(data?: HydrationData): void;
}

@injectable()
class ThemeStore {
  constructor(@inject(TYPES.HydrationData) hydrationData?: HydrationData) {
    makeAutoObservable(this, {}, { autoBind: true });

    if (hydrationData?.theme) this.theme = hydrationData.theme;
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
}

export default ThemeStore;
