import Knex from 'knex';
import { hash } from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
  const pass = await hash('123456', 8);

  await knex('users').insert([
    {
      name: 'Fulano',
      email: 'unifulano@fei.edu.br',
      username: 'unifulano',
      password: pass,
    },
    {
      name: 'Cicrano',
      email: 'unicicrano@fei.edu.br',
      username: 'unicicrano',
      password: pass,
    },
    {
      name: 'Beltrano',
      email: 'unibeltrano@fei.edu.br',
      username: 'unibeltrano',
      password: pass,
    },
  ]);
}
