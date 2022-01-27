import { Box, Button, Grid, Typography } from '@mui/material';

import TabPanel from '@components/TabPanel';

import NumericInput from '../forms/inputs/NumericInput';

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
  return (
    <TabPanel value={activeTab} index={index}>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Busque por um determinado número</Typography>
          </Grid>
          <Grid item xs={12}>
            <NumericInput
              name={name}
              label="Pesquisar"
              precision={precision}
              decimalChar={decimalChar}
              thousandChar={thousandChar}
            />
          </Grid>
          <Grid item xs={12} justifyContent="flex-end">
            <Button type="submit" variant="contained">
              Aplicar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </TabPanel>
  );
}
