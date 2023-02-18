
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.string('email');
        table.text('password');
        table.enum('status', ['ACTIVE', 'INACTIVE', 'DELETED']).notNullable();
        table.integer('created_by').notNullable();
        table.integer('modified_by');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table
            .timestamp('updated_at')
            .defaultTo(
                knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            );
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users', (table) => {
    });
};
