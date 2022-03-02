import { Grid } from '@mui/material';

import { useFormixContext } from '@euk-labs/formix';

import FilterChip from './FilterChip';
import { Filter } from './types';
import { getFilterChips } from './utils';

interface Props {
  filters: Filter[];
}

export default function FiltersValuesList({ filters }: Props) {
  const formix = useFormixContext<Record<string | number, unknown>>();
  const chips = getFilterChips(filters, formix.values);

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
