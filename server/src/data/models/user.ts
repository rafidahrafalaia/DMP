import knex from '../knex';
import baseModel from '../../helpers/model';

const name = 'User';
const tableName = 'users';
const pk = `${tableName}.id`;

enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    DELETED = 'DELETED'
}

const props = [
    'id',
    'email',
    'status',
    'password',
    'created_by',
    'created_at',
    'modified_by',
    'updated_at',
];

const selectableProps = props.map(each => `${tableName}.${each}`);

export default {
    ...baseModel({
        knex,
        name,
        tableName,
        selectableProps,
    }),
    pk,
    props,
    Status,
};
