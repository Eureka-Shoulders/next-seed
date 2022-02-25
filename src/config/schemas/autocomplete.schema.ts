import * as zod from 'zod';

export const AutocompleteSchema = zod.object({
  label: zod.string(),
  value: zod.unknown(),
});
