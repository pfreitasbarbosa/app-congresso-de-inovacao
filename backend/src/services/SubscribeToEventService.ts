import { areIntervalsOverlapping } from 'date-fns';

import db from '../database/connection';

interface Subscription {
  id: number;
  event_id: number;
  user_id: number;
  event_start: Date;
  event_end: Date;
}

interface Event {
  id: number;
  name: string;
  description: string;
  start_time: Date;
  location: string;
}

interface Request {
  userId: number;
  eventId: number;
}

interface Response {
  subscriptionId: number;
}

class SubscribeToEventService {
  public async execute({ userId, eventId }: Request): Promise<Response> {
    const alreadySubscribed = await db
      .select()
      .from<Subscription>('events_subscriptions')
      .where({
        user_id: userId,
        event_id: eventId,
      });

    if (alreadySubscribed.length > 0) {
      throw new Error('User already subscribed to that event');
    }

    const [
      {
        start_time: subscribedEventStartTime,
        end_time: subscribedEventEndTime,
      },
    ] = await db
      .select('start_time', 'end_time')
      .from<Event>('events')
      .where({ id: eventId });

    const subscribedEventsTime = await db
      .select('event_start', 'event_end')
      .from<Subscription>('events_subscriptions')
      .where({ user_id: userId });

    subscribedEventsTime.forEach(({ event_start, event_end }) => {
      if (
        areIntervalsOverlapping(
          { start: subscribedEventStartTime, end: subscribedEventEndTime },
          { start: event_start, end: event_end },
        )
      ) {
        throw new Error('User already subscribed to an event in that hour');
      }
    });

    const [{ id }] = await db<Subscription>('events_subscriptions').insert(
      [
        {
          user_id: userId,
          event_id: eventId,
          event_start: subscribedEventStartTime,
          event_end: subscribedEventEndTime,
        },
      ],
      ['id'],
    );

    return { subscriptionId: id };
  }
}

export default SubscribeToEventService;
