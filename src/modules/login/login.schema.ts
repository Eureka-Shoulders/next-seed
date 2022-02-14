import * as zod from 'zod';

import { TranslateFunc } from '@hooks/useTranslation';

/**
 * Login Schema
 */
export function getLoginSchema(translate: TranslateFunc) {
  return zod.object({
    email: zod.string().email(translate('errors.validation.invalid_email')),
    password: zod
      .string()
      .min(8, translate('errors.validation.minimum_password')),
  });
}
export type LoginSchema = zod.infer<ReturnType<typeof getLoginSchema>>;

/**
 * Reccover Password Schema
 */
export function getRecoverPasswordSchema(translate: TranslateFunc) {
  return zod.object({
    email: zod.string().email(translate('errors.validation.invalid_email')),
  });
}
export type ReccoverPasswordSchema = zod.infer<
  ReturnType<typeof getRecoverPasswordSchema>
>;

/**
 * Reset Password Schema
 */
export function getResetPasswordSchema(translate: TranslateFunc) {
  return zod
    .object({
      password: zod
        .string()
        .min(8, translate('errors.validation.minimum_password')),
      confirmPassword: zod
        .string()
        .min(8, translate('errors.validation.minimum_password')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: translate('errors.validation.password_mismatch'),
      path: ['confirmPassword'],
    });
}
export type ResetPasswordSchema = zod.infer<
  ReturnType<typeof getResetPasswordSchema>
>;
