import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('marriage_status', (table) => {
        table.increments()
        table.string('status').notNullable()
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('marriage_status')
}


