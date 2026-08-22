/**
 * Ciclo de vida da conexão SQLite do domínio bíblico offline.
 *
 * Responsabilidades:
 * - garantir que o seed empacotado esteja instalado antes da primeira abertura;
 * - abrir uma única conexão compartilhada;
 * - serializar fechamento e reabertura;
 * - não executar migrations, queries de domínio ou UI.
 */

import { openDatabaseAsync, type SQLiteDatabase } from "expo-sqlite";

import { BIBLE_DATABASE_NAME } from "./bibleDatabaseConstants";
import { ensureBibleSeedInstalled } from "./bibleDatabaseSeed";

export { BIBLE_DATABASE_NAME } from "./bibleDatabaseConstants";

let connectionPromise: Promise<SQLiteDatabase> | null = null;
let closePromise: Promise<void> | null = null;

export async function openBibleDatabaseConnection(): Promise<SQLiteDatabase> {
  if (closePromise) {
    await closePromise;
  }

  if (!connectionPromise) {
    const currentConnection = (async () => {
      await ensureBibleSeedInstalled();
      return openDatabaseAsync(BIBLE_DATABASE_NAME);
    })();

    connectionPromise = currentConnection.catch((error) => {
      if (connectionPromise === currentConnection) {
        connectionPromise = null;
      }

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
