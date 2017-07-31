exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('inventory', function(table) {
      table.increments('id').primary()
      table.string('title')
      table.string('description')
      table.string('image')
      table.decimal('price')
      table.timestamps(true, true)
    }),
    knex.schema.createTable('order_history', function(table) {
      table.increments('id').primary()
      table.string('date')
      table.string('total')
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('inventory'),
    knex.schema.dropTable('order_history')
  ])
};
