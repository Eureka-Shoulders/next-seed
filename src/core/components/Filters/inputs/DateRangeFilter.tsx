import { FXDateRangerPicker } from '@euk-labs/formix-mui';
import { Box, Button, Grid, Typography } from '@mui/material';

import TabPanel from '@core/components/TabPanel';

import Trans from '@components/utility/Trans';

import { useTranslation } from '@hooks/services';

interface DateRangeFilterProps {
  name: string;
  activeTab: number;
  index: number;
}

export default function DateRangeFilter({ name, activeTab, index }: DateRangeFilterProps) {
  const { translate } = useTranslation();

  return (
    <TabPanel value={activeTab} index={index}>
      <Box p={2}>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item xs={12}>
            <Typography>
              <Trans id="filters.date.title" />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FXDateRangerPicker
              name={name}
              label={translate('placeholders.search')}
              inputFormat="dd/MM/yyyy"
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
