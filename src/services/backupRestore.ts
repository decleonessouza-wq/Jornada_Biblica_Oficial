import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_INFO } from "../constants/appInfo";

const AUTO_BACKUP_KEY = "autoBackupData";
const COMPLETED_DAYS_KEY = "completedDays";
const LEGACY_APP_NAME = "Jornada Bíblica";

type AutoBackupData = {
  app?: unknown;
  type?: unknown;
  createdAt?: unknown;
  completedDays?: unknown;
};

function isValidDateString(d: unknown): d is string {
  return typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d);
}

function isSupportedBackupApp(app: unknown): app is string {
  return app === APP_INFO.name || app === LEGACY_APP_NAME;
}

function uniqSorted(days: string[]) {
  return Array.from(new Set(days)).filter(isValidDateString).sort();
}

export async function restoreFromAutoBackup(): Promise<{
  restored: boolean;
  count: number;
  createdAt?: string;
}> {
  const raw = await AsyncStorage.getItem(AUTO_BACKUP_KEY);
  if (!raw) return { restored: false, count: 0 };

  let parsed: AutoBackupData;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { restored: false, count: 0 };
  }

  // Aceita a identidade atual e o nome legado para manter backups existentes restauráveis.
  if (!isSupportedBackupApp(parsed?.app) || parsed?.type !== "auto-backup") {
    return { restored: false, count: 0 };
  }

  const list = Array.isArray(parsed.completedDays) ? parsed.completedDays : [];
  const validDates = uniqSorted(list.filter(isValidDateString));

  if (validDates.length === 0) return { restored: false, count: 0 };

  await AsyncStorage.setItem(COMPLETED_DAYS_KEY, JSON.stringify(validDates));

  const createdAt =
    typeof parsed.createdAt === "string" ? parsed.createdAt : undefined;

  return { restored: true, count: validDates.length, createdAt };
}

export async function hasAutoBackup(): Promise<boolean> {
  const raw = await AsyncStorage.getItem(AUTO_BACKUP_KEY);
  return !!raw;
}
