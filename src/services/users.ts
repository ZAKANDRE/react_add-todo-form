import usersFromServer from '../api/users';
import { User } from '../types/user';

export const getUserById = (userId: number): User | null => {
  return usersFromServer.find(user => user.id === userId) || null;
};
