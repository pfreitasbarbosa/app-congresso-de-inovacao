import Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('events_categories').insert([
    {
      event_id: 1,
      category_id: 1,
    },
    {
      event_id: 1,
      category_id: 2,
    },
    {
      event_id: 1,
      category_id: 3,
    },
    {
      event_id: 2,
      category_id: 1,
    },
    {
      event_id: 2,
      category_id: 3,
    },
    {
      event_id: 2,
      category_id: 5,
    },
    {
      event_id: 3,
      category_id: 1,
    },
    {
      event_id: 3,
      category_id: 3,
    },
    {
      event_id: 4,
      category_id: 1,
    },
    {
      event_id: 4,
      category_id: 3,
    },
    {
      event_id: 5,
      category_id: 1,
    },
    {
      event_id: 5,
      category_id: 3,
    },
  ]);
}
