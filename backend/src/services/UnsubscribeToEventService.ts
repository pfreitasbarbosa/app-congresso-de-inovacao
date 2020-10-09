import { isAfter } from 'date-fns';

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

class UnsubscribeToEventService {
  public async execute({ userId, eventId }: Request): Promise<void> {
    const [eventExists = undefined] = await db
      .select()
      .from<Event>('events')
      .where('id', eventId);

    if (!eventExists) {
      throw new Error('There is no event with provided id');
    }

    const [subscribedEvent = undefined] = await db
      .select()
      .from<Subscription>('events_subscriptions')
      .where({
        user_id: userId,
        event_id: eventId,
      });

    if (!subscribedEvent) {
      throw new Error(
        "Can't unsubscribe to an event you haven't subscribed to",
      );
    }

    if (isAfter(new Date(), subscribedEvent.event_end)) {
      throw new Error("Can't unsubscribe to a past event");
    }

    await db('events_subscriptions')
      .where({ user_id: userId, event_id: eventId })
      .del();
  }
}

export default UnsubscribeToEventService;
