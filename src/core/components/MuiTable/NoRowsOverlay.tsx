import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import { Box, styled } from '@mui/material';
import { GridOverlay, useGridApiContext } from '@mui/x-data-grid';

const StyledGridOverlay = styled(GridOverlay)(() => ({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

export function NoRowsOverlay() {
  const apiRef = useGridApiContext();
  const noRowsLabel = apiRef.current.getLocaleText('noRowsLabel');

  return (
    <StyledGridOverlay>
      <CloudQueueIcon fontSize="large" />
      <Box sx={{ mt: 1 }}>{noRowsLabel}</Box>
    </StyledGridOverlay>
  );
}
