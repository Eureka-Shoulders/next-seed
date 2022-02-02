import { Grid, Typography } from '@mui/material';

import Trans from '@components/Trans';

export default function LoginForm() {
  return (
    <Grid
      container
      component="main"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          display="flex"
          alignContent="center"
          justifyContent="center"
          fontWeight={700}
        >
          <Trans id="actions.login" />
        </Typography>
      </Grid>
    </Grid>
  );
}
