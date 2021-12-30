import ERROR_MESSAGES from '@config/messages';
import * as zod from 'zod';

export const RegisterSchema = zod.object({
  username: zod.string().min(1, ERROR_MESSAGES.required),
  email: zod.string().email(ERROR_MESSAGES.invalid_email),
  password: zod.string().min(8, ERROR_MESSAGES.minimum_password),
});

export type RegisterSchema = zod.infer<typeof RegisterSchema>;
