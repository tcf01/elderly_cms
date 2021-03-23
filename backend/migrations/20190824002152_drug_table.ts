import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('drugs', (table) => {
        table.increments()
        table.string('name').notNullable()
        table.text('image')
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('drugs')
}


