import { FXNumericField } from '@euk-labs/formix-mui';
import { Box, Button, Grid, Typography } from '@mui/material';

import TabPanel from '@components/utility/TabPanel';
import Trans from '@components/utility/Trans';

import { useTranslation } from '@hooks/services';

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
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item xs={12}>
            <Typography>
              <Trans id="filters.numeric.title" />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FXNumericField
              fullWidth
              name={name}
              label={translate('filters.numeric.label')}
              precision={precision}
              decimalChar={decimalChar}
              thousandChar={thousandChar}
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
