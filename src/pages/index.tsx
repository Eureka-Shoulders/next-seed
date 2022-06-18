import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/app');
  }, []);

  return null;
};

export default Home;

export const getStaticProps = () => {
  return {
    props: {
      showAppBar: false,
    },
  };
};
