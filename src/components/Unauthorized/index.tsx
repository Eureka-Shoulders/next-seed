import { Button, Grid, Typography } from '@mui/material';

import UnauthorizedSvg from './UnauthorizedSvg';

type UnauthorizedShowerProps = {
  title?: string;
  description?: string;
  href?: string;
  buttonLabel?: string;
};

// TODO: translate this
const UnauthorizedShower = (props: UnauthorizedShowerProps) => {
  const {
    title = 'Acesso negado',
    description = 'Você não tem as permissões necessárias para acessar esta página',
    buttonLabel = 'página inicial',
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
