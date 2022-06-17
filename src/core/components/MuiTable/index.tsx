import { Paper } from '@mui/material';
import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridFeatureMode,
  GridRowIdGetter,
  GridRowParams,
  GridRowsProp,
  GridSlotsComponent,
  GridSortModel,
  MuiEvent,
} from '@mui/x-data-grid';
import { toJS } from 'mobx';
import React from 'react';

import getTableLocaleText from '@config/tableLocale';

import { useTranslation } from '@hooks/services';

import { Footer } from './Footer';
import { LoadingOverlay } from './LoadingOverlay';
import { NoRowsOverlay } from './NoRowsOverlay';

export interface MuiTableProps {
  height?: number | string;
  width?: number | string;
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
  onRowClick?: (
    params: GridRowParams,
    event: MuiEvent<React.MouseEvent>,
    details: GridCallbackDetails
  ) => void;
  components?: Partial<GridSlotsComponent>;
  paginationMode?: GridFeatureMode | undefined;
}

export function MuiTable(props: MuiTableProps) {
  const {
    height,
    width,
    columns,
    rows,
    page,
    pageSize,
    rowsPerPageOptions,
    totalCount,
    isLoading,
    onRowClick,
    onPageChange,
    onSortModelChange,
    getRowId,
    components,
    paginationMode = 'server',
  } = props;
  const { translate } = useTranslation();

  return (
    <Paper
      elevation={0}
      sx={{
        height: height || '85vh',
        width,
        '& .rowClickable': { cursor: 'pointer' },
      }}
    >
      <DataGrid
        sx={{
          '& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
          '& .MuiDataGrid-columnHeaders :focus-within, & .MuiDataGrid-columnHeaders :focus': {
            outline: 'none',
          },
        }}
        rows={toJS(rows)}
        columns={columns}
        rowCount={totalCount}
        page={page}
        pageSize={pageSize || 10}
        rowsPerPageOptions={rowsPerPageOptions || [pageSize || 10]}
        localeText={getTableLocaleText(translate)}
        loading={isLoading}
        onPageChange={onPageChange}
        onSortModelChange={onSortModelChange}
        disableSelectionOnClick
        disableColumnFilter
        getRowId={getRowId}
        paginationMode={paginationMode}
        sortingMode={paginationMode}
        getRowClassName={() => (onRowClick ? `rowClickable` : '')}
        components={{
          Footer,
          LoadingOverlay,
          NoRowsOverlay,
          ...components,
        }}
        onRowClick={onRowClick}
      />
    </Paper>
  );
}
