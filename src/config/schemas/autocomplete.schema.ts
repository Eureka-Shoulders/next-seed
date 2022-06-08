import * as zod from 'zod';

export const autocompleteSchema = zod
  .object({
    label: zod.string(),
    value: zod.unknown(),
  })
  .nullable()
  .refine((value) => value !== null);
