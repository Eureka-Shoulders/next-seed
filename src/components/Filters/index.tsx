import { Add as AddIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { memo, useEffect, useMemo, useRef, useState } from 'react';

import Trans from '@components/Trans';

import { Formix } from '@euk-labs/formix';

import ClearFiltersButton from './ClearFiltersButton';
import { FiltersModal } from './FiltersModal';
import FiltersValuesList from './FiltersValuesList';
import SmallButton from './SmallButton';
import { Filter } from './types';
import { buildInitialValues, getFilterValue } from './utils';

interface FiltersProps {
  filters: Filter[];
  onFilter: (filters: Record<string, unknown>) => void;
  onClear: () => void;
  onRefresh: () => void;
}

function FiltersComponent({
  filters,
  onFilter,
  onClear,
  onRefresh,
}: FiltersProps) {
  const [isFiltersOpen, setFiltersOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const initialValues = useMemo(() => buildInitialValues(filters), [filters]);

  function handleSubmit(values: Record<string, unknown>) {
    const newFilters: Record<string, unknown> = {};

    filters.forEach((filter) => {
      if (values[filter.field] !== '')
        newFilters[filter.field] = getFilterValue(filter, values);
    });

    onFilter(newFilters);
    handleCloseFilters();
  }

  function handleToggleFilters() {
    setFiltersOpen((prevOpen) => !prevOpen);
  }

  function handleCloseFilters(event?: Event | React.SyntheticEvent) {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event?.target as HTMLElement)
    ) {
      return;
    }

    setFiltersOpen(false);
  }

  const prevOpen = useRef(isFiltersOpen);
  useEffect(() => {
    if (prevOpen.current === true && isFiltersOpen === false) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      anchorRef.current!.focus();
    }

    prevOpen.current = isFiltersOpen;
  }, [isFiltersOpen]);

  return (
    <Formix initialValues={initialValues} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs>
          <Grid container spacing={2}>
            <FiltersValuesList />

            <Grid item>
              <Button
                size="small"
                onClick={handleToggleFilters}
                ref={anchorRef}
              >
                <AddIcon />
                <Trans id="actions.filters.add" />
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <ClearFiltersButton onClear={onClear} />
        </Grid>

        <Grid item>
          <SmallButton variant="contained" onClick={onRefresh}>
            <RefreshIcon fontSize="small" />
          </SmallButton>
        </Grid>
      </Grid>

      <FiltersModal
        state={isFiltersOpen}
        handleClose={handleCloseFilters}
        anchorEl={anchorRef.current}
        filters={filters}
      />
    </Formix>
  );
}

export const Filters = memo(FiltersComponent);
