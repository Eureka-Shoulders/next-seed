import * as zod from 'zod';

import { GenericError } from '@euk-labs/formix';

export function zodValidator<T>(schema: zod.ZodType<T>) {
  return (values: T) => {
    const errors: GenericError[] = [];

    try {
      schema.parse(values);
    } catch (error) {
      if (error instanceof zod.ZodError) {
        error.errors.forEach((err) => {
          errors.push(err);
        });
      }
    }

    return errors;
  };
}
