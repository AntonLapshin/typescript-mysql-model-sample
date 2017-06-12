import * as Knex from "knex";
import Tables from "./db/tables";
import Views from "./db/views";
import StoredProcedures from "./db/stored-procedures";
import Inserter from "./db/inserter/inserter";
import { TypedInserter } from "typescript-mysql-model";
import { dna } from "./db/inserter/dna";

// Create a knex instance
const knex = Knex({
  client: "mysql",
  connection: {
    host: "ensembldb.ensembl.org",
    user: "anonymous",
    password: "",
    database: "takifugu_rubripes_core_82_4"
  }
});

//
// Access to all table names statically
//
console.log(Tables.ALT_ALLELE); // > alt_allele

//
// Static Inserter
//
const inserter = new Inserter(knex);
const dnaLion: dna = {
  seq_region_id: 89831782372,
  sequence: "TTTTGGACGACGGTTTGATGTAGGGTAGT"
};

inserter.insert(Tables.DNA, dnaLion);
inserter.insertDna(dnaLion);

//
// Generic Typed Inserted use cases
//
async function typedInserterSample() {
  const typedInserter = await TypedInserter.getSingleTonInstance(knex);
  const primaryKey = typedInserter.getPrimaryKey(Tables.DNA);
  typedInserter.batchUpdate<dna>(Tables.DNA, [
    { seq_region_id: 312445123, sequence: "TTGGACGACGGTTTGAFFFTGTAGGGTAGT" },
    { seq_region_id: 412312412, sequence: "GGAACCATTTTCCCATCTACTTCTATCCAT" }
  ]);

  //
  // typedInserter has many other methods! Check it out!
  //
}
