import { Breadcrumb, useUIStore } from '@euk-labs/componentz';
import { Identifier, useList } from '@euk-labs/fetchx';
import { Box, Grid } from '@mui/material';
import { Actions, Person, Subjects } from 'types';

import AuthLoader from '@core/components/AuthLoader';
import FetchxList from '@core/components/FetchxList';
import { Filters } from '@core/components/Filters';

import { defaultListParams } from '@config/defaultListParams';

import DeleteContent from '@components/DialogContents/DeleteContent';
import NewEntityButton from '@components/NewEntityButton';
import Can from '@components/utility/Can';

import { usePeopleRepository } from '@hooks/repositories';
import { useTranslation } from '@hooks/services';

import getPeopleColumns from '@modules/people/columns';
import { buildFilters, getFilters } from '@modules/people/filters';

function Index() {
  const { translate } = useTranslation();
  const uiStore = useUIStore();
  const peopleRepository = usePeopleRepository();
  const peopleList = useList<Person>(peopleRepository, defaultListParams);

  const deletePeople = async (id: Identifier) => {
    await peopleRepository.delete(id);
    peopleList.fetch();
  };

  const handleDelete = (id: Identifier) => {
    uiStore.dialog.set({
      content: <DeleteContent />,
      rejectLabel: translate('dialogs.delete.rejectLabel'),
      acceptLabel: translate('dialogs.delete.acceptLabel'),
      onReject: () => uiStore.dialog.close(),
      onAccept: () => {
        deletePeople(id);
        uiStore.dialog.close();
      },
    });
    uiStore.dialog.open();
  };

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
                buildFilters(filters, peopleList.filters);
                peopleList.fetch();
              }}
              onRefresh={peopleList.fetch}
            />
          </Grid>

          <Grid item xs={12}>
            <FetchxList
              listStore={peopleList}
              pageSize={10}
              columns={getPeopleColumns(handleDelete, translate)}
            />
          </Grid>
        </Grid>

        <Can action={Actions.Create} subject={Subjects.Person}>
          <NewEntityButton />
        </Can>
      </Box>
    </AuthLoader>
  );
}

export default Index;
