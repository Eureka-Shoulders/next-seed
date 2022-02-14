import { Box, Button, Grid, Typography } from '@mui/material';

import TabPanel from '@components/TabPanel';
import Trans from '@components/Trans';

import useTranslation from '@hooks/useTranslation';

import { FXDatePicker } from '@euk-labs/formix-mui';

interface DateFilterProps {
  name: string;
  activeTab: number;
  index: number;
}

export default function DateFilter({
  name,
  activeTab,
  index,
}: DateFilterProps) {
  const { translate } = useTranslation();

  return (
    <TabPanel value={activeTab} index={index}>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>
              <Trans id="filters.date.title" />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FXDatePicker
              name={name}
              label={translate('placeholders.search')}
              inputFormat="dd/MM/yyyy"
            />
          </Grid>
          <Grid item xs={12} justifyContent="flex-end">
            <Button type="submit" variant="contained">
              <Trans id="actions.filters.submit" />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </TabPanel>
  );
}
