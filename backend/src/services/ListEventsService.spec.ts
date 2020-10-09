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

describe('ListEvents', () => {
  it('should not list events if token is not provided', async () => {
    const response = await request(app).get('/events');

    expect(response.body).toHaveProperty('error');
  });

  it('should list all registered events with correct attributes', async () => {
    const authResponse = await request(app).post('/sessions').send({
      username: 'unifulano',
      password: '123456',
    });

    const { token } = authResponse.body as AuthenticationResponse;

    const response = await request(app)
      .get('/events')
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toBeInstanceOf(Array);

    expect(response.body[0]).toHaveProperty('id', 1);
    expect(response.body[0]).toHaveProperty('type');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('description');
    expect(response.body[0]).toHaveProperty('start_time');
    expect(response.body[0]).toHaveProperty('location');
    expect(response.body[0]).toHaveProperty('speakers');
    expect(response.body[0]).toHaveProperty('categories');
    expect(response.body[0]).toHaveProperty('confirmed');
    expect(response.body[0]).toHaveProperty('subscribed');
  });

  it('should list one event if id is provided', async () => {
    const authResponse = await request(app).post('/sessions').send({
      username: 'unifulano',
      password: '123456',
    });

    const { token } = authResponse.body as AuthenticationResponse;

    const response = await request(app)
      .get('/events/2')
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toHaveProperty('id', 2);
    expect(response.body).toHaveProperty('type');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('start_time');
    expect(response.body).toHaveProperty('location');
    expect(response.body).toHaveProperty('speakers');
    expect(response.body).toHaveProperty('categories');
  });

  it('should throw an error if provided event id does not exists', async () => {
    const authResponse = await request(app).post('/sessions').send({
      username: 'unifulano',
      password: '123456',
    });

    const { token } = authResponse.body as AuthenticationResponse;

    const response = await request(app)
      .get('/events/30')
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toHaveProperty('error');
  });
});
