import { Avatar, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useUserStore } from 'hooks/stores';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useState } from 'react';

function AppBarHeader() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const userStore = useUserStore();
  const router = useRouter();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <>
      <Typography flexGrow={1} variant="h5">
        Shoulders
      </Typography>

      <IconButton onClick={handleClick}>
        <Avatar>{userStore.user?.person.name[0]}</Avatar>
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => router.push('/profile')}>Perfil</MenuItem>
        <MenuItem onClick={userStore.logout}>Sair</MenuItem>
      </Menu>
    </>
  );
}

export default observer(AppBarHeader);
