console.log('Server is alive!');
import dotenv from 'dotenv';
import http from 'http';
import { userRoutes } from './routes/userRoutes';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const url = req.url || '';
  if (url.startsWith('/api/users')) {
    return userRoutes(req, res);
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Route not found' }));
});

server.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
