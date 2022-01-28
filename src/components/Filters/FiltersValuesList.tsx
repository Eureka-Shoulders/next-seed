import { Grid } from '@mui/material';
import { format } from 'date-fns';
import { map, pipe, toPairs } from 'ramda';

import { useFormixContext } from '@euk-labs/formix';

import FilterChip from './FilterChip';

export default function FiltersValuesList() {
  const formix = useFormixContext<Record<string | number, unknown>, unknown>();

  const renderChips = pipe(
    toPairs,
    map(([field, value]) => {
      let title = value;
      if (field === 'sort') return;

      if (value instanceof Date) title = format(value, 'dd/MM/yyyy');

      return (
        <Grid item key={field}>
          <FilterChip label={String(title)} key={field} />
        </Grid>
      );
    })
  );

  return <>{renderChips(formix.values)}</>;
}
