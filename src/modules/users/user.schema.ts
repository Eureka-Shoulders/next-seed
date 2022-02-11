import * as zod from 'zod';

import { TranslateFunc } from '@hooks/useTranslation';

import { getNewPersonSchema } from '@modules/people/people.schema';

export function getUserSchema(translate: TranslateFunc) {
  return zod
    .object({
      email: zod.string().email(translate('errors.validation.invalid_email')),
      password: zod
        .string()
        .min(8, translate('errors.validation.minimum_password')),
      confirmPassword: zod
        .string()
        .min(8, translate('errors.validation.minimum_password')),
      person: getNewPersonSchema(translate),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: translate('errors.validation.password_mismatch'),
      path: ['confirmPassword'],
    });
}

export type UserSchema = zod.infer<ReturnType<typeof getUserSchema>>;
