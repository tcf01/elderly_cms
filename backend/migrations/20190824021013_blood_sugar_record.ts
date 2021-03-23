import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('blood_sugar_record', (table) => {
        table.increments()
        table.integer('elderly_id').notNullable()
        table.foreign('elderly_id').references('elderly.id')
        table.string('name').notNullable()
        table.integer('bed_number').notNullable().unsigned()
        table.date('date').notNullable()
        table.time('time').notNullable()
        table.float('blood_sugar_data').notNullable().unsigned()
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('blood_sugar_record')
}


