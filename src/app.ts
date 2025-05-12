import { userRoutes } from './routes/userRoutes';
import { IncomingMessage, ServerResponse } from 'http';

export const requestListener = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url || '';
  if (url.startsWith('/api/users')) {
    return userRoutes(req, res);
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Route not found' }));
};
