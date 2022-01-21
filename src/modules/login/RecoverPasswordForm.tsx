import { Box, Button, Grid, Typography } from '@mui/material';

import FXTextField from '@components/Inputs/FXTextField';

import { Formix } from '@euk-labs/formix';

import { RecoverPasswordSchema } from './login.schema';

const initialValues = {
  email: '',
};

export default function RecoverPasswordForm() {
  // TODO: implement recover password submit logic
  function handleSubmit(values: RecoverPasswordSchema) {
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
            Recuperar Senha
          </Typography>
        </Grid>

        <Grid item xs={12} sm={8}>
          <Formix
            initialValues={initialValues}
            zodSchema={RecoverPasswordSchema}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FXTextField name="email" label="E-mail" type="email" />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Recuperar
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
