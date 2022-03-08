import { Box, Button, Grid } from '@mui/material';
import { useMemo } from 'react';

import TabPanel from '@core/components/TabPanel';
import Trans from '@core/components/Trans';
import useTranslation from '@core/hooks/useTranslation';

import { FXCheckboxGroup } from '@euk-labs/formix-mui';

import { FilterEnum } from '../types';

interface EnumFilterProps {
  name: string;
  activeTab: number;
  index: number;
  options: FilterEnum[];
}

export default function EnumFilter({
  name,
  activeTab,
  index,
  options,
}: EnumFilterProps) {
  const { translate } = useTranslation();
  const checkboxOptions = useMemo(
    () =>
      options.map((option) => ({
        name: `${name}.${option.value}`,
        label: option.title,
      })),
    [options, name]
  );

  return (
    <TabPanel value={activeTab} index={index}>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FXCheckboxGroup
              label={translate('filters.enum.label')}
              options={checkboxOptions}
            />
          </Grid>
          <Grid item xs={12} justifyContent="flex-end">
            <Button type="submit" variant="contained">
              <Trans id="actions.filters.submit" />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </TabPanel>
  );
}
