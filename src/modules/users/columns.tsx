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
import getLocaleString from 'locales/getLocaleString';
import NextLink from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { Actions, AppAbility, Subjects } from 'types';

import { Identifier } from '@euk-labs/fetchx';

function getUserColumns(
  abilities: AppAbility,
  handleDelete: (id: Identifier) => Promise<void>,
  router: NextRouter
): (GridActionsColDef | GridColDef)[] {
  return [
    {
      field: 'name',
      headerName: getLocaleString('name', router),
      minWidth: 200,
      flex: 1,
      valueGetter: (params) =>
        params.row.person?.name || getLocaleString('noName', router),
      renderCell: (rowData) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const router = useRouter();

        if (abilities.can(Actions.Update, Subjects.Users)) {
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
      field: 'email',
      headerName: getLocaleString('email', router),
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: getLocaleString('createdAt', router),
      type: 'date',
      minWidth: 200,
      valueFormatter: (params: GridValueFormatterParams) =>
        format(new Date(params.value as string), 'dd/MM/yyyy'),
    },
    {
      field: 'actions',
      headerName: getLocaleString('actions', router),
      type: 'actions',
      getActions: (params: GridRowParams) => [
        <Can
          I={Actions.Delete}
          an={Subjects.Users}
          ability={abilities}
          key={params.id}
        >
          <GridActionsCellItem
            icon={<DeleteIcon />}
            onClick={() => handleDelete(params.id)}
            label={getLocaleString('delete', router)}
          />
        </Can>,
      ],
    },
  ];
}

export default getUserColumns;
