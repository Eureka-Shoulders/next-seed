import { Box } from '@mui/material';
import type { NextPage } from 'next';

import UnauthorizedShower from '@components/Unauthorized';

const NoPermissions: NextPage = () => {
  return (
    <Box p={3}>
      <UnauthorizedShower />
    </Box>
  );
};

export default NoPermissions;

export const getStaticProps = async () => {
  return {
    props: {
      showAppBar: true,
      isPublic: true,
    },
  };
};
