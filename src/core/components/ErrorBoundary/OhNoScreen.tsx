/* eslint-disable @next/next/no-img-element */
import { Button, Container, Grid, Typography } from '@mui/material';
import NextLink from 'next/link';

export default function OhNoScreen() {
  return (
    <Container
      sx={{
        height: {
          xs: '100%',
          md: '100vh',
        },
      }}
    >
      <Grid container spacing={2} height="100%" alignItems="center">
        <Grid
          item
          xs={12}
          md={6}
          textAlign={{
            xs: 'center',
            md: 'left',
          }}
          order={{
            xs: 2,
            sm: 1,
          }}
        >
          <img
            src="/error-illustration.svg"
            alt="Error Illustration"
            width="100%"
            style={{
              maxWidth: 500,
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          textAlign={{
            xs: 'center',
            md: 'left',
          }}
          order={{
            xs: 1,
            sm: 2,
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Ops! Algo deu errado
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={2}>
            Algo muito estranho aconteceu enquanto você utilizava nossa
            aplicação
          </Typography>

          <NextLink href="/" passHref>
            <Button variant="contained">Voltar ao início</Button>
          </NextLink>
        </Grid>
      </Grid>
    </Container>
  );
}
