import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('edu_levels', (table) => {
        table.increments()
        table.string('edu_level').notNullable()
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('edu_levels')
}


