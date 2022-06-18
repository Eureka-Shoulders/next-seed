import { format } from 'date-fns';

import { Filter } from './types';
import { buildInitialValues, getFilterChips, getFilterValue } from './utils';

describe('Filter Utils Tests', () => {
  it('should build initial values from columns', () => {
    const filters: Filter[] = [
      {
        field: 'id',
        type: 'number',
        title: 'ID',
        precision: 0,
        decimalChar: '',
        thousandChar: '',
      },
      {
        field: 'name',
        type: 'string',
        title: 'Name',
      },
      {
        field: 'date',
        type: 'date',
        title: 'Date',
      },
    ];

    const initialValues = buildInitialValues(filters);

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

  it('should get valid filter titles for chips', () => {
    const filters: Filter[] = [
      {
        field: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        field: 'email',
        title: 'E-mail',
        type: 'string',
      },
      {
        field: 'createdAt',
        title: 'Created at',
        type: 'date',
      },
      {
        field: 'details',
        title: 'Details',
        type: 'enum',
        enums: [{ title: 'Locked', value: 'locked' }],
      },
    ];
    const values = {
      orderBy: 'name-desc',
      name: 'Tony',
      email: 'tony@shouldersteam.com',
      createdAt: new Date(),
      details: {
        locked: true,
        verified: false,
      },
    };
    const chips = getFilterChips(filters, values);

    expect(chips).toEqual([
      undefined,
      { field: 'name', title: 'Tony' },
      { field: 'email', title: 'tony@shouldersteam.com' },
      { field: 'createdAt', title: format(values.createdAt, 'dd/MM/yyyy') },
      { field: 'details', title: 'Locked' },
    ]);
  });
});
