import { useState } from 'react';

import Repository from '@services/http';

import { useUserStore } from './stores';

interface AutocompleteOption {
  label: string;
  value: unknown;
}

export interface AutocompleteRepositoryType extends Repository {
  getAutocompleteOptions: (
    page: number,
    value?: unknown
  ) => Promise<{ options: AutocompleteOption[]; totalCount: number }>;
}

export const useAutocomplete = (repository: AutocompleteRepositoryType) => {
  const [options, setOptions] = useState<AutocompleteOption[]>([]);
  const [loading, setLoading] = useState(false);

  const userStore = useUserStore();
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [previousValue, setPreviousValue] = useState<unknown>();

  const getOptions = async (value?: unknown) => {
    if (userStore.isLogged) {
      setPreviousValue(value);
      setLoading(true);
      const response = await repository.getAutocompleteOptions(1, value);
      setTotalCount(response.totalCount);
      setOptions(response.options);
      setPage(1);
      setLoading(false);
    }
  };

  const nextPage = async () => {
    if (userStore.isLogged) {
      if (totalCount < page * 10) return;
      setLoading(true);
      const response = await repository.getAutocompleteOptions(page + 1, previousValue);
      setOptions([...options, ...response.options]);
      setPage(page + 1);
      setLoading(false);
    }
  };

  return {
    options,
    loading,
    page,
    setPage,
    nextPage,
    getOptions,
  };
};
