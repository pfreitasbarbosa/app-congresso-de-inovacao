import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('speakers', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('linkedin_url').unique();
    table.string('lattes_url').unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('speakers');
}
