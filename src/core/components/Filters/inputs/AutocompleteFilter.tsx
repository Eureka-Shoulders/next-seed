import { FXAutocomplete } from '@euk-labs/formix-mui';
import { Box, Button, Grid, Typography } from '@mui/material';
import { AutocompleteOption } from '@types';

import TabPanel from '@core/components/TabPanel';

import FXAsyncAutocomplete from '@components/Inputs/FXAsyncAutocomplete';
import Trans from '@components/utility/Trans';

import { useTranslation } from '@hooks/services';
import { AutocompleteRepositoryType } from '@hooks/useAutocomplete';

interface AutocompleteFilterProps {
  name: string;
  activeTab: number;
  index: number;
  repository?: AutocompleteRepositoryType;
  options?: AutocompleteOption[];
  multiple?: boolean;
}

export default function AutocompleteFilter({
  name,
  activeTab,
  repository,
  options,
  index,
  multiple,
}: AutocompleteFilterProps) {
  const { translate } = useTranslation();

  return (
    <TabPanel value={activeTab} index={index}>
      <Box p={2}>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item xs={12}>
            <Typography>
              <Trans id="filters.text.title" />
            </Typography>
          </Grid>
          {options && (
            <Grid item xs={12}>
              <FXAutocomplete
                multiple={multiple}
                name={name}
                disableCloseOnSelect={multiple}
                label={translate('filters.autocomplete.label')}
                options={options}
                fullWidth
              />
            </Grid>
          )}
          {repository && (
            <Grid item xs={12}>
              <FXAsyncAutocomplete
                multiple={multiple}
                disableCloseOnSelect={multiple}
                name={name}
                label={translate('filters.autocomplete.label')}
                repository={repository}
                debounce={500}
                fullWidth
              />
            </Grid>
          )}
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
