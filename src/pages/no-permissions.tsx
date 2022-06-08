import { Box, Button, Grid, Typography } from '@mui/material';
import { NextPage } from 'next';

import useTranslation from '@core/hooks/useTranslation';

import { UnauthorizedSvg } from '@components/svg/UnauthorizedSvg';

const NoPermissions: NextPage = () => {
  const { translate } = useTranslation();

  return (
    <Box p={3}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs="auto">
          <UnauthorizedSvg height={300} width={300} />
        </Grid>
        <Grid item xs={12}>
          <Typography align="center" fontWeight="fontWeightBold" variant="h4">
            {translate('pages.noPermissions.title')}
          </Typography>
          <Typography align="center">{translate('pages.noPermissions.description')}</Typography>
        </Grid>
        <Grid item xs="auto">
          <Button href={'/'} color="primary" variant="contained">
            {translate('pages.noPermissions.buttonLabel')}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoPermissions;

// TODO: withSSRAuth
export const getStaticProps = async () => {
  return {
    props: {
      showAppBar: true,
    },
  };
};
