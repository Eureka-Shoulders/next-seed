import { Can } from '@casl/react';
import { Box, Grid, Skeleton } from '@mui/material';
import clearFilters from '@utils/clearFilters';
import setFilter from '@utils/setFilter';
import { useUsersRepository } from 'hooks/repositories';
import { useUserStore } from 'hooks/stores';
import { observer } from 'mobx-react-lite';
import usersColumns from 'modules/users/columns';
import { useEffect } from 'react';
import { Actions, Subjects, User } from 'types';

import DeleteContent from '@components/DialogContents/DeleteContent';
import { Filters } from '@components/Filters';
import MuiTable from '@components/MuiTable';
import NewEntityButton from '@components/NewEntityButton';

import useTranslation from '@hooks/useTranslation';

import { buildFilters, getFilters } from '@modules/users/filters';

import { Breadcrumb, useUIStore } from '@euk-labs/componentz';
import { Identifier, useList } from '@euk-labs/fetchx';

function Index() {
  const { translate } = useTranslation();
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
      rejectLabel: translate('dialogs.delete.rejectLabel'),
      acceptLabel: translate('dialogs.delete.acceptLabel'),
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

  if (!userStore.abilities || !userStore.isLogged) {
    return <Skeleton variant="rectangular" width="100%" height={500} />;
  }

  return (
    <Box p={3} mb={10}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Breadcrumb />
        </Grid>

        <Grid item xs={12}>
          <Filters
            filters={getFilters(translate)}
            onFilter={(filters) => {
              buildFilters(filters, usersList.filters);
              usersList.fetch();
            }}
            onClear={() => clearFilters(usersList.filters)}
            onRefresh={usersList.fetch}
          />
        </Grid>

        <Grid item xs={12}>
          <MuiTable
            page={usersList.page - 1}
            pageSize={10}
            columns={usersColumns(userStore.abilities, handleDelete, translate)}
            rows={usersList.list}
            isLoading={usersList.loading}
            totalCount={usersList.totalCount}
            onPageChange={(page) => usersList.setPage(page + 1)}
          />
        </Grid>
      </Grid>

      <Can I={Actions.Create} a={Subjects.Users} ability={userStore.abilities}>
        <NewEntityButton />
      </Can>
    </Box>
  );
}

export default observer(Index);
