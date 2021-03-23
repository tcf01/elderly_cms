import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('roles_permission', (table) => {
        table.increments()
        table.integer('role_id').notNullable()
        table.foreign('role_id').references('roles.id')
        table.integer('permission_id').notNullable()
        table.foreign('permission_id').references('permissions.id')
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('roles_permission')
}


