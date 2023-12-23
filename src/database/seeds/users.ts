import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {
          user_name: 'sampleuser',
          email: 'sample@example.com',
          password: 'hashedpassword', // Ensure to hash passwords in real applications
          display_name: 'Sample User',
          profile_picture: 'default.png',
          role: 'Faculty',
          is_verified: false
        }
      ]);
};
