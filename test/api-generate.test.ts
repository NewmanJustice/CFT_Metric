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
  // ...other tests...
});
