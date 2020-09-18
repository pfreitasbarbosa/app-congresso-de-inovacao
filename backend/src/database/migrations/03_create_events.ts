import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('events', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('description');
    table.timestamp('start_time').notNullable();
    table.string('location').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('events');
}
