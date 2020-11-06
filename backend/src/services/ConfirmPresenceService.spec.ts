import request from 'supertest';
import { subMinutes, isBefore, add } from 'date-fns';
import app from '../app';
import db from '../database/connection';

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

interface Subscription {
  id: number;
  event_id: number;
  user_id: number;
  event_start: Date;
  event_end: Date;
  confirmed: boolean;
}

interface Event {
  id: number;
  name: string;
  description: string | null;
  start_time: Date;
  end_time: Date;
  location: string;
}

describe('Event subscription', () => {
  it('should not be able to confirm presence to an event without logging in', async () => {
    const response = await request(app).post('/events/presence/1');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  it('should not be able to confirm presence to a non existing event', async () => {
    const authResponse = await request(app).post('/sessions').send({
      username: 'unifulano',
      password: '123456',
    });

    const { token } = authResponse.body as AuthenticationResponse;

    const response = await request(app)
      .post('/events/presence/-200')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should be able to confirm presence to an event', async () => {
    const authResponse = await request(app).post('/sessions').send({
      username: 'unifulano',
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
        user_id: 1,
        event_id: 1,
      })
      .update({
        event_start: add(new Date(), { minutes: 20 }),
        confirmed: false,
      });

    const response = await request(app)
      .post('/events/presence/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(Boolean(response.body.confirmed)).toBe(true);

    await db
      .from<Subscription>('events_subscriptions')
      .where({
        user_id: 1,
        event_id: 1,
      })
      .update({
        event_start: previousStartTime,
        confirmed: false,
      });
  });

  it('should not be able to confirm presence outside the allowed time frame', async () => {
    const authResponse = await request(app).post('/sessions').send({
      username: 'unifulano',
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
        user_id: 1,
        event_id: 1,
      })
      .update({
        event_start: add(new Date(), { minutes: 50 }),
        confirmed: false,
      });

    const [teste] = await db
      .select('event_start')
      .from<Subscription>('events_subscriptions')
      .where({ user_id: 1, event_id: 1 });

    const response = await request(app)
      .post('/events/presence/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');

    await db
      .from<Subscription>('events_subscriptions')
      .where({
        user_id: 1,
        event_id: 1,
      })
      .update({
        event_start: previousStartTime,
      });
  });

  it('should not be able to confirm presence more than one time to the same event', async () => {
    const authResponse = await request(app).post('/sessions').send({
      username: 'unifulano',
      password: '123456',
    });

    const { token } = authResponse.body as AuthenticationResponse;

    await request(app)
      .post('/events/subscribe/1')
      .set('Authorization', `Bearer ${token}`);

    await db
      .from<Subscription>('events_subscriptions')
      .where({ event_id: 1, user_id: 1 })
      .update('confirmed', true);

    const response = await request(app)
      .post('/events/presence/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should not be able to confirm presence to a ongoing or past event', async () => {
    const authResponse = await request(app).post('/sessions').send({
      username: 'unicicrano',
      password: '123456',
    });

    const { token } = authResponse.body as AuthenticationResponse;

    const response = await request(app)
      .post('/events/presence/6')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should not be able to confirm presence in an unsubscribed event', async () => {
    const authResponse = await request(app).post('/sessions').send({
      username: 'unifulano',
      password: '123456',
    });

    const { token } = authResponse.body as AuthenticationResponse;

    await request(app)
      .post('/events/unsubscribe/3')
      .set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .post('/events/presence/3')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
