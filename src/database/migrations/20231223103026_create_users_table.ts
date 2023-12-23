import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
        table.uuid('user_id').primary().defaultTo(knex.raw('NEWID()'));
        table.string('user_name', 20).notNullable();
        table.string('email', 255).notNullable().unique();
        table.string('password', 255).notNullable();
        table.string('display_name', 255).notNullable();
        table.string('profile_picture', 255).defaultTo('placeholder.png');
        table.string('role', 7).notNullable().checkIn(['Student', 'Faculty']);
        table.boolean('is_verified').notNullable();
      })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}

