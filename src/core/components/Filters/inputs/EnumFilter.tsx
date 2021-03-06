import { FXCheckboxGroup } from '@euk-labs/formix-mui';
import { Box, Button, Grid } from '@mui/material';
import { useMemo } from 'react';

import TabPanel from '@components/utility/TabPanel';
import Trans from '@components/utility/Trans';

import { useTranslation } from '@hooks/services';

import { FilterEnum } from '../types';

interface EnumFilterProps {
  name: string;
  activeTab: number;
  index: number;
  options: FilterEnum[];
}

export default function EnumFilter({ name, activeTab, index, options }: EnumFilterProps) {
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
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item xs={12}>
            <FXCheckboxGroup label={translate('filters.enum.label')} options={checkboxOptions} />
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
