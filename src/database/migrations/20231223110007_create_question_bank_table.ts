import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('question_bank', table => {
        table.uuid('question_bank_id').primary().defaultTo(knex.raw('NEWID()'));
        table.string('title', 255).notNullable();
        table.uuid('created_by').notNullable();
        table.foreign('created_by').references('users.user_id');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('question_bank');
}

