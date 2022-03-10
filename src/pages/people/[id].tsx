import { Box, Grid, Paper, Tab, Tabs } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ContactTypeEnum, Person } from 'types';

import TabPanel from '@core/components/TabPanel';
import useTranslation from '@core/hooks/useTranslation';
import { zodValidator } from '@core/utils/validators';

import { usePeopleRepository } from '@hooks/repositories';
import { useNotificationService } from '@hooks/services';

import AddressesForm from '@modules/people/components/AddressesForm';
import ContactsForm from '@modules/people/components/ContactsForm';
import PersonForm from '@modules/people/components/PersonForm';
import { UpdatePersonSchema } from '@modules/people/people.schema';

import { Breadcrumb } from '@euk-labs/componentz';
import { useEntity } from '@euk-labs/fetchx';
import { Formix } from '@euk-labs/formix';
import { FXSubmitButton } from '@euk-labs/formix-mui';

function getInitialValues(person: Person): UpdatePersonSchema {
  return {
    ...person,
    birthDate: new Date(person.birthDate),
    contacts: person.contacts.map((contact) => ({
      ...contact,
      type: {
        label: ContactTypeEnum.getKey(contact.type),
        value: contact.type,
      },
    })),
  };
}

function Index() {
  const { translate } = useTranslation();
  const notificationService = useNotificationService();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const { id } = router.query;
  const peopleRepository = usePeopleRepository();
  const personEntity = useEntity(peopleRepository, id as string);

  function handleChange(event: React.SyntheticEvent, newValue: number) {
    setActiveTab(newValue);
  }

  async function handleSubmit(values: UpdatePersonSchema) {
    const newData = {
      identifier: values.identifier,
      name: values.name,
      contacts: values.contacts.map((contact) => ({
        ...contact,
        type: contact.type.value,
        personId: undefined,
      })),
      addresses: values.addresses.map((address) => ({
        ...address,
        personId: undefined,
      })),
    };
    const onSuccess = () => {
      router.push('/people');
    };

    await notificationService.handleHttpRequest(
      () => personEntity.update(newData),
      {
        feedbackSuccess: translate('feedbacks.person.updated'),
        feedbackError: translate('errors.people.update'),
        onSuccess,
      }
    );
  }

  useEffect(() => {
    if (personEntity.identifier) {
      personEntity.fetch();
    }
  }, [personEntity.identifier]); // eslint-disable-line

  if (personEntity.data && personEntity.identifier) {
    return (
      <Box p={3} mb={10}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Breadcrumb />
          </Grid>

          <Grid item xs={12}>
            <Paper variant="outlined">
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={activeTab}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label={translate('common.informations')} />
                  <Tab label={translate('common.contacts')} />
                  <Tab label={translate('common.addresses')} />
                </Tabs>
              </Box>

              <Box p={2}>
                <Formix
                  initialValues={getInitialValues(personEntity.data as Person)}
                  validate={zodValidator(UpdatePersonSchema)}
                  onSubmit={handleSubmit}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TabPanel value={activeTab} index={0}>
                        <PersonForm />
                      </TabPanel>
                      <TabPanel value={activeTab} index={1}>
                        <ContactsForm />
                      </TabPanel>
                      <TabPanel value={activeTab} index={2}>
                        <AddressesForm />
                      </TabPanel>
                    </Grid>

                    <Grid item xs={12} display="flex" justifyContent="flex-end">
                      <FXSubmitButton label={translate('actions.save')} />
                    </Grid>
                  </Grid>
                </Formix>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (personEntity.identifier === null || personEntity.loading) {
    return <h1>{translate('common.loading')}...</h1>;
  }

  if (personEntity.data === null) {
    return <h1>{translate('errors.people.notFound')}</h1>;
  }

  return null;
}

export default observer(Index);
