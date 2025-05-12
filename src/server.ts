import dotenv from 'dotenv';
import http from 'http';
import { requestListener } from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(requestListener);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
