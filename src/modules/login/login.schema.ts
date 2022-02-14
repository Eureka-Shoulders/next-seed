import { getPasswordSchema } from '@config/schemas/password.schema';
import * as zod from 'zod';

import { TranslateFunc } from '@hooks/useTranslation';

/**
 * Login Schema
 */
export function getLoginSchema(translate: TranslateFunc) {
  return zod.object({
    email: zod.string().email(),
    password: getPasswordSchema(translate),
  });
}
export type LoginSchema = zod.infer<ReturnType<typeof getLoginSchema>>;

/**
 * Reccover Password Schema
 */
export const RecoverPasswordSchema = zod.object({
  email: zod.string().email(),
});
export type ReccoverPasswordSchema = zod.infer<typeof RecoverPasswordSchema>;

/**
 * Reset Password Schema
 */
export function getResetPasswordSchema(translate: TranslateFunc) {
  return zod
    .object({
      password: getPasswordSchema(translate),
      confirmPassword: getPasswordSchema(translate),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: translate('errors.validation.password_mismatch'),
      path: ['confirmPassword'],
    });
}
export type ResetPasswordSchema = zod.infer<
  ReturnType<typeof getResetPasswordSchema>
>;
