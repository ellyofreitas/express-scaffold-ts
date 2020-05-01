import request from 'supertest';

import app from '../../app';

describe('Server', () => {
  test('should server is online', async () => {
    const response = await request(app).get('/');

    expect(response.body).toEqual({ server: 'online 🚀' });
  });
});
