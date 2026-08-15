import AsyncStorage from "@react-native-async-storage/async-storage";
import { COMPLETED_DAYS_KEY, LAST_BACKUP_KEY, AUTO_BACKUP_KEY } from "../services/progressStore";
import { APP_INFO } from "../constants/appInfo";

export async function runAutoBackup() {
  try {
    const lastBackup = await AsyncStorage.getItem(LAST_BACKUP_KEY);
    const today = new Date();

    if (lastBackup) {
      const last = new Date(lastBackup);
      const diffDays = (today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);

      // só faz backup se passou 7 dias
      if (diffDays < 7) return;
    }

    const stored = await AsyncStorage.getItem(COMPLETED_DAYS_KEY);
    const completed: string[] = stored ? JSON.parse(stored) : [];

    const backupData = {
      app: APP_INFO.name,
      type: "auto-backup",
      createdAt: today.toISOString(),
      completedDays: completed,
    };

    await AsyncStorage.setItem(AUTO_BACKUP_KEY, JSON.stringify(backupData));
    await AsyncStorage.setItem(LAST_BACKUP_KEY, today.toISOString());

    if (__DEV__) console.log("📦 Backup automático semanal salvo");
  } catch (err) {
    console.log("Erro no backup automático", err);
  }
}
