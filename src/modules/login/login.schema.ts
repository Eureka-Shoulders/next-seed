import ERROR_MESSAGES from '@config/messages';
import * as zod from 'zod';

export const LoginSchema = zod.object({
  email: zod.string().email(ERROR_MESSAGES.invalid_email),
  password: zod.string().min(8, ERROR_MESSAGES.minimum_password),
});

export type LoginSchema = zod.infer<typeof LoginSchema>;
