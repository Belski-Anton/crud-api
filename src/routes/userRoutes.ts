import { IncomingMessage, ServerResponse } from 'http';
import { validate as isUuid } from 'uuid';
import { userController } from '../controllers/userController';

export const userRoutes = async (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url || '';
  const method = req.method || '';

  const baseUrl = '/api/users';

  if ((url === baseUrl || url === `${baseUrl}/`) && method === 'GET') {
    return userController.getAll(req, res);
  }

  if ((url === baseUrl || url === `${baseUrl}/`) && method === 'POST') {
    return userController.create(req, res);
  }

  const match = url.match(/^\/api\/users\/([a-zA-Z0-9-]+)\/?$/);
  const id = match?.[1];

  if (id) {
    if (!isUuid(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'Invalid UUID' }));
    }

    if (method === 'GET') return userController.getOne(req, res, id);
    if (method === 'PUT') return userController.update(req, res, id);
    if (method === 'DELETE') return userController.remove(req, res, id);
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Endpoint not found' }));
};
