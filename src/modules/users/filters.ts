const filters: Filter[] = [
  {
    field: 'name',
    title: 'Nome',
    type: 'string',
  },
  {
    field: 'username',
    title: 'E-mail',
    type: 'string',
  },
  {
    field: 'empresa',
    title: 'Empresa',
    type: 'enum',
    enums: [
      { value: 'G10', title: 'G10' },
      { value: 'TP', title: 'Transpanorama' },
    ],
  },
  {
    field: 'cpf',
    title: 'CPF',
    type: 'cpf',
  },
  {
    field: 'dataNascimento',
    title: 'Data Nascimento',
    type: 'date',
  },
  {
    field: 'dataAdmissao',
    title: 'Data Admissão',
    type: 'date',
  },
];
