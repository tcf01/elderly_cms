import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('todo_list_status', (table) => {
        table.increments()
        table.string('option').notNullable()
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('todo_list_status')
}


