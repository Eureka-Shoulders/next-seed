import { Box, Grid, Skeleton } from '@mui/material';
import setFilter from '@utils/setFilter';
import { useUsersRepository } from 'hooks/repositories';
import { useUserStore } from 'hooks/stores';
import { observer } from 'mobx-react-lite';
import usersColumns from 'modules/users/columns';
import { useEffect } from 'react';
import { User } from 'types';

import DeleteContent from '@components/DialogContents/DeleteContent';
import MuiTable from '@components/MuiTable';
import NewEntityButton from '@components/NewEntityButton';

import { Breadcrumb, useUIStore } from '@euk-labs/componentz';
import { Identifier, useList } from '@euk-labs/fetchx';

function Index() {
  const uiStore = useUIStore();
  const userStore = useUserStore();
  const usersRepository = useUsersRepository();
  const usersList = useList<User>(usersRepository, {
    limit: 10,
    limitField: 'take',
    resultsField: 'data',
  });

  const deleteUser = async (id: Identifier) => {
    await usersRepository.delete(id);
    usersList.fetch();
  };

  const handleDelete = (id: Identifier) => {
    uiStore.dialog.set({
      content: <DeleteContent />,
      rejectLabel: 'Cancelar',
      acceptLabel: 'Deletar',
      onReject: () => uiStore.dialog.close(),
      onAccept: () => deleteUser(id),
    });
    uiStore.dialog.open();
  };

  useEffect(() => {
    if (userStore.isLogged) {
      setFilter(
        'include',
        {
          person: true,
        },
        usersList.filters
      );
      usersList.fetch();
    }
  }, [usersList.page, userStore.isLogged]); // eslint-disable-line

  return (
    <Box p={3} mb={10}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Breadcrumb />
        </Grid>

        <Grid item xs={12}>
          {userStore.isLogged ? (
            <MuiTable
              page={usersList.page - 1}
              pageSize={10}
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              columns={usersColumns(userStore.abilities!, handleDelete)}
              rows={usersList.list}
              isLoading={usersList.loading}
              totalCount={usersList.totalCount}
              onPageChange={(page) => usersList.setPage(page + 1)}
            />
          ) : (
            <Skeleton variant="rectangular" width="100%" height={400} />
          )}
        </Grid>
      </Grid>

      <NewEntityButton />
    </Box>
  );
}

export default observer(Index);
