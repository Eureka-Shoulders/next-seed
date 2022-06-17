import { Edit } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { GridActionsCellItem, GridRowId, GridRowParams } from '@mui/x-data-grid';
import { Actions, Subjects } from '@types';
import React from 'react';

import Can from '@components/utility/Can';

import { useTranslation } from '@hooks/services';

type EditActionButtonProps = {
  params: GridRowParams<{
    [key: string]: any;
  }>;
  handleEdit: (id: GridRowId) => void;
  action: Actions;
  subject: Subjects;
  icon?: JSX.Element;
  title?: string;
};

const EditActionButton = ({
  params,
  handleEdit,
  icon,
  action,
  title,
  subject,
}: EditActionButtonProps) => {
  const { translate } = useTranslation();

  return (
    <Can action={action} subject={subject}>
      <GridActionsCellItem
        icon={
          <Tooltip title={title || translate('actions.edit')}>{icon ? icon : <Edit />}</Tooltip>
        }
        onClick={() => handleEdit(params.id)}
        label={translate('actions.edit')}
      />
    </Can>
  );
};

export default EditActionButton;
