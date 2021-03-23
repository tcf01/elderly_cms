import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('elderly_economic_status', (table) => {
        table.increments()
        table.integer('elderly_id').notNullable()
        table.foreign('elderly_id').references('elderly.id')
        table.integer('economic_status_id').notNullable()
        table.foreign('economic_status_id').references('economic_status.id')
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('elderly_economic_status')
}


