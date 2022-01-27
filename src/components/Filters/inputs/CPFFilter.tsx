import { Box, Button, Grid, Typography } from '@mui/material';

import TabPanel from '@components/TabPanel';

import MaskInput from '../forms/inputs/MaskInput';

interface CPFFilterProps {
  name: string;
  activeTab: number;
  index: number;
}

export default function CPFFilter({ name, activeTab, index }: CPFFilterProps) {
  return (
    <TabPanel value={activeTab} index={index}>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Busque por um determinado CPF</Typography>
          </Grid>
          <Grid item xs={12}>
            <MaskInput
              mask="999.999.999-99"
              label="Pesquisar CPF"
              name={name}
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
