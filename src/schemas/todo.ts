import { z } from 'zod';

export const TodoSchema = z.object({
  id: z.number().int(),
  name: z.string().nonempty(),
});

export const TodoWithoutIdSchema = TodoSchema.omit({
  id: true,
});

export type Todo = z.infer<typeof TodoSchema>;

export type TodoWithoutId = z.infer<typeof TodoWithoutIdSchema>;
