import AsyncStorage from "@react-native-async-storage/async-storage";
import { restoreFromAutoBackup } from "./backupRestore";
import { readingPlan } from "../data/readingPlan";

export const COMPLETED_DAYS_KEY = "completedDays";
export const AUTO_BACKUP_KEY = "autoBackupData";
export const LAST_BACKUP_KEY = "lastAutoBackupDate";
export const AUTO_RESTORE_DONE_KEY = "autoRestoreDone";

// ✅ plano atemporal
export const PLAN_START_DATE_KEY = "planStartDate"; // YYYY-MM-DD

// ✅ NOVO: overrides (redistribuição) por data
// map: { "YYYY-MM-DD": "Gn 1-3; Êx 1-2" }
export const PLAN_OVERRIDES_KEY = "planOverridesByDate";

function isValidDateString(d: unknown): d is string {
  return typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d);
}

function uniqSorted(days: string[]) {
  return Array.from(new Set(days)).filter(isValidDateString).sort();
}

/* ==========================
   DATE UTILS (LOCAL SAFE)
========================== */

function isoToLocalNoon(iso: string): Date {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return new Date(iso);
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const d = Number(m[3]);
  return new Date(y, mo, d, 12, 0, 0, 0);
}

function dateToIsoLocal(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function diffDaysIso(aIso: string, bIso: string): number {
  const a = isoToLocalNoon(aIso).getTime();
  const b = isoToLocalNoon(bIso).getTime();
  return Math.floor((b - a) / 86400000);
}

function addDaysIso(iso: string, days: number): string {
  const d = isoToLocalNoon(iso);
  d.setDate(d.getDate() + days);
  return dateToIsoLocal(d);
}

function isSundayIso(iso: string): boolean {
  return isoToLocalNoon(iso).getDay() === 0;
}

export function getTodayIsoLocal(): string {
  return dateToIsoLocal(new Date());
}

/* ==========================
   PROGRESS (compat)
========================== */

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

/* ==========================
   ✅ PLANO ATEMPORAL
========================== */

export async function getPlanStartDate(): Promise<string | null> {
  try {
    const raw = await AsyncStorage.getItem(PLAN_START_DATE_KEY);
    if (isValidDateString(raw)) return raw;
    return null;
  } catch {
    return null;
  }
}

export async function setPlanStartDate(dateIso: string): Promise<string | null> {
  if (!isValidDateString(dateIso)) return null;
  try {
    await AsyncStorage.setItem(PLAN_START_DATE_KEY, dateIso);
    return dateIso;
  } catch {
    return null;
  }
}

/**
 * ✅ Migração segura:
 * - se já existe planStartDate, mantém
 * - se não existe e já há leituras concluídas, usa a primeira concluída como início
 * - se não existe e não há leituras, usa fallback (se vier) ou hoje
 *
 * ⚠️ Aceita fallback opcional para NÃO quebrar chamadas antigas do HomeScreen.
 */
export async function ensurePlanStartDate(fallbackIso?: string): Promise<string> {
  const existing = await getPlanStartDate();
  if (existing) return existing;

  const completed = await getCompletedDays();

  const fallback =
    completed.length > 0
      ? completed[0]
      : isValidDateString(fallbackIso)
      ? fallbackIso
      : getTodayIsoLocal();

  await setPlanStartDate(fallback);
  return fallback;
}

/**
 * Offset do plano para uma data do calendário:
 * - offset 0 = dia 1 do plano (readingPlan[0])
 * - offset 1 = dia 2 do plano...
 */
export async function getPlanOffsetForDate(dateIso: string): Promise<number | null> {
  if (!isValidDateString(dateIso)) return null;
  const start = await ensurePlanStartDate();
  return diffDaysIso(start, dateIso);
}

export async function getDateForPlanOffset(offset: number): Promise<string | null> {
  if (!Number.isFinite(offset)) return null;
  const start = await ensurePlanStartDate();
  return addDaysIso(start, offset);
}

export function getPlanTotalDays(): number {
  return readingPlan.length;
}

/**
 * Retorna a leitura do plano por offset (0..len-1).
 */
export function getPlanItemByOffset(offset: number) {
  if (!Number.isFinite(offset)) return null;
  if (offset < 0 || offset >= readingPlan.length) return null;
  return readingPlan[offset];
}

/* ==========================
   ✅ Overdue (como já estava)
========================== */

/**
 * ✅ Detecta atrasos por OFFSET (baseado no readingPlan)
 * Atrasado = dia do plano já passado (<= ontem) que NÃO está em completedDays e NÃO é domingo do plano.
 */
export async function getOverdueOffsets(params?: {
  todayIso?: string; // default hoje local
  includeToday?: boolean; // default false
}): Promise<number[]> {
  const start = await ensurePlanStartDate();

  const today = isValidDateString(params?.todayIso) ? params!.todayIso! : getTodayIsoLocal();
  const includeToday = !!params?.includeToday;

  const completed = await getCompletedDays();
  const done = new Set(completed);

  const endIso = includeToday ? today : addDaysIso(today, -1);
  const endOffset = diffDaysIso(start, endIso);

  if (endOffset < 0) return [];

  const maxOffset = Math.min(endOffset, readingPlan.length - 1);
  const overdue: number[] = [];

  for (let off = 0; off <= maxOffset; off++) {
    const item = readingPlan[off];
    if (item?.isSunday) continue; // domingo do plano é livre
    const dateIso = addDaysIso(start, off);
    if (!done.has(dateIso)) overdue.push(off);
  }

  return overdue;
}

/**
 * ✅ COMPAT: retorna as DATAS atrasadas (YYYY-MM-DD) para telas que trabalham por data.
 * (Wrapper sobre getOverdueOffsets)
 */
export async function getOverdueDates(params?: {
  todayIso?: string;
  includeToday?: boolean;
}): Promise<string[]> {
  const start = await ensurePlanStartDate();
  const overdueOffsets = await getOverdueOffsets(params);
  return overdueOffsets.map((off) => addDaysIso(start, off));
}

/**
 * ✅ “Catch-up”: se houver atrasos, o “dia ativo” vira o primeiro atraso.
 */
export async function getActivePlanDay(params?: {
  todayIso?: string;
  catchUp?: boolean; // default true
}): Promise<{
  offset: number;
  dateIso: string;
  item: { date: string; reference: string; isSunday?: boolean } | null;
  isCatchUp: boolean;
  overdueCount: number;
}> {
  const start = await ensurePlanStartDate();
  const today = isValidDateString(params?.todayIso) ? params!.todayIso! : getTodayIsoLocal();
  const catchUp = params?.catchUp !== false;

  const todayOffset = diffDaysIso(start, today);

  if (todayOffset < 0) {
    return {
      offset: 0,
      dateIso: start,
      item: readingPlan[0] ?? null,
      isCatchUp: false,
      overdueCount: 0,
    };
  }

  if (todayOffset >= readingPlan.length) {
    const lastOffset = readingPlan.length - 1;
    const lastDate = addDaysIso(start, lastOffset);
    return {
      offset: lastOffset,
      dateIso: lastDate,
      item: readingPlan[lastOffset] ?? null,
      isCatchUp: false,
      overdueCount: 0,
    };
  }

  const overdue = await getOverdueOffsets({ todayIso: today, includeToday: false });
  const overdueCount = overdue.length;

  if (catchUp && overdue.length > 0) {
    const firstOff = overdue[0];
    const dateIso = addDaysIso(start, firstOff);
    return {
      offset: firstOff,
      dateIso,
      item: readingPlan[firstOff] ?? null,
      isCatchUp: true,
      overdueCount,
    };
  }

  const dateIso = addDaysIso(start, todayOffset);
  return {
    offset: todayOffset,
    dateIso,
    item: readingPlan[todayOffset] ?? null,
    isCatchUp: false,
    overdueCount,
  };
}

/* ==========================
   ✅ Overrides (Redistribuição)
========================== */

function sanitizeOverridesMap(input: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (!input || typeof input !== "object") return out;

  for (const [k, v] of Object.entries(input as Record<string, unknown>)) {
    if (!isValidDateString(k)) continue;
    if (typeof v !== "string") continue;
    const txt = v.trim();
    if (!txt) continue;
    // evita strings absurdas
    out[k] = txt.length > 2000 ? txt.slice(0, 2000) : txt;
  }

  return out;
}

async function getOverridesMap(): Promise<Record<string, string>> {
  try {
    const raw = await AsyncStorage.getItem(PLAN_OVERRIDES_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return sanitizeOverridesMap(parsed);
  } catch {
    return {};
  }
}

async function setOverridesMap(map: Record<string, string>): Promise<void> {
  try {
    await AsyncStorage.setItem(PLAN_OVERRIDES_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}

/**
 * Retorna override (se existir) para uma data.
 */
export async function getOverrideForDate(dateIso: string): Promise<string | null> {
  if (!isValidDateString(dateIso)) return null;
  const map = await getOverridesMap();
  return typeof map[dateIso] === "string" ? map[dateIso] : null;
}

/**
 * Remove overrides a partir de uma data (inclusive).
 * Útil quando for recalcular novamente.
 */
export async function clearOverridesFrom(dateIso: string): Promise<number> {
  if (!isValidDateString(dateIso)) return 0;

  const map = await getOverridesMap();
  const keys = Object.keys(map);
  let removed = 0;

  for (const k of keys) {
    if (k >= dateIso) {
      delete map[k];
      removed++;
    }
  }

  await setOverridesMap(map);
  return removed;
}

export async function clearAllOverrides(): Promise<void> {
  try {
    await AsyncStorage.removeItem(PLAN_OVERRIDES_KEY);
  } catch {}
}

/* ==========================
   ✅ Resolver referência base (consistente com seu ReadingScreen)
   - domingos reais são livres
   - sequência canônica = readingPlan sem isSunday
========================== */

function getNonSundaySequence(): string[] {
  return readingPlan.filter((d) => !d.isSunday).map((d) => d.reference);
}

/**
 * Conta quantos dias NÃO-domingo existem entre start e target (inclusive),
 * retornando um índice 0-based para o array de leituras úteis.
 */
function workdayIndexSinceStart(startIso: string, targetIso: string): number {
  if (targetIso < startIso) return -1;

  let idx = -1;
  let cur = startIso;

  while (cur <= targetIso) {
    if (!isSundayIso(cur)) idx++;
    cur = addDaysIso(cur, 1);
  }

  return idx;
}

function dateForWorkdayIndex(startIso: string, targetIdx: number): string {
  // targetIdx 0 = primeira data útil do plano
  let cur = startIso;
  let idx = -1;

  while (true) {
    if (!isSundayIso(cur)) idx++;
    if (idx === targetIdx) return cur;
    cur = addDaysIso(cur, 1);
  }
}

/**
 * Referência base do plano para uma data (sem overrides).
 */
export async function getBaseReferenceForDate(dateIso: string): Promise<{
  isSunday: boolean;
  reference: string;
  finished: boolean;
}> {
  const start = await ensurePlanStartDate();
  const seq = getNonSundaySequence();

  const sunday = isSundayIso(dateIso);
  if (sunday) {
    return { isSunday: true, reference: "Meditar", finished: false };
  }

  const idx = workdayIndexSinceStart(start, dateIso);

  if (idx < 0) {
    return { isSunday: false, reference: seq[0] ?? "Leitura do dia", finished: false };
  }

  if (idx >= seq.length) {
    return { isSunday: false, reference: "✅ Plano concluído — revisar", finished: true };
  }

  return { isSunday: false, reference: seq[idx], finished: false };
}

/**
 * ✅ Referência efetiva do dia:
 * - se tiver override, usa
 * - senão usa base
 * - domingo real sempre é "Meditar"
 */
export async function getEffectiveReferenceForDate(dateIso: string): Promise<{
  isSunday: boolean;
  reference: string;
  finished: boolean;
  source: "OVERRIDE" | "BASE";
}> {
  if (isSundayIso(dateIso)) {
    return { isSunday: true, reference: "Meditar", finished: false, source: "BASE" };
  }

  const ov = await getOverrideForDate(dateIso);
  if (ov) {
    return { isSunday: false, reference: ov, finished: false, source: "OVERRIDE" };
  }

  const base = await getBaseReferenceForDate(dateIso);
  return { ...base, source: "BASE" };
}

/**
 * ✅ Redistribui leituras atrasadas dentro dos próximos dias em aberto.
 *
 * Estratégia (simples e funcional, sem quebrar UI):
 * - pega as referências das datas atrasadas (<= ontem)
 * - para os próximos dias não concluídos (de hoje até o fim do plano),
 *   adiciona 1 ou mais atrasos junto com a leitura do dia usando "; "
 *   (ReadingScreen já suporta multi-passagens com ";")
 *
 * Retorno: resumo para UI/Alert.
 */
export async function redistributeOverdueReadings(params?: {
  todayIso?: string; // default hoje local
  includeTodayAsTarget?: boolean; // default true
}): Promise<{
  overdueCount: number;
  redistributedCount: number;
  targetDays: number;
  overridesWritten: number;
  start: string;
  planEndDate: string;
}> {
  const start = await ensurePlanStartDate();
  const today = isValidDateString(params?.todayIso) ? params!.todayIso! : getTodayIsoLocal();
  const includeTodayAsTarget = params?.includeTodayAsTarget !== false;

  // 1) quais datas estão atrasadas (<= ontem)
  const overdueDates = await getOverdueDates({ todayIso: today, includeToday: false });

  if (overdueDates.length === 0) {
    return {
      overdueCount: 0,
      redistributedCount: 0,
      targetDays: 0,
      overridesWritten: 0,
      start,
      planEndDate: today,
    };
  }

  // 2) transformar cada atraso em referência (base, respeitando domingo real)
  const backlog: string[] = [];
  for (const d of overdueDates) {
    // se for domingo real, ignora (domingo é livre)
    if (isSundayIso(d)) continue;
    const base = await getBaseReferenceForDate(d);
    // se por algum motivo está "concluído", ignora
    if (base.finished) continue;
    if (base.reference && !/meditar/i.test(base.reference)) backlog.push(base.reference);
  }

  if (backlog.length === 0) {
    return {
      overdueCount: overdueDates.length,
      redistributedCount: 0,
      targetDays: 0,
      overridesWritten: 0,
      start,
      planEndDate: today,
    };
  }

  // 3) calcular a data final do plano (pela sequência útil)
  const seq = getNonSundaySequence();
  const lastIdx = Math.max(0, seq.length - 1);
  const planEndDate = dateForWorkdayIndex(start, lastIdx);

  // 4) listar dias alvo (próximos dias em aberto)
  const completed = await getCompletedDays();
  const done = new Set(completed);

  const targetStart = includeTodayAsTarget ? today : addDaysIso(today, 1);
  const targets: string[] = [];

  let cur = targetStart;
  while (cur <= planEndDate) {
    if (!isSundayIso(cur) && !done.has(cur)) {
      targets.push(cur);
    }
    cur = addDaysIso(cur, 1);
  }

  if (targets.length === 0) {
    return {
      overdueCount: overdueDates.length,
      redistributedCount: 0,
      targetDays: 0,
      overridesWritten: 0,
      start,
      planEndDate,
    };
  }

  // 5) limpamos overrides futuros (para não somar bagunça em recalcular de novo)
  await clearOverridesFrom(targetStart);

  // 6) distribuição equilibrada (q + resto)
  const totalBacklog = backlog.length;
  const daysCount = targets.length;
  const q = Math.floor(totalBacklog / daysCount);
  const r = totalBacklog % daysCount;

  const overrides = await getOverridesMap();

  let cursorBacklog = 0;
  let written = 0;

  for (let i = 0; i < targets.length; i++) {
    const dateIso = targets[i];

    const base = await getBaseReferenceForDate(dateIso);
    if (base.finished) break; // segurança
    if (base.isSunday) continue;

    const take = q + (i < r ? 1 : 0);
    if (take <= 0) continue;

    const extras = backlog.slice(cursorBacklog, cursorBacklog + take);
    cursorBacklog += extras.length;

    if (extras.length === 0) continue;

    // Combina a leitura do dia + extras
    const combined = [base.reference, ...extras].join("; ");

    overrides[dateIso] = combined;
    written++;

    if (cursorBacklog >= totalBacklog) break;
  }

  await setOverridesMap(overrides);

  return {
    overdueCount: overdueDates.length,
    redistributedCount: Math.min(cursorBacklog, totalBacklog),
    targetDays: targets.length,
    overridesWritten: written,
    start,
    planEndDate,
  };
}

/* ==========================
   MARK / RESET / RESTORE
========================== */

export async function addCompletedDay(dateIso: string): Promise<{
  added: boolean;
  days: string[];
}> {
  if (!isValidDateString(dateIso)) return { added: false, days: await getCompletedDays() };

  // ✅ garante start (migração)
  await ensurePlanStartDate();

  const current = await getCompletedDays();
  if (current.includes(dateIso)) return { added: false, days: current };

  const updated = uniqSorted([...current, dateIso]);
  await AsyncStorage.setItem(COMPLETED_DAYS_KEY, JSON.stringify(updated));
  return { added: true, days: updated };
}

export async function resetProgress(): Promise<void> {
  await AsyncStorage.removeItem(COMPLETED_DAYS_KEY);
  await AsyncStorage.removeItem(AUTO_RESTORE_DONE_KEY);
  await AsyncStorage.removeItem(PLAN_START_DATE_KEY);

  // ✅ limpa redistribuições
  await AsyncStorage.removeItem(PLAN_OVERRIDES_KEY);
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
    const already = await AsyncStorage.getItem(AUTO_RESTORE_DONE_KEY);
    if (already === "1") return { restored: false, count: 0 };

    const current = await getCompletedDays();
    if (current.length > 0) {
      await markAutoRestoreDone();
      return { restored: false, count: 0 };
    }

    const result = await restoreFromAutoBackup();

    await markAutoRestoreDone();

    return result;
  } catch {
    try {
      await markAutoRestoreDone();
    } catch {}
    return { restored: false, count: 0 };
  }
}

/* ==========================
   STREAK
========================== */

export function getLastRead(days: string[]): string | null {
  if (!days || days.length === 0) return null;
  const sorted = [...days].sort();
  return sorted[sorted.length - 1] ?? null;
}

export function calculateStreak(days: string[], nowDate = new Date()): number {
  if (!days || days.length === 0) return 0;

  const set = new Set(days);
  const current = new Date(nowDate);
  current.setHours(12, 0, 0, 0);

  let count = 0;

  while (true) {
    const iso = dateToIsoLocal(current);
    const dow = current.getDay(); // 0 domingo

    if (dow !== 0) {
      if (!set.has(iso)) break;
      count++;
    }

    current.setDate(current.getDate() - 1);
  }

  return count;
}
