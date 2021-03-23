import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('visiting_member_profile', (table) => {
        table.increments()
        table.string('name').notNullable()
        table.time('visiting_time')
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('visiting_member_profile')
}


