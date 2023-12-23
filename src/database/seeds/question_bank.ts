import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("question_bank").del();

    // Inserts seed entries
    await knex("question_bank").insert([
        { title: 'Knex', created_by: "CDAC82A3-EB25-4F0A-9DD3-AA1B2847DCF3" },
    ]);
};
