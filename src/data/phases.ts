export type Phase = {
  id: number;
  title: string;
  description: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  messianicConnection?: string;
};

export const phases: Phase[] = [
  {
    id: 1,
    title: "Fundamentos",
    description:
      "Criação, queda e os primeiros passos do plano redentor de Deus.",
    startDate: "2026-01-05",
    endDate: "2026-02-15",
    messianicConnection:
      "Desde a criação, Cristo é revelado como o Verbo por meio de quem tudo foi feito. Após a queda, a promessa da descendência da mulher (Gênesis 3:15) aponta para o Messias que venceria o pecado e restauraria a humanidade.",
  },
  {
    id: 2,
    title: "Preparação",
    description:
      "Deus forma um povo e estabelece alianças que apontam para a redenção.",
    startDate: "2026-02-16",
    endDate: "2026-03-29",
    messianicConnection:
      "As alianças com Abraão, Moisés e Davi preparam o caminho para Cristo. Jesus é o descendente prometido, o verdadeiro Cordeiro e o Rei eterno que cumpre todas as promessas feitas ao povo de Deus.",
  },
  {
    id: 3,
    title: "Profecia",
    description:
      "Chamado ao arrependimento e esperança messiânica anunciada pelos profetas.",
    startDate: "2026-03-30",
    endDate: "2026-05-10",
    messianicConnection:
      "Os profetas anunciaram um Messias sofredor e glorioso. Em Cristo cumprem-se as profecias sobre redenção, novo coração, justiça e o Reino de Deus estabelecido para sempre.",
  },
  {
    id: 4,
    title: "Silêncio e Espera",
    description:
      "O período intertestamentário e a expectativa pelo Messias prometido.",
    startDate: "2026-05-11",
    endDate: "2026-05-31",
    messianicConnection:
      "Mesmo em silêncio aparente, Deus preparava o cenário para a vinda de Cristo. A esperança messiânica permaneceu viva até o cumprimento do tempo determinado para o nascimento do Salvador.",
  },
  {
    id: 5,
    title: "Evangelhos",
    description:
      "A vida, os ensinos, a morte e a ressurreição de Jesus Cristo.",
    startDate: "2026-06-01",
    endDate: "2026-07-19",
    messianicConnection:
      "Jesus é o cumprimento pleno das promessas messiânicas. Sua vida, morte e ressurreição revelam o Reino de Deus, trazendo salvação, reconciliação e nova vida para todos os que creem.",
  },
  {
    id: 6,
    title: "Igreja Primitiva",
    description:
      "O nascimento da Igreja e a expansão do Evangelho pelo mundo.",
    startDate: "2026-07-20",
    endDate: "2026-08-30",
    messianicConnection:
      "Cristo ressuscitado governa Sua Igreja. Pelo Espírito Santo, o Evangelho é anunciado, testemunhando que Jesus é o Senhor e Salvador de todas as nações.",
  },
  {
    id: 7,
    title: "Cartas Apostólicas",
    description:
      "Instruções práticas e teológicas para a vida cristã.",
    startDate: "2026-08-31",
    endDate: "2026-10-11",
    messianicConnection:
      "As cartas revelam Cristo como fundamento da fé, da santificação e da esperança cristã. Ele é o centro da vida da Igreja e o modelo para uma vida transformada.",
  },
  {
    id: 8,
    title: "Perseverança",
    description:
      "Chamado à fidelidade, maturidade espiritual e firmeza na fé.",
    startDate: "2026-10-12",
    endDate: "2026-11-08",
    messianicConnection:
      "Cristo sustenta os fiéis em meio às provações. Nele encontramos força para perseverar, confiantes de que Ele é fiel para completar a obra iniciada.",
  },
  {
    id: 9,
    title: "Consumação",
    description:
      "A vitória final de Cristo e a esperança eterna do povo de Deus.",
    startDate: "2026-11-09",
    endDate: "2026-11-29",
    messianicConnection:
      "Jesus é o Alfa e o Ômega. Sua vitória final sobre o mal garante novos céus e nova terra, onde Deus habitará eternamente com Seu povo.",
  },
  {
    id: 10,
    title: "Esperança Eterna",
    description:
      "Reflexão final sobre redenção, eternidade e vida com Deus.",
    startDate: "2026-11-30",
    endDate: "2026-12-31",
    messianicConnection:
      "Toda a Escritura converge em Cristo. A jornada termina apontando para a vida eterna com Deus, onde o Cordeiro reina para sempre.",
  },
];
