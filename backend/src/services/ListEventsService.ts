import db from '../database/connection';

interface Request {
  id?: number;
  userId: number;
}
interface Event {
  id: number;
  name: string;
  description: string;
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

interface Events_Speakers {
  id: number;
  event_id: number;
  speaker_id: number;
}

interface Speaker {
  id: number;
  name: string;
  email: string;
  linkedin_url: string;
  lattes_url: string;
}

interface Events_Categories {
  id: number;
  event_id: number;
  category_id: number;
}

interface Categories {
  id: number;
  name: string;
}

interface GroupedCategories {
  [key: number]: string[];
}

interface Response {
  id: number;
  name: string;
  description: string | null;
  start_time: Date;
  end_time: Date;
  subscribed: boolean;
  confirmed: boolean;
  location: string;
  speakers: Pick<Speaker, 'name' | 'email' | 'linkedin_url' | 'lattes_url'>[];
  categories: string[];
}

class ListEventsService {
  public async execute(payload: Request): Promise<Response[]> {
    let events: Event[];

    if (payload && payload.id) {
      events = await db.select().from<Event>('events').where({
        id: payload.id,
      });
    } else {
      events = await db.select().from<Event>('events');
    }

    if (events.length === 0) {
      throw new Error('No event was found');
    }

    const eventIds = events.map(event => event.id);
    const speakers = await db
      .select(
        'speakers.id',
        'events_speakers.event_id',
        'name',
        'email',
        'linkedin_url',
        'lattes_url',
      )
      .from<Events_Speakers>('events_speakers')
      .join<Speaker>('speakers', function () {
        this.on('events_speakers.speaker_id', '=', 'speakers.id').onIn(
          'events_speakers.event_id',
          eventIds,
        );
      });

    const eventsWithSpeakers = events.map(event => {
      const eventSpeakers: Pick<
        Speaker,
        'name' | 'email' | 'linkedin_url' | 'lattes_url'
      >[] = speakers
        .filter(speaker => speaker.event_id === event.id)
        .map(({ id, event_id, ...rest }) => rest);

      return { ...event, speakers: eventSpeakers };
    });

    const categories = await db
      .select('event_id', 'name')
      .from<Events_Categories>('events_categories')
      .join<Categories>(
        'categories',
        'categories.id',
        '=',
        'events_categories.category_id',
      );

    const categoriesGroupedByEventId = categories.reduce(
      (group: GroupedCategories, currentCategory) => {
        if (!group[currentCategory.event_id]) {
          group[currentCategory.event_id] = [];
        }
        group[currentCategory.event_id].push(currentCategory.name);

        return group;
      },
      {},
    );

    const eventsWithSpeakersAndCategories = eventsWithSpeakers.map(event => {
      const eventCategories = categoriesGroupedByEventId[event.id];

      return { ...event, categories: eventCategories };
    });

    const subscribedEvents = await db
      .select('event_id', 'confirmed')
      .from<Subscription>('events_subscriptions')
      .where('user_id', payload.userId);

    const eventsWithSpeakersCategoriesAndSubscriptions = eventsWithSpeakersAndCategories.map(
      event => {
        const subscribedEvent = subscribedEvents.find(
          element => element.event_id === event.id,
        );

        if (subscribedEvent) {
          return {
            ...event,
            subscribed: true,
            confirmed: subscribedEvent.confirmed,
          };
        }

        return { ...event, subscribed: false, confirmed: false };
      },
    );

    return eventsWithSpeakersCategoriesAndSubscriptions;
  }
}

export default ListEventsService;
