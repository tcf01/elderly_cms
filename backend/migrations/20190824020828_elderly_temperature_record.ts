import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('elderly_temperature_record', (table) => {
        table.increments()
        table.integer('elderly_id').notNullable()
        table.foreign('elderly_id').references('elderly.id')
        table.integer('temperature_record_id').notNullable()
        table.foreign('temperature_record_id').references('temperature_record.id')
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('elderly_temperature_record')
}


