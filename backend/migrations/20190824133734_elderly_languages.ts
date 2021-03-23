import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('elderly_languages', (table) => {
        table.increments()
        table.integer('elderly_id').notNullable()
        table.foreign('elderly_id').references('elderly.id')
        table.integer('language_id').notNullable()
        table.foreign('language_id').references('languages.id')
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('elderly_languages')
}


