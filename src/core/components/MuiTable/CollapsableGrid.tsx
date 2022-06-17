/* eslint-disable react/display-name */
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Collapse, IconButton, Paper, SxProps, Theme } from '@mui/material';
import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridFeatureMode,
  GridRenderCellParams,
  GridRow,
  GridRowIdGetter,
  GridRowModel,
  GridRowParams,
  GridRowProps,
  GridSlotsComponent,
  GridSlotsComponentsProps,
  GridSortModel,
  MuiEvent,
} from '@mui/x-data-grid';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { forwardRef, useContext, useEffect, useState } from 'react';

import getTableLocaleText from '@config/tableLocale';

import { useTranslation } from '@hooks/services';

import { CustomPagination } from './CustomPagination';
import { Footer } from './Footer';
import { LoadingOverlay } from './LoadingOverlay';
import { NoRowsOverlay } from './NoRowsOverlay';
import CollapseStore, { CollapseContext } from './collapseStore';

export type CollapseContentProps = {
  row: GridRowModel;
  rowId: number | string;
};

export type CollapseContent = (props: CollapseContentProps) => JSX.Element;

interface MuiTableProps {
  height?: number | string;
  width?: number | string;
  columns: GridColDef[];
  rows: GridRowModel[];
  rowHeight?: number;
  pageSize?: number;
  rowsPerPageOptions?: number[];
  isLoading?: boolean;
  hideFooter?: boolean;
  page?: number;
  totalCount?: number;
  paginationMode?: GridFeatureMode | undefined;
  disableColumnMenu?: boolean;
  onPageChange?: (page: number) => void;
  onSortModelChange?: (model: GridSortModel) => void;
  getRowId?: GridRowIdGetter;
  onRowClick?: (
    params: GridRowParams,
    event: MuiEvent<React.MouseEvent>,
    details: GridCallbackDetails
  ) => void;
  components?: Partial<GridSlotsComponent>;
  componentsProps?: GridSlotsComponentsProps;
  collapseContent: CollapseContent;
  disableCollapse: (row: GridRowModel, rowId: number | string) => boolean;
  disableColumnSelector?: boolean;
  sx?: SxProps<Theme>;
}

const CollapseCell = (props: GridRenderCellParams) => {
  const collapseStore = useContext(CollapseContext);
  const isExpanded = collapseStore?.isExpanded(props.id);

  return (
    <IconButton
      onClick={() => collapseStore?.toggleExpand(props.id)}
      disabled={collapseStore?.isDisabled(props.row, props.id)}
    >
      {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    </IconButton>
  );
};

const CollapsableRow = observer((props: GridRowProps) => {
  const collapseStore = useContext(CollapseContext);
  const isExpanded = collapseStore?.isExpanded(props.rowId);
  const CustomContent = collapseStore?.customContent;

  if (!CustomContent) {
    return <GridRow {...props} />;
  }

  return (
    <>
      <GridRow {...props} />

      <Collapse in={isExpanded} unmountOnExit>
        <CustomContent row={props.row} rowId={props.rowId} />
      </Collapse>
    </>
  );
});

const CollapsableGrid = forwardRef<HTMLDivElement, MuiTableProps>((props, ref) => {
  const {
    height,
    width,
    rowHeight,
    rows,
    pageSize,
    rowsPerPageOptions,
    totalCount,
    isLoading,
    components,
    paginationMode = 'server',
    collapseContent,
    disableCollapse,
    disableColumnMenu,
    disableColumnSelector,
    sx,
    ...rest
  } = props;
  const { translate } = useTranslation();
  const [collapseStore] = useState(() => new CollapseStore(collapseContent, disableCollapse));

  useEffect(() => {
    collapseStore.setCustomContent(collapseContent);
  }, [collapseStore, collapseContent]);

  useEffect(() => {
    collapseStore.setIsDisabledFunc(disableCollapse);
  }, [collapseStore, disableCollapse]);

  if (rest.columns.every((col) => col.field !== 'collapsable_field_grid')) {
    rest.columns.unshift({
      field: 'collapsable_field_grid',
      headerName: '',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      minWidth: 60,
      width: 60,
      renderCell: CollapseCell,
    });
  }

  return (
    <CollapseContext.Provider value={collapseStore}>
      <Paper elevation={0} sx={{ height: height || '85vh', width: width }} ref={ref}>
        <DataGrid
          {...rest}
          sx={{
            ...sx,
            '& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-columnHeaders :focus-within, & .MuiDataGrid-columnHeaders :focus': {
              outline: 'none',
            },
          }}
          rows={toJS(rows)}
          rowCount={totalCount}
          rowHeight={rowHeight || 52}
          pageSize={pageSize || 100}
          disableColumnSelector={disableColumnSelector}
          rowsPerPageOptions={rowsPerPageOptions || [pageSize || 100]}
          loading={isLoading}
          localeText={getTableLocaleText(translate)}
          disableColumnMenu={disableColumnMenu}
          disableSelectionOnClick
          disableColumnFilter
          disableVirtualization
          paginationMode={paginationMode}
          sortingMode={paginationMode}
          components={{
            Footer,
            Pagination: CustomPagination,
            LoadingOverlay,
            NoRowsOverlay,
            Row: CollapsableRow,
            ...components,
          }}
        />
      </Paper>
    </CollapseContext.Provider>
  );
});

export default CollapsableGrid;
