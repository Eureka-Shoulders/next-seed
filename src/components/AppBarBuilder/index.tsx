import { getPages } from '@config/pages';
import { Typography } from '@mui/material';
import { useUserStore } from 'hooks/stores';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useUIStore } from '@euk-labs/componentz';

import AppBarHeader from './AppBarHeader';

function AppBarBuilder() {
  const uiStore = useUIStore();
  const userStore = useUserStore();
  const router = useRouter();

  const DrawerHeader = (
    <>
      <Image
        src="/shoulders-logo.svg"
        alt="Shoulders"
        width={177 / 5}
        height={191 / 5}
      />
      <Typography ml={2} variant="h6" noWrap fontWeight="bold">
        Shoulders
      </Typography>
    </>
  );

  useEffect(() => {
    uiStore.appBar.setDrawerHeaderContent(DrawerHeader);
    uiStore.appBar.setAppBarHeaderContent(<AppBarHeader />);
    uiStore.appBar.setOnClickDrawerOption((page) => {
      router.push(page.link);
    });
  }, []); // eslint-disable-line

  useEffect(() => {
    const pages = getPages(userStore.abilities);

    uiStore.appBar.setPages(pages);
  }, [userStore.user]); // eslint-disable-line

  return null;
}

export default observer(AppBarBuilder);
