import Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('categories').insert([
    {
      id: 1,
      name: 'Ciência da Computação',
    },
    {
      id: 2,
      name: 'Administração',
    },
    {
      id: 3,
      name: 'Engenharia Elétrica',
    },
    {
      id: 4,
      name: 'Engenharia Química',
    },
    {
      id: 5,
      name: 'Engenharia Civil',
    },
    {
      id: 6,
      name: 'Engenharia de Produção',
    },
    {
      id: 7,
      name: 'Engenharia de Robôs',
    },
    {
      id: 8,
      name: 'Engenharia Mecânica',
    },
    {
      id: 9,
      name: 'Engenharia de Automação e Controle',
    },
    {
      id: 10,
      name: 'Engenharia de Materiais',
    },
    {
      id: 11,
      name: 'Engenharia Têxtil',
    },
  ]);
}
