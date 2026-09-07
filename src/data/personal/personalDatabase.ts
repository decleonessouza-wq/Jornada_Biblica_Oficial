/**
 * Fronteira de acesso ao Personal SQLite para adapters de persistência.
 *
 * Consumidores de domínio/UI não recebem SQLiteDatabase diretamente.
 * Toda conexão passa pelo bootstrap único da plataforma pessoal.
 */

import type { SQLiteDatabase } from "expo-sqlite";

import { bootstrapPersonalDatabase } from "./personalDatabaseBootstrap";

export class PersonalDatabase {
  async withConnection<TResult>(
    operation: (database: SQLiteDatabase) => Promise<TResult>,
  ): Promise<TResult> {
    const database = await bootstrapPersonalDatabase();

    return operation(database);
  }
}
