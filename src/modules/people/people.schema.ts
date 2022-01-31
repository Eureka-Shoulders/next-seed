import AutocompleteSchema from '@config/autocomplete.schema';
import ERROR_MESSAGES from '@config/messages';
import * as zod from 'zod';

// TODO: fix contact type validation
export const NewPersonSchema = zod.object({
  name: zod.string().min(1, ERROR_MESSAGES.required),
  identifier: zod.string().min(1, ERROR_MESSAGES.required),
  birthDate: zod
    .date()
    .nullable()
    .refine((value) => value !== null, ERROR_MESSAGES.required),
  addresses: zod
    .array(
      zod.object({
        street: zod.string().min(1, ERROR_MESSAGES.required),
        number: zod.string().min(1, ERROR_MESSAGES.required),
        neighborhood: zod.string().min(1, ERROR_MESSAGES.required),
        city: zod.string().min(1, ERROR_MESSAGES.required),
        state: zod.string().min(1, ERROR_MESSAGES.required),
        country: zod.string().min(1, ERROR_MESSAGES.required),
        zipcode: zod.string().min(1, ERROR_MESSAGES.required),
      })
    )
    .min(1, ERROR_MESSAGES.required),
  contacts: zod
    .array(
      zod.object({
        type: AutocompleteSchema,
        value: zod.string().min(1, ERROR_MESSAGES.required),
      })
    )
    .min(1, ERROR_MESSAGES.required),
});

export type NewPersonSchema = zod.infer<typeof NewPersonSchema>;

export const UpdatePersonSchema = zod.object({
  name: zod.string().min(1, ERROR_MESSAGES.required),
  identifier: zod.string().min(1, ERROR_MESSAGES.required),
  birthDate: zod.date({
    invalid_type_error: ERROR_MESSAGES.required,
    required_error: ERROR_MESSAGES.required,
  }),
  addresses: zod
    .array(
      zod.object({
        street: zod.string().min(1, ERROR_MESSAGES.required),
        number: zod.string().min(1, ERROR_MESSAGES.required),
        neighborhood: zod.string().min(1, ERROR_MESSAGES.required),
        city: zod.string().min(1, ERROR_MESSAGES.required),
        state: zod.string().min(1, ERROR_MESSAGES.required),
        country: zod.string().min(1, ERROR_MESSAGES.required),
        zipcode: zod.string().min(1, ERROR_MESSAGES.required),
      })
    )
    .min(1, ERROR_MESSAGES.required),
  contacts: zod
    .array(
      zod.object({
        type: AutocompleteSchema,
        value: zod.string().min(1, ERROR_MESSAGES.required),
      })
    )
    .min(1, ERROR_MESSAGES.required),
});

export type UpdatePersonSchema = zod.infer<typeof UpdatePersonSchema>;
