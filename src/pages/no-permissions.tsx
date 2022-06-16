import { Box, Button, Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import NextLink from 'next/link';

import { UnauthorizedSvg } from '@components/svg/UnauthorizedSvg';

import { useTranslation } from '@hooks/services';

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
          <NextLink href="/" passHref>
            <Button fullWidth color="primary" variant="contained">
              {translate('actions.goBack')}
            </Button>
          </NextLink>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoPermissions;

export const getStaticProps = async () => {
  return {
    props: {
      showAppBar: true,
    },
  };
};
