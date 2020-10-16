import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('events', table => {
    table.timestamp('end_time');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('events', table => {
    table.dropColumn('end_time');
  });
}
