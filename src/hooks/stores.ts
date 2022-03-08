import TYPES from '@containers/global.types';
import { useInjection } from 'inversify-react';

import { ThemeStoreType } from '@core/stores/ThemeStore';
import { UserStoreType } from '@core/stores/UserStore';

export function useUserStore() {
  return useInjection<UserStoreType>(TYPES.UserStore);
}

export function useThemeStore() {
  return useInjection<ThemeStoreType>(TYPES.ThemeStore);
}
