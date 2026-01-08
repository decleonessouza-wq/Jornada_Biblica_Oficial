import AsyncStorage from "@react-native-async-storage/async-storage";
import { restoreFromAutoBackup } from "./backupRestore";

export const COMPLETED_DAYS_KEY = "completedDays";
export const AUTO_BACKUP_KEY = "autoBackupData";
export const LAST_BACKUP_KEY = "lastAutoBackupDate";
export const AUTO_RESTORE_DONE_KEY = "autoRestoreDone";

function isValidDateString(d: unknown): d is string {
  return typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d);
}

function uniqSorted(days: string[]) {
  return Array.from(new Set(days)).filter(isValidDateString).sort();
}

export async function getCompletedDays(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(COMPLETED_DAYS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? uniqSorted(parsed) : [];
  } catch {
    return [];
  }
}

export async function setCompletedDays(days: string[]): Promise<string[]> {
  const sanitized = uniqSorted(days);
  await AsyncStorage.setItem(COMPLETED_DAYS_KEY, JSON.stringify(sanitized));
  return sanitized;
}

export async function addCompletedDay(dateIso: string): Promise<{
  added: boolean;
  days: string[];
}> {
  if (!isValidDateString(dateIso)) return { added: false, days: await getCompletedDays() };

  const current = await getCompletedDays();
  if (current.includes(dateIso)) return { added: false, days: current };

  const updated = uniqSorted([...current, dateIso]);
  await AsyncStorage.setItem(COMPLETED_DAYS_KEY, JSON.stringify(updated));
  return { added: true, days: updated };
}

export async function resetProgress(): Promise<void> {
  await AsyncStorage.removeItem(COMPLETED_DAYS_KEY);
  await AsyncStorage.removeItem(AUTO_RESTORE_DONE_KEY);
}

export async function markAutoRestoreDone(): Promise<void> {
  await AsyncStorage.setItem(AUTO_RESTORE_DONE_KEY, "1");
}

export async function ensureAutoRestoreOnceIfNeeded(): Promise<{
  restored: boolean;
  count: number;
  createdAt?: string;
}> {
  try {
    // 1) se já rodou uma vez nessa instalação, não repete
    const already = await AsyncStorage.getItem(AUTO_RESTORE_DONE_KEY);
    if (already === "1") return { restored: false, count: 0 };

    // 2) se já existe progresso, não sobrescreve
    const current = await getCompletedDays();
    if (current.length > 0) {
      await markAutoRestoreDone();
      return { restored: false, count: 0 };
    }

    // 3) tenta restaurar do backup automático
    const result = await restoreFromAutoBackup();

    // 4) marca como feito (anti-loop)
    await markAutoRestoreDone();

    return result;
  } catch {
    // se der erro, não fica em loop eterno
    try {
      await markAutoRestoreDone();
    } catch {}
    return { restored: false, count: 0 };
  }
}

export function getLastRead(days: string[]): string | null {
  if (!days || days.length === 0) return null;
  const sorted = [...days].sort();
  return sorted[sorted.length - 1] ?? null;
}

export function calculateStreak(days: string[], nowDate = new Date()): number {
  if (!days || days.length === 0) return 0;

  const set = new Set(days);
  const current = new Date(nowDate);

  let count = 0;

  while (true) {
    const iso = current.toISOString().split("T")[0];
    const dow = current.getDay(); // 0 domingo

    // domingo não quebra streak
    if (dow !== 0) {
      if (!set.has(iso)) break;
      count++;
    }

    current.setDate(current.getDate() - 1);
  }

  return count;
}
