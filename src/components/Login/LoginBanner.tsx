import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

const LoginBannerContainer = styled(Box)({
  background:
    'linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(214.16deg, #3AA3F8 0%, #063060 100%)',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

function LoginBanner() {
  return (
    <LoginBannerContainer>
      <Image
        src="/shoulders-logo.svg"
        alt="Shoulders Logo"
        width={200}
        height={200}
      />
    </LoginBannerContainer>
  );
}

export default LoginBanner;