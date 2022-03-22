import * as zod from 'zod';

export const ProfileSchema = zod.object({
  person: zod.object({
    name: zod.string().min(1),
  }),
  email: zod.string().email(),
});

export type ProfileSchema = zod.infer<typeof ProfileSchema>;
