import http from 'http';
import supertest from 'supertest';
import { requestListener } from '../../app'; 

const server = http.createServer(requestListener);
const request = supertest(server);

describe('Users API E2E', () => {
  let userId: string;

  it('GET /api/users → 200, empty array', async () => {
    const res = await request.get('/api/users');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /api/users → 201, create user', async () => {
    const res = await request.post('/api/users').send({
      username: 'Alice',
      age: 28,
      hobbies: ['reading'],
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    userId = res.body.id;
  });

  it('GET /api/users/:id → 200, created user', async () => {
    const res = await request.get(`/api/users/${userId}`);
    expect(res.status).toBe(200);
    expect(res.body.username).toBe('Alice');
  });

  it('PUT /api/users/:id → 200, updated user', async () => {
    const res = await request.put(`/api/users/${userId}`).send({
      username: 'Bob',
      age: 30,
      hobbies: ['gaming'],
    });
    expect(res.status).toBe(200);
    expect(res.body.username).toBe('Bob');
  });

  it('DELETE /api/users/:id → 204', async () => {
    const res = await request.delete(`/api/users/${userId}`);
    expect(res.status).toBe(204);
  });

  it('GET /api/users/:id → 404 after deletion', async () => {
    const res = await request.get(`/api/users/${userId}`);
    expect(res.status).toBe(404);
  });
});
