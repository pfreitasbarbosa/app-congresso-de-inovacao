import Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('events_speakers').insert([
    {
      event_id: 1,
      speaker_id: 3,
    },
    {
      event_id: 2,
      speaker_id: 1,
    },
    {
      event_id: 2,
      speaker_id: 2,
    },
    {
      event_id: 3,
      speaker_id: 1,
    },
    {
      event_id: 4,
      speaker_id: 2,
    },
    {
      event_id: 5,
      speaker_id: 1,
    },
  ]);
}
