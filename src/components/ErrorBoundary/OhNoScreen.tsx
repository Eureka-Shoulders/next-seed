/* eslint-disable @next/next/no-img-element */
import { Button, Container, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';

import { useTranslation } from '@hooks/services';

import { LogParams } from '@services/logger';

const possibleCookies = ['locale', 'theme', 'refresh_token', 'user_token'];

export default function OhNoScreen({
  onDisableError,
}: {
  error: Error;
  onDisableError: () => void;
  onSendFeedback: (params: LogParams) => Promise<void>;
}) {
  const router = useRouter();
  // const cookies = parseCookies();
  const { translate } = useTranslation();

  function handleClick() {
    possibleCookies.forEach((cookie) => destroyCookie(null, cookie, { path: '/', sameSite: true }));
    onDisableError();
    router.reload();
    router.push('/login');
  }

  // TODO: get feedback from user
  // function handleFeedback() {
  //   onSendFeedback({
  //     error,
  //     user: {
  //       token: cookies.user_token,
  //       message: '',
  //     },
  //   });
  // }

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
            {translate('pages.ohNo.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={2}>
            {translate('pages.ohNo.description')}
          </Typography>

          <Button onClick={handleClick} variant="contained">
            {translate('actions.goBack')}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
