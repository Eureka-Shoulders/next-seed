import { FXAutocomplete } from '@euk-labs/formix-mui';
import { InternalAutocompleteProps } from '@euk-labs/formix-mui/Autocomplete/FXAutocomplete';

import { AutocompleteRepositoryType, useAutocomplete } from '@hooks/useAutocomplete';

import { AutocompleteOption } from '../../types';

type FXAsyncAutocompleteProps = {
  repository: AutocompleteRepositoryType;
} & Omit<
  InternalAutocompleteProps<AutocompleteOption>,
  'options' | 'onDebouncedInputChange' | 'loading'
>;

export default function FXAsyncAutocomplete({ repository, ...rest }: FXAsyncAutocompleteProps) {
  const { options, getOptions, loading } = useAutocomplete(repository);

  return (
    <FXAutocomplete
      {...rest}
      options={options}
      onDebouncedInputChange={getOptions}
      loading={loading}
    />
  );
}
