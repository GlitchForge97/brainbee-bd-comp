const request = require('supertest');
const app = require('../src/index');

describe('GET /api/status', () => {
  it('returns ok status and service name', async () => {
    const res = await request(app).get('/api/status');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('ok', true);
    expect(res.body).toHaveProperty('service');
  });
});
