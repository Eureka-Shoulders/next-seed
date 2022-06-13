import { Box, Typography } from '@mui/material';

import { useTranslation } from '@hooks/services';

// TODO: implement a loading animation

function Loading() {
  const { translate } = useTranslation();
  return (
    <Box p={3}>
      <Typography variant="h4">{translate('common.loading')}...</Typography>
    </Box>
  );
}

export default Loading;
