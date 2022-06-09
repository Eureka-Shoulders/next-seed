import { Identifier } from '@euk-labs/fetchx';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  GridActionsCellItem,
  GridActionsColDef,
  GridColDef,
  GridRowParams,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import { format } from 'date-fns';
import { Actions, Subjects } from 'types';

import Can from '@core/components/Can';
import { renderEntityLink } from '@core/components/MuiTable/EntityLink';

import { TranslateFunc } from '@services/translation';

function getUserColumns(
  handleDelete: (id: Identifier) => void,
  translate: TranslateFunc
): (GridActionsColDef | GridColDef)[] {
  return [
    {
      field: 'name',
      headerName: translate('common.name'),
      minWidth: 200,
      flex: 1,
      valueGetter: (params) => params.row.person?.name || translate('common.noName'),
      renderCell: renderEntityLink(Actions.Update, Subjects.User),
    },
    {
      field: 'email',
      headerName: translate('common.email'),
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: translate('common.createdAt'),
      type: 'date',
      minWidth: 200,
      valueFormatter: (params: GridValueFormatterParams) =>
        format(new Date(params.value as string), 'dd/MM/yyyy'),
    },
    {
      field: 'actions',
      headerName: translate('common.actions'),
      type: 'actions',
      getActions: (params: GridRowParams) => [
        <Can action={Actions.Delete} subject={Subjects.User} key="delete-btn">
          <GridActionsCellItem
            icon={<DeleteIcon />}
            onClick={() => handleDelete(params.id)}
            label={translate('actions.delete')}
          />
        </Can>,
      ],
    },
  ];
}

export default getUserColumns;
