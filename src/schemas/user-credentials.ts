import { z } from 'zod';

export const UserCredentialSchema = z.object({
  id: z.number().int(),
  user_id: z.number().int(),
  password: z.string(),
  created_at: z.coerce.date(),
});

export type UserCredential = z.infer<typeof UserCredentialSchema>;
