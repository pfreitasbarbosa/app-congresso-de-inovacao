import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('events_categories', table => {
    table.increments('id').primary();
    table
      .integer('event_id')
      .notNullable()
      .references('id')
      .inTable('events')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .integer('category_id')
      .references('id')
      .inTable('categories')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('events_categories');
}
