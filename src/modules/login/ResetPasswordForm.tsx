import { Box, Button, Grid, Typography } from '@mui/material';

import FXTextField from '@components/Inputs/FXTextField';

import { Formix } from '@euk-labs/formix';

import { ResetPasswordSchema } from './login.schema';

const initialValues = {
  password: '',
};

export default function ResetPasswordForm() {
  // TODO: Implement reset password submit logic
  function handleSubmit(values: ResetPasswordSchema) {
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
            Alterar Senha
          </Typography>
        </Grid>

        <Grid item xs={12} sm={8}>
          <Formix
            initialValues={initialValues}
            zodSchema={ResetPasswordSchema}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FXTextField name="password" type="password" label="Senha" />
              </Grid>
              <Grid item xs={12}>
                <FXTextField
                  name="confirmPassword"
                  type="password"
                  label="Confirmar sneha"
                />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Alterar
                </Button>
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <Button fullWidth color="primary" type="submit" href="/login">
                  Voltar
                </Button>
              </Grid>
            </Grid>
          </Formix>
        </Grid>
      </Grid>
    </Box>
  );
}
