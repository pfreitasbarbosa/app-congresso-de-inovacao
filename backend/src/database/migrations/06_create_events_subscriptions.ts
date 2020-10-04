import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('events_subscriptions', table => {
    table.increments('id').primary();
    table
      .integer('event_id')
      .notNullable()
      .references('id')
      .inTable('events')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.timestamp('event_start').notNullable();
    table.timestamp('event_end');
    table.boolean('confirmed').defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('events_subscriptions');
}
