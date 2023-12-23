import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('question_group', table => {
        table.uuid('question_group_id').primary().defaultTo(knex.raw('NEWID()'));
        table.string('name', 255).notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('question_group');
}

