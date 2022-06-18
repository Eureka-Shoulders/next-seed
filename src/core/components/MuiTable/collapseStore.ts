import { GridRowModel } from '@mui/x-data-grid';
import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';

import { CollapseContent } from './CollapsableGrid';

type IsDisabledFunc = (row: GridRowModel, rowId: number | string) => boolean;

export const CollapseContext = createContext<CollapseStore | null>(null);

class CollapseStore {
  constructor(
    customComponent: CollapseContent,
    isDisabledFunc: IsDisabledFunc
  ) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.customContent = customComponent;
    this.isDisabled = isDisabledFunc;
  }

  expandedIndexes: (number | string)[] = [];
  isDisabled: IsDisabledFunc;
  customContent: CollapseContent;

  setCustomContent(component: CollapseContent) {
    this.customContent = component;
  }

  setIsDisabledFunc(isDisabledFunc: IsDisabledFunc) {
    this.isDisabled = isDisabledFunc;
  }

  isExpanded(rowId: number | string) {
    return this.expandedIndexes.includes(rowId);
  }

  toggleExpand(rowId: number | string) {
    if (this.expandedIndexes.includes(rowId)) {
      this.expandedIndexes = this.expandedIndexes.filter((id) => id !== rowId);
    } else {
      this.expandedIndexes.push(rowId);
    }
  }
}

export default CollapseStore;
