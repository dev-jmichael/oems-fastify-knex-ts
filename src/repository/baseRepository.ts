import { Knex } from "knex";

export class BaseRepository<T> {
    protected tableName: string;
    protected primaryKey: string;
    protected db: Knex;

    constructor(db: Knex, tableName: string, primaryKey: string = 'id') {
        this.db = db;
        this.tableName = tableName;
        this.primaryKey = primaryKey;
    }

    async findAll(): Promise<T[]> {
        return this.db(this.tableName).select('*');
    }

    async findById(id: number | string): Promise<T | undefined> {
        return this.db(this.tableName).where({ [this.primaryKey]: id }).first();
    }

    async save(data: Omit<T, 'question_bank_id'>): Promise<T> {
        const [newRecord] = await this.db(this.tableName).insert(data).returning('*');
        return newRecord;
    }

    async update(id: number | string, data: Partial<T>): Promise<T> {
        const [updatedRecord] = await this.db(this.tableName).where({ [this.primaryKey]: id }).update(data).returning('*');
        return updatedRecord;
    }

    async delete(id: number | string): Promise<void> {
        await this.db(this.tableName).where({ [this.primaryKey]: id }).del();
    }
}
