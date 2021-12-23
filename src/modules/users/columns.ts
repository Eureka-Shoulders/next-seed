import { GridColDef } from '@mui/x-data-grid';

const usersColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 100,
  },
  {
    field: 'name',
    headerName: 'Nome',
    width: 200,
    flex: 1,
  },
  {
    field: 'email',
    headerName: 'E-mail',
    width: 200,
  },
  {
    field: 'createdAt',
    headerName: 'Criado em',
    // TODO: format with beltz date format and https://mui.com/pt/components/data-grid/columns/#value-formatter
    type: 'date',
    width: 200,
  },
];

export default usersColumns;
