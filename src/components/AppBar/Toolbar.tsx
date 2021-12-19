import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import MuiToolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import React from 'react';

interface ToolbarProps {
  onToggleDrawer: () => void;
  isDrawerOpen: boolean;
}

export function Toolbar({ onToggleDrawer, isDrawerOpen }: ToolbarProps) {
  const theme = useTheme();

  return (
    <MuiToolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={onToggleDrawer}
        edge="start"
        sx={{
          marginRight: isDrawerOpen ? 2 : 5,
          transition: 'margin-right 0.3s',
        }}
      >
        {isDrawerOpen ? (
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
    </MuiToolbar>
  );
}
