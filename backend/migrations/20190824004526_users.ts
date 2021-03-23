import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('users', (table) => {
        table.increments()
        table.string('name').notNullable()
        table.string('username').notNullable()
        table.string('password').notNullable()
        table.boolean('isActive').notNullable()
        table.integer('role_id').notNullable().unsigned()
        table.foreign('role_id').references('roles.id')
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('users')
}


