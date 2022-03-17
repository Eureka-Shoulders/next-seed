import TYPES from '@containers/global.types';
import { useInjection } from 'inversify-react';

import { ThemeStoreType } from '@core/stores/theme';
import { UserStoreType } from '@core/stores/user';

export function useUserStore() {
  return useInjection<UserStoreType>(TYPES.UserStore);
}

export function useThemeStore() {
  return useInjection<ThemeStoreType>(TYPES.ThemeStore);
}
