import { ListStore } from '@euk-labs/fetchx';
import { GridRowsProp } from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import sortList from '@utils/table/sortList';

import { MuiTable, MuiTableProps } from './MuiTable';

interface Props extends Omit<MuiTableProps, 'rows'> {
  listStore: ListStore;
  rows?: GridRowsProp;
}

function FetchxList({ listStore, ...props }: Props) {
  useEffect(() => {
    listStore.fetch();
  }, [listStore.page]);

  return (
    <MuiTable
      {...props}
      page={listStore.page - 1}
      rows={listStore.list as Record<string, unknown>[]}
      isLoading={listStore.loading}
      totalCount={listStore.totalCount}
      onPageChange={(page) => listStore.setPage(page + 1)}
      onSortModelChange={sortList(listStore)}
    />
  );
}

export default observer(FetchxList);
