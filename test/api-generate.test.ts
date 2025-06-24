/**
 * @jest-environment node
 */

import request from 'supertest';
import app from '../backend/index';

// Sanity check to ensure file loads
console.log('api-generate.test.ts: file loaded');

describe('POST /api/generate', () => {
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

  it('returns 400 for missing metrics', async () => {
    const res = await request(app)
      .post('/api/generate')
      .send({ count: 1, month: '2025-09', teams: ['Team Delta'] })
      .set('Accept', 'application/json');
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('returns 400 for missing teams', async () => {
    const res = await request(app)
      .post('/api/generate')
      .send({ metrics: ['dora'], count: 1, month: '2025-10' })
      .set('Accept', 'application/json');
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('returns 400 for invalid metric', async () => {
    const res = await request(app)
      .post('/api/generate')
      .send({ metrics: ['invalid'], count: 1, month: '2025-11', teams: ['Team Epsilon'] })
      .set('Accept', 'application/json');
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('returns 400 for missing month', async () => {
    const res = await request(app)
      .post('/api/generate')
      .send({ metrics: ['dora'], count: 1, teams: ['Team Zeta'] })
      .set('Accept', 'application/json');
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('returns 400 for missing count', async () => {
    const res = await request(app)
      .post('/api/generate')
      .send({ metrics: ['dora'], month: '2025-12', teams: ['Team Eta'] })
      .set('Accept', 'application/json');
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('returns 400 for count less than 1', async () => {
    const res = await request(app)
      .post('/api/generate')
      .send({ metrics: ['dora'], count: 0, month: '2025-12', teams: ['Team Theta'] })
      .set('Accept', 'application/json');
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});
