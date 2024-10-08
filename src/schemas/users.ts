import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number().int(),
  name: z.string().trim().min(1),
  email: z.string().email(),
  created_at: z.coerce.date(),
});

export type User = z.infer<typeof UserSchema>;
