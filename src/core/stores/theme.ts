import TYPES from '@containers/global.types';
import { ThemeOptions } from '@mui/material';
import HydrationService from '@services/hydration';
import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { setCookie } from 'nookies';

import darkTheme from '@styles/dark.theme';
import lightTheme from '@styles/light.theme';

export type ThemeType = 'light' | 'dark';

export interface ThemeStoreType {
  theme: ThemeType;
  themes: Record<ThemeType, ThemeOptions>;
  setTheme(theme: ThemeType): void;

  hydrate(): void;
  persist(): void;
}

@injectable()
class ThemeStore implements ThemeStoreType {
  theme: ThemeType = 'light';
  themes = {
    light: lightTheme,
    dark: darkTheme,
  };

  constructor(
    @inject(TYPES.HydrationService)
    private hydrationService: HydrationService
  ) {
    makeAutoObservable(this, {}, { autoBind: true });

    // server-side hydration
    this.hydrate();
  }

  setTheme(theme: ThemeType) {
    this.theme = theme;
    this.persist();
  }

  hydrate() {
    if (typeof window === 'undefined' && this.hydrationService.theme) {
      this.theme = this.hydrationService.theme;
      return;
    }

    this.setTheme(this.hydrationService.theme);
  }

  persist() {
    setCookie(null, 'theme', this.theme || 'light', {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
  }
}

export default ThemeStore;
