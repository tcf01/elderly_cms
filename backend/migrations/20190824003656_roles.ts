import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('roles', (table) => {
        table.increments()
        table.string('role').notNullable()
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('roles')
}


