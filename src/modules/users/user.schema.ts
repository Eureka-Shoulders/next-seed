import ERROR_MESSAGES from '@config/messages';
import * as zod from 'zod';

import { NewPersonSchema } from '@modules/people/people.schema';

export const UserSchema = zod
  .object({
    email: zod.string().email(ERROR_MESSAGES.invalid_email),
    password: zod.string().min(8, ERROR_MESSAGES.minimum_password),
    confirmPassword: zod.string().min(8, ERROR_MESSAGES.minimum_password),
    person: NewPersonSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ERROR_MESSAGES.password_mismatch,
    path: ['confirmPassword'],
  });

export type UserSchema = zod.infer<typeof UserSchema>;
