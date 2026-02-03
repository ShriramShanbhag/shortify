/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('urls', (table) => {
        table.bigIncrements('id').primary();
        table.text('original_url').notNullable();
        table.string('short_code', 10).notNullable().unique();
        table.integer('visit_count').defaultTo(0);
        table.timestamps(true, true);
        table.index(['short_code']);
    })

    .createTable('visits', (table) => {
        table.bigIncrements('id').primary();
        table.bigInteger('url_id').unsigned().notNullable()
            .references('id').inTable('urls')
            .onDelete('CASCADE');
        table.specificType('ip_address', 'inet');
        table.text('user_agent');
        table.timestamp('visited_at').defaultTo(knex.fn.now());
        table.index(['url_id']);
    });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema
        .dropTableIfExists('visits')
        .dropTableIfExists('urls');
  
};
