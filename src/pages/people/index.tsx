import { Box, Grid, Skeleton } from '@mui/material';
import { usePeopleRepository } from 'hooks/repositories';
import { useUserStore } from 'hooks/stores';
import { observer } from 'mobx-react-lite';
import getPeopleColumns from 'modules/people/columns';
import { useEffect } from 'react';

import MuiTable from '@components/MuiTable';
import NewEntityButton from '@components/NewEntityButton';

import { Breadcrumb } from '@euk-labs/componentz';
import { Identifier, useList } from '@euk-labs/fetchx';

function Index() {
  const userStore = useUserStore();
  const peopleRepository = usePeopleRepository();
  const peopleList = useList(peopleRepository, {
    limit: 10,
    limitField: 'limit',
    resultsField: 'data',
  });

  async function handleDelete(id: Identifier) {
    await peopleRepository.delete(id);
    peopleList.fetch();
  }

  useEffect(() => {
    userStore.isLogged && peopleList.fetch();
  }, [peopleList.page, userStore.isLogged]); // eslint-disable-line

  return (
    <Box p={3} mb={10}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Breadcrumb />
        </Grid>

        <Grid item xs={12}>
          {userStore.isLogged ? (
            <MuiTable
              page={peopleList.page - 1}
              pageSize={10}
              columns={getPeopleColumns(handleDelete)}
              rows={peopleList.list as Record<string, unknown>[]}
              isLoading={peopleList.loading}
              totalCount={peopleList.totalCount}
              onPageChange={(page) => peopleList.setPage(page + 1)}
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
