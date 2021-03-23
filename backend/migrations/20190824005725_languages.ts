import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('languages', (table) => {
        table.increments()
        table.string('language')
        table.string('remark').nullable()
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('languages')
}


