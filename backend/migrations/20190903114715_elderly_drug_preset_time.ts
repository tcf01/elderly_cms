import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable('elderly_drug_preset_time', (table) => {
        table.increments()
        table.integer('drug_record_id')
        table.foreign('drug_record_id').references('drug_records.id')
        table.time('preset_time').notNullable()
        table.timestamps(false, true)
    })
}

export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('elderly_drug_preset_time')
}

