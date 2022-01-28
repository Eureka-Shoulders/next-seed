import { Box, Grid, Skeleton } from '@mui/material';
import { useUsersRepository } from 'hooks/repositories';
import { useUserStore } from 'hooks/stores';
import { observer } from 'mobx-react-lite';
import usersColumns from 'modules/users/columns';
import { useEffect } from 'react';
import { User } from 'types';

import { Filters } from '@components/Filters';
import MuiTable from '@components/MuiTable';
import NewEntityButton from '@components/NewEntityButton';

import { Breadcrumb } from '@euk-labs/componentz';
import { Identifier, useList } from '@euk-labs/fetchx';

function Index() {
  const userStore = useUserStore();
  const usersRepository = useUsersRepository();
  const usersList = useList<User>(usersRepository, {
    limit: 10,
    limitField: 'take',
    resultsField: 'data',
  });

  async function handleDelete(id: Identifier) {
    await usersRepository.delete(id);
    usersList.fetch();
  }

  useEffect(() => {
    if (userStore.isLogged) {
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
          <Filters
            filters={filters}
            onFilter={() => {
              // TODO: use ramda to set filters
              usersList.fetch();
            }}
            onClear={() => {
              usersList.filters.forEach((filter) => {
                usersList.filters.delete(filter);
              });
            }}
            onRefresh={usersList.fetch}
          />
        </Grid>

        <Grid item xs={12}>
          {userStore.isLogged ? (
            <MuiTable
              page={usersList.page - 1}
              pageSize={10}
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
