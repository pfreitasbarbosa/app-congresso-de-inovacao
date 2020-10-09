import Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('events_subscriptions').insert([
    {
      event_id: 5,
      user_id: 1,
      event_start: new Date(2019, 10, 18, 17, 30, 0, 0),
      event_end: new Date(2019, 10, 18, 21, 0, 0, 0),
    },
  ]);
}
