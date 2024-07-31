import { z } from 'zod';

export const TodoSchema = z.object({
  id: z.number().int(),
  name: z.string().trim().min(1),
  email: z.string().email(),
});

export const TodoWithoutIdSchema = TodoSchema.omit({
  id: true,
});

export type Todo = z.infer<typeof TodoSchema>;

export type TodoWithoutId = z.infer<typeof TodoWithoutIdSchema>;
