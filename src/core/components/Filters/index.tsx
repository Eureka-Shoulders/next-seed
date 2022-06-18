import { Formix } from '@euk-labs/formix';
import {
  Add as AddIcon,
  FilterList as FiltersIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { Button, Grid, Tooltip, Typography } from '@mui/material';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';

import Trans from '@components/utility/Trans';
import When from '@components/utility/When';

import { useTranslation } from '@hooks/services';

import AllFiltersModal from './AllFiltersModal';
import ClearFiltersButton from './ClearFiltersButton';
import { FiltersModal } from './FiltersModal';
import FiltersValuesList from './FiltersValuesList';
import SmallButton from './SmallButton';
import FiltersStore from './filters.store';
import { Filter } from './types';
import { getFilterValue } from './utils';

interface FiltersProps {
  title?: string;
  filters: Filter[];
  useAutocompleteValue?: string[];
  onFilter: (filters: Record<string, unknown>) => void;
  onClear: () => void;
  onRefresh: () => void;
}

function FiltersComponent({
  title,
  filters,
  useAutocompleteValue,
  onFilter,
  onClear,
  onRefresh,
}: FiltersProps) {
  const [filtersStore] = useState(() => new FiltersStore());
  const { translate } = useTranslation();
  const anchorRef = useRef<HTMLButtonElement>(null);

  function handleSubmit(values: Record<string, unknown>) {
    const newFilters: Record<string, unknown> = {};

    filters.forEach((filter) => {
      if (values[filter.field] !== '')
        newFilters[filter.field] = getFilterValue(filter, values, useAutocompleteValue);
    });

    filtersStore.setValues(newFilters);
    filtersStore.closeFilters();
    filtersStore.closeAllFilters();
  }

  useEffect(() => {
    filtersStore.setFilters(filters);
  }, [filters]);

  useEffect(() => {
    if (!!filtersStore.values) {
      onFilter(filtersStore.values);
    }
  }, [filtersStore.values]);

  return (
    <When is={!!filtersStore.initialValues}>
      <Formix initialValues={toJS(filtersStore.initialValues!)} onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          {title && (
            <Grid item xs={12}>
              <Typography variant="h5">{title}</Typography>
            </Grid>
          )}

          <Grid item xs>
            <Grid container spacing={2}>
              <FiltersValuesList filtersStore={filtersStore} />

              <Grid item>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={filtersStore.openFilters}
                  ref={anchorRef}
                >
                  <AddIcon />
                  <Trans id="actions.filters.add" />
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Tooltip title={translate('filters.all')}>
              <SmallButton variant="contained" onClick={filtersStore.openAllFilters}>
                <FiltersIcon fontSize="small" />
              </SmallButton>
            </Tooltip>
          </Grid>

          <Grid item>
            <Tooltip title={translate('actions.refresh')}>
              <SmallButton variant="contained" onClick={onRefresh}>
                <RefreshIcon fontSize="small" />
              </SmallButton>
            </Tooltip>
          </Grid>

          <Grid item>
            <ClearFiltersButton onClear={onClear} />
          </Grid>
        </Grid>

        <FiltersModal
          state={filtersStore.isFiltersModalOpen}
          handleClose={filtersStore.closeFilters}
          anchorEl={anchorRef.current}
          filters={filters}
        />
        <AllFiltersModal filtersStore={filtersStore} />
      </Formix>
    </When>
  );
}

export const Filters = observer(FiltersComponent);
