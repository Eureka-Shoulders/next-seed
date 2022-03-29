import { useEffect, useState } from 'react';

import { Repository } from '@euk-labs/fetchx';

interface AutocompleteOptions {
  label: string;
  value: unknown;
}

export interface AutocompleteRepositoryType extends Repository {
  getAutocompleteOptions: (value?: string) => Promise<AutocompleteOptions[]>;
}

const useAutocomplete = (repository: AutocompleteRepositoryType) => {
  const [options, setOptions] = useState<AutocompleteOptions[]>([]);
  const [loading, setLoading] = useState(false);

  const getOptions = async (value?: string) => {
    setLoading(true);
    const response = await repository.getAutocompleteOptions(value);
    setOptions(response);
    setLoading(false);
  };

  useEffect(() => {
    getOptions();
  }, []);

  return {
    options,
    loading,
    getOptions: (value?: string) => getOptions(value),
  };
};

export default useAutocomplete;
