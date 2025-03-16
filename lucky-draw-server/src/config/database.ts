import type { Knex } from "knex"
import knex from "knex"
import config from "../../knexfile"

const db: Knex = knex(config.development)

async function initDB(): Promise<void> {
  try {
    await db.migrate.latest()
  } catch (err) {
    process.exit(1)
  }
}

initDB()

export default db
