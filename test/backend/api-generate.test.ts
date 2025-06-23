import request from 'supertest';
import app from '../../backend/index';

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
      .send({ metrics: ['space'], count: 1, month: '2025-06', teams: ['Team Beta'] })
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body.space).toBeDefined();
    expect(res.body.space.length).toBe(1);
    expect(res.body.space[0].teamName).toBe('Team Beta');
  });

  it('returns both DORA and SPACE metrics', async () => {
    const res = await request(app)
      .post('/api/generate')
      .send({ metrics: ['dora', 'space'], count: 1, month: '2025-06', teams: ['Team Gamma'] })
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body.dora).toBeDefined();
    expect(res.body.space).toBeDefined();
  });

  it('should generate DORA and SPACE metrics data', async () => {
    const res = await request(app)
      .post('/api/generate')
      .send({
        metrics: ['dora', 'space'],
        count: 5,
        month: '2025-06',
        teams: ['Team Alpha', 'Team Beta'],
      })
      .expect(200);
    expect(res.body).toHaveProperty('dora');
    expect(res.body).toHaveProperty('space');
    expect(Array.isArray(res.body.dora)).toBe(true);
    expect(Array.isArray(res.body.space)).toBe(true);
    expect(res.body.dora.length).toBeGreaterThan(0);
    expect(res.body.space.length).toBeGreaterThan(0);
  });

  it('should generate only DORA metrics if requested', async () => {
    const res = await request(app)
      .post('/api/generate')
      .send({
        metrics: ['dora'],
        count: 3,
        month: '2025-06',
        teams: ['Team Alpha'],
      })
      .expect(200);
    expect(res.body).toHaveProperty('dora');
    expect(res.body).not.toHaveProperty('space');
    expect(Array.isArray(res.body.dora)).toBe(true);
    expect(res.body.dora.length).toBeGreaterThan(0);
  });

  it('should return 400 for missing metrics', async () => {
    const res = await request(app)
      .post('/api/generate')
      .send({ count: 2, month: '2025-06', teams: ['Team Alpha'] });
    expect(res.status).toBe(400);
  });
});
