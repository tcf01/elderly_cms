import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('elderly_visiting_member_profile', (table) => {
        table.increments()
        table.integer('elderly_id').notNullable().unsigned()
        table.foreign('elderly_id').references('elderly.id')
        table.integer('visiting_member_id').notNullable().unsigned()
        table.foreign('visiting_member_id').references('visiting_member_profile.id')
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('elderly_visiting_member_profile')
}


