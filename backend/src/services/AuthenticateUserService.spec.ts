import request from 'supertest';
import app from '../app';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const response = await request(app).post('/sessions').send({
      username: 'unifulano',
      password: '123456',
    });

    expect(response.body).toHaveProperty('token');
  });

  it('should not be able to authenticate with wrong username', async () => {
    const response = await request(app).post('/sessions').send({
      username: 'wrong-user',
      password: '123456',
    });

    expect(response.body).toHaveProperty('error');
  });

  it('should not be able to authenticate with wrong password', async () => {
    const response = await request(app).post('/sessions').send({
      username: 'unifulano',
      password: 'wrong-password',
    });

    expect(response.body).toHaveProperty('error');
  });
});
