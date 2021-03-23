import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('elderly_catheter_record', (table) => {
        table.increments()
        table.integer('elderly_id').notNullable()
        table.foreign('elderly_id').references('elderly.id')
        table.integer('catheter_record_id').notNullable()
        table.foreign('catheter_record_id').references('catheter_record.id')
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('elderly_catheter_record')
}


