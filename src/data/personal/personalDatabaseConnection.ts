/**
 * Ciclo de vida da conexão SQLite da plataforma pessoal.
 *
 * Responsabilidades:
 * - abrir uma única conexão compartilhada;
 * - serializar fechamento e reabertura;
 * - reutilizar a seção crítica SQLite Web já existente;
 * - não criar tabelas, executar migrations ou acessar dados de domínio.
 */

import { openDatabaseAsync, type SQLiteDatabase } from "expo-sqlite";

import { runWebSQLiteBootstrapCriticalSection } from "../../services/webSQLiteBootstrapCriticalSection";
import { PERSONAL_DATABASE_NAME } from "./personalDatabaseConstants";

export { PERSONAL_DATABASE_NAME } from "./personalDatabaseConstants";

let connectionPromise: Promise<SQLiteDatabase> | null = null;
let closePromise: Promise<void> | null = null;

export async function openPersonalDatabaseConnection(): Promise<SQLiteDatabase> {
  if (closePromise) {
    await closePromise;
  }

  if (!connectionPromise) {
    const currentConnection = runWebSQLiteBootstrapCriticalSection(
      async () => openDatabaseAsync(PERSONAL_DATABASE_NAME),
    );

    connectionPromise = currentConnection.catch((error) => {
      if (connectionPromise === currentConnection) {
        connectionPromise = null;
      }

      throw error;
    });
  }

  return connectionPromise;
}

export async function closePersonalDatabaseConnection(): Promise<void> {
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
