import { Box, Button, Grid, Link as MuiLink, Typography } from '@mui/material';
import NextLink from 'next/link';
import * as zod from 'zod';

import FXPasswordField from '@components/Inputs/FXPasswordField';
import FXTextField from '@components/Inputs/FXTextField';

import { Formix } from '@euk-labs/formix';

const initialValues = {
  username: '',
  password: '',
};
const LoginSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

type LoginSchema = zod.infer<typeof LoginSchema>;

export default function LoginForm() {
  function handleSubmit(values: LoginSchema) {
    window.alert(JSON.stringify(values));
  }

  return (
    <Box p={4}>
      <Grid container component="main" spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography
            align="center"
            variant="h4"
            component="h1"
            fontWeight={700}
          >
            Login
          </Typography>
        </Grid>

        <Grid item xs={12} sm={8}>
          <Formix
            initialValues={initialValues}
            zodSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FXTextField name="username" label="Username" />
              </Grid>
              <Grid item xs={12}>
                <FXPasswordField name="password" label="Password" />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="flex-end">
                <MuiLink component={NextLink} href="/recover-password">
                  Esqueceu sua senha?
                </MuiLink>
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Entrar
                </Button>
              </Grid>
            </Grid>
          </Formix>
        </Grid>
      </Grid>
    </Box>
  );
}
