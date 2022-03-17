import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { observer } from 'mobx-react-lite';

import { useThemeStore } from '@hooks/stores';

function ThemeIcon() {
  const themeStore = useThemeStore();

  if (themeStore.theme === 'light') {
    return <LightModeIcon />;
  }

  if (themeStore.theme === 'dark') {
    return <DarkModeIcon />;
  }

  return null;
}

export default observer(ThemeIcon);
