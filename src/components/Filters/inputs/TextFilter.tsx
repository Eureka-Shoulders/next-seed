import { Box, Button, Grid, Typography } from '@mui/material';

import TabPanel from '@components/TabPanel';

import { FXTextField } from '@euk-labs/formix-mui';

interface TextFilterProps {
  name: string;
  activeTab: number;
  index: number;
}

export default function TextFilter({
  name,
  activeTab,
  index,
}: TextFilterProps) {
  return (
    <TabPanel value={activeTab} index={index}>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Busque por um determinado texto</Typography>
          </Grid>
          <Grid item xs={12}>
            <FXTextField name={name} label="Pesquisar" fullWidth />
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
