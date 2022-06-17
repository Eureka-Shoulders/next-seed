import { Delete } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { GridActionsCellItem, GridRowId, GridRowParams } from '@mui/x-data-grid';
import { Actions, Subjects } from '@types';
import React from 'react';

import Can from '@components/utility/Can';

import { useTranslation } from '@hooks/services';

type DeleteActionButtonProps = {
  params: GridRowParams<{
    [key: string]: any;
  }>;
  handleDelete: (id: GridRowId) => void;
  action: Actions;
  subject: Subjects;
  icon?: JSX.Element;
  title?: string;
};

const DeleteActionButton = ({
  params,
  handleDelete,
  icon,
  action,
  title,
  subject,
}: DeleteActionButtonProps) => {
  const { translate } = useTranslation();

  return (
    <Can action={action} subject={subject}>
      <GridActionsCellItem
        icon={
          <Tooltip title={title || translate('actions.delete')}>{icon ? icon : <Delete />}</Tooltip>
        }
        onClick={() => handleDelete(params.id)}
        label={translate('actions.delete')}
      />
    </Can>
  );
};

export default DeleteActionButton;
