import { Box, Button, Grid, Typography } from '@mui/material';
import getLocaleString from 'locales/getLocaleString';
import { useRouter } from 'next/router';

import TabPanel from '@components/TabPanel';
import Trans from '@components/Trans';

import { FXMaskedField } from '@euk-labs/formix-mui';

interface CPFFilterProps {
  name: string;
  activeTab: number;
  index: number;
}

export default function CPFFilter({ name, activeTab, index }: CPFFilterProps) {
  const router = useRouter();

  return (
    <TabPanel value={activeTab} index={index}>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>
              <Trans id="filters.cpf.title" />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FXMaskedField
              mask="999.999.999-99"
              label={getLocaleString('filters.cpf.label', router)}
              name={name}
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
