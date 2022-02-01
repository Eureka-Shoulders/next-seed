import { Box, Button, Grid } from '@mui/material';
import getLocaleString from 'locales/getLocaleString';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import TabPanel from '@components/TabPanel';
import Trans from '@components/Trans';

import { FXCheckboxGroup } from '@euk-labs/formix-mui';

import { FilterEnum } from '../types';

interface EnumFilterProps {
  name: string;
  activeTab: number;
  index: number;
  options: FilterEnum[];
}

// TODO: test this
export default function EnumFilter({
  name,
  activeTab,
  index,
  options,
}: EnumFilterProps) {
  const router = useRouter();
  const checkboxOptions = useMemo(
    () =>
      options.map((option) => ({
        name: option.value,
        label: option.value,
      })),
    [options]
  );

  return (
    <TabPanel value={activeTab} index={index}>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FXCheckboxGroup
              label={getLocaleString('filters.enum.label', router)}
              options={checkboxOptions}
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
