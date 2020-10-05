import Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('events').insert([
    {
      id: 1,
      type: 'Palestra',
      name: 'Visões de Futuro – Nossa Vida Pessoal com IA',
      start_time: new Date(2020, 10, 16, 14, 0, 0, 0),
      end_time: new Date(2020, 10, 16, 14, 20, 0, 0),
      location: 'Auditório Principal - Prédio A',
    },
    {
      id: 2,
      type: 'Palestra',
      name: 'Visões do Futuro – Nossa Mobilidade com IA',
      start_time: new Date(2020, 10, 17, 16, 30, 0, 0),
      end_time: new Date(2020, 10, 17, 17, 10, 0, 0),
      location: 'Auditório Principal - Prédio A',
    },
    {
      id: 3,
      type: 'Oficina',
      name: 'Introdução ao Java e à Orientação à Objetos',
      description:
        'Os tópicos abordados serão: classes, objetos, atributos, métodos, encapsulamento e polimorfismo utilizando a linguagem de programação Java.',
      start_time: new Date(2020, 10, 18, 17, 0, 0, 0),
      end_time: new Date(2020, 10, 18, 20, 30, 0, 0),
      location: 'K2-10 - Prédio K',
    },
    {
      id: 4,
      type: 'Oficina',
      name: 'Introdução ao C++ e à Orientação à Objetos',
      description:
        'Os tópicos abordados serão: classes, objetos, atributos, métodos, encapsulamento e polimorfismo utilizando a linguagem de programação Java.',
      start_time: new Date(2020, 10, 18, 17, 30, 0, 0),
      end_time: new Date(2020, 10, 18, 21, 0, 0, 0),
      location: 'K2-09 - Prédio K',
    },
  ]);
}
