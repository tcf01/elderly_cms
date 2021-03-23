import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('elderly_religion_status', (table) => {
        table.increments()
        table.integer('elderly_id').notNullable()
        table.foreign('elderly_id').references('elderly.id')
        table.integer('religion_status_id').notNullable()
        table.foreign('religion_status_id').references('religion_status.id')
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('elderly_religion_status')
}


