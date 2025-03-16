// migrations/YYYYMMDDHHMMSS_create_registrations_table.js
exports.up = function (knex) {
  return knex.schema.createTable("registrations", (table) => {
    table.increments("id").primary()
    table
      .integer("drawId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("draws")
      .onDelete("CASCADE")
    table.string("userId", 255).notNullable()
    table.datetime("registeredAt").defaultTo(knex.fn.now())
  })
}

exports.down = (knex) => knex.schema.dropTable("registrations")
