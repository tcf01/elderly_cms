import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('elderly', (table) => {
        table.increments()
        table.string('name_chi').notNullable()
        table.string('name_eng').notNullable()
        table.integer("bed_number").nullable();
        table.string('gender').notNullable()
        table.string('birth_date').notNullable()
        table.string('id_card_number').notNullable()
        table.integer('telephone').notNullable()
        table.string('check_in_date').notNullable()
        table.string('check_out_date').nullable()

        table.integer('check_out_reason').nullable()
        table.foreign('check_out_reason').references('check_out_reasons.id')

        table.text('address').notNullable()

        table.integer('edu_level_id').notNullable()
        table.foreign('edu_level_id').references('edu_levels.id')

        table.string('past_job')

        table.integer('marriage_status_id').notNullable()
        table.foreign('marriage_status_id').references('marriage_status.id')

        table.text("image").nullable();
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('elderly')
}
