import ERROR_MESSAGES from '@config/messages';
import * as zod from 'zod';

export const NewUserSchema = zod
  .object({
    avatar: zod.string().url().nullable(),
    person: zod.object({
      name: zod.string().min(1, ERROR_MESSAGES.required),
    }),
    email: zod.string().email(ERROR_MESSAGES.invalid_email),
    password: zod.string().min(8, ERROR_MESSAGES.minimum_password),
    confirmPassword: zod.string().min(8, ERROR_MESSAGES.minimum_password),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ERROR_MESSAGES.password_mismatch,
    path: ['confirmPassword'],
  });

export type NewUserSchema = zod.infer<typeof NewUserSchema>;

export const UpdateUserSchema = zod.object({
  avatar: zod.string().url().nullable(),
  person: zod.object({
    name: zod.string().min(1, ERROR_MESSAGES.required),
  }),
  email: zod.string().email(ERROR_MESSAGES.invalid_email),
});

export type UpdateUserSchema = zod.infer<typeof UpdateUserSchema>;
