/**
 * Shared SQLite connection lifecycle for the Harpa offline database.
 *
 * Responsibilities:
 * - install the packaged seed before first open;
 * - expose one shared connection promise;
 * - serialize close/reopen;
 * - do not run migrations, domain queries, search, or UI.
 */

import {
  openDatabaseAsync,
  type SQLiteDatabase,
} from "expo-sqlite";

import {
  HYMNAL_DATABASE_NAME,
} from "./hymnalDatabaseConstants";
import {
  ensureHymnalSeedInstalled,
} from "./hymnalDatabaseSeed";

export {
  HYMNAL_DATABASE_NAME,
} from "./hymnalDatabaseConstants";

let connectionPromise: Promise<SQLiteDatabase> | null = null;
let closePromise: Promise<void> | null = null;

export async function openHymnalDatabaseConnection(): Promise<SQLiteDatabase> {
  if (closePromise) {
    await closePromise;
  }

  if (!connectionPromise) {
    const currentConnection = (async () => {
      await ensureHymnalSeedInstalled();

      return openDatabaseAsync(
        HYMNAL_DATABASE_NAME,
      );
    })();

    connectionPromise = currentConnection.catch(
      (error) => {
        if (
          connectionPromise ===
          currentConnection
        ) {
          connectionPromise = null;
        }

        throw error;
      },
    );
  }

  return connectionPromise;
}

export async function closeHymnalDatabaseConnection(): Promise<void> {
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
      if (
        connectionPromise ===
        currentConnection
      ) {
        connectionPromise = null;
      }

      closePromise = null;
    }
  })();

  return closePromise;
}
