import ERROR_MESSAGES from '@config/messages';
import * as zod from 'zod';

/**
 * Login Schema
 */
export const LoginSchema = zod.object({
  email: zod.string().email(ERROR_MESSAGES.invalid_email),
  password: zod.string().min(8, ERROR_MESSAGES.minimum_password),
});
export type LoginSchema = zod.infer<typeof LoginSchema>;

/**
 * Reccover Password Schema
 */
export const RecoverPasswordSchema = zod.object({
  email: zod.string().email(ERROR_MESSAGES.invalid_email),
});
export type RecoverPasswordSchema = zod.infer<typeof RecoverPasswordSchema>;

/**
 * Reset Password Schema
 */
export const ResetPasswordSchema = zod
  .object({
    password: zod.string().min(8, ERROR_MESSAGES.minimum_password),
    confirmPassword: zod.string().min(8, ERROR_MESSAGES.minimum_password),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ERROR_MESSAGES.password_mismatch,
    path: ['confirmPassword'],
  });
export type ResetPasswordSchema = zod.infer<typeof ResetPasswordSchema>;
