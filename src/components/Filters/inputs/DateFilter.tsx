import { Box, Button, Grid, Typography } from '@mui/material';
import getLocaleString from 'locales/getLocaleString';
import { useRouter } from 'next/router';

import TabPanel from '@components/TabPanel';
import Trans from '@components/Trans';

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
  const router = useRouter();

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
              label={getLocaleString('search', router)}
            />
          </Grid>
          <Grid item xs={12} justifyContent="flex-end">
            <Button type="submit" variant="contained">
              <Trans id="filters.submit" />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </TabPanel>
  );
}
