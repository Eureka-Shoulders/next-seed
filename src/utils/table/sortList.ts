import { ListStore } from '@euk-labs/fetchx';
import { GridSortModel } from '@mui/x-data-grid';

// TODO: review sort field
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
