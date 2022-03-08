import { GridSortModel } from '@mui/x-data-grid';

import { ListStore } from '@euk-labs/fetchx';

export default function sortList(list: ListStore) {
  return (model: GridSortModel) => {
    if (model.length) {
      list.filters.set('sort', `{ "${model[0].field}": "${model[0].sort}" }`);
    } else {
      list.filters.delete('sort');
    }

    list.fetch();
  };
}
