import { Breadcrumb, useUIStore } from '@euk-labs/componentz';
import { Identifier, useList } from '@euk-labs/fetchx';
import { Box, Grid } from '@mui/material';
import { Actions, Subjects, User } from '@types';
import { useEffect } from 'react';

import FetchxList from '@core/components/FetchxList';
import { Filters } from '@core/components/Filters';

import { defaultListParams } from '@config/defaultListParams';

import DeleteContent from '@components/dialog/DeleteContent';
import NewEntityFab from '@components/form/fab/NewEntityFab';
import Can from '@components/utility/Can';

import { useUsersRepository } from '@hooks/repositories';
import { useTranslation } from '@hooks/services';

import usersColumns from '@modules/users/columns';
import { buildFilters, getFilters } from '@modules/users/filters';

import clearFilters from '@utils/table/clearFilters';
import setFilter from '@utils/table/setFilter';

function Index() {
  const { translate } = useTranslation();
  const uiStore = useUIStore();
  const usersRepository = useUsersRepository();
  const usersList = useList<User>(usersRepository, defaultListParams);

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
      onAccept: () => {
        deleteUser(id);
        uiStore.dialog.close();
      },
    });
    uiStore.dialog.open();
  };

  useEffect(() => {
    setFilter(
      'include',
      {
        person: true,
      },
      usersList.filters
    );
  }, []);

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
          <FetchxList
            listStore={usersList}
            pageSize={10}
            columns={usersColumns(handleDelete, translate)}
          />
        </Grid>
      </Grid>

      <Can action={Actions.Create} subject={Subjects.User}>
        <NewEntityFab />
      </Can>
    </Box>
  );
}

export default Index;
