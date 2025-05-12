import { ServerResponse } from 'http';

export const handleServerError = (res: ServerResponse, error?: unknown) => {
  console.error('[500 Error]', error);

  res.writeHead(500, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Internal Server Error' }));
};
