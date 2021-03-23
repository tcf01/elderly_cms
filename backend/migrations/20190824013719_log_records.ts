import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTableIfNotExists('log_records', (table) => {
        table.increments();
        table.string('username')
        table.timestamps(false,true);
    })
}   


export async function down(knex: Knex) {
    await knex.schema.dropTable('log_records')
}   

