import request from 'supertest';
import app from '../app';

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  password?: string;
}

interface AuthenticationResponse {
  user: User;
  token: string;
}

describe('Event subscription', () => {
  it('should not be able to subscribe to an event without logging in', async () => {
    const response = await request(app).post('/events/subscribe/1');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  it('should be able to subscribe to an event', async () => {
    const authResponse = await request(app).post('/sessions').send({
      username: 'unifulano',
      password: '123456',
    });

    const { token } = authResponse.body as AuthenticationResponse;

    const response = await request(app)
      .post('/events/subscribe/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
  });

  it('should not be able to subscribe more than one time to the same event', async () => {
    const authResponse = await request(app).post('/sessions').send({
      username: 'unifulano',
      password: '123456',
    });

    const { token } = authResponse.body as AuthenticationResponse;

    await request(app)
      .post('/events/subscribe/1')
      .set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .post('/events/subscribe/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should not be able to subscribe to two events that occurs in the same time', async () => {
    const authResponse = await request(app).post('/sessions').send({
      username: 'unifulano',
      password: '123456',
    });

    const { token } = authResponse.body as AuthenticationResponse;

    await request(app)
      .post('/events/subscribe/3')
      .set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .post('/events/subscribe/4')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
