/* eslint-disable @next/next/no-img-element */
import { Box, Button, Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import NextLink from 'next/link';

import { NotFoundSvg } from '@components/svg/NotFoundSvg';

import { useTranslation } from '@hooks/services';

const Custom404: NextPage = () => {
  const { translate } = useTranslation();

  return (
    <Box p={3}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs="auto">
          <NotFoundSvg />
        </Grid>
        <Grid item xs={12}>
          <Typography align="center" variant="h4">
            {translate('pages.notFound.title')}
          </Typography>
          <Typography align="center" sx={{ marginY: 2 }}>
            {translate('pages.notFound.description')}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} lg={2}>
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

export default Custom404;

export const getStaticProps = () => {
  return {
    props: {
      showAppBar: false,
    },
  };
};
