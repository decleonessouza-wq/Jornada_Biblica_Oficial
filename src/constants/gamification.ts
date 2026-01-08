// constants/gamification.ts
// Regras mínimas e consistentes de "Experiência Espiritual + Gamificação"
// Sem IA, sem bagunça de strings espalhadas no app.

export const GAMIFICATION = {
  // Domingo é livre (não conta como falha), mas também não deve contar como "meta semanal"
  sundayIsFreeDay: true,

  // Meta semanal realista: 6 dias (Seg-Sáb). Domingo livre.
  weeklyGoal: 6,

  // Marcos (badges) – poucos e fortes (não inventar dezenas).
  milestones: [3, 7, 14, 21, 30, 45, 60, 90, 120, 180, 365] as const,

  // Níveis simples por streak (muda conforme você mantém constância)
  levels: [
    { minStreak: 0, title: "Recomeço", subtitle: "Um dia de cada vez.", icon: "🌱" },
    { minStreak: 3, title: "Constante", subtitle: "A disciplina está nascendo.", icon: "🔥" },
    { minStreak: 7, title: "Disciplinado", subtitle: "Uma semana firme.", icon: "🚀" },
    { minStreak: 14, title: "Perseverante", subtitle: "Você está criando raiz.", icon: "⚔️" },
    { minStreak: 30, title: "Semeador", subtitle: "Constância madura.", icon: "🌿" },
    { minStreak: 60, title: "Firme na Palavra", subtitle: "Você não depende de ânimo.", icon: "🌳" },
    { minStreak: 90, title: "Inabalável", subtitle: "Hábito consolidado.", icon: "🏔️" },
    { minStreak: 180, title: "Testemunho", subtitle: "Sua vida já reflete disciplina.", icon: "👑" },
    { minStreak: 365, title: "Jornada Completa", subtitle: "Um ano de fidelidade.", icon: "🏆" },
  ] as const,
} as const;

export type Milestone = (typeof GAMIFICATION.milestones)[number];

export function getLevelForStreak(streak: number) {
  const s = Math.max(0, Math.floor(streak || 0));
  // pega o maior nível cujo minStreak <= streak
  const level =
    [...GAMIFICATION.levels].reverse().find((l) => s >= l.minStreak) ??
    GAMIFICATION.levels[0];

  return {
    streak: s,
    title: level.title,
    subtitle: level.subtitle,
    minStreak: level.minStreak,
    icon: level.icon, // ✅ Adicionado para corrigir o erro
  };
}

export function getNextMilestone(streak: number) {
  const s = Math.max(0, Math.floor(streak || 0));
  const next = GAMIFICATION.milestones.find((m) => m > s) ?? null;
  const remaining = next ? next - s : 0;

  return { next, remaining };
}

export function isMilestone(streak: number) {
  const s = Math.max(0, Math.floor(streak || 0));
  return (GAMIFICATION.milestones as readonly number[]).includes(s);
}

// Mensagem curta diária (Home) — baseada em streak e estado do plano.
// (Sem exagero emocional. Direto e útil.)
export function getDailyMessage(params: {
  streak: number;
  isBeforePlan?: boolean;
  isAfterPlan?: boolean;
}) {
  const s = Math.max(0, Math.floor(params.streak || 0));

  if (params.isBeforePlan) return "Plano ainda não começou. Prepare o coração e a rotina.";
  if (params.isAfterPlan) return "Plano finalizado. Releia, consolide e mantenha o hábito.";

  if (s === 0) return "Recomece hoje. Simples e direto.";
  if (s < 3) return "Constância > intensidade. Faça o básico bem feito.";
  if (s < 7) return "Você está formando hábito. Proteja seu horário.";
  if (s < 14) return "Uma semana sólida. Agora é manter sem negociar.";
  if (s < 30) return "Perseverança real: continuar mesmo sem vontade.";
  return "Disciplina madura. Continue, sem ansiedade.";
}

// Frase curta para pop-up quando bater marco.
// (Você pode usar em Alert quando streak atingir marco)
export function getMilestoneMessage(milestone: number) {
  switch (milestone) {
    case 3:
      return "3 dias: você saiu da inércia.";
    case 7:
      return "7 dias: uma semana firme.";
    case 14:
      return "14 dias: hábito em formação.";
    case 21:
      return "21 dias: consistência visível.";
    case 30:
      return "30 dias: disciplina consolidando.";
    case 60:
      return "60 dias: firmeza rara. Continue.";
    case 90:
      return "90 dias: hábito estabelecido.";
    case 180:
      return "180 dias: você está diferente.";
    case 365:
      return "365 dias: jornada completa.";
    default:
      return `${milestone} dias: marco atingido.`;
  }
}