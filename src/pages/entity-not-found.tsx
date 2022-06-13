import { Box, Button, Grid, Typography } from '@mui/material';
import { NextPage } from 'next';

import { NotFoundSvg } from '@components/svg/NotFoundSvg';

import { useTranslation } from '@hooks/services';

const EntityNotFound: NextPage = () => {
  const { translate } = useTranslation();

  return (
    <Box p={3}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs="auto">
          <NotFoundSvg />
        </Grid>
        <Grid item xs={12}>
          <Typography align="center" fontWeight="fontWeightBold" variant="h4">
            {translate('pages.entityNotFound.title')}
          </Typography>
          <Typography align="center">{translate('pages.entityNotFound.description')}</Typography>
        </Grid>
        <Grid item xs="auto">
          <Button href="/" color="primary" variant="contained">
            {translate('actions.goBack')}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EntityNotFound;

// TODO: withSSRAuth
export const getStaticProps = async () => {
  return {
    props: {
      showAppBar: true,
    },
  };
};
