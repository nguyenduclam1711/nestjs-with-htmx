import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number().int(),
  name: z.string().trim().min(1),
  email: z.string().email(),
});

export type User = z.infer<typeof UserSchema>;
