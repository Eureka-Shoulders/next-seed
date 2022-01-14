import { Box, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { usePeopleRepository } from 'hooks/repositories';
import { observer } from 'mobx-react-lite';
import AddressesField from 'modules/people/AddressesField';
import ContactsField from 'modules/people/ContactsField';
import { NewPersonSchema } from 'modules/people/people.schema';
import { useRouter } from 'next/router';

import FXSubmitButton from '@components/FXSubmitButton';
import FXTextField from '@components/Inputs/FXTextField';

import { Breadcrumb, useUIStore } from '@euk-labs/componentz';
import { Formix } from '@euk-labs/formix/components';

const initialValues = {
  name: '',
  identifier: '',
  contacts: [],
  addresses: [],
};

function Index() {
  const router = useRouter();
  const uiStore = useUIStore();
  const peopleRepository = usePeopleRepository();

  async function handleSubmit(values: NewPersonSchema) {
    try {
      await peopleRepository.create<
        NewPersonSchema,
        NewPersonSchema & { id: string }
      >({ ...values });

      uiStore.snackbar.show({
        message: 'Pessoa criada com sucesso',
        severity: 'success',
      });

      router.push('/people');
    } catch (error) {
      if (axios.isAxiosError(error))
        uiStore.snackbar.show({
          message:
            error.response?.data.message ||
            'Ocorreu um erro ao criar a pessoa!',
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
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Formix
              initialValues={initialValues}
              zodSchema={NewPersonSchema}
              onSubmit={handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FXTextField name="name" label="Nome" />
                </Grid>
                <Grid item xs={6}>
                  <FXTextField
                    name="identifier"
                    label="Identificador (CPF, CNPJ...)"
                  />
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

export default observer(Index);
