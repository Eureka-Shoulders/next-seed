import { Typography } from '@mui/material';
import Image from 'next/image';

import Trans from '@components/utility/Trans';

export default function DrawerHeader() {
  return (
    <>
      <Image src="/shoulders-logo.svg" alt="Shoulders" width={177 / 5} height={191 / 5} />
      <Typography ml={2} variant="h6" noWrap fontWeight="bold">
        <Trans id="common.title" />
      </Typography>
    </>
  );
}
