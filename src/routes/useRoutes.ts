import { IncomingMessage, ServerResponse } from 'http';
import { userController } from '../controllers/userController';

export const userRoutes = async (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url || '';
  const method = req.method || '';

  const baseUrl = '/api/users';
  const idPattern = /^\/api\/users\/([0-9a-fA-F-]{36})$/;

  if (url === baseUrl && method === 'GET') {
    return userController.getAll(req, res);
  }

  if (url === baseUrl && method === 'POST') {
    return userController.create(req, res);
  }

  const match = url.match(idPattern);
  const id = match?.[1];

  if (id) {
    if (method === 'GET') return userController.getOne(req, res, id);
    if (method === 'PUT') return userController.update(req, res, id);
    if (method === 'DELETE') return userController.remove(req, res, id);
  }

  res.writeHead(404);
  res.end(JSON.stringify({ message: 'Route not found' }));
};
