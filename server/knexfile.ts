import path from 'path';
import pathDb from './src/database/pathDatabase';

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(pathDb, 'database.sqlite'),
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true
};