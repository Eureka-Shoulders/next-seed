import { Box, Button, Grid, Typography } from '@mui/material';
import getLocaleString from 'locales/getLocaleString';
import { useRouter } from 'next/router';

import TabPanel from '@components/TabPanel';
import Trans from '@components/Trans';

import { FXCurrencyField } from '@euk-labs/formix-mui';

interface NumericFilterProps {
  name: string;
  precision: number;
  decimalChar?: string;
  thousandChar?: string;
  activeTab: number;
  index: number;
}

export default function NumericFilter({
  name,
  precision,
  decimalChar,
  thousandChar,
  activeTab,
  index,
}: NumericFilterProps) {
  const router = useRouter();

  return (
    <TabPanel value={activeTab} index={index}>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>
              <Trans id="filters.numeric.title" />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FXCurrencyField
              name={name}
              label={getLocaleString('filters.numeric.label', router)}
              // precision={precision}
              // decimalChar={decimalChar}
              // thousandChar={thousandChar}
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
