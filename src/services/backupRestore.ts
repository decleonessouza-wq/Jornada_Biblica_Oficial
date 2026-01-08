import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTO_BACKUP_KEY = "autoBackupData";
const COMPLETED_DAYS_KEY = "completedDays";

type AutoBackupData = {
  app?: unknown;
  type?: unknown;
  createdAt?: unknown;
  completedDays?: unknown;
};

function isValidDateString(d: unknown): d is string {
  return typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d);
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

  // valida “assinatura” do backup
  if (parsed?.app !== "Jornada Bíblica" || parsed?.type !== "auto-backup") {
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
