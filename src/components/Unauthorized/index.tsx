import { Button, Grid, Typography } from '@mui/material';

import useTranslation from '@hooks/useTranslation';

import UnauthorizedSvg from './UnauthorizedSvg';

type UnauthorizedShowerProps = {
  title?: string;
  description?: string;
  href?: string;
  buttonLabel?: string;
};

const UnauthorizedShower = (props: UnauthorizedShowerProps) => {
  const { translate } = useTranslation();
  const {
    title = translate('pages.noPermissions.title'),
    description = translate('pages.noPermissions.description'),
    buttonLabel = translate('pages.noPermissions.buttonLabel'),
    href = '/',
  } = props;

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs="auto">
        <UnauthorizedSvg height={300} width={300} />
      </Grid>
      <Grid item xs={12}>
        <Typography align="center" fontWeight="fontWeightBold" variant="h4">
          {title}
        </Typography>
        <Typography align="center">{description}</Typography>
      </Grid>
      <Grid item xs="auto">
        <Button href={href} color="primary" variant="contained">
          {buttonLabel}
        </Button>
      </Grid>
    </Grid>
  );
};

export default UnauthorizedShower;
