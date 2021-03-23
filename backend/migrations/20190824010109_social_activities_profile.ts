import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('social_activities_profile', (table) => {
        table.increments()
        table.string('activity')
        table.text('remark')
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('social_activities_profile')
}


