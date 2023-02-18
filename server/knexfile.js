const path = require('path');

const BASE_PATH = path.join(__dirname, 'src', 'data');

module.exports = {
    localhost: {
        client: 'mysql',
        connection: {
            multipleStatements: true,
            host: '127.0.0.1',
            database: 'test',
            user: 'root',
            password: '',
            port: 8080,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: path.join(BASE_PATH, 'migrations'),
        },
        seeds: {
            directory: path.join(BASE_PATH, 'seeds'),
        },
    },
    production: {
        client: 'mysql',
        connection: {
            multipleStatements: true,
            host: '127.0.0.1',
            database: 'test',
            user: 'root',
            password: '',
            port: 8080,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: path.join(BASE_PATH, 'migrations'),
        },
        seeds: {
            directory: path.join(BASE_PATH, 'seeds'),
        },
    },
    development: {
        client: 'mysql',
        connection: {
            multipleStatements: true,
            host: '127.0.0.1',
            database: 'test',
            user: 'root',
            password: '',
            port: 8080,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: path.join(BASE_PATH, 'migrations'),
        },
        seeds: {
            directory: path.join(BASE_PATH, 'seeds'),
        },
    },

    staging: {
        client: 'mysql',
        connection: {
            multipleStatements: true,
            host: '127.0.0.1',
            database: 'test',
            user: 'root',
            password: '',
            port: 8080,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: path.join(BASE_PATH, 'migrations'),
        },
        seeds: {
            directory: path.join(BASE_PATH, 'seeds'),
        },
    },

};
