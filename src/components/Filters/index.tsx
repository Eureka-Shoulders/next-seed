import { Add as AddIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { format } from 'date-fns';
import { memo, useEffect, useMemo, useRef, useState } from 'react';

import { Formix } from '@euk-labs/formix';

import { FiltersModal } from '../filters/FiltersModal';
import ClearFiltersButton from './ClearFiltersButton';
import FilterChip from './FilterChip';
import SmallButton from './SmallButton';
import { Filter } from './types';
import { buildInitialValues, getFilterValue } from './utils';

interface FiltersProps {
  filters: Filter[];
  onFilter: (filters: Record<string, unknown>) => void;
}

function FiltersComponent({ filters, onFilter }: FiltersProps) {
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
            {Object.entries(listHook.filters).map(([key, value]) => {
              let title = value;
              if (key === 'sort') return;

              if (value instanceof Date) title = format(value, 'dd/MM/yyyy');

              return (
                <Grid item key={key}>
                  <FilterChip label={String(title)} key={key} />
                </Grid>
              );
            })}

            <Grid item>
              <Button
                size="small"
                onClick={handleToggleFilters}
                ref={anchorRef}
              >
                <AddIcon />
                Adicionar filtro
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <ClearFiltersButton />
        </Grid>

        <Grid item>
          <SmallButton variant="contained" onClick={listHook.refresh}>
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
