import { FXTextField } from '@euk-labs/formix-mui';
import { Box, Button, Grid, Typography } from '@mui/material';

import TabPanel from '@core/components/TabPanel';
import Trans from '@core/components/Trans';

import { useTranslation } from '@hooks/services';

interface TextFilterProps {
  name: string;
  activeTab: number;
  index: number;
}

export default function TextFilter({ name, activeTab, index }: TextFilterProps) {
  const { translate } = useTranslation();

  return (
    <TabPanel value={activeTab} index={index}>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>
              <Trans id="filters.text.title" />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FXTextField name={name} label={translate('filters.text.label')} fullWidth />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained">
              <Trans id="actions.filters.submit" />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </TabPanel>
  );
}
