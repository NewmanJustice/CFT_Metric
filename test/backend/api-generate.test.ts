import * as request from 'supertest';
import * as express from 'express';
import * as cors from 'cors';
import { Server } from 'http';
import app from '../../backend/app';

describe('POST /api/generate', () => {
  let server: Server;
  beforeAll((done) => {
    server = app.listen(5001, done);
  });
  afterAll((done) => {
    server.close(done);
  });

  it('should generate DORA and SPACE metrics with correct fields', async () => {
    const res = await request(app)
      .post('/api/generate')
      .send({ metrics: ['dora', 'space'], count: 2, month: '2025-06', teams: ['Alpha', 'Beta'] })
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body.dora).toHaveLength(2);
    expect(res.body.space).toHaveLength(2);
    expect(res.body.dora[0]).toHaveProperty('teamName');
    expect(res.body.dora[0]).toHaveProperty('month', '2025-06');
    expect(['Alpha', 'Beta']).toContain(res.body.dora[0].teamName);
    expect(res.body.space[0]).toHaveProperty('teamName');
    expect(res.body.space[0]).toHaveProperty('month', '2025-06');
    expect(['Alpha', 'Beta']).toContain(res.body.space[0].teamName);
  });
});
