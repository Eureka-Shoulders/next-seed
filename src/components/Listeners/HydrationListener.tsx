import { observer } from 'mobx-react-lite';
import { parseCookies } from 'nookies';
import { useEffect } from 'react';
import { HydrationData } from 'types';

import { useThemeStore, useUserStore } from '@hooks/stores';

import { ThemeType } from '@stores/theme';

interface HydrationListenerProps {
  data: HydrationData;
}

function HydrationListener({ data }: HydrationListenerProps) {
  const themeStore = useThemeStore();
  const userStore = useUserStore();

  useEffect(() => {
    const cookies = parseCookies();
    const themeFromCookies = cookies.theme as ThemeType;

    if (!themeFromCookies) {
      themeStore.persist();
    }

    if (!themeStore.theme) {
      themeStore.setTheme(themeFromCookies);
    }
  }, []);

  useEffect(() => {
    if (userStore.isLogged) {
      userStore.getAbilities();
    }
  }, []);

  return null;
}

export default observer(HydrationListener);
