import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('religion_status', (table) => {
        table.increments()
        table.string('religion')
        table.text('remark')
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('religion_status')
}


