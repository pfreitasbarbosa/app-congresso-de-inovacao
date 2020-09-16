import 'dotenv/config';

import knex from 'knex';

const config = require('../../knexfile');

let db = knex(config.development);

switch (process.env.NODE_ENV) {
  case 'development': {
    db = knex(config.development);
    break;
  }

  case 'test': {
    db = knex(config.test);
    break;
  }

  default: {
    break;
  }
}

export default db;
