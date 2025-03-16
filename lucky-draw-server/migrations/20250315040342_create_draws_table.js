// migrations/YYYYMMDDHHMMSS_create_draws_table.js
exports.up = function (knex) {
  return knex.schema.createTable("draws", (table) => {
    table.increments("id").primary()
    table.datetime("drawTime").notNullable()
    table.string("status", 10).notNullable().checkIn(["pending", "completed"])
    // table.timestamps(true, true)
  })
}

exports.down = (knex) => knex.schema.dropTable("draws")
