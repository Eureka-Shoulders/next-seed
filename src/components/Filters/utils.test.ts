import { Filter } from './types';
import { buildInitialValues, getFilterValue } from './utils';

describe('Filter Utils Tests', () => {
  it('should build initial values from columns', () => {
    const columns = [
      {
        field: 'id',
        filterable: true,
        type: 'number',
      },
      {
        field: 'name',
        filterable: true,
        type: 'string',
      },
      {
        field: 'date',
        filterable: true,
        type: 'date',
      },
    ];

    const initialValues = buildInitialValues(columns);

    expect(initialValues).toEqual({
      id: '',
      name: '',
      date: null,
    });
  });

  it('should get a filter value', () => {
    const filterObject: Filter = {
      field: 'name',
      type: 'string',
      title: 'Name',
    };

    const values = {
      name: 'Antony',
    };

    const filterValue = getFilterValue(filterObject, values);

    expect(filterValue).toBe('Antony');
  });

  it('should get a filter enum value', () => {
    const filterObject: Filter = {
      title: 'Authors',
      field: 'authors',
      type: 'enum',
      enums: [
        { title: 'Antony', value: 'Antony' },
        { title: 'John', value: 'John' },
      ],
    };

    const values = {
      authors: {
        Antony: true,
        John: false,
      },
    };
    const filterValue = getFilterValue(filterObject, values);

    expect(filterValue).toEqual(['Antony']);
  });
});
