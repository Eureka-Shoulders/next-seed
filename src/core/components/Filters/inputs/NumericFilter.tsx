import { Box, Button, Grid, Typography } from '@mui/material';

import TabPanel from '@core/components/TabPanel';
import Trans from '@core/components/Trans';
import useTranslation from '@core/hooks/useTranslation';

import { FXNumericField } from '@euk-labs/formix-mui';

interface NumericFilterProps {
  name: string;
  precision: number;
  decimalChar: string;
  thousandChar: string;
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
  const { translate } = useTranslation();

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
            <FXNumericField
              name={name}
              label={translate('filters.numeric.label')}
              precision={precision}
              decimalChar={decimalChar}
              thousandChar={thousandChar}
            />
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
