import { GridColDef } from '@mui/x-data-grid';

import { Filter } from './types';

// TODO: analyse use of ramda
export function buildInitialValues(columns: GridColDef[]) {
  const initialValues: { [key: string]: unknown } = {};

  columns.forEach((column) => {
    if (column.filterable || column.filterable === undefined) {
      if (column.type === 'date') {
        return (initialValues[column.field] = null);
      }

      return (initialValues[column.field] = '');
    }
  });

  return initialValues;
}

export function getFilterValue(
  filter: Filter,
  values: Record<string, unknown>
) {
  switch (filter.type) {
    case 'enum':
      const enumerable = values[filter.field] as Record<string, boolean>;
      return Object.entries(enumerable)
        .filter(([, value]) => value)
        .map(([key]) => key);

    default:
      return values[filter.field];
  }
}
