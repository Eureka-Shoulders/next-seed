import { Box, Grid, Paper, Tab, Tabs } from '@mui/material';
import axios from 'axios';
import { usePeopleRepository } from 'hooks/repositories';
import { observer } from 'mobx-react-lite';
import AddressesForm from 'modules/people/AddressesForm';
import ContactsForm from 'modules/people/ContactsForm';
import PersonForm from 'modules/people/PersonForm';
import { UpdatePersonSchema } from 'modules/people/people.schema';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ContactTypeEnum, Person } from 'types';

import TabPanel from '@components/TabPanel';

import { Breadcrumb, useUIStore } from '@euk-labs/componentz';
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
  const uiStore = useUIStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const { id } = router.query;
  const peopleRepository = usePeopleRepository();
  const personEntity = useEntity(peopleRepository, id as string);

  function handleChange(event: React.SyntheticEvent, newValue: number) {
    setActiveTab(newValue);
  }

  async function handleSubmit(values: UpdatePersonSchema) {
    try {
      await personEntity.update({
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
      });

      uiStore.snackbar.show({
        message: 'Pessoa atualizada com sucesso!',
        severity: 'success',
      });
      router.push('/people');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        uiStore.snackbar.show({
          message:
            error.response?.data.message ||
            'Ocorreu um erro ao atualizar a pessoa!',
          severity: 'error',
        });
      }
    }
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
                  <Tab label="Informações" />
                  <Tab label="Contatos" />
                  <Tab label="Endereços" />
                </Tabs>
              </Box>

              <Box p={2}>
                <Formix
                  initialValues={getInitialValues(personEntity.data as Person)}
                  zodSchema={UpdatePersonSchema}
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
                      <FXSubmitButton label="Salvar" />
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
    return <h1>Loading...</h1>;
  }

  if (personEntity.data === null) {
    return <h1>Person not found</h1>;
  }

  return null;
}

export default observer(Index);
