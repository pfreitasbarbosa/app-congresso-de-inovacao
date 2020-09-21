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
  });
});
