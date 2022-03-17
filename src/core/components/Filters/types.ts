export interface FilterEnum {
  value: string;
  title: string;
}

export type Filter = GenericFilter | NumericFilter | EnumFilter;

export interface GenericFilter {
  field: string;
  title: string;
  type: 'string' | 'date' | 'cpf';
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
