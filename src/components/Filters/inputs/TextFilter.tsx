import { Box, Button, Grid, Typography } from '@mui/material';
import getLocaleString from 'locales/getLocaleString';
import { useRouter } from 'next/router';

import TabPanel from '@components/TabPanel';
import Trans from '@components/Trans';

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
  const router = useRouter();

  return (
    <TabPanel value={activeTab} index={index}>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>
              <Trans id="filters.text.title" />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FXTextField
              name={name}
              label={getLocaleString('filters.text.label', router)}
              fullWidth
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
