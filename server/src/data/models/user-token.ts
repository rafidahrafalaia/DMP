import knex from '../knex';
import baseModel from '../../helpers/model';

const name = 'UserToken';
const tableName = 'user_tokens';
const pk = `${tableName}.id`;

const props = [
    'id',
    'refresh_token',
    'id_user',
    'expired_at',
    'created_at',
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
};
