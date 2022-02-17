export interface FilterEnum {
  value: string;
  title: string;
  description?: string;
}

export type Filter = GenericFilter | NumericFilter;

export interface GenericFilter {
  field: string;
  title: string;
  type: 'string' | 'date' | 'enum' | 'cpf';
  enums?: FilterEnum[];
}

export interface NumericFilter {
  field: string;
  title: string;
  type: 'number';
  precision: number;
  decimalChar: string;
  thousandChar: string;
  enums?: FilterEnum[];
}
