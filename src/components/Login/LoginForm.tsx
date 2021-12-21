import { Grid, Typography } from '@mui/material';

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
          Login
        </Typography>
      </Grid>
    </Grid>
  );
}
