import { getAutocompleteSchema } from '@config/autocomplete.schema';
import validateCPForCNPJ from '@utils/validateCPForCNPJ';
import * as zod from 'zod';

import { TranslateFunc } from '@hooks/useTranslation';

export function getNewPersonSchema(translate: TranslateFunc) {
  // TODO: fix contact type validation
  return zod.object({
    name: zod.string().min(1, translate('errors.validation.required')),
    type: zod
      .object({
        label: zod.string().min(1, translate('errors.validation.required')),
        value: zod.string().min(1, translate('errors.validation.required')),
      })
      .nullable(),
    identifier: zod
      .string()
      .min(1, translate('errors.validation.required'))
      .refine(
        (identifier) => validateCPForCNPJ(identifier.replace(/\D+/g, '')),
        translate('errors.validation.invalid_field')
      ),
    // TODO: make it accept a string that is a valid date
    birthDate: zod
      .date()
      .nullable()
      .refine(
        (value) => value !== null,
        translate('errors.validation.required')
      ),
    addresses: zod
      .array(
        zod.object({
          street: zod.string().min(1, translate('errors.validation.required')),
          number: zod.string().min(1, translate('errors.validation.required')),
          neighborhood: zod
            .string()
            .min(1, translate('errors.validation.required')),
          city: zod.string().min(1, translate('errors.validation.required')),
          state: zod.string().min(1, translate('errors.validation.required')),
          country: zod.string().min(1, translate('errors.validation.required')),
          zipcode: zod.string().min(1, translate('errors.validation.required')),
        })
      )
      .min(1, translate('errors.validation.required')),
    contacts: zod
      .array(
        zod.object({
          type: getAutocompleteSchema(translate),
          value: zod.string().min(1, translate('errors.validation.required')),
        })
      )
      .min(1, translate('errors.validation.required')),
  });
}

export type NewPersonSchema = zod.infer<ReturnType<typeof getNewPersonSchema>>;

export function getUpdatePersonSchema(translate: TranslateFunc) {
  return zod.object({
    name: zod.string().min(1, translate('errors.validation.required')),
    identifier: zod
      .string()
      .min(1, translate('errors.validation.required'))
      .refine(
        (identifier) => validateCPForCNPJ(identifier),
        translate('errors.validation.invalid_field')
      ),
    birthDate: zod.date({
      invalid_type_error: translate('errors.validation.required'),
      required_error: translate('errors.validation.required'),
    }),
    addresses: zod
      .array(
        zod.object({
          street: zod.string().min(1, translate('errors.validation.required')),
          number: zod.string().min(1, translate('errors.validation.required')),
          neighborhood: zod
            .string()
            .min(1, translate('errors.validation.required')),
          city: zod.string().min(1, translate('errors.validation.required')),
          state: zod.string().min(1, translate('errors.validation.required')),
          country: zod.string().min(1, translate('errors.validation.required')),
          zipcode: zod.string().min(1, translate('errors.validation.required')),
        })
      )
      .min(1, translate('errors.validation.required')),
    contacts: zod
      .array(
        zod.object({
          type: getAutocompleteSchema(translate),
          value: zod.string().min(1, translate('errors.validation.required')),
        })
      )
      .min(1, translate('errors.validation.required')),
  });
}

export type UpdatePersonSchema = zod.infer<
  ReturnType<typeof getUpdatePersonSchema>
>;
