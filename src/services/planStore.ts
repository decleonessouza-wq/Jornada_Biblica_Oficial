// src/services/planStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Plano Atemporal (base)
 * - Salva a data de inicio escolhida/derivada (planStartDate)
 * - Converte "hoje" -> indice do plano
 * - Permite saber se a pessoa está atrasada e quantos dias
 *
 * IMPORTANTE:
 * - Não mexe no readingPlan nem no progresso ainda.
 * - Só prepara a infraestrutura para a próxima etapa.
 */

export const PLAN_START_DATE_KEY = "planStartDate";

/** YYYY-MM-DD */
function isIsoDateString(s: unknown): s is string {
  return typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);
}

/**
 * Converte YYYY-MM-DD para Date local ao meio-dia (evita bugs de fuso/UTC)
 */
export function isoToLocalMidday(iso: string): Date {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return new Date(iso);
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const d = Number(m[3]);
  return new Date(y, mo, d, 12, 0, 0);
}

/**
 * Converte Date -> YYYY-MM-DD
 */
export function toIsoDate(d: Date): string {
  // Mantém base local, mas serializa em ISO do JS.
  // Como sempre usamos meio-dia, não "volta um dia" por timezone.
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0)
    .toISOString()
    .split("T")[0];
}

/**
 * Diferença inteira em dias entre A e B (A - B), usando meio-dia local
 */
export function diffDays(aIso: string, bIso: string): number {
  const a = isoToLocalMidday(aIso).getTime();
  const b = isoToLocalMidday(bIso).getTime();
  const ms = a - b;
  return Math.floor(ms / 86400000); // 24h
}

/**
 * Lê planStartDate do storage
 */
export async function getPlanStartDate(): Promise<string | null> {
  try {
    const raw = await AsyncStorage.getItem(PLAN_START_DATE_KEY);
    if (isIsoDateString(raw)) return raw;
    return null;
  } catch {
    return null;
  }
}

/**
 * Define planStartDate (YYYY-MM-DD)
 */
export async function setPlanStartDate(dateIso: string): Promise<void> {
  if (!isIsoDateString(dateIso)) {
    throw new Error("planStartDate inválida. Esperado YYYY-MM-DD.");
  }
  await AsyncStorage.setItem(PLAN_START_DATE_KEY, dateIso);
}

/**
 * Garante planStartDate:
 * - se já existir, retorna
 * - senão usa fallback (ex: primeiro dia concluído do usuário)
 * - senão usa "hoje"
 */
export async function ensurePlanStartDate(options?: {
  fallbackStartDate?: string | null;
  todayIso?: string;
}): Promise<string> {
  const todayIso = options?.todayIso && isIsoDateString(options.todayIso)
    ? options.todayIso
    : toIsoDate(new Date());

  const existing = await getPlanStartDate();
  if (existing) return existing;

  const fallback = options?.fallbackStartDate;
  const start = isIsoDateString(fallback) ? fallback : todayIso;

  await setPlanStartDate(start);
  return start;
}

/**
 * Retorna o índice do plano para uma data alvo (normalmente "hoje")
 * Ex: se planStartDate = 2026-03-15 e target = 2026-03-15 => 0
 * Ex: target = +1 dia => 1
 */
export function getPlanDayIndex(params: {
  planStartDateIso: string;
  targetDateIso: string;
}): number {
  const { planStartDateIso, targetDateIso } = params;
  if (!isIsoDateString(planStartDateIso) || !isIsoDateString(targetDateIso)) return 0;

  const idx = diffDays(targetDateIso, planStartDateIso);
  return idx < 0 ? 0 : idx;
}

/**
 * Meta-info útil:
 * - expectedIndex: índice que o usuário "deveria" estar hoje
 * - daysLate: quantos dias atrasados (com base no último índice concluído)
 *
 * lastCompletedIndex: maior índice do plano que já foi concluído (calculado depois, na Etapa 2/3)
 */
export function getLateInfo(params: {
  planStartDateIso: string;
  todayIso: string;
  lastCompletedIndex: number | null;
}): { expectedIndex: number; daysLate: number } {
  const expectedIndex = getPlanDayIndex({
    planStartDateIso: params.planStartDateIso,
    targetDateIso: params.todayIso,
  });

  const last = typeof params.lastCompletedIndex === "number" ? params.lastCompletedIndex : -1;

  // Se o usuário concluiu o índice esperado (ou além), não está atrasado
  const daysLate = Math.max(0, expectedIndex - last);

  return { expectedIndex, daysLate };
}
