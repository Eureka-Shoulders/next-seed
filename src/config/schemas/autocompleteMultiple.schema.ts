import * as zod from 'zod';

export const autocompleteMultipleSchema = zod
  .array(
    zod.object({
      label: zod.string(),
      value: zod.unknown(),
    })
  )
  .min(1);
