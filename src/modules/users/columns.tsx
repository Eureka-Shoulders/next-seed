import DeleteIcon from '@mui/icons-material/Delete';
import { Link as MuiLink } from '@mui/material';
import {
  GridActionsCellItem,
  GridActionsColDef,
  GridColDef,
  GridRowParams,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { formatOnlyDate } from '@euk-labs/beltz';
import { Identifier } from '@euk-labs/fetchx';

function getUserColumns(
  handleDelete: (id: Identifier) => Promise<void>
): (GridActionsColDef | GridColDef)[] {
  return [
    {
      field: 'id',
      headerName: 'ID',
      minWidth: 200,
    },
    {
      field: 'name',
      headerName: 'Nome',
      minWidth: 200,
      flex: 1,
      valueGetter: (params) => params.row.person?.name || 'Sem nome',
      renderCell: (rowData) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const router = useRouter();
        return (
          <NextLink href={`${router.pathname}/${rowData.id}`} passHref>
            <MuiLink>{rowData.value}</MuiLink>
          </NextLink>
        );
      },
    },
    {
      field: 'email',
      headerName: 'E-mail',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: 'Criado em',
      type: 'date',
      minWidth: 200,
      valueFormatter: (params: GridValueFormatterParams) => {
        return formatOnlyDate(new Date(params.value as string), 'dd/MM/yyyy');
      },
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
