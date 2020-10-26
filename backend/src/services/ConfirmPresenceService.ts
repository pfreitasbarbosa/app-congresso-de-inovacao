import { isAfter } from 'date-fns';

import db from '../database/connection';

interface Event {
  id: number;
  type: string;
  name: string;
  description: string;
  start_time: Date;
  location: string;
  end_time: Date;
}

interface Subscription {
  id: number;
  event_id: number;
  user_id: number;
  event_start: Date;
  event_end: Date;
  confirmed: boolean;
}

interface Request {
  eventId: number;
  userId: number;
}

class ConfirmPresenceService {
  public async execute({ eventId, userId }: Request): Promise<Subscription> {
    const [eventExists = undefined] = await db
      .select()
      .from<Event>('events')
      .where('id', eventId);

    if (!eventExists) {
      throw new Error('There is no event with provided id');
    }

    const [userSubscription = undefined] = await db
      .select()
      .from<Subscription>('events_subscriptions')
      .where({ user_id: userId, event_id: eventId });

    if (!userSubscription) {
      throw new Error('User is not subscribed to this event');
    }

    if (userSubscription.confirmed) {
      throw new Error("User's presence was already confirmed");
    }

    if (isAfter(new Date(), userSubscription.event_start)) {
      throw new Error("Can't confirm presence in an ongoing or past event");
    }

    await db
      .select()
      .from<Subscription>('events_subscriptions')
      .where({
        user_id: userId,
        event_id: eventId,
      })
      .update({
        confirmed: true,
      });

    const [confirmedSubscription] = await db
      .select()
      .from<Subscription>('events_subscriptions')
      .where({ user_id: userId, event_id: eventId });

    return confirmedSubscription;
  }
}

export default ConfirmPresenceService;
