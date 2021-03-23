import * as Knex from "knex";


export async function up(knex: Knex) {
    await knex.schema.createTable('todo_lists', (table) => {
        table.increments()
        table.integer('user_id')
        table.foreign('user_id').references('users.id')
        table.string('name').notNullable()
        table.time('time')
        table.integer('status_id').notNullable()
        table.foreign('status_id').references('todo_list_status.id')
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex) {
    await knex.schema.dropTable('todo_lists')
}


