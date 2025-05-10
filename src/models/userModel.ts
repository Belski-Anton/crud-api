import { v4 as uuidv4 } from 'uuid';

export type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

const users: User[] = [];

export const userModel = {
  getAll: () => users,

  getById: (id: string) => users.find((user) => user.id === id),

  create: (data: Omit<User, 'id'>): User => {
    const newUser: User = { id: uuidv4(), ...data };
    users.push(newUser);
    return newUser;
  },

  update: (id: string, data: Omit<User, 'id'>): User | null => {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return null;
    users[index] = { id, ...data };
    return users[index];
  },

  delete: (id: string): boolean => {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
  },
};
