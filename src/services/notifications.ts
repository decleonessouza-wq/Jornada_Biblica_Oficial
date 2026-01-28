import { Platform, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

// ✅ para “modo inteligente”
import { getCompletedDays } from "../services/progressStore";

/**
 * =========================
 * CHAVES (iguais do Settings)
 * =========================
 */
const NOTIF_ENABLED_KEY = "notif_enabled";
const NOTIF_TIME_KEY = "notif_time_hhmm"; // "08:00"
const NOTIF_SMART_SKIP_DONE_KEY = "notif_smart_skip_done"; // "1" | "0"
const NOTIF_CONTENT_MODE_KEY = "notif_content_mode"; // "mixed" | "verse" | "phrase"

// ✅ onde guardamos o id agendado (para cancelar depois)
const NOTIF_SCHEDULED_ID_KEY = "notif_scheduled_id";

/**
 * Handler global: define como a notificação será exibida quando o app estiver aberto.
 */
let handlerConfigured = false;

export function configureNotificationHandlerOnce() {
  if (handlerConfigured) return;
  handlerConfigured = true;

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,

      // ✅ exigidos pela tipagem nova (iOS)
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

/**
 * Android precisa de channel para som/importance.
 * Chamamos no boot do app (idempotente).
 */
export async function ensureAndroidChannel() {
  if (Platform.OS !== "android") return;

  await Notifications.setNotificationChannelAsync("default", {
    name: "Notificações",
    importance: Notifications.AndroidImportance.DEFAULT,
    sound: "default",
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#00C48C",
  });
}

/**
 * Permissão (chamar SOMENTE quando usuário ativar lembretes).
 * Retorna true se concedido.
 */
export async function ensureNotificationPermissions(): Promise<boolean> {
  const settings = await Notifications.getPermissionsAsync();

  const alreadyGranted =
    settings.granted || settings.status === Notifications.PermissionStatus.GRANTED;

  if (alreadyGranted) return true;

  const req = await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowSound: true,
      allowBadge: false,
    },
  });

  return req.granted || req.status === Notifications.PermissionStatus.GRANTED;
}

/**
 * Permissão “manual” (para botão de teste na UI).
 */
export async function requestNotificationPermissionNow(): Promise<boolean> {
  configureNotificationHandlerOnce();
  await ensureAndroidChannel();
  return ensureNotificationPermissions();
}

/**
 * Atalho para abrir as configurações do app (Android funciona bem).
 */
export async function openSystemNotificationSettings() {
  try {
    // Android/iOS: abre settings do app
    await Linking.openSettings();
  } catch (e) {
    console.log("openSystemNotificationSettings error", e);
  }
}

/**
 * =========================
 * UTIL: datas local-safe
 * =========================
 */
function dateToIsoLocal(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function isoToLocalNoon(iso: string): Date {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return new Date(iso);
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const d = Number(m[3]);
  return new Date(y, mo, d, 12, 0, 0, 0);
}

function addDaysIso(iso: string, days: number): string {
  const d = isoToLocalNoon(iso);
  d.setDate(d.getDate() + days);
  return dateToIsoLocal(d);
}

function getTodayAtTime(hour: number, minute: number) {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0);
}

function parseHHMM(hhmm: string): { hour: number; minute: number } | null {
  const m = /^(\d{2}):(\d{2})$/.exec((hhmm || "").trim());
  if (!m) return null;
  const hour = Number(m[1]);
  const minute = Number(m[2]);
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return null;
  if (hour < 0 || hour > 23) return null;
  if (minute < 0 || minute > 59) return null;
  return { hour, minute };
}

/**
 * =========================
 * CONTEÚDO
 * - Prioriza usar seu dataset src/data/notificationMessages
 * - Escolha DETERMINÍSTICA por dia (não muda a cada sync)
 * - Se não existir/import falhar, usa fallback.
 * =========================
 */
type ContentMode = "mixed" | "verse" | "phrase";

type MessagePick = { title: string; body: string };

// fallback mínimo (só para não quebrar)
const FALLBACK_VERSES: MessagePick[] = [
  { title: "📖 Palavra do Dia", body: "A tua palavra é lâmpada para os meus pés. (Sl 119:105)" },
  { title: "📖 Palavra do Dia", body: "Tudo posso naquele que me fortalece. (Fp 4:13)" },
];
const FALLBACK_PHRASES: MessagePick[] = [
  { title: "✨ Ânimo!", body: "Hoje é um ótimo dia para continuar sua Jornada Bíblica." },
  { title: "✨ Constância", body: "Um pouco por dia, e Deus faz muito em você." },
];

function buildTitle(mode: ContentMode) {
  if (mode === "verse") return "📖 Versículo do Dia";
  if (mode === "phrase") return "✨ Mensagem do Dia";
  return "🔔 Jornada Bíblica";
}

function safeArray<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : [];
}

function stableHash(str: string): number {
  // hash simples e estável (determinístico)
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h >>> 0;
}

function pickDeterministic<T>(arr: T[], seed: string): T | null {
  if (!arr || arr.length === 0) return null;
  const idx = stableHash(seed) % arr.length;
  return arr[idx] ?? null;
}

/**
 * Tenta pegar do seu dataset, sem depender de existir getRandomNotificationMessage.
 * Compatível com:
 * - export const NOTIFICATION_MESSAGES = [...]
 * - export function getRandomNotificationMessage(types?: string[])
 */
function tryPickFromDataset(mode: ContentMode, forDateIso: string): MessagePick | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = require("../data/notificationMessages");

    const list = safeArray<any>(mod?.NOTIFICATION_MESSAGES);
    const getRandom = mod?.getRandomNotificationMessage;

    // mapear modo -> seus tipos: "versiculo" | "incentivo" | "frase"
    const allowedTypes =
      mode === "verse"
        ? ["versiculo"]
        : mode === "phrase"
        ? ["frase", "incentivo"]
        : ["versiculo", "frase", "incentivo"];

    // 1) Se tiver list, escolhe determinístico pelo dia
    if (list.length > 0) {
      const filtered = list.filter((it) => allowedTypes.includes(String(it?.type)));
      const pool = filtered.length > 0 ? filtered : list;

      const picked = pickDeterministic(pool, `${forDateIso}|${mode}`);
      if (!picked?.text) return null;

      const body =
        String(picked.type) === "versiculo" && picked.reference
          ? `${picked.text}\n(${picked.reference})`
          : String(picked.text);

      return { title: buildTitle(mode), body };
    }

    // 2) fallback antigo: se não tiver list, mas tiver getRandom, tentamos ele.
    if (typeof getRandom === "function") {
      const picked = getRandom(allowedTypes);
      if (!picked?.text) return null;

      const body =
        String(picked.type) === "versiculo" && picked.reference
          ? `${picked.text}\n(${picked.reference})`
          : String(picked.text);

      return { title: buildTitle(mode), body };
    }

    return null;
  } catch {
    return null;
  }
}

function pickRandomFallback<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickContent(mode: ContentMode, forDateIso: string): MessagePick {
  const fromDataset = tryPickFromDataset(mode, forDateIso);
  if (fromDataset) return fromDataset;

  // fallback
  if (mode === "verse") return pickRandomFallback(FALLBACK_VERSES);
  if (mode === "phrase") return pickRandomFallback(FALLBACK_PHRASES);
  return Math.random() < 0.5 ? pickRandomFallback(FALLBACK_VERSES) : pickRandomFallback(FALLBACK_PHRASES);
}

/**
 * =========================
 * CORE: agendar/cancelar
 * =========================
 */
export async function scheduleDailyReminder(params: {
  hour: number;
  minute: number;
  title: string;
  body: string;
}) {
  const { hour, minute, title, body } = params;

  configureNotificationHandlerOnce();
  await ensureAndroidChannel();

  // ✅ trigger DAILY compatível com TS (SDKs diferentes)
  const trigger = {
    type: Notifications.SchedulableTriggerInputTypes.DAILY,
    hour,
    minute,
  } as unknown as Notifications.NotificationTriggerInput;

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: "default",
    },
    trigger,
  });

  return id;
}

/**
 * ✅ NOVO: agenda UMA notificação em uma data específica (sem repeats)
 * Usado para o "modo inteligente": se já leu hoje e ainda não passou do horário,
 * agenda para amanhã (e evita notificar hoje).
 */
export async function scheduleOneTimeReminder(params: {
  date: Date;
  title: string;
  body: string;
}) {
  const { date, title, body } = params;

  configureNotificationHandlerOnce();
  await ensureAndroidChannel();

  // Expo aceita Date como trigger (compatível com NotificationTriggerInput)
  const trigger = date as unknown as Notifications.NotificationTriggerInput;

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: "default",
    },
    trigger,
  });

  return id;
}

/**
 * ✅ TESTE: agenda uma notificação única em X segundos
 * (pra você validar permissão/canal sem esperar horário)
 */
export async function scheduleTestNotificationInSeconds(seconds = 10) {
  configureNotificationHandlerOnce();
  await ensureAndroidChannel();

  const ok = await ensureNotificationPermissions();
  if (!ok) return { ok: false as const, reason: "permission_denied" as const };

  const todayIso = dateToIsoLocal(new Date());
  const picked = pickContent("mixed", todayIso);

  const trigger = {
    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    seconds: Math.max(1, Math.floor(seconds)),
    repeats: false,
  } as unknown as Notifications.NotificationTriggerInput;

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: picked.title,
      body: `[TESTE] ${picked.body}`,
      sound: "default",
    },
    trigger,
  });

  return { ok: true as const, id };
}

export async function cancelScheduledNotification(id: string) {
  await Notifications.cancelScheduledNotificationAsync(id);
}

export async function cancelAllScheduledNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function listScheduledNotifications() {
  return await Notifications.getAllScheduledNotificationsAsync();
}

/**
 * Cancela o lembrete diário “oficial” do app (se existir).
 */
export async function cancelDailyReminderIfAny() {
  const id = await AsyncStorage.getItem(NOTIF_SCHEDULED_ID_KEY);
  if (id) {
    try {
      await Notifications.cancelScheduledNotificationAsync(id);
    } catch {}
  }
  await AsyncStorage.removeItem(NOTIF_SCHEDULED_ID_KEY);
}

/**
 * =========================
 * MODO INTELIGENTE
 * =========================
 * Se o usuário já concluiu a leitura do dia, não faz sentido notificar.
 */
async function shouldSkipTodayBecauseDone(): Promise<boolean> {
  try {
    const days = await getCompletedDays();
    const todayIso = dateToIsoLocal(new Date());
    return Array.isArray(days) && days.includes(todayIso);
  } catch {
    return false;
  }
}

/**
 * =========================
 * SETTINGS → APLICAR
 * =========================
 */
export async function applyNotificationSettings(params: {
  enabled: boolean;
  timeHHMM: string;
  smartSkipIfDoneToday: boolean;
  contentMode: ContentMode;
}) {
  const { enabled, timeHHMM, smartSkipIfDoneToday, contentMode } = params;

  // 1) persiste settings (fonte de verdade)
  await AsyncStorage.setItem(NOTIF_ENABLED_KEY, enabled ? "1" : "0");
  await AsyncStorage.setItem(NOTIF_TIME_KEY, timeHHMM);
  await AsyncStorage.setItem(NOTIF_SMART_SKIP_DONE_KEY, smartSkipIfDoneToday ? "1" : "0");
  await AsyncStorage.setItem(NOTIF_CONTENT_MODE_KEY, contentMode);

  // 2) sincroniza agendamento
  await syncScheduledNotifications();
}

/**
 * Lê settings e sincroniza 1 lembrete diário.
 * - se disabled: cancela
 * - se enabled: pede permissão e agenda
 * - se smart e já leu hoje:
 *    - se ainda não passou do horário: agenda UMA para amanhã e retorna (não notifica hoje)
 *    - se já passou do horário: segue normal (DAILY já cairá amanhã)
 */
export async function syncScheduledNotifications() {
  const enabledRaw = await AsyncStorage.getItem(NOTIF_ENABLED_KEY);
  const enabled = enabledRaw === "1" || enabledRaw === "true";

  if (!enabled) {
    await cancelDailyReminderIfAny();
    return;
  }

  // ✅ pede permissão só quando está ligado
  const ok = await ensureNotificationPermissions();
  if (!ok) {
    // não desliga a preferência — só não agenda
    await cancelDailyReminderIfAny();
    return;
  }

  const timeRaw = (await AsyncStorage.getItem(NOTIF_TIME_KEY)) || "08:00";
  const parsed = parseHHMM(timeRaw.trim());
  const hour = parsed?.hour ?? 8;
  const minute = parsed?.minute ?? 0;

  const smartRaw = await AsyncStorage.getItem(NOTIF_SMART_SKIP_DONE_KEY);
  const smartSkip = smartRaw === null ? true : smartRaw === "1" || smartRaw === "true";

  const modeRaw = (await AsyncStorage.getItem(NOTIF_CONTENT_MODE_KEY)) as ContentMode | null;
  const mode: ContentMode =
    modeRaw === "verse" || modeRaw === "phrase" || modeRaw === "mixed" ? modeRaw : "mixed";

  // ✅ modo inteligente: se já leu hoje e ainda NÃO passou do horário, não pode notificar hoje
  if (smartSkip) {
    const done = await shouldSkipTodayBecauseDone();

    if (done) {
      const now = new Date();
      const todayAtTime = getTodayAtTime(hour, minute);

      // cancela qualquer agendamento atual
      await cancelDailyReminderIfAny();

      const todayIso = dateToIsoLocal(now);
      const picked = pickContent(mode, todayIso);

      // Se ainda não passou do horário, agenda UMA vez para amanhã e encerra.
      if (now < todayAtTime) {
        const tomorrowIso = addDaysIso(todayIso, 1);
        const tomorrowAtTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() + 1,
          hour,
          minute,
          0,
          0
        );

        const id = await scheduleOneTimeReminder({
          date: tomorrowAtTime,
          title: picked.title,
          body: picked.body,
        });

        await AsyncStorage.setItem(NOTIF_SCHEDULED_ID_KEY, id);
        return;
      }

      // Se já passou do horário de hoje, pode seguir e agendar DAILY (cairá amanhã).
      // (segue fluxo normal abaixo)
    }
  }

  // Sempre re-agenda (garante horário novo)
  await cancelDailyReminderIfAny();

  const todayIso = dateToIsoLocal(new Date());
  const picked = pickContent(mode, todayIso);

  const id = await scheduleDailyReminder({
    hour,
    minute,
    title: picked.title,
    body: picked.body,
  });

  await AsyncStorage.setItem(NOTIF_SCHEDULED_ID_KEY, id);
}

export async function rescheduleFromSettings() {
  await syncScheduledNotifications();
}

/**
 * Boot do serviço (não pede permissão automaticamente).
 */
export async function initNotifications() {
  try {
    configureNotificationHandlerOnce();
    await ensureAndroidChannel();

    // no boot a gente NÃO pede permissão.
    // mas se o usuário já ativou antes e já tinha permissão, sincroniza.
    const enabledRaw = await AsyncStorage.getItem(NOTIF_ENABLED_KEY);
    const enabled = enabledRaw === "1" || enabledRaw === "true";
    if (enabled) {
      await syncScheduledNotifications();
    }
  } catch (e) {
    console.log("initNotifications error", e);
  }
}
