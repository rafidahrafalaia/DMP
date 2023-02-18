import Knex from 'knex';

import faker from 'faker';

const createUsers = () => ({
    name: faker.name.findName(),
    description: faker.lorem.word(),
});

exports.seed = async (knex: Knex) => {
    const users = [];
    for (let i = 0; i < 10; i += 1) {
        users.push(createUsers());
    }
    await knex('users').insert(users);
};
