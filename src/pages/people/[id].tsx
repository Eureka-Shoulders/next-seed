import { Box, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { usePeopleRepository } from 'hooks/repositories';
import { observer } from 'mobx-react-lite';
import AddressesField from 'modules/people/AddressesField';
import ContactsField from 'modules/people/ContactsField';
import { UpdatePersonSchema } from 'modules/people/people.schema';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Address, Contact, ContactTypeEnum, Person } from 'types';

import FXSubmitButton from '@components/FXSubmitButton';
import FXTextField from '@components/Inputs/FXTextField';

import { Breadcrumb, useUIStore } from '@euk-labs/componentz';
import { useEntity } from '@euk-labs/fetchx';
import { Formix } from '@euk-labs/formix/components';

function getInitialValues(
  person: Person,
  contacts: Contact[],
  addresses: Address[]
): UpdatePersonSchema {
  return {
    ...person,
    addresses,
    contacts: contacts.map((contact) => ({
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
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const { id } = router.query;

  if (Array.isArray(id)) {
    router.replace('/people');
  }

  const peopleRepository = usePeopleRepository();
  const personEntity = useEntity(peopleRepository, id as string);

  async function handleSubmit(values: UpdatePersonSchema) {
    try {
      await personEntity.update({
        identifier: values.identifier,
        name: values.name,
        contacts: values.contacts.map((contact) => ({
          ...contact,
          type: contact.type.value,
        })),
        addresses: values.addresses,
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

  async function getPersonData() {
    await personEntity.fetch();
    const contactsResponse = await peopleRepository.getContacts(id as string);
    const addressesResponse = await peopleRepository.getAddresses(id as string);

    setContacts(contactsResponse.data.data);
    setAddresses(addressesResponse.data.data);
  }

  useEffect(() => {
    if (personEntity.identifier) {
      getPersonData();
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
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Formix
                initialValues={getInitialValues(
                  personEntity.data as Person,
                  contacts,
                  addresses
                )}
                zodSchema={UpdatePersonSchema}
                onSubmit={handleSubmit}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6">Informações</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <FXTextField name="name" label="Nome" />
                  </Grid>
                  <Grid item xs={6}>
                    <FXTextField name="identifier" label="Identificador" />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h6">Contatos</Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <ContactsField />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h6">Endereços</Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <AddressesField />
                  </Grid>

                  <Grid item xs={12} display="flex" justifyContent="flex-end">
                    <FXSubmitButton label="Salvar" />
                  </Grid>
                </Grid>
              </Formix>
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
