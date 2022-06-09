import * as zod from 'zod';

import { autocompleteSchema } from '@config/schemas/autocomplete.schema';

import { validateCPForCNPJ } from '@utils/validateCPForCNPJ';

/**
 *  New Person Schema
 */
export const NewPersonSchema = zod.object({
  name: zod.string().min(1),
  type: zod
    .object({
      label: zod.string().min(1),
      value: zod.string().min(1),
    })
    .nullable(),
  identifier: zod
    .string()
    .min(1)
    .refine((identifier) => validateCPForCNPJ(identifier.replace(/\D+/g, ''))),
  // TODO: make it accept a string that is a valid date
  birthDate: zod
    .date()
    .nullable()
    .refine((value) => value !== null),
  addresses: zod
    .array(
      zod.object({
        street: zod.string().min(1),
        number: zod.string().min(1),
        neighborhood: zod.string().min(1),
        city: zod.string().min(1),
        state: zod.string().min(1),
        country: zod.string().min(1),
        zipcode: zod.string().min(1),
      })
    )
    .min(1),
  // TODO: fix contact type validation
  contacts: zod
    .array(
      zod.object({
        type: autocompleteSchema,
        value: zod.string().min(1),
      })
    )
    .min(1),
});
export type NewPersonSchema = zod.infer<typeof NewPersonSchema>;

/**
 *  Update Person Schema
 */
export const UpdatePersonSchema = zod.object({
  name: zod.string().min(1),
  identifier: zod
    .string()
    .min(1)
    .refine((identifier) => validateCPForCNPJ(identifier)),
  birthDate: zod.date(),
  addresses: zod
    .array(
      zod.object({
        street: zod.string().min(1),
        number: zod.string().min(1),
        neighborhood: zod.string().min(1),
        city: zod.string().min(1),
        state: zod.string().min(1),
        country: zod.string().min(1),
        zipcode: zod.string().min(1),
      })
    )
    .min(1),
  contacts: zod
    .array(
      zod.object({
        type: autocompleteSchema,
        value: zod.string().min(1),
      })
    )
    .min(1),
});
export type UpdatePersonSchema = zod.infer<typeof UpdatePersonSchema>;
