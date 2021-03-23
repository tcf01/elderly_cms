import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('drug_records', (table) => {
        table.increments()
        table.integer('drug_name_id').notNullable()
        table.foreign('drug_name_id').references('drugs.id')
        table.integer('elderly_id')
        table.foreign('elderly_id').references('elderly.id')
        table.string('dose').notNullable()
        table.integer('times_per_day').nullable()
        table.date('start_date').nullable()
        table.date('end_date').nullable()
        table.string('authorized_hospital').nullable()
        table.text('reason_of_taking').nullable()
        table.boolean('depend_on_need').notNullable()
        table.boolean('isOfficial').notNullable()
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('drug_records')
}


