/**
 * Ciclo de vida da conexão SQLite do domínio bíblico offline.
 *
 * Responsabilidades deliberadamente limitadas:
 * - abrir uma única conexão compartilhada;
 * - serializar fechamento e reabertura;
 * - não executar schema, migrations, seed, queries de domínio ou UI.
 */

import { openDatabaseAsync, type SQLiteDatabase } from "expo-sqlite";

export const BIBLE_DATABASE_NAME = "biblia-jornada.db" as const;

let connectionPromise: Promise<SQLiteDatabase> | null = null;
let closePromise: Promise<void> | null = null;

export async function openBibleDatabaseConnection(): Promise<SQLiteDatabase> {
  if (closePromise) {
    await closePromise;
  }

  if (!connectionPromise) {
    connectionPromise = openDatabaseAsync(BIBLE_DATABASE_NAME).catch((error) => {
      connectionPromise = null;
      throw error;
    });
  }

  return connectionPromise;
}

export async function closeBibleDatabaseConnection(): Promise<void> {
  if (closePromise) {
    return closePromise;
  }

  const currentConnection = connectionPromise;

  if (!currentConnection) {
    return;
  }

  closePromise = (async () => {
    try {
      const database = await currentConnection;
      await database.closeAsync();
    } finally {
      if (connectionPromise === currentConnection) {
        connectionPromise = null;
      }

      closePromise = null;
    }
  })();

  return closePromise;
}
