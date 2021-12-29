import { pages } from '@config/pages';
import { Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect } from 'react';

import { useUIStore } from '@euk-labs/componentz';

export default function AppBarBuilder() {
  const uiStore = useUIStore();

  const DrawerHeader = (
    <>
      <Image
        src="/shoulders-logo.svg"
        alt="Shoulders"
        width={177 / 5}
        height={191 / 5}
      />
      <Typography sx={{ ml: 2 }} variant="h6" noWrap fontWeight="bold">
        Shoulders
      </Typography>
    </>
  );

  const AppBarHeader = <Typography variant="h5">Shoulders</Typography>;

  useEffect(() => {
    uiStore.appBar.setPages(pages);
    uiStore.appBar.setDrawerHeaderContent(DrawerHeader);
    uiStore.appBar.setAppBarHeaderContent(AppBarHeader);
  }, []); // eslint-disable-line

  return null;
}
