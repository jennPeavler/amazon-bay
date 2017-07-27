exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('inventory', function(table) {
      table.increments('id').primary()
      table.string('title')
      table.string('description')
      table.string('image')
      table.decimal('price')
      table.timestamps(true, true)
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('inventory')
  ])
};
