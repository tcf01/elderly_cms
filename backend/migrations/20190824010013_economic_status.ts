import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('economic_status', (table) => {
        table.increments()
        table.string('status')
        table.text('remark')
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('economic_status')
}


