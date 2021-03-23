import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('deliver_drug_status', (table) => {
        table.increments()
        table.string('status')
        table.text('remark').nullable()
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('deliver_drug_status')
}


