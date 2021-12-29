import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { pages } from 'config/pages';
import type { NextPage } from 'next';
import Image from 'next/image';
import React, { ReactNode, useState } from 'react';

import { DrawerItem } from './DrawerItem';
import { StyledAppBar } from './StyledAppBar';
import { DrawerHeader, StyledDrawer } from './StyledDrawer';
import { Toolbar } from './Toolbar';

interface AppBarProps {
  children?: ReactNode;
}

const AppBar: NextPage = ({ children }: AppBarProps) => {
  const [open, setOpen] = useState(true);

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledAppBar position="fixed" open={open}>
        <Toolbar isDrawerOpen={open} onToggleDrawer={handleToggleDrawer} />
      </StyledAppBar>
      <StyledDrawer variant="permanent" open={open}>
        <DrawerHeader>
          <Image
            src="/shoulders-logo.svg"
            alt="Shoulders"
            width={177 / 5}
            height={191 / 5}
          />
          <Typography sx={{ ml: 2 }} variant="h6" noWrap fontWeight="bold">
            Shoulders
          </Typography>
        </DrawerHeader>
        <Divider />
        <List>
          {pages
            .filter((page) => page.drawer !== false)
            .map((page) => (
              <DrawerItem key={page.link} isDrawerOpen={open} page={page} />
            ))}
        </List>
      </StyledDrawer>
      <Box component="main" flexGrow={1}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default AppBar;
