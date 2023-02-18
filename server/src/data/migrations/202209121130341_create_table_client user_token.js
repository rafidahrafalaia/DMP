exports.up = function (knex, Promise) {
    return knex.schema.createTable('user_tokens', (table) => {
        table.increments();
        table.text('refresh_token').notNullable();
        table.integer('id_user').unique().nullable();
        table.timestamp('expired_at').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table
            .timestamp('modified_at')
            .defaultTo(
                knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            );
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('user_tokens');
};
