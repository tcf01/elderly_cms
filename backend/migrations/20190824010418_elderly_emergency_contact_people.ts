import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('elderly_emergency_contact_people', (table) => {
        table.increments()
        table.integer('elderly_id').notNullable()
        table.foreign('elderly_id').references('elderly.id')
        table.integer('emergency_contact_person_id').notNullable()
        table.foreign('emergency_contact_person_id').references('emergency_contact_people.id')
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('elderly_emergency_contact_people')
}


