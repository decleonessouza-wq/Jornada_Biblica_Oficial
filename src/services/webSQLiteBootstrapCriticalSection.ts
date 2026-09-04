/**
 * Shared Web-only critical section for SQLite seed materialization/open.
 *
 * Native callers execute immediately. Web callers are serialized FIFO so
 * independent database domains cannot overlap OPFS AccessHandle acquisition.
 */

import { Platform } from "react-native";

let webQueueTail: Promise<void> = Promise.resolve();

export function runWebSQLiteBootstrapCriticalSection<T>(
  operation: () => Promise<T>,
): Promise<T> {
  if (Platform.OS !== "web") {
    return operation();
  }

  const previousTurn = webQueueTail;

  let releaseCurrentTurn!: () => void;
  const currentTurn = new Promise<void>((resolve) => {
    releaseCurrentTurn = resolve;
  });

  webQueueTail = previousTurn.then(
    () => currentTurn,
    () => currentTurn,
  );

  return (async () => {
    await previousTurn.catch(() => undefined);

    try {
      return await operation();
    } finally {
      releaseCurrentTurn();
    }
  })();
}
