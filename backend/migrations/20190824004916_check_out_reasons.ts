import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('check_out_reasons', (table) => {
        table.increments()
        table.string('reason')
        table.string('remark').nullable()
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('check_out_reasons')
}


