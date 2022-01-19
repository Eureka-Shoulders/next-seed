import tableLocaleText from '@config/tableLocale';
import { Paper } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRowIdGetter,
  GridRowsProp,
  GridSortModel,
} from '@mui/x-data-grid';
import { toJS } from 'mobx';
import React from 'react';

import CustomLoadingOverlay from './CustomLoadingOverlay';
import CustomNoRowsOverlay from './CustomNoRowsOverlay';
import CustomPagination from './CustomPagination';

interface MuiTableProps {
  columns: GridColDef[];
  rows: GridRowsProp;
  pageSize?: number;
  rowsPerPageOptions?: number[];
  isLoading?: boolean;
  page?: number;
  totalCount?: number;
  onPageChange?: (page: number) => void;
  onSortModelChange?: (model: GridSortModel) => void;
  getRowId?: GridRowIdGetter;
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
    onSortModelChange,
    getRowId,
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
        onSortModelChange={onSortModelChange}
        disableSelectionOnClick
        disableColumnFilter
        getRowId={getRowId}
        paginationMode="server"
        sortingMode="server"
        components={{
          Pagination: CustomPagination,
          LoadingOverlay: CustomLoadingOverlay,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </Paper>
  );
}
