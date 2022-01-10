import { Box, Grid, Skeleton } from '@mui/material';
import TYPES from 'containers/global.types';
import useUserStore from 'hooks/useUserStore';
import { useInjection } from 'inversify-react';
import { observer } from 'mobx-react-lite';
import usersColumns from 'modules/users/columns';
import UsersRepository from 'modules/users/repository';
import { useEffect } from 'react';

import MuiTable from '@components/MuiTable';
import NewEntityButton from '@components/NewEntityButton';

import { Breadcrumb } from '@euk-labs/componentz';
import { Identifier, useList } from '@euk-labs/fetchx';

function Index() {
  const userStore = useUserStore();
  const usersRepository = useInjection<UsersRepository>(TYPES.UsersRepository);
  const usersList = useList(usersRepository, {
    limit: 10,
    limitField: 'limit',
    resultsField: 'data',
  });

  async function handleDelete(id: Identifier) {
    await usersRepository.delete(id);
    usersList.fetch();
  }

  useEffect(() => {
    userStore.isLogged && usersList.fetch();
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
              columns={usersColumns(handleDelete)}
              rows={usersList.list as Record<string, unknown>[]}
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
