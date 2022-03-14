import { Grid } from '@mui/material';
import { toJS } from 'mobx';

import FilterChip from './FilterChip';
import FiltersStore from './filters.store';
import { getFilterChips } from './utils';

interface Props {
  filtersStore: FiltersStore;
}

export default function FiltersValuesList({ filtersStore }: Props) {
  const chips = getFilterChips(toJS(filtersStore.values) ?? {});

  return (
    <>
      {chips.map((chip) => {
        if (!chip) return;

        return (
          <Grid item key={chip.field}>
            <FilterChip label={String(chip.title)} field={chip.field} />
          </Grid>
        );
      })}
    </>
  );
}
