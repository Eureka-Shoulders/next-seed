import useAutocomplete, {
  AutocompleteRepositoryType,
} from '@core/hooks/useAutocomplete';

import { FXAutocomplete } from '@euk-labs/formix-mui';
import { InternalAutocompleteProps } from '@euk-labs/formix-mui/Autocomplete/FXAutocomplete';

import { AutocompleteOption } from '../../types';

type FXAsyncAutocompleteProps = {
  repository: AutocompleteRepositoryType;
} & Omit<
  InternalAutocompleteProps<AutocompleteOption>,
  'options' | 'onDebouncedInputChange' | 'loading'
>;

const FXAsyncAutocomplete = ({
  repository,
  ...rest
}: FXAsyncAutocompleteProps) => {
  const autocomplete = useAutocomplete(repository);

  return (
    <FXAutocomplete
      {...rest}
      options={autocomplete.options}
      onDebouncedInputChange={(value) => autocomplete.getOptions(value)}
      loading={autocomplete.loading}
    />
  );
};

export default FXAsyncAutocomplete;
