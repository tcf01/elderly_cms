import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable('additional_contract_terms', (table) => {
        table.increments()
        table.text('term')
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('additional_contract_terms')
}

