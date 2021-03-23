import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('elderly_blood_sugar_record', (table) => {
        table.increments()
        table.integer('elderly_id').notNullable().unsigned()
        table.foreign('elderly_id').references('elderly.id')
        table.integer('blood_sugar_record_id').notNullable().unsigned()
        table.foreign('blood_sugar_record_id').references('blood_sugar_record.id')
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('elderly_blood_sugar_record')
}


