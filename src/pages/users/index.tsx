import { defaultListParams } from '@config/defaultListParams';
import { Box, Grid } from '@mui/material';
import { useEffect } from 'react';

import AuthLoader from '@core/components/AuthLoader';
import Can from '@core/components/Can';
import FetchxList from '@core/components/FetchxList';
import { Filters } from '@core/components/Filters';
import useTranslation from '@core/hooks/useTranslation';
import setFilter from '@core/utils/setFilter';

import DeleteContent from '@components/DialogContents/DeleteContent';
import NewEntityButton from '@components/NewEntityButton';

import { useUsersRepository } from '@hooks/repositories';

import usersColumns from '@modules/users/columns';
import { buildFilters, getFilters } from '@modules/users/filters';

import { Breadcrumb, useUIStore } from '@euk-labs/componentz';
import { Identifier, useList } from '@euk-labs/fetchx';

import { Actions, Subjects, User } from '../../types';

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
      onAccept: () => deleteUser(id),
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
    <AuthLoader>
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
          <NewEntityButton />
        </Can>
      </Box>
    </AuthLoader>
  );
}

export default Index;
