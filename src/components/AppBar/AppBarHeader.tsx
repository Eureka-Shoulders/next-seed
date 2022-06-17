import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Trans from '@components/utility/Trans';

import { useThemeStore, useUserStore } from '@hooks/stores';

import ThemeIcon from './ThemeIcon';

function AppBarHeader() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const userStore = useUserStore();
  const themeStore = useThemeStore();
  const router = useRouter();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  function goToProfile() {
    router.push('/app/profile');
    handleClose();
  }

  function toggleTheme() {
    if (themeStore.theme === 'light') {
      themeStore.setTheme('dark');
    } else {
      themeStore.setTheme('light');
    }
  }

  return (
    <>
      <Typography flexGrow={1} variant="h5">
        <Trans id="common.title" />
      </Typography>

      <IconButton onClick={handleClick}>
        <Avatar>{userStore.user?.person.name[0]}</Avatar>
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={goToProfile}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <Trans id="common.profile" />
        </MenuItem>
        <MenuItem onClick={toggleTheme}>
          <ListItemIcon>
            <ThemeIcon />
          </ListItemIcon>
          <Trans id="actions.changeTheme" />
        </MenuItem>
        <MenuItem onClick={userStore.logout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <Trans id="actions.logout" />
        </MenuItem>
      </Menu>
    </>
  );
}

export default observer(AppBarHeader);
