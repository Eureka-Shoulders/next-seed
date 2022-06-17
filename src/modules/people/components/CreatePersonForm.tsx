import { Formix } from '@euk-labs/formix';
import { FXSubmitButton } from '@euk-labs/formix-mui';
import { Grid, Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ContactType } from 'types';

import TabPanel from '@components/utility/TabPanel';

import { usePeopleRepository } from '@hooks/repositories';
import { useTranslation } from '@hooks/services';
import { useNotificationService } from '@hooks/services';

import { zodValidator } from '@utils/zodValidator';

import { initialValuesForCreate } from '../initialValues';
import { NewPersonSchema } from '../people.schema';
import { ICreatePerson } from '../repository';
import AddressesForm from './AddressesForm';
import ContactsForm from './ContactsForm';
import PersonForm from './PersonForm';

function CreatePersonForm() {
  const { translate } = useTranslation();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const notificationService = useNotificationService();
  const peopleRepository = usePeopleRepository();

  function handleChange(_event: React.SyntheticEvent, newValue: number) {
    setActiveTab(newValue);
  }

  async function handleSubmit(values: NewPersonSchema) {
    const newData = {
      ...values,
      type: undefined,
      contacts: values.contacts?.map((contact) => ({
        ...contact,
        type: contact?.type?.value as unknown as ContactType,
      })),
    };
    const onSuccess = () => {
      router.push('/app/people');
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
          initialValues={initialValuesForCreate}
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
    </>
  );
}

export default CreatePersonForm;
