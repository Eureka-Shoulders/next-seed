import { useInjection } from 'inversify-react';

import TYPES from '@containers/global.types';

import type { ThemeStoreType } from '@stores/theme';
import type { UserStoreType } from '@stores/user';

export function useUserStore() {
  return useInjection<UserStoreType>(TYPES.UserStore);
}

export function useThemeStore() {
  return useInjection<ThemeStoreType>(TYPES.ThemeStore);
}
