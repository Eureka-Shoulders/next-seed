import { Pagination } from '@mui/material';
import { useGridApiContext } from '@mui/x-data-grid';

function CustomPagination() {
  const apiRef = useGridApiContext();

  return (
    <Pagination
      color="standard"
      count={apiRef.current.state.pagination.pageCount}
      page={apiRef.current.state.pagination.page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

export default CustomPagination;
