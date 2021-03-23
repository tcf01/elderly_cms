import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('drug_details', (table) => {
        table.increments()
        table.integer('drug_record_id')
        table.foreign('drug_record_id').references('drug_records.id')
        table.integer('log_record_id').nullable()
        table.foreign('log_record_id').references('log_records.id')
        table.date('have_drug_date').nullable()
        table.time('have_drug_time').nullable()
        table.integer('status_id').notNullable().unsigned()
        table.foreign('status_id').references('deliver_drug_status.id')
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('drug_details')
}


