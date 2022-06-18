import { GridLocaleText } from '@mui/x-data-grid';

import { TranslateFunc } from '@services/translation';

export default function getTableLocaleText(translate: TranslateFunc): Partial<GridLocaleText> {
  return {
    columnMenuUnsort: translate('actions.filters.undoSort'),
    columnMenuSortAsc: translate('common.sortAsc'),
    columnMenuSortDesc: translate('common.sortDesc'),
    columnMenuFilter: translate('actions.filter'),
    columnMenuHideColumn: translate('actions.hide'),
    columnMenuShowColumns: translate('actions.showColumns'),

    columnsPanelHideAllButton: translate('actions.hideAll'),
    columnsPanelShowAllButton: translate('actions.showAll'),
    columnsPanelTextFieldLabel: translate('actions.searchColumn'),

    noRowsLabel: translate('feedbacks.noRegisters'),

    MuiTablePagination: {
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}–${to} ${translate('common.of')} ${count}`,
    },
  };
}
