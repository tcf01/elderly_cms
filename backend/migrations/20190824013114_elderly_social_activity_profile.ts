import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('elderly_social_activity_profile', (table) => {
        table.increments()
        table.integer('elderly_id').notNullable().unsigned()
        table.foreign('elderly_id').references('elderly.id')
        table.integer('social_activity_profile_id').notNullable().unsigned()
        table.foreign('social_activity_profile_id').references('social_activities_profile.id')
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('elderly_social_activity_profile')
}


