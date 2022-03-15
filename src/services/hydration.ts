import TYPES from '@containers/global.types';
import { inject, injectable } from 'inversify';
import { parseCookies } from 'nookies';
import { HydrationData } from 'types';

import { ThemeType } from '@core/stores/theme';

@injectable()
class HydrationService {
  theme: ThemeType;

  constructor(@inject(TYPES.HydrationData) hydrationData: HydrationData) {
    this.theme = hydrationData.theme || this.getTheme();
  }

  getTheme() {
    const cookies = parseCookies();

    return cookies.theme as ThemeType;
  }
}

export default HydrationService;
