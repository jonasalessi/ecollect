import knex from 'knex';
import path from 'path';
import pathDb from './pathDatabase';

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(pathDb, 'database.sqlite'),
    },
    useNullAsDefault: true
});

export default connection;