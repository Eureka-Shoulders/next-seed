import { GridLocaleText } from '@mui/x-data-grid';

const tableLocaleText: Partial<GridLocaleText> = {
  columnMenuUnsort: 'Desfazer ordenação',
  columnMenuSortAsc: 'Ordem Crescente',
  columnMenuSortDesc: 'Ordem Decrescente',
  columnMenuFilter: 'Filtrar',
  columnMenuHideColumn: 'Ocultar',
  columnMenuShowColumns: 'Exibir colunas',

  columnsPanelHideAllButton: 'Ocultar tudo',
  columnsPanelShowAllButton: 'Exibir tudo',
  columnsPanelTextFieldLabel: 'Pesquisar coluna',

  noRowsLabel: 'Nenhum registro encontrado',

  MuiTablePagination: {
    labelDisplayedRows: ({ from, to, count }) => `${from}–${to} de ${count}`,
  },
};

export default tableLocaleText;
