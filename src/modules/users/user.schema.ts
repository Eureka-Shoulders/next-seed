import { getPasswordSchema } from '@config/schemas/password.schema';
import * as zod from 'zod';

import { TranslateFunc } from '@hooks/useTranslation';

import { getNewPersonSchema } from '@modules/people/people.schema';

export function getUserSchema(translate: TranslateFunc) {
  return zod
    .object({
      email: zod.string().email(),
      password: getPasswordSchema(translate),
      confirmPassword: getPasswordSchema(translate),
      person: getNewPersonSchema(translate),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: translate('errors.validation.password_mismatch'),
      path: ['confirmPassword'],
    });
}

export type UserSchema = zod.infer<ReturnType<typeof getUserSchema>>;
