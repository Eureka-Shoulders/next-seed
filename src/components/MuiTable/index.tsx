import tableLocaleText from '@config/tableLocale';
import { Box, Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { toJS } from 'mobx';

interface MuiTableProps {
  columns: GridColDef[];
  rows: Record<string, unknown>[];
  pageSize?: number;
  rowsPerPageOptions?: number[];
  isLoading?: boolean;
  page?: number;
  totalCount?: number;
  onPageChange?: (page: number) => void;
}

export default function MuiTable(props: MuiTableProps) {
  const {
    columns,
    rows,
    page,
    pageSize,
    rowsPerPageOptions,
    totalCount,
    isLoading,
    onPageChange,
  } = props;

  return (
    <Paper elevation={0} sx={{ height: 400 }}>
      <DataGrid
        rows={toJS(rows)}
        columns={columns}
        rowCount={totalCount}
        page={page}
        pageSize={pageSize || 100}
        rowsPerPageOptions={rowsPerPageOptions || [pageSize || 100]}
        localeText={tableLocaleText}
        loading={isLoading}
        onPageChange={onPageChange}
        disableSelectionOnClick
        disableColumnFilter
        paginationMode="server"
        sortingMode="server"
      />
    </Paper>
  );
}
