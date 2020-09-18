import Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('speakers').insert([
    {
      id: 1,
      name: 'Danilo Perico',
      email: 'dperico@fei.edu.br',
      lattes_url: 'http://lattes.cnpq.br/5676806579817092',
    },
    {
      id: 2,
      name: 'Guilherme Wachs',
      email: 'gwachs.edu.br',
      linkedin_url:
        'https://www.linkedin.com/in/guilherme-wachs-lopes-b5a01446',
      lattes_url: 'http://lattes.cnpq.br/4456728413230670',
    },
    {
      id: 3,
      name: 'Gustavo Donato',
      email: 'gdonato.edu.br',
      linkedin_url: 'https://www.linkedin.com/in/prof-gustavo-donato/',
      lattes_url: 'http://lattes.cnpq.br/4230969931642680',
    },
  ]);
}
