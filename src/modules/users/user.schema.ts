import * as zod from 'zod';

import { getPasswordSchema } from '@config/schemas/password.schema';

import { NewPersonSchema } from '@modules/people/people.schema';

import { TranslateFunc } from '@services/translation';

export function getUserSchema(translate: TranslateFunc) {
  return zod
    .object({
      email: zod.string().email(),
      password: getPasswordSchema(translate),
      confirmPassword: getPasswordSchema(translate),
      person: NewPersonSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: translate('errors.validation.password_mismatch'),
      path: ['confirmPassword'],
    });
}

export type UserSchema = zod.infer<ReturnType<typeof getUserSchema>>;
