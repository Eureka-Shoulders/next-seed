import { makeAutoObservable } from 'mobx';

import { Filter } from './types';
import { buildInitialValues } from './utils';

class FiltersStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  filters: Filter[] = [];
  initialValues: Record<string, unknown> | null = null;
  values: Record<string, unknown> | null = null;
  isFiltersModalOpen = false;
  isAllFiltersModalOpen = false;

  setFilters(filters: Filter[]) {
    this.filters = filters;
    this.initialValues = buildInitialValues(filters);
  }
  setValues(values: Record<string, unknown>) {
    this.values = values;
  }
  openFilters() {
    this.isFiltersModalOpen = true;
  }
  closeFilters() {
    this.isFiltersModalOpen = false;
  }
  openAllFilters() {
    this.isAllFiltersModalOpen = true;
  }
  closeAllFilters() {
    this.isAllFiltersModalOpen = false;
  }
}

export default FiltersStore;
