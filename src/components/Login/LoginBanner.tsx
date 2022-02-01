import { Box, styled } from '@mui/material';
import getLocaleString from 'locales/getLocaleString';
import Image from 'next/image';
import { useRouter } from 'next/router';

const LoginBannerContainer = styled(Box)({
  background:
    'linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(214.16deg, #3AA3F8 0%, #063060 100%)',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

function LoginBanner() {
  const router = useRouter();

  return (
    <LoginBannerContainer>
      <Image
        src="/shoulders-logo.svg"
        alt={getLocaleString('logoAlt', router)}
        width={200}
        height={200}
      />
    </LoginBannerContainer>
  );
}

export default LoginBanner;
