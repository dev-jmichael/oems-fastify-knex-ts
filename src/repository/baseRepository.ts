import { Knex } from "knex";
import db from '../config/db';
import { SortOrder } from "../types/sortOrder";

export class BaseRepository<T> {
    protected tableName: string;
    protected primaryKey: string;
    protected db: Knex;

    constructor(db: Knex, tableName: string, primaryKey: string = 'id') {
        this.db = db;
        this.tableName = tableName;
        this.primaryKey = primaryKey;
    }

    async findAllPaginated(pageSize: number, offset: number, sortBy: string = 'created_at', sortOrder: SortOrder): Promise<T[]> {
        return this.db(this.tableName).select('*').limit(pageSize).offset(offset).orderBy(sortBy, sortOrder);
    }

    async findById(id: number | string): Promise<T | undefined> {
        return this.db(this.tableName).where({ [this.primaryKey]: id }).first();
    }

    async save(data: Omit<T, 'question_bank_id' | 'created_at'>): Promise<T> {
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

    async count(): Promise<{ count: number }[]> {
        const totalCount = await this.db(this.tableName).count<{ count: number }[]>('* as count');
        return totalCount;
    }
}
