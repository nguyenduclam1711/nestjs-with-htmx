import { z } from 'zod';
import { UserCredential } from './user-credentials';

export const USER_STATUSES = ['active', 'inactive'] as const;

export const UserStatus = USER_STATUSES.reduce(
  (acc, status) => {
    return {
      ...acc,
      [status]: status,
    };
  },
  {} as {
    [key in (typeof USER_STATUSES)[number]]: key;
  },
);

export const UserSchema = z.object({
  id: z.number().int(),
  name: z.string().trim().min(1),
  email: z.string().email(),
  created_at: z.coerce.date(),
  status: z.enum(USER_STATUSES),
});

export type User = z.infer<typeof UserSchema>;

export const CreateUserBodySchema = UserSchema.pick({
  name: true,
  email: true,
});

export type CreateUserBody = z.infer<typeof CreateUserBodySchema>;

export const UpdateUserBodySchema = UserSchema.pick({
  name: true,
  email: true,
});

export type UpdateUserBody = z.infer<typeof UpdateUserBodySchema>;

export type SearchUserItem = User & Pick<UserCredential, 'user_id'>;
export type SearchUsers = Array<SearchUserItem>;
