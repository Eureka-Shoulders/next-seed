import { AutocompleteOption } from '@types';

import { AutocompleteRepositoryType } from '@hooks/useAutocomplete';

export interface FilterEnum {
  value: string;
  title: string;
}

export type Filter = GenericFilter | NumericFilter | EnumFilter | AutocompleteFilter;

export interface GenericFilter {
  field: string;
  title: string;
  type: 'string' | 'date' | 'cpf' | 'dateRange';
  enums?: FilterEnum[];
}

export interface AutocompleteFilter {
  field: string;
  title: string;
  type: 'autocomplete';
  multiple?: boolean;
  repository?: AutocompleteRepositoryType;
  options?: AutocompleteOption[];
}

export interface NumericFilter {
  field: string;
  title: string;
  type: 'number';
  precision: number;
  decimalChar: string;
  thousandChar: string;
}

export interface EnumFilter {
  field: string;
  title: string;
  type: 'enum';
  enums: FilterEnum[];
}
