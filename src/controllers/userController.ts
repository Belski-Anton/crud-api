import { IncomingMessage, ServerResponse } from 'http';
import { validate as isUuid } from 'uuid';
import { User, userModel } from '../models/userModel';

const parseBody = (req: IncomingMessage): Promise<Omit<User, 'id'>> => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        resolve(data);
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });
  });
};

export const userController = {
  async getAll(_: IncomingMessage, res: ServerResponse) {
    const users = userModel.getAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  },

  async getOne(_: IncomingMessage, res: ServerResponse, id: string) {
    if (!isUuid(id)) {
      res.writeHead(400);
      return res.end(JSON.stringify({ message: 'Invalid UUID' }));
    }

    const user = userModel.getById(id);
    if (!user) {
      res.writeHead(404);
      return res.end(JSON.stringify({ message: 'User not found' }));
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  },

  async create(req: IncomingMessage, res: ServerResponse) {
    try {
      const data = await parseBody(req);

      const { username, age, hobbies } = data;

      if (
        typeof username !== 'string' ||
        typeof age !== 'number' ||
        !Array.isArray(hobbies)
      ) {
        res.writeHead(400);
        return res.end(JSON.stringify({ message: 'Invalid user data' }));
      }

      const newUser = userModel.create({ username, age, hobbies });
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    } catch {
      res.writeHead(400);
      res.end(JSON.stringify({ message: 'Invalid JSON' }));
    }
  },

  async update(req: IncomingMessage, res: ServerResponse, id: string) {
    if (!isUuid(id)) {
      res.writeHead(400);
      return res.end(JSON.stringify({ message: 'Invalid UUID' }));
    }

    try {
      const data = await parseBody(req);

      const { username, age, hobbies } = data;

      if (
        typeof username !== 'string' ||
        typeof age !== 'number' ||
        !Array.isArray(hobbies)
      ) {
        res.writeHead(400);
        return res.end(JSON.stringify({ message: 'Invalid user data' }));
      }

      const updated = userModel.update(id, { username, age, hobbies });
      if (!updated) {
        res.writeHead(404);
        return res.end(JSON.stringify({ message: 'User not found' }));
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(updated));
    } catch {
      res.writeHead(400);
      res.end(JSON.stringify({ message: 'Invalid JSON' }));
    }
  },

  async remove(_: IncomingMessage, res: ServerResponse, id: string) {
    if (!isUuid(id)) {
      res.writeHead(400);
      return res.end(JSON.stringify({ message: 'Invalid UUID' }));
    }

    const deleted = userModel.delete(id);
    if (!deleted) {
      res.writeHead(404);
      return res.end(JSON.stringify({ message: 'User not found' }));
    }

    res.writeHead(204);
    res.end();
  },
};
