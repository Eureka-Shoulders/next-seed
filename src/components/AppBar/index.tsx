import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { pages } from 'config/pages';
import type { NextPage } from 'next';
import Image from 'next/image';
import React, { ReactNode, useState } from 'react';

import { DrawerItem } from './DrawerItem';
import { StyledAppBar } from './StyledAppBar';
import { DrawerHeader, StyledDrawer } from './StyledDrawer';

interface AppBarProps {
  children?: ReactNode;
}

const AppBar: NextPage = ({ children }: AppBarProps) => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <StyledAppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleToggleDrawer}
            edge="start"
            sx={{
              marginRight: open ? 2 : 5,
              transition: 'margin-right 0.3s',
            }}
          >
            {open ? (
              theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )
            ) : (
              <MenuIcon />
            )}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Bem vindo
          </Typography>
        </Toolbar>
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
          {pages.map((page) => (
            <DrawerItem key={page.link} isDrawerOpen={open} page={page} />
          ))}
        </List>
      </StyledDrawer>
      <Box component="main" p={3} flexGrow={1}>
        <DrawerHeader />
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};

export default AppBar;
