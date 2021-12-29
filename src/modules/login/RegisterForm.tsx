import ERROR_MESSAGES from '@config/messages';
import { Box, Button, Grid, Link as MuiLink, Typography } from '@mui/material';
import NextLink from 'next/link';
import * as zod from 'zod';

import FXPasswordField from '@components/Inputs/FXPasswordField';
import FXTextField from '@components/Inputs/FXTextField';

import { Formix } from '@euk-labs/formix/components';

const initialValues = {
  username: '',
  email: '',
  password: '',
};
const RegisterSchema = zod.object({
  username: zod.string().min(1, ERROR_MESSAGES.required),
  email: zod.string().email(ERROR_MESSAGES.invalid_email),
  password: zod.string().min(8, ERROR_MESSAGES.minimum_password),
});

type RegisterSchema = zod.infer<typeof RegisterSchema>;

export default function RegisterForm() {
  function handleSubmit(values: RegisterSchema) {
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
            Criar conta
          </Typography>
        </Grid>

        <Grid item xs={12} sm={8}>
          <Formix
            initialValues={initialValues}
            zodSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FXTextField name="email" label="E-mail" type="email" />
              </Grid>
              <Grid item xs={12}>
                <FXTextField name="username" label="Username" />
              </Grid>
              <Grid item xs={12}>
                <FXPasswordField name="password" label="Password" />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Cadastrar
                </Button>
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <MuiLink component={NextLink} href="/login">
                  Já tem uma conta?
                </MuiLink>
              </Grid>
            </Grid>
          </Formix>
        </Grid>
      </Grid>
    </Box>
  );
}
