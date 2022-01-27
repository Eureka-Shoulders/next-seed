import { Can } from '@casl/react';
import { Box, Grid, Skeleton } from '@mui/material';
import sortList from '@utils/sortList';
import { usePeopleRepository } from 'hooks/repositories';
import { useUserStore } from 'hooks/stores';
import { observer } from 'mobx-react-lite';
import getPeopleColumns from 'modules/people/columns';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { useEffect } from 'react';
import { Actions, Subjects } from 'types';

import MuiTable from '@components/MuiTable';
import NewEntityButton from '@components/NewEntityButton';

import { Breadcrumb } from '@euk-labs/componentz';
import { Identifier, useList } from '@euk-labs/fetchx';

function Index() {
  const userStore = useUserStore();
  const peopleRepository = usePeopleRepository();
  const peopleList = useList(peopleRepository, {
    limit: 10,
    limitField: 'take',
    resultsField: 'data',
  });

  async function handleDelete(id: Identifier) {
    await peopleRepository.delete(id);
    peopleList.fetch();
  }

  useEffect(() => {
    if (userStore.isLogged) {
      peopleList.fetch();
    }
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
              onSortModelChange={sortList(peopleList)}
            />
          ) : (
            <Skeleton variant="rectangular" width="100%" height={400} />
          )}
        </Grid>
      </Grid>

      {userStore.abilities && (
        <Can
          I={Actions.Create}
          a={Subjects.People}
          ability={userStore.abilities}
        >
          <NewEntityButton />
        </Can>
      )}
    </Box>
  );
}

export default observer(Index);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  return {
    props: {
      hydrationData: {
        theme: cookies.theme,
      },
    },
  };
};
