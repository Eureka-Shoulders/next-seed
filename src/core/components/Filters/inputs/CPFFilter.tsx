import { FXMaskedField } from '@euk-labs/formix-mui';
import { Box, Button, Grid, Typography } from '@mui/material';

import TabPanel from '@components/utility/TabPanel';
import Trans from '@components/utility/Trans';

import { useTranslation } from '@hooks/services';

interface CPFFilterProps {
  name: string;
  activeTab: number;
  index: number;
}

export default function CPFFilter({ name, activeTab, index }: CPFFilterProps) {
  const { translate } = useTranslation();

  return (
    <TabPanel value={activeTab} index={index}>
      <Box p={2}>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item xs={12}>
            <Typography>
              <Trans id="filters.cpf.title" />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FXMaskedField
              mask="999.999.999-99"
              label={translate('filters.cpf.label')}
              name={name}
            />
          </Grid>

          <Grid item xs="auto">
            <Button type="submit" variant="contained">
              <Trans id="actions.filters.submit" />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </TabPanel>
  );
}
