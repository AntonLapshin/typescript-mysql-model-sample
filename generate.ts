import { TsBuilder } from "typescript-mysql-model"
import * as Knex from "knex"

// Create a knex instance
var knex = Knex({
  client: 'mysql',
  connection: {
    host: 'ensembldb.ensembl.org',
    user: 'anonymous',
    password: '',
    database: 'takifugu_rubripes_core_82_4',
  },
});

async function build() {
  // init and call respective function with a folder that exists
  let tsBuilder = await new TsBuilder().init(knex)
  tsBuilder.renderClassFiles('./db/inserter/')
  tsBuilder.renderInserter('./db/inserter/')
  tsBuilder.renderTableFile('./db/')
  tsBuilder.renderViewFile('./db/')
  tsBuilder.renderStoredProcedure('./db/')
  knex.destroy()
}

build()