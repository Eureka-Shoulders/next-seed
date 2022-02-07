import { Can } from '@casl/react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link as MuiLink } from '@mui/material';
import {
  GridActionsCellItem,
  GridActionsColDef,
  GridColDef,
  GridRowParams,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import { format } from 'date-fns';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Actions, AppAbility, Subjects } from 'types';

import { Identifier } from '@euk-labs/fetchx';

export default function getPeopleColumns(
  abilities: AppAbility,
  handleDelete: (id: Identifier) => void
): (GridActionsColDef | GridColDef)[] {
  return [
    {
      field: 'name',
      headerName: 'Nome',
      minWidth: 200,
      flex: 1,
      renderCell: (rowData) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const router = useRouter();

        if (abilities.can(Actions.Update, Subjects.User)) {
          return (
            <NextLink href={`${router.pathname}/${rowData.id}`} passHref>
              <MuiLink>{rowData.value}</MuiLink>
            </NextLink>
          );
        }

        return rowData.value;
      },
    },
    {
      field: 'identifier',
      headerName: 'CPF/CNPJ',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'birthDate',
      headerName: 'Data de Nascimento',
      type: 'date',
      minWidth: 200,
      valueFormatter: (params: GridValueFormatterParams) =>
        format(new Date(params.value as string), 'dd/MM/yyyy'),
    },
    {
      field: 'createdAt',
      headerName: 'Criado em',
      type: 'date',
      minWidth: 200,
      valueFormatter: (params: GridValueFormatterParams) => {
        return format(new Date(params.value as string), 'dd/MM/yyyy');
      },
    },
    {
      field: 'actions',
      headerName: 'Ações',
      type: 'actions',
      getActions: (params: GridRowParams) => [
        <Can
          I={Actions.Delete}
          an={Subjects.Person}
          ability={abilities}
          key={params.id}
        >
          <GridActionsCellItem
            icon={<DeleteIcon />}
            onClick={() => handleDelete(params.id)}
            label="Delete"
          />
        </Can>,
      ],
    },
  ];
}
