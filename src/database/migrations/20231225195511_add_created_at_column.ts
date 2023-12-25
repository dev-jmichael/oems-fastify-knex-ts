import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('question_bank', function(table) {
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('question_bank', function(table) {
        table.dropColumn('created_at');
    });
}

