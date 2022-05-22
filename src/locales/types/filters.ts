export interface Filters {
  all: string;
  text: {
    title: string;
    label: string;
  };
  numeric: {
    title: string;
  };
  enum: {
    label: string;
  };
  date: {
    title: string;
  };
  cpf: {
    title: string;
    label: string;
  };
}
