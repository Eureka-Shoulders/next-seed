import { Pagination as MuiPagination } from '@mui/material';
import { useGridApiContext } from '@mui/x-data-grid';

export function Pagination() {
  const apiRef = useGridApiContext();

  return (
    <MuiPagination
      color="standard"
      count={apiRef.current.state.pagination.pageCount}
      page={apiRef.current.state.pagination.page + 1}
      onChange={(_event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}
