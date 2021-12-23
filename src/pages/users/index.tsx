import { Box, Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import usersColumns from 'modules/users/columns';
import usersRepository from 'modules/users/repository';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import MuiTable from '@components/MuiTable';
import NewEntityButton from '@components/NewEntityButton';

import { Breadcrumb } from '@euk-labs/componentz';
import { useList } from '@euk-labs/fetchx';

function Index() {
  const router = useRouter();
  const usersList = useList(usersRepository, {
    limit: 10,
    limitField: 'limit',
    totalCountField: 'totalCount',
    resultsField: 'data',
  });

  useEffect(() => {
    usersList.fetch();
  }, [usersList.page]); // eslint-disable-line

  return (
    <Box p={3} mb={10}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Breadcrumb />
        </Grid>

        <Grid item xs={12}>
          <MuiTable
            page={usersList.page - 1}
            pageSize={10}
            columns={usersColumns}
            rows={usersList.list as Record<string, unknown>[]}
            isLoading={usersList.loading}
            totalCount={usersList.totalCount}
            onPageChange={(page) => usersList.setPage(page + 1)}
          />
        </Grid>
      </Grid>

      <NewEntityButton pathname={router.pathname} />
    </Box>
  );
}

export default observer(Index);
