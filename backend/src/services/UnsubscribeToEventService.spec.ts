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

describe('Event unsubscription', () => {
  it('should not be able to unsubscribe to an event without logging in', async () => {
    const response = await request(app).post('/events/unsubscribe/1');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  it('should not be able to unsubscribe to a non existing event', async () => {
    const authResponse = await request(app).post('/sessions').send({
      username: 'unifulano',
      password: '123456',
    });

    const { token } = authResponse.body as AuthenticationResponse;

    const response = await request(app)
      .post('/events/unsubscribe/-200')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should not be able to unsubscribe to a non subscribed event', async () => {
    const authResponse = await request(app).post('/sessions').send({
      username: 'unifulano',
      password: '123456',
    });

    const { token } = authResponse.body as AuthenticationResponse;

    const response = await request(app)
      .post('/events/unsubscribe/4')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should not be able to unsubscribe to a past event', async () => {
    const authResponse = await request(app).post('/sessions').send({
      username: 'unifulano',
      password: '123456',
    });

    const { token } = authResponse.body as AuthenticationResponse;

    const response = await request(app)
      .post('/events/unsubscribe/5')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should be able to unsubscribe to a subscribed event', async () => {
    const authResponse = await request(app).post('/sessions').send({
      username: 'unifulano',
      password: '123456',
    });

    const { token } = authResponse.body as AuthenticationResponse;

    await request(app)
      .post('/events/subscribe/3')
      .set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .post('/events/unsubscribe/3')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should not be able to unsubscribe if presence was confirmed', async () => {
    const authResponse = await request(app).post('/sessions').send({
      username: 'unibeltrano',
      password: '123456',
    });

    const { token } = authResponse.body as AuthenticationResponse;

    await request(app)
      .post('/events/subscribe/1')
      .set('Authorization', `Bearer ${token}`);

    await request(app)
      .post('/events/presence/1')
      .set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .post('/events/unsubscribe/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
