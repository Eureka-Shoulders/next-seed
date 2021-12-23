import DeleteIcon from '@mui/icons-material/Delete';
import {
  GridActionsCellItem,
  GridActionsColDef,
  GridColDef,
  GridRowParams,
} from '@mui/x-data-grid';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { Identifier } from '@euk-labs/fetchx';

function getUserColumns(
  handleDelete: (id: Identifier) => Promise<void>
): (GridActionsColDef | GridColDef)[] {
  return [
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
      renderCell: (rowData) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const router = useRouter();
        return (
          <NextLink href={`${router.pathname}/${rowData.id}`}>
            {rowData.value}
          </NextLink>
        );
      },
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
    {
      field: 'actions',
      headerName: 'Ações',
      type: 'actions',
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key={params.id}
          icon={<DeleteIcon />}
          onClick={() => handleDelete(params.id)}
          label="Delete"
        />,
      ],
    },
  ];
}

export default getUserColumns;
