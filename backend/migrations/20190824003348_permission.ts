import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('permissions', (table) => {
        table.increments()
        table.string('permission_name').notNullable()
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('permissions')
}


