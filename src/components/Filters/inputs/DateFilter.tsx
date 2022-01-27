import { Box, Button, Grid, Typography } from '@mui/material';

import TabPanel from '@components/TabPanel';

import DateInput from '../forms/inputs/DateInput';

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
  return (
    <TabPanel value={activeTab} index={index}>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Busque por uma determinada data</Typography>
          </Grid>
          <Grid item xs={12}>
            <DateInput name={name} label="Pesquisar" />
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
