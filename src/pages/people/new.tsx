import { Box, Grid, Paper, Tab, Tabs } from '@mui/material';
import axios from 'axios';
import { usePeopleRepository } from 'hooks/repositories';
import { observer } from 'mobx-react-lite';
import AddressesForm from 'modules/people/AddressesForm';
import ContactsForm from 'modules/people/ContactsForm';
import PersonForm from 'modules/people/PersonForm';
import { NewPersonSchema } from 'modules/people/people.schema';
import { ICreatePerson } from 'modules/people/repository';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ContactType } from 'types';

import TabPanel from '@components/TabPanel';

import useTranslation from '@hooks/useTranslation';

import { Breadcrumb, useUIStore } from '@euk-labs/componentz';
import { Formix } from '@euk-labs/formix';
import { FXSubmitButton } from '@euk-labs/formix-mui';

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
  const uiStore = useUIStore();
  const peopleRepository = usePeopleRepository();

  function handleChange(event: React.SyntheticEvent, newValue: number) {
    setActiveTab(newValue);
  }

  async function handleSubmit(values: NewPersonSchema) {
    try {
      await peopleRepository.create<ICreatePerson, ICreatePerson>({
        ...values,
        contacts: values.contacts.map((contact) => ({
          ...contact,
          type: contact.type.value as ContactType,
        })),
      });

      uiStore.snackbar.show({
        message: translate('feedbacks.person.created'),
        severity: 'success',
      });

      router.push('/people');
    } catch (error) {
      if (axios.isAxiosError(error))
        uiStore.snackbar.show({
          message:
            error.response?.data.message || translate('errors.person.creation'),
          severity: 'error',
        });
    }
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
                zodSchema={NewPersonSchema}
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
