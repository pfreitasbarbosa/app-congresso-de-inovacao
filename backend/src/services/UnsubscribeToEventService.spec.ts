import request from 'supertest';
import { subMinutes } from 'date-fns';
import db from '../database/connection';
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

interface Event {
  id: number;
  name: string;
  description: string | null;
  start_time: Date;
  end_time: Date;
  location: string;
}

interface Subscription {
  id: number;
  event_id: number;
  user_id: number;
  event_start: Date;
  event_end: Date;
  confirmed: boolean;
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

    const [{ start_time: previousStartTime }] = await db
      .select('start_time')
      .from<Event>('events')
      .where('id', 1);

    await db
      .from<Subscription>('events_subscriptions')
      .where({
        user_id: 3,
        event_id: 1,
      })
      .update({
        confirmed: true,
      });

    const response = await request(app)
      .post('/events/unsubscribe/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');

    await db
      .from<Subscription>('events_subscriptions')
      .where({
        user_id: 3,
        event_id: 1,
      })
      .update({
        event_start: previousStartTime,
        confirmed: false,
      });
  });
});
