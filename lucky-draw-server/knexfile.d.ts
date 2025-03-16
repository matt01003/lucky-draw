import { Knex } from "knex"

declare const config: {
  development: Knex.Config
  production: Knex.Config
}

export default config
