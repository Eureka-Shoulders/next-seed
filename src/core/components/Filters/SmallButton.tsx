import { Button, styled } from '@mui/material';

const SmallButton = styled(Button)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  minWidth: 32,
  padding: 8,

  ':hover': {
    background: theme.palette.action.hover,
  },
}));

export default SmallButton;
