import { Autocomplete, AutocompleteProps } from '@euk-labs/componentz';
import { AutocompleteOption } from '@types';
import { UIEvent, useEffect, useState } from 'react';

import { AutocompleteRepositoryType, useAutocomplete } from '@hooks/useAutocomplete';

type AsyncAutocompleteProps = {
  repository: AutocompleteRepositoryType;
  researchOn?: unknown;
} & Omit<AutocompleteProps<AutocompleteOption>, 'options' | 'onDebouncedInputChange' | 'loading'>;

const AsyncAutocomplete = ({ repository, researchOn, ...rest }: AsyncAutocompleteProps) => {
  const [open, setOpen] = useState(false);
  const autocomplete = useAutocomplete(repository);

  const onDebouncedInputChange = rest.debounce
    ? (value: string) => autocomplete.getOptions(value)
    : undefined;
  const onInputChange = !rest.debounce
    ? (_event: unknown, value: string) => autocomplete.getOptions(value)
    : undefined;

  async function onListBoxScroll(event: UIEvent<HTMLUListElement>) {
    const container = event.target as HTMLUListElement;
    const lastScroll = container.scrollTop;
    if (container.offsetHeight + container.scrollTop >= container.scrollHeight) {
      await autocomplete.nextPage();
      container.scrollTo({
        top: lastScroll,
      });
    }
  }

  useEffect(() => {
    if (open && !autocomplete.options.length) {
      autocomplete.getOptions();
    }
  }, [open]);

  useEffect(() => {
    autocomplete.getOptions();
  }, [researchOn]);

  return (
    <Autocomplete
      {...rest}
      open={open}
      ListboxProps={{
        onScroll: onListBoxScroll,
        style: { maxHeight: '200px' },
      }}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderOption={(props, option) => (
        <li {...props} key={option.value}>
          {option.label}
        </li>
      )}
      options={autocomplete.options}
      onDebouncedInputChange={onDebouncedInputChange}
      onInputChange={onInputChange}
      loading={autocomplete.loading}
    />
  );
};

export default AsyncAutocomplete;
