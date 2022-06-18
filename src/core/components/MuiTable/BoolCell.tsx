import { Check, Close } from '@mui/icons-material';
import { GridRenderCellParams } from '@mui/x-data-grid';

import When from '@components/utility/When';

const BoolCell = (rowData: GridRenderCellParams<any, any, any>) => {
  const checked = rowData.value === true;

  return (
    <>
      <When is={checked}>
        <Check color="success" />
      </When>
      <When isNot={checked}>
        <Close color="error" />
      </When>
    </>
  );
};

export default BoolCell;
