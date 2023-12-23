import { Knex } from "knex";
import { QuestionBank } from "../models/questionBank";
import { BaseRepository } from "./baseRepository";

export class QuestionBankRepository extends BaseRepository<QuestionBank> {
    constructor(db: Knex) {
        super(db, 'question_bank', 'question_bank_id');
    }

    // For custom queries
}