import * as zod from 'zod';

import { getPasswordSchema } from '@config/schemas/password.schema';

import { TranslateFunc } from '@services/translation';

/**
 * Login Schema
 */
export function getLoginSchema(translate: TranslateFunc) {
  return zod.object({
    email: zod.string().min(1).max(100),
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
export type RecoverPasswordValues = zod.infer<typeof RecoverPasswordSchema>;

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
export type ResetPasswordSchema = zod.infer<ReturnType<typeof getResetPasswordSchema>>;

/**
 * Confirm Password Schema
 */
export function getChangePasswordSchema(translate: TranslateFunc) {
  return zod.object({
    newPassword: getPasswordSchema(translate),
  });
}
export type ChangePasswordValues = zod.infer<ReturnType<typeof getChangePasswordSchema>>;
