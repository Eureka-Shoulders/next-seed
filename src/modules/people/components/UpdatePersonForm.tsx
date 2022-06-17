import { EntityStore } from '@euk-labs/fetchx';
import { Formix } from '@euk-labs/formix';
import { FXSubmitButton } from '@euk-labs/formix-mui';
import { Grid, Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Person } from 'types';

import TabPanel from '@components/utility/TabPanel';

import { useTranslation } from '@hooks/services';
import { useNotificationService } from '@hooks/services';

import { zodValidator } from '@utils/zodValidator';

import { getInitialValuesForUpdate } from '../initialValues';
import { UpdatePersonSchema } from '../people.schema';
import AddressesForm from './AddressesForm';
import ContactsForm from './ContactsForm';
import PersonForm from './PersonForm';

interface Props {
  personEntity: EntityStore;
}

function EditPersonForm({ personEntity }: Props) {
  const { translate } = useTranslation();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const notificationService = useNotificationService();

  function handleChange(_event: React.SyntheticEvent, newValue: number) {
    setActiveTab(newValue);
  }

  async function handleSubmit(values: UpdatePersonSchema) {
    const newData = {
      identifier: values.identifier,
      name: values.name,
      contacts: values.contacts.map((contact) => ({
        ...contact,
        type: contact?.type?.value,
        personId: undefined,
      })),
      addresses: values.addresses.map((address) => ({
        ...address,
        personId: undefined,
      })),
    };
    const onSuccess = () => {
      router.push('/app/people');
    };

    await notificationService.handleHttpRequest(() => personEntity.update(newData), {
      feedbackSuccess: translate('feedbacks.person.updated'),
      feedbackError: translate('errors.person.update'),
      onSuccess,
    });
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={translate('common.information')} />
          <Tab label={translate('common.contacts')} />
          <Tab label={translate('common.addresses')} />
        </Tabs>
      </Box>

      <Box p={2}>
        <Formix
          initialValues={getInitialValuesForUpdate(personEntity.data as Person)}
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
    </>
  );
}

export default observer(EditPersonForm);
