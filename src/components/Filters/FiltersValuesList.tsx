import { Grid } from '@mui/material';
import { format } from 'date-fns';
import { filter, isEmpty, join, keys, map, pipe, toPairs } from 'ramda';

import { useFormixContext } from '@euk-labs/formix';

import FilterChip from './FilterChip';
import { EnumFilter, Filter } from './types';

interface Props {
  filters: Filter[];
}

export default function FiltersValuesList({ filters }: Props) {
  const formix = useFormixContext<Record<string | number, unknown>, unknown>();

  const renderChips = pipe(
    toPairs,
    filter(([, value]) => value !== '' && value !== null),
    map(([field, value]) => {
      let title = value;

      if (field === 'sort') return;

      if (value instanceof Date) title = format(value, 'dd/MM/yyyy');

      if (typeof value === 'object') {
        if (isEmpty(filter(Boolean, value as Record<string, boolean>))) return;

        const enumOptions = filters.find(
          (filter) => filter.field === field
        ) as EnumFilter;
        const enumTitleGetter = pipe(
          filter(Boolean),
          keys,
          map(
            (key) =>
              enumOptions.enums.find((enumOption) => enumOption.value === key)
                ?.title || ''
          ),
          join(', ')
        );

        title = enumTitleGetter(value);
      }

      return (
        <Grid item key={field}>
          <FilterChip label={String(title)} key={field} field={field} />
        </Grid>
      );
    })
  );

  return <>{renderChips(formix.values)}</>;
}
