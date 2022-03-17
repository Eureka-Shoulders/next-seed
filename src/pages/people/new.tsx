import { Box, Grid, Paper, Tab, Tabs } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useState } from 'react';

import TabPanel from '@core/components/TabPanel';
import useTranslation from '@core/hooks/useTranslation';
import { zodValidator } from '@core/utils/validators';

import { usePeopleRepository } from '@hooks/repositories';
import { useNotificationService } from '@hooks/services';

import AddressesForm from '@modules/people/components/AddressesForm';
import ContactsForm from '@modules/people/components/ContactsForm';
import PersonForm from '@modules/people/components/PersonForm';
import { NewPersonSchema } from '@modules/people/people.schema';
import { ICreatePerson } from '@modules/people/repository';

import { Breadcrumb } from '@euk-labs/componentz';
import { Formix } from '@euk-labs/formix';
import { FXSubmitButton } from '@euk-labs/formix-mui';

import { ContactType } from '../../types';

const initialValues = {
  name: '',
  type: null,
  identifier: '',
  birthDate: null,
  contacts: [],
  addresses: [],
};

function Index() {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();
  const { translate } = useTranslation();
  const notificationService = useNotificationService();
  const peopleRepository = usePeopleRepository();

  function handleChange(event: React.SyntheticEvent, newValue: number) {
    setActiveTab(newValue);
  }

  async function handleSubmit(values: NewPersonSchema) {
    const newData = {
      ...values,
      contacts: values.contacts.map((contact) => ({
        ...contact,
        type: contact.type.value as ContactType,
      })),
    };
    const onSuccess = () => {
      router.push('/people');
    };

    await notificationService.handleHttpRequest(
      () => peopleRepository.create<ICreatePerson, ICreatePerson>(newData),
      {
        feedbackSuccess: translate('feedbacks.person.created'),
        feedbackError: translate('errors.person.creation'),
        onSuccess,
      }
    );
  }

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
                initialValues={initialValues}
                validate={zodValidator(NewPersonSchema)}
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

export default observer(Index);
