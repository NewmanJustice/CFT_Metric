import request from 'supertest';
import app from '../../backend/app';

// Polyfill TextEncoder for Node.js
global.TextEncoder = require('util').TextEncoder;

describe('POST /api/generate (integration)', () => {
  it('returns DORA metrics', async () => {
    const res = await request(app)
      .post('/api/generate')
      .send({ metrics: ['dora'], count: 2, month: '2025-06', teams: ['Team Alpha'] })
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body.dora).toBeDefined();
    expect(res.body.dora.length).toBe(2);
    expect(res.body.dora[0].teamName).toBe('Team Alpha');
  });

  it('returns SPACE metrics', async () => {
    const res = await request(app)
      .post('/api/generate')
      .send({ metrics: ['space'], count: 3, month: '2025-07', teams: ['Team Beta'] })
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body.space).toBeDefined();
    expect(res.body.space.length).toBe(3);
    expect(res.body.space[0].teamName).toBe('Team Beta');
  });

  it('returns both DORA and SPACE metrics', async () => {
    const res = await request(app)
      .post('/api/generate')
      .send({ metrics: ['dora', 'space'], count: 1, month: '2025-08', teams: ['Team Gamma'] })
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body.dora).toBeDefined();
    expect(res.body.space).toBeDefined();
    expect(res.body.dora.length).toBe(1);
    expect(res.body.space.length).toBe(1);
    expect(res.body.dora[0].teamName).toBe('Team Gamma');
    expect(res.body.space[0].teamName).toBe('Team Gamma');
  });
});
