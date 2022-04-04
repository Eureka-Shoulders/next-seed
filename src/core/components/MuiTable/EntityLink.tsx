/* eslint-disable react/display-name */

/* eslint-disable react-hooks/rules-of-hooks */
import { Link as MuiLink } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Actions, Subjects } from 'types';

import { useUserStore } from '@hooks/stores';

interface Props {
  rowData: GridRenderCellParams;
  action: Actions;
  subject: Subjects;
}

export const EntityLink = observer(({ rowData, action, subject }: Props) => {
  const router = useRouter();
  const userStore = useUserStore();

  if (userStore.abilities!.can(action, subject)) {
    return (
      <NextLink href={`${router.pathname}/${rowData.id}`} passHref>
        <MuiLink>{rowData.value}</MuiLink>
      </NextLink>
    );
  }

  return rowData.value;
});

export function renderEntityLink(action: Actions, subject: Subjects) {
  return (rowData: GridRenderCellParams) => (
    <EntityLink rowData={rowData} action={action} subject={subject} />
  );
}
