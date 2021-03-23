import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('temperature_record', (table) => {
        table.increments()
        table.integer('elderly_id').notNullable()
        table.foreign('elderly_id').references('elderly.id')
        table.string('name').notNullable()
        table.integer('bed_number').notNullable().unsigned()
        table.date('date').notNullable()
        table.time('time').notNullable()
        table.float('temperature_data').notNullable().unsigned()
        table.string('temperature_unit').notNullable()
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('temperature_record')
}


