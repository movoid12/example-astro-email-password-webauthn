import type { Row, ResultSet, InArgs } from "@libsql/client";
import { turso } from "src/turso";

interface Adapter {
	query(statement: string, params: InArgs): Promise<Row[]>;
	execute(statement: string, params: InArgs): Promise<ResultSet>;
}

const adapter: Adapter = {
	query: async (statement, params) => {
		const { rows } = await turso.execute(statement, params);
		return rows;
	},
	execute: async (statement, params) => {
		const result = await turso.execute(statement, params);
		return result;
	}
};

class Database {
	adapter: Adapter;
	constructor(adapter: Adapter) {
		this.adapter = adapter;
	}
	async query(statement: string, params: InArgs) {
		return this.adapter.query(statement, params);
	}
	async execute(statement: string, params: InArgs) {
		return this.adapter.execute(statement, params);
	}
}

export const db = new Database(adapter);
