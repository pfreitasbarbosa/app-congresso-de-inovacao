import Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('events').insert([
    {
      id: 1,
      name: 'Visões de Futuro – Nossa Vida Pessoal com IA',
      start_time: new Date(2020, 10, 16, 14, 0, 0, 0),
      location: 'Auditório Principal - Prédio A',
    },
    {
      id: 2,
      name: 'Visões do Futuro – Nossa Mobilidade com IA',
      start_time: new Date(2020, 10, 17, 16, 30, 0, 0),
      location: 'Auditório Principal - Prédio A',
    },
    {
      id: 3,
      name: 'Introdução ao Java e à Orientação à Objetos',
      description:
        'Os tópicos abordados serão: classes, objetos, atributos, métodos, encapsulamento e polimorfismo utilizando a linguagem de programação Java.',
      start_time: new Date(2020, 10, 18, 17, 0, 0, 0),
      location: 'K2-10 - Prédio K',
    },
  ]);
}