import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('emergency_contact_people', (table) => {
        table.increments()
        table.integer("elderly_id").notNullable();
        table.foreign("elderly_id").references("elderly.id")
        table.string('name').notNullable()
        table.string('id_card_number')
        table.string('relation_with_elderly')
        table.integer('telephone').notNullable()
        table.text('address').nullable()
        table.integer('contact_priority')
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('emergency_contact_people')
}


