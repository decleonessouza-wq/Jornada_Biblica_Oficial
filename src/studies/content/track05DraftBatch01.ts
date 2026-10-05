import {
  type Study,
  type StudyId,
  type StudySection,
  type StudySectionId,
  type StudySlug,
  type StudyTrack,
  type StudyTrackId,
  type StudyTrackSlug,
} from "../../domain/studies/study";
import type { StudyContentPackage } from "./studyContentPackage";

export type Track05DraftBatch01AuthorMetadata = Readonly<{
  studyId: string;
  displayName: string;
  roles: readonly string[];
  formations: readonly string[];
  cityState: string | null;
  publicDisplayAuthorization: "UNRESOLVED";
}>;

export type Track05DraftBatch01Provenance = Readonly<{
  studyId: string;
  md: Readonly<{ fileName: string; sha256: string }>;
  pdf: Readonly<{ fileName: string; sha256: string }>;
  governanceStatus: "DRAFT";
}>;

export const track05DraftBatch01AuthorMetadata:
  readonly Track05DraftBatch01AuthorMetadata[] =
[
  {
    "studyId": "track-05-study-02",
    "displayName": "Neterson",
    "roles": [
      "Presbítero"
    ],
    "formations": [],
    "cityState": null,
    "publicDisplayAuthorization": "UNRESOLVED"
  },
  {
    "studyId": "track-05-study-03",
    "displayName": "Adriel Jackson Batista de Oliveira",
    "roles": [
      "Evangelista"
    ],
    "formations": [
      "Pedagogo"
    ],
    "cityState": null,
    "publicDisplayAuthorization": "UNRESOLVED"
  },
  {
    "studyId": "track-05-study-04",
    "displayName": "Eliete Alves",
    "roles": [
      "Líder do ministério de mulheres"
    ],
    "formations": [
      "Pedagoga"
    ],
    "cityState": null,
    "publicDisplayAuthorization": "UNRESOLVED"
  },
  {
    "studyId": "track-05-study-05",
    "displayName": "Hélio Nascimento Sousa",
    "roles": [
      "Presbítero",
      "Professor de Escola Bíblica"
    ],
    "formations": [],
    "cityState": null,
    "publicDisplayAuthorization": "UNRESOLVED"
  }
];

export const track05DraftBatch01Provenance:
  readonly Track05DraftBatch01Provenance[] =
[
  {
    "studyId": "track-05-study-02",
    "md": {
      "fileName": "Trilha5_A_suprema_excelencia_do_amor_curadoria.md",
      "sha256": "BA9070A0141E1E90D382F30D2B894E5D02FDF9CEE83DA3E3B2C37B9CF1E7EF33"
    },
    "pdf": {
      "fileName": "Estudo bíblico_ A suprema excelência do amor pr. neterson.pdf",
      "sha256": "7F1F2DB183547290F7C6F95C56A6850C749AEB63105CCE2B4CAB595DB9E3728F"
    },
    "governanceStatus": "DRAFT"
  },
  {
    "studyId": "track-05-study-03",
    "md": {
      "fileName": "Trilha5_Jogue_a_Toalha_curadoria.md",
      "sha256": "E48E18FFA49EF0FD8FAEDAAAE354035441AAB74706C690609B6E6543328774A4"
    },
    "pdf": {
      "fileName": "JOGUE A TOALHA - REFLEXAO ADRIEL JACKSON.pdf",
      "sha256": "AED6EB34C68DDA6599A9BDAAC15668EABCAF8BFA5278256F3D5E7822DD825C2A"
    },
    "governanceStatus": "DRAFT"
  },
  {
    "studyId": "track-05-study-04",
    "md": {
      "fileName": "Trilha5_Quando_o_Altar_e_Restaurado_curadoria.md",
      "sha256": "A8FC7C05B9343B296372EA7B9D73A6F5871739B7E8038AA194C60C2A20BB1EEC"
    },
    "pdf": {
      "fileName": "estudo_eliete.pdf",
      "sha256": "3B9DBEC2E18F63BEF287626AC28A51DFA4D3CC87C1FA247E7432B1C985529282"
    },
    "governanceStatus": "DRAFT"
  },
  {
    "studyId": "track-05-study-05",
    "md": {
      "fileName": "Trilha5_A_Salvacao_pela_Graca_curadoria.md",
      "sha256": "65A20B8DF3242B6184E5E128102E595966E56158882FCF4E38DB30AFCBE68E1F"
    },
    "pdf": {
      "fileName": "Estudo_A_Salvacao_pela_Graca_PB_HELIO.pdf",
      "sha256": "5497FD95E95D3E4C47205E276D2BBDEA6D9B2E4F8CD3ECCF71E167F3E08555B8"
    },
    "governanceStatus": "DRAFT"
  }
];

export const track05DraftBatch01SourceMetadata = Object.freeze(
[
  {
    "studyId": "track-05-study-02",
    "authorLine": "Presbítero Neterson",
    "originalTitle": "A suprema excelência do amor",
    "journeyTitle": "A Suprema Excelência do Amor",
    "theme": "A Suprema Excelência do Amor",
    "reflectionStrategy": "III_QUESTION_SPLIT"
  },
  {
    "studyId": "track-05-study-03",
    "authorLine": "Adriel Jackson Batista de Oliveira",
    "originalTitle": "Jogue a toalha!",
    "journeyTitle": "Jogue a Toalha: Como Jesus Nos Ensina a Servir",
    "theme": "Jogue a Toalha: Como Jesus Nos Ensina a Servir",
    "reflectionStrategy": "CENTRAL_QUESTION_FALLBACK"
  },
  {
    "studyId": "track-05-study-04",
    "authorLine": "Eliete Alves — Líder do ministério de mulheres; Pedagoga",
    "originalTitle": "Quando o Altar é Restaurado, o Céu Responde — Elias no Monte Carmelo: O Deus que Responde com Fogo",
    "journeyTitle": "Quando o Altar É Restaurado, o Céu Responde: Elias no Monte Carmelo",
    "theme": "(mantido como a própria autora já havia definido)",
    "reflectionStrategy": "III_QUESTION_SPLIT"
  },
  {
    "studyId": "track-05-study-05",
    "authorLine": "Hélio Nascimento Sousa — Presbítero; Professor de Escola Bíblica",
    "originalTitle": "A Salvação pela Graça",
    "journeyTitle": "A Salvação pela Graça: Um Presente Que Não Merecemos",
    "theme": "(criado editorialmente — o original só tinha o título geral e o cabeçalho \"VISÃO\")",
    "reflectionStrategy": "CENTRAL_QUESTION_FALLBACK"
  }
]
);

const rawTrack05DraftBatch01Package =
{
  "contentVersion": "draft-track-05-studies-02-05-batch-01-v1",
  "tracks": [
    {
      "id": "track-05",
      "slug": "estudos-colaborativos",
      "title": "Estudos Colaborativos",
      "description": "Estudos colaborativos revisados e aprovados editorialmente.",
      "type": "FORMATION",
      "contentProfile": "JOURNEY_20_30_V1",
      "cardImage": "track-05-card",
      "heroImage": "track-05-hero",
      "order": 5,
      "published": false
    }
  ],
  "studies": [
    {
      "id": "track-05-study-02",
      "trackId": "track-05",
      "number": 2,
      "slug": "a-suprema-excelencia-do-amor",
      "title": "A Suprema Excelência do Amor",
      "summary": "A primeira carta aos Coríntios foi escrita pelo apóstolo Paulo, provavelmente por volta do ano 55 d.C., quando ele estava em Éfeso. A igreja de Corinto havia sido fundada durante sua segunda viagem missionária, numa cidade rica, movimentada e marcada pela idolatria, pela imoralidade e pela busca por prestígio.",
      "questionCentral": "(criada editorialmente — o material original não trazia uma pergunta central explícita)",
      "objective": "Compreender que o amor é o fundamento da vida cristã e deve orientar nossos dons, palavras, relacionamentos e atitudes.",
      "estimatedMinutes": null,
      "heroImage": "track-05-hero",
      "nextStudyId": "track-05-study-03",
      "audienceLevel": null,
      "tags": [],
      "published": false
    },
    {
      "id": "track-05-study-03",
      "trackId": "track-05",
      "number": 3,
      "slug": "jogue-a-toalha-como-jesus-nos-ensina-a-servir",
      "title": "Jogue a Toalha: Como Jesus Nos Ensina a Servir",
      "summary": "Quem nunca sentiu vontade de \"jogar a toalha\"? O emprego de anos que termina em demissão inesperada. O casamento em que o esforço de décadas parece não ser reconhecido. A liderança na igreja que nunca chega, apesar de tanto trabalho e dedicação. Em momentos assim, cansados, frustrados e desanimados, muitos de nós já pensamos: chega, vou jogar a toalha.",
      "questionCentral": "(criada editorialmente — o material original não trazia uma pergunta central explícita)",
      "objective": "(criado editorialmente, a partir do argumento central do autor)",
      "estimatedMinutes": null,
      "heroImage": "track-05-hero",
      "nextStudyId": "track-05-study-04",
      "audienceLevel": null,
      "tags": [],
      "published": false
    },
    {
      "id": "track-05-study-04",
      "trackId": "track-05",
      "number": 4,
      "slug": "quando-o-altar-e-restaurado-o-ceu-responde-elias-no-monte-carmelo",
      "title": "Quando o Altar É Restaurado, o Céu Responde: Elias no Monte Carmelo",
      "summary": "Israel atravessava um período de grande crise espiritual. O povo conhecia o Senhor, mas estava dividido — de um lado, o Deus de Israel; do outro, Baal. Diante desse cenário, Elias faz uma pergunta que continua ecoando até hoje: \"Até quando coxeareis entre dois pensamentos?\" (1 Rs 18:21). Em outras palavras: até quando vamos tentar caminhar com Deus e, ao mesmo tempo, manter aquilo que compete com Ele?",
      "questionCentral": "(criada editorialmente, a partir do argumento central da autora)",
      "objective": "(criado editorialmente)",
      "estimatedMinutes": null,
      "heroImage": "track-05-hero",
      "nextStudyId": "track-05-study-05",
      "audienceLevel": null,
      "tags": [],
      "published": false
    },
    {
      "id": "track-05-study-05",
      "trackId": "track-05",
      "number": 5,
      "slug": "a-salvacao-pela-graca-um-presente-que-nao-merecemos",
      "title": "A Salvação pela Graça: Um Presente Que Não Merecemos",
      "summary": "A salvação é uma das maiores demonstrações do amor de Deus pelo ser humano. Desde o princípio, Deus desejou que o homem tivesse comunhão com Ele, mas o pecado trouxe separação entre os dois. Mesmo assim, Deus não desistiu de nós — Ele preparou um plano de salvação e, no tempo certo, enviou Jesus Cristo ao mundo para nos reconciliar com Ele.",
      "questionCentral": "(criada editorialmente)",
      "objective": "(criado editorialmente, a partir do argumento central do autor)",
      "estimatedMinutes": null,
      "heroImage": "track-05-hero",
      "nextStudyId": null,
      "audienceLevel": null,
      "tags": [],
      "published": false
    }
  ],
  "sections": [
    {
      "id": "track-05-study-02-golden-text",
      "studyId": "track-05-study-02",
      "type": "GOLDEN_TEXT",
      "title": "Texto Áureo",
      "iconKey": "texto_aureo",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Referência: 1 Coríntios 13:13 Texto: \"Agora, pois, permanecem a fé, a esperança e o amor, estes três, mas o maior destes é o amor.\""
        },
        {
          "type": "PARAGRAPH",
          "text": "(escolhido editorialmente a partir da própria ênfase do autor na conclusão do estudo)"
        }
      ],
      "order": 1,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-02-practical-truth",
      "studyId": "track-05-study-02",
      "type": "PRACTICAL_TRUTH",
      "title": "Verdade Prática",
      "iconKey": "verdade_pratica",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "O amor não substitui os dons, o conhecimento ou as boas obras — ele é quem lhes dá motivação, valor e propósito diante de Deus."
        }
      ],
      "order": 2,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-02-bible-reading",
      "studyId": "track-05-study-02",
      "type": "BIBLE_READING",
      "title": "Leitura Bíblica",
      "iconKey": "leitura_biblica",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "1 Coríntios 13 (texto completo), lido com a seguinte divisão:"
        },
        {
          "type": "BULLET_LIST",
          "items": [
            "Versículos 1–3: a necessidade do amor",
            "Versículos 4–7: as características do amor",
            "Versículos 8–13: a permanência do amor"
          ]
        },
        {
          "type": "PARAGRAPH",
          "text": "Textos complementares: 1 Coríntios 12:12–27; Filipenses 2:3–4; Gálatas 6:2"
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 3,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-02-before-understanding",
      "studyId": "track-05-study-02",
      "type": "BEFORE_UNDERSTANDING",
      "title": "Antes de Entender",
      "iconKey": "antes_entender",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "A primeira carta aos Coríntios foi escrita pelo apóstolo Paulo, provavelmente por volta do ano 55 d.C., quando ele estava em Éfeso. A igreja de Corinto havia sido fundada durante sua segunda viagem missionária, numa cidade rica, movimentada e marcada pela idolatria, pela imoralidade e pela busca por prestígio."
        },
        {
          "type": "PARAGRAPH",
          "text": "Embora os cristãos de Corinto possuíssem muitos dons espirituais, também enfrentavam divisões, disputas e orgulho. Alguns usavam seus dons como motivo de comparação e superioridade. Foi nesse contexto que Paulo apresentou o amor como \"um caminho ainda mais excelente\": nenhuma manifestação espiritual, nenhum conhecimento e nenhuma boa obra alcançam plenamente seu propósito sem amor."
        },
        {
          "type": "PARAGRAPH",
          "text": "O amor descrito aqui não é apenas emoção ou simpatia. É uma decisão que se manifesta na maneira como falamos, tratamos, perdoamos e servimos uns aos outros — e nos leva a perguntar: nossas atitudes demonstram o amor de Cristo?"
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 4,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-02-read",
      "studyId": "track-05-study-02",
      "type": "READ",
      "title": "Leia",
      "iconKey": "leia",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Leia 1 Coríntios 13 por completo, observando as três partes do capítulo:"
        },
        {
          "type": "BULLET_LIST",
          "items": [
            "v. 1–3 — o que acontece quando falta amor",
            "v. 4–7 — como o amor se comporta",
            "v. 8–13 — por que o amor permanece"
          ]
        }
      ],
      "order": 5,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-02-observe",
      "studyId": "track-05-study-02",
      "type": "OBSERVE",
      "title": "Observe",
      "iconKey": "observe",
      "blocks": [
        {
          "type": "BULLET_LIST",
          "items": [
            "Paulo lista capacidades impressionantes — falar línguas, profetizar, ter conhecimento, fé que move montanhas, generosidade radical — e afirma que, sem amor, nada disso tem valor completo diante de Deus.",
            "Ele não descreve o amor apenas como sentimento, mas como uma sequência de atitudes concretas (paciente, bondoso, não invejoso...).",
            "Ao final, Paulo compara o amor com a fé e a esperança, e diz que só o amor permanece para sempre."
          ]
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 6,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-02-understand",
      "studyId": "track-05-study-02",
      "type": "UNDERSTAND",
      "title": "Entenda",
      "iconKey": "entenda",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "COMPREENDA"
        },
        {
          "type": "SUBHEADING",
          "text": "A necessidade do amor (v. 1–3)"
        },
        {
          "type": "PARAGRAPH",
          "text": "Paulo não está desprezando os dons, a fé ou as boas obras — ele ensina que tudo precisa ser conduzido pela motivação correta."
        },
        {
          "type": "BULLET_LIST",
          "items": [
            "Palavras sem amor tornam-se apenas barulho. Podemos estar corretos no conteúdo e errados na maneira de tratar as pessoas.",
            "Conhecimento sem amor produz orgulho. O conhecimento verdadeiro deve gerar humildade e misericórdia, não superioridade.",
            "Boas obras sem amor podem nascer de motivações erradas — interesse, obrigação ou desejo de reconhecimento."
          ]
        },
        {
          "type": "PARAGRAPH",
          "text": "Deus não observa apenas o que fazemos; Ele conhece a motivação do coração."
        },
        {
          "type": "SUBHEADING",
          "text": "As características do amor (v. 4–7)"
        },
        {
          "type": "PARAGRAPH",
          "text": "Paulo não apenas define o amor — ele mostra como o amor se comporta:"
        },
        {
          "type": "BULLET_LIST",
          "items": [
            "É paciente e bondoso: lida com falhas e limites alheios sem irritação, e se transforma em ação concreta — uma mensagem, uma visita, uma ajuda.",
            "Não sente inveja nem se vangloria: reconhece as qualidades do outro em vez de tratá-lo como concorrente, e consegue servir mesmo sem ser notado.",
            "Não age de maneira inconveniente: sinceridade não é autorização para ferir; a verdade deve ser dita com graça, buscando restaurar, não humilhar.",
            "Não busca somente os próprios interesses: sem abrir mão do cuidado pessoal, o amor enxerga quem está sobrecarregado ou necessitado (Fp 2:4).",
            "Não se irrita facilmente e não guarda ressentimento: não vive alimentando vingança, mas está disposto à reconciliação.",
            "Se alegra com a verdade: não tira proveito da fraqueza alheia e não chama o erro de certo, mas busca a restauração da pessoa.",
            "Tudo sofre, crê, espera e suporta: é perseverante — continua orando e esperando em Deus, sem abandonar as pessoas na primeira dificuldade."
          ]
        },
        {
          "type": "SUBHEADING",
          "text": "A permanência do amor (v. 8–13)"
        },
        {
          "type": "PARAGRAPH",
          "text": "Profecias, línguas e conhecimento pertencem à nossa experiência presente e limitada — o amor, porém, jamais acaba. Paulo usa a imagem da criança que amadurece: uma pessoa madura na fé não se reconhece apenas pelo tempo de igreja ou pelos dons que tem, mas por controlar suas palavras, reconhecer seus erros, perdoar e servir sem exigir reconhecimento."
        },
        {
          "type": "PARAGRAPH",
          "text": "Hoje vemos \"como por meio de um espelho, de maneira pouco nítida\" — nosso conhecimento é limitado, mas somos chamados a confiar, esperar e continuar amando. Entre fé, esperança e amor, o amor é o maior porque permanecerá para sempre."
        }
      ],
      "order": 7,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-02-connect",
      "studyId": "track-05-study-02",
      "type": "CONNECT",
      "title": "Conecte",
      "iconKey": "conecte",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Antes de falar sobre o amor, Paulo já havia ensinado, em 1 Coríntios 12, que a igreja é um corpo formado por muitos membros que precisam uns dos outros. O capítulo 13 mostra o caminho pelo qual esses membros devem conviver e usar seus dons: o caminho do amor. Filipenses 2:3–4 e Gálatas 6:2 reforçam a mesma ideia a partir de outro ângulo — considerar os interesses do próximo e carregar os fardos uns dos outros é a forma prática desse amor dentro da comunidade cristã."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 8,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-02-interpretation-caution",
      "studyId": "track-05-study-02",
      "type": "INTERPRETATION_CAUTION",
      "title": "Cuidado na Interpretação",
      "iconKey": "cuidado_interpretacao",
      "blocks": [
        {
          "type": "CALLOUT",
          "title": null,
          "text": "Cuidado na interpretação: ser paciente, sofrer, crer e suportar tudo não significa tolerar abuso, violência ou manipulação. O amor bíblico não é passividade diante do mal — é firmeza e esperança que não desistem das pessoas, sem exigir que alguém permaneça em situações que o Assim, o texto não deve ser usado para justificar a permanência em relações abusivas ou destrutivas."
        }
      ],
      "order": 9,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-02-reflect",
      "studyId": "track-05-study-02",
      "type": "REFLECT",
      "title": "Reflita",
      "iconKey": "reflita",
      "blocks": [
        {
          "type": "BULLET_LIST",
          "items": [
            "Estou fazendo isso para servir ou para ser reconhecido?",
            "Minhas palavras edificam ou apenas mostram que estou certo?",
            "Utilizo meus dons para ajudar ou para me destacar?",
            "Continuaria fazendo o bem se ninguém soubesse?"
          ]
        }
      ],
      "order": 10,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-02-apply",
      "studyId": "track-05-study-02",
      "type": "APPLY",
      "title": "Aplique",
      "iconKey": "aplique",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "APLIQUE"
        },
        {
          "type": "PARAGRAPH",
          "text": "O amor de 1 Coríntios 13 não é uma virtude reservada a alguns cristãos especiais — é uma marca necessária de quem pertence a Cristo, e precisa aparecer em três frentes:"
        },
        {
          "type": "BULLET_LIST",
          "items": [
            "Na família: tratamos estranhos com gentileza, mas às vezes somos impacientes com quem vive conosco. O amor aparece quando ouvimos, controlamos nossas palavras, dividimos responsabilidades e pedimos perdão.",
            "Na igreja: o amor aparece quando acolhemos sem distinção, usamos nossos dons para edificar, evitamos disputas por posições, percebemos quem está ausente e dividimos o cuidado uns pelos outros — sem transferir toda a responsabilidade apenas para a liderança. O líder guia o corpo, mas não pode substituir todos os seus membros.",
            "No dia a dia: no trabalho, na vizinhança, nos demais relacionamentos — tratando as pessoas com respeito, ajudando sem esperar recompensa e reconhecendo os próprios erros."
          ]
        },
        {
          "type": "PARAGRAPH",
          "text": "Nosso comportamento não salva ninguém — só Cristo salva —, mas quem ainda não O conhece observa primeiro a vida de quem diz segui-lo (Mt 5:16). Por isso, o amor também é parte do nosso testemunho."
        },
        {
          "type": "PARAGRAPH",
          "text": "Pergunte-se:"
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 11,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-02-journey-takeaway",
      "studyId": "track-05-study-02",
      "type": "JOURNEY_TAKEAWAY",
      "title": "Para Levar da Jornada",
      "iconKey": "levar_jornada",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "Conclusão"
        },
        {
          "type": "PARAGRAPH",
          "text": "1 Coríntios 13 ensina que o amor é indispensável à vida cristã. Podemos possuir dons, conhecimento, fé e realizar boas obras, mas tudo precisa ser conduzido pelo amor. Esse amor não é apenas emoção — é paciente, bondoso, humilde, verdadeiro, perdoador e perseverante, e transforma a maneira como falamos, servimos, corrigimos e convivemos."
        },
        {
          "type": "PARAGRAPH",
          "text": "Esse amor precisa começar nos relacionamentos mais próximos, alcançar a igreja e se manifestar em todos os ambientes. Quando ele governa uma igreja, as pessoas deixam de viver só para si e aprendem a cuidar umas das outras. A pergunta que este estudo deixa não é apenas quais dons possuímos, mas: nossas palavras, motivações e atitudes demonstram o amor de Cristo?"
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        },
        {
          "type": "SUBHEADING",
          "text": "Para Levar da Jornada"
        },
        {
          "type": "PARAGRAPH",
          "text": "(editorial) O amor é o que dá valor eterno a tudo o que fazemos: sem ele, até os maiores dons se esvaziam; com ele, os gestos mais simples permanecem."
        }
      ],
      "order": 12,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-02-practice-today",
      "studyId": "track-05-study-02",
      "type": "PRACTICE_TODAY",
      "title": "Pratique Hoje",
      "iconKey": "pratique_hoje",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial) Escolha uma pessoa próxima — da família, do trabalho ou da igreja — e demonstre hoje, de forma concreta, uma das características do amor de 1 Coríntios 13: paciência, uma palavra bondosa, um gesto de perdão ou um momento dedicado a ouvir."
        }
      ],
      "order": 13,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-02-reflection-questions",
      "studyId": "track-05-study-02",
      "type": "REFLECTION_QUESTIONS",
      "title": "Perguntas para Refletir",
      "iconKey": "perguntas_refletir",
      "blocks": [
        {
          "type": "NUMBERED_LIST",
          "items": [
            "Estou fazendo o que faço para servir ou para ser reconhecido?",
            "Minhas palavras edificam as pessoas ou apenas mostram que estou certo?",
            "Uso meus dons para ajudar ou para me destacar?",
            "Continuaria fazendo o bem se ninguém soubesse?",
            "Quando alguém observa minha maneira de viver, encontra motivos para desejar conhecer Cristo — ou para se afastar daquilo que eu prego?"
          ]
        }
      ],
      "order": 14,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-02-journal-prompt",
      "studyId": "track-05-study-02",
      "type": "JOURNAL_PROMPT",
      "title": "Registre no Diário",
      "iconKey": "diario",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial) Em que área da sua vida o amor ainda precisa substituir o orgulho, a impaciência ou o desejo de reconhecimento?"
        }
      ],
      "order": 15,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-02-prayer",
      "studyId": "track-05-study-02",
      "type": "PRAYER",
      "title": "Ore",
      "iconKey": "ore",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial) Peça a Deus que o ajude a amar como Cristo amou — com paciência, humildade e verdade — começando pelas pessoas mais próximas de você."
        }
      ],
      "order": 16,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-02-keep",
      "studyId": "track-05-study-02",
      "type": "KEEP",
      "title": "Para Guardar",
      "iconKey": "guardar",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "1 Coríntios 13:13 — \"Agora, pois, permanecem a fé, a esperança e o amor, estes três, mas o maior destes é o amor.\""
        }
      ],
      "order": 17,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-02-group-mode",
      "studyId": "track-05-study-02",
      "type": "GROUP_MODE",
      "title": "Em Grupo",
      "iconKey": "grupo",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial, seguindo a progressão observação → compreensão → prática)"
        },
        {
          "type": "NUMBERED_LIST",
          "items": [
            "O que mais chamou sua atenção na descrição do amor em 1 Coríntios 13?",
            "Qual característica do amor você sente que mais precisa desenvolver?",
            "Como podemos praticar esse amor uns pelos outros nesta semana?"
          ]
        }
      ],
      "order": 18,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-02-deepen",
      "studyId": "track-05-study-02",
      "type": "DEEPEN",
      "title": "+ Aprofunde",
      "iconKey": "aprofunde",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "O amor como responsabilidade compartilhada na igreja"
        },
        {
          "type": "PARAGRAPH",
          "text": "O pastor/líder tem a responsabilidade de ensinar, orientar e acompanhar a igreja, mas o cuidado com as pessoas não é exclusividade da liderança. Se alguém adoece, se afasta ou enfrenta uma necessidade, qualquer membro pode telefonar, visitar ou perguntar como ajudar — isso não diminui a responsabilidade da liderança, apenas reconhece que a igreja é um corpo, não uma única pessoa trabalhando enquanto os demais observam. Cada um pode contribuir de um jeito: com tempo, companhia, recursos ou oração."
        },
        {
          "type": "SUBHEADING",
          "text": "Um espelho pouco nítido"
        },
        {
          "type": "PARAGRAPH",
          "text": "Paulo diz que hoje vemos \"como por meio de um espelho, de maneira pouco nítida\" — na Antiguidade, espelhos eram feitos de metal polido e não refletiam imagens completamente claras. A imagem ajuda a entender por que ainda convivemos com perguntas sem resposta plena, sendo chamados a confiar e continuar amando mesmo sem enxergar tudo com nitidez."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 19,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-02-continue-journey",
      "studyId": "track-05-study-02",
      "type": "CONTINUE_JOURNEY",
      "title": "Continue a Jornada",
      "iconKey": "continue_jornada",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(a definir — próximo estudo da Trilha 5 ainda não atribuído nesta curadoria)"
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 20,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-02-references",
      "studyId": "track-05-study-02",
      "type": "REFERENCES",
      "title": "Referências Bíblicas",
      "iconKey": "referencias",
      "blocks": [
        {
          "type": "BULLET_LIST",
          "items": [
            "1 Coríntios 12:12–27",
            "1 Coríntios 13 (texto-base)",
            "1 Coríntios 14",
            "Filipenses 2:3–4",
            "Gálatas 6:2",
            "Mateus 5:16"
          ]
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 21,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-02-editorial-note",
      "studyId": "track-05-study-02",
      "type": "EDITORIAL_NOTE",
      "title": "Notas de Curadoria",
      "iconKey": "editorial_interno",
      "blocks": [
        {
          "type": "CALLOUT",
          "title": "Governança interna — não publicar",
          "text": "## ELEMENTOS ORIGINAIS PRESERVADOS\n- Citação do pastor **Charles Spurgeon** (sermão \"Os trabalhos do amor\"), usada pelo autor para reforçar que o amor de 1 Coríntios 13 não é virtude de \"cristãos especiais\", mas característica de todo aquele que pertence a Cristo.\n- Frase de contraste elaborada pelo autor: *\"O orgulho pergunta: 'Como posso ser reconhecido?'. O amor pergunta: 'Como posso servir?'\"*\n- Frase de síntese do autor: *\"O líder guia o corpo, mas não pode substituir todos os seus membros.\"*\n\n## NOTAS DE CURADORIA (uso interno — não publicar)\n| Elemento | Classificação |\n|---|---|\n| Tema, Objetivo, Leitura Bíblica, Introdução, Desenvolvimento (3 partes), Conclusão | OBSERVED_DIRECT / REORGANIZED_FROM_SOURCE |\n| Perguntas de reflexão (5) | OBSERVED_VERBATIM (extraídas do próprio texto do autor) |\n| Pergunta Central, Verdade Prática, Texto Áureo (escolha), Journey Takeaway, Pratique Hoje, Registre no Diário, Ore, Em Grupo, Cuidado na Interpretação (redação da caixa) | EDITORIAL_DERIVED |\n| Conecte (1 Co 12 / Fp 2 / Gl 6:2) | REORGANIZED_FROM_SOURCE (relação já indicada pelo autor, redação editorial) |\n| Bloco + Aprofunde | REORGANIZED_FROM_SOURCE (conteúdo do autor, deslocado do corpo principal para manter os 20–30 min) |\n| Continue a Jornada | UNRESOLVED — depende da atribuição de posição na Trilha 5 |\n| ID, slug, posição na trilha | Não atribuídos nesta etapa, conforme item 23 do padrão de curadoria |\n| Nome do autor (exibição pública) | UNRESOLVED — aguardando autorização de Pb. Neterson |\n\n**Status:** DRAFT — aguardando revisão de conteúdo e revisão teológica antes de qualquer aprovação ou publicação."
        }
      ],
      "order": 22,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-03-golden-text",
      "studyId": "track-05-study-03",
      "type": "GOLDEN_TEXT",
      "title": "Texto Áureo",
      "iconKey": "texto_aureo",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Referência: Lucas 22:27 Texto: \"Pois, qual é maior, o que se assenta à mesa, ou o que serve? Porventura não é o que se assenta à mesa? Eu, porém, estou entre vós como aquele que serve.\""
        }
      ],
      "order": 1,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-03-practical-truth",
      "studyId": "track-05-study-03",
      "type": "PRACTICAL_TRUTH",
      "title": "Verdade Prática",
      "iconKey": "verdade_pratica",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(síntese editorial do argumento central do autor)"
        },
        {
          "type": "PARAGRAPH",
          "text": "Jogar a toalha, no padrão de Jesus, não é desistir de lutar — é desistir da disputa pelo primeiro lugar, vestir a toalha do serviço e servir."
        }
      ],
      "order": 2,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-03-bible-reading",
      "studyId": "track-05-study-03",
      "type": "BIBLE_READING",
      "title": "Leitura Bíblica",
      "iconKey": "leitura_biblica",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Lucas 22:7–13, 24–27; João 13:1–17"
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 3,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-03-before-understanding",
      "studyId": "track-05-study-03",
      "type": "BEFORE_UNDERSTANDING",
      "title": "Antes de Entender",
      "iconKey": "antes_entender",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Quem nunca sentiu vontade de \"jogar a toalha\"? O emprego de anos que termina em demissão inesperada. O casamento em que o esforço de décadas parece não ser reconhecido. A liderança na igreja que nunca chega, apesar de tanto trabalho e dedicação. Em momentos assim, cansados, frustrados e desanimados, muitos de nós já pensamos: chega, vou jogar a toalha."
        },
        {
          "type": "PARAGRAPH",
          "text": "A expressão vem dos ringues de luta: quando um lutador se machuca e o treinador percebe que continuar pode agravar a lesão, ele joga uma toalha no ringue como um pedido silencioso para que a luta termine e a vitória seja concedida ao adversário. Popularmente, passamos a usar a expressão sempre que decidimos que uma batalha da vida não vale mais a pena."
        },
        {
          "type": "PARAGRAPH",
          "text": "Este estudo não pretende condenar o desejo de jogar a toalha — pelo contrário: convida você a jogá-la, só que no padrão perfeito. E Jesus, na última ceia, nos deu o exemplo mais claro de quando e como fazer isso."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 4,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-03-read",
      "studyId": "track-05-study-03",
      "type": "READ",
      "title": "Leia",
      "iconKey": "leia",
      "blocks": [
        {
          "type": "BULLET_LIST",
          "items": [
            "Lucas 22:7–13 — Jesus envia Pedro e João para preparar a Páscoa",
            "Lucas 22:24–27 — a disputa entre os discípulos sobre quem seria o maior",
            "João 13:1–17 — Jesus lava os pés dos discípulos"
          ]
        }
      ],
      "order": 5,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-03-observe",
      "studyId": "track-05-study-03",
      "type": "OBSERVE",
      "title": "Observe",
      "iconKey": "observe",
      "blocks": [
        {
          "type": "BULLET_LIST",
          "items": [
            "Jesus tem um evento importantíssimo pela frente — a última ceia com os discípulos — e envia Pedro e João para prepará-la. Ele não dá o endereço exato do local; em vez disso, manda que sigam um servo que carrega um cântaro de água. Cristo entrega, primeiro, a conexão com um servo.",
            "A missão de Pedro e João é clara: preparar a ceia. Eles cuidam do ambiente, da comida, do local — mas esquecem de providenciar alguém para lavar os pés dos convidados à entrada, um costume culturalmente importante da época.",
            "Entre os doze, existe uma disputa — nem tão silenciosa assim — sobre quem seria o maior. Todos sabem que os pés precisam ser lavados; ninguém se dispõe a fazer isso, porque assumir essa tarefa seria assumir o lugar do \"menor\".",
            "Diante da hipocrisia silenciosa de todos fingirem estar bem enquanto evitam o assunto, Jesus mesmo se levanta, veste uma toalha na cintura, toma uma bacia e lava os pés dos discípulos — assumindo a tarefa que ninguém quis assumir."
          ]
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 6,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-03-understand",
      "studyId": "track-05-study-03",
      "type": "UNDERSTAND",
      "title": "Entenda",
      "iconKey": "entenda",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "COMPREENDA"
        },
        {
          "type": "SUBHEADING",
          "text": "O silêncio que ninguém queria quebrar"
        },
        {
          "type": "PARAGRAPH",
          "text": "Todos os discípulos sabiam que os pés precisavam ser lavados. Nenhum deles precisava de um curso técnico para isso — bastava disposição de servo. Mas ninguém se ofereceu, porque isso significaria dar o braço a torcer, admitir-se o \"menor\" justamente no momento em que disputavam entre si quem seria o maior. É uma cena de hipocrisia silenciosa: todos parecendo purificados, ninguém disposto a purificar o outro."
        },
        {
          "type": "SUBHEADING",
          "text": "Jesus rompe o padrão"
        },
        {
          "type": "PARAGRAPH",
          "text": "Jesus observa toda a cena. Em vez de repreender verbalmente a disputa, Ele mesmo assume o papel de servo — Ele \"joga a toalha\": não desiste da luta, desiste de competir pelo primeiro lugar. Com esse gesto, Jesus entrega uma lição preciosíssima: o maior não é quem se assenta à cabeceira da mesa, mas quem se inclina para lavar os pés dos outros."
        }
      ],
      "order": 7,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-03-connect",
      "studyId": "track-05-study-03",
      "type": "CONNECT",
      "title": "Conecte",
      "iconKey": "conecte",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Esse mesmo ensino aparece em outro momento dos Evangelhos, quando Tiago e João pedem os melhores lugares ao lado de Jesus em Seu reino. Ele responde: \"sabeis que os que são reconhecidos como príncipes dentre os gentios têm domínio sobre eles... mas entre vós não será assim; antes, qualquer que entre vós quiser tornar-se grande, será vosso serviçal... Porque também o Filho do homem não veio para ser servido, mas para servir\" (Marcos 10:42–45). A lavagem dos pés em João 13 é a mesma verdade encenada de forma concreta: grandeza no Reino de Deus se mede pelo serviço, não pela posição."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 8,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-03-interpretation-caution",
      "studyId": "track-05-study-03",
      "type": "INTERPRETATION_CAUTION",
      "title": "Cuidado na Interpretação",
      "iconKey": "cuidado_interpretacao",
      "blocks": [
        {
          "type": "CALLOUT",
          "title": null,
          "text": "Cuidado na interpretação: o trocadilho com \"jogar a toalha\" é um recurso de linguagem em português — a expressão idiomática, ligada aos esportes de combate, não existe no texto bíblico original. O que o texto de João 13 realmente narra é Jesus tomando uma toalha para Se cingir e servir, um gesto de humildade concreta, não um \"desistir\" no sentido comum da palavra. O trocadilho é uma ferramenta homilética válida para ilustrar a aplicação, mas não deve ser confundido com o que o texto, em si, está dizendo."
        }
      ],
      "order": 9,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-03-reflect",
      "studyId": "track-05-study-03",
      "type": "REFLECT",
      "title": "Reflita",
      "iconKey": "reflita",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(criada editorialmente — o material original não trazia uma pergunta central explícita)"
        },
        {
          "type": "PARAGRAPH",
          "text": "O que significa realmente \"jogar a toalha\", à luz do exemplo de Jesus na última ceia?"
        }
      ],
      "order": 10,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-03-apply",
      "studyId": "track-05-study-03",
      "type": "APPLY",
      "title": "Aplique",
      "iconKey": "aplique",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "APLIQUE"
        },
        {
          "type": "PARAGRAPH",
          "text": "Somos tendenciosos a buscar recorrentemente o melhor lugar, a melhor posição — mesmo fazendo questão de parecer humildes diante dos outros. Talvez você tenha reconhecido, nas histórias do início deste estudo, uma disputa parecida: por reconhecimento no trabalho, por valorização no casamento, por um cargo de liderança na igreja."
        },
        {
          "type": "PARAGRAPH",
          "text": "Jesus nos convida a jogar a toalha — no relacionamento, na vida profissional, na vida ministerial — mas pelas razões corretas, pela motivação correta. Não jogue a toalha por capricho, por orgulho ferido ou porque não foi reconhecido como esperava. Jogue a toalha na disputa do eu, da vaidade e do maior. Sirva."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 11,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-03-journey-takeaway",
      "studyId": "track-05-study-03",
      "type": "JOURNEY_TAKEAWAY",
      "title": "Para Levar da Jornada",
      "iconKey": "levar_jornada",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "Conclusão"
        },
        {
          "type": "PARAGRAPH",
          "text": "Jesus nos deu o exemplo perfeito de quando e como jogar a toalha. Ele não desistiu da luta — desistiu de competir pelo primeiro lugar, tomou a bacia e a toalha, e serviu. Diante de tantas situações da vida em que somos tentados a jogar a toalha por orgulho, cansaço ou falta de reconhecimento, o convite de Jesus é outro: jogue a toalha na disputa por ser o maior, e sirva como Ele serviu."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        },
        {
          "type": "SUBHEADING",
          "text": "Para Levar da Jornada"
        },
        {
          "type": "PARAGRAPH",
          "text": "(editorial) Jogar a toalha, no padrão de Jesus, não é desistir de lutar — é desistir de disputar o primeiro lugar, vestir a toalha do serviço e servir."
        }
      ],
      "order": 12,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-03-practice-today",
      "studyId": "track-05-study-03",
      "type": "PRACTICE_TODAY",
      "title": "Pratique Hoje",
      "iconKey": "pratique_hoje",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial) Hoje, identifique uma \"disputa pelo primeiro lugar\" que você anda travando — no trabalho, no casamento ou na igreja — e escolha, deliberadamente, um gesto concreto de serviço em vez de reivindicar reconhecimento."
        }
      ],
      "order": 13,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-03-reflection-questions",
      "studyId": "track-05-study-03",
      "type": "REFLECTION_QUESTIONS",
      "title": "Perguntas para Refletir",
      "iconKey": "perguntas_refletir",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(elaboradas editorialmente a partir do argumento do autor)"
        },
        {
          "type": "NUMBERED_LIST",
          "items": [
            "Em que área da minha vida — profissional, conjugal ou ministerial — tenho sentido vontade de \"jogar a toalha\" por orgulho ferido ou falta de reconhecimento?",
            "Que \"disputa pelo primeiro lugar\" tenho travado, mesmo sem admitir isso abertamente?",
            "Estou disposto a assumir o lugar do \"menor\" quando ninguém mais se dispõe a servir?",
            "O que mudaria se eu, como Jesus, tomasse a iniciativa de servir em vez de esperar reconhecimento?"
          ]
        }
      ],
      "order": 14,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-03-journal-prompt",
      "studyId": "track-05-study-03",
      "type": "JOURNAL_PROMPT",
      "title": "Registre no Diário",
      "iconKey": "diario",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial) Existe alguma \"toalha\" que você precisa vestir hoje — um gesto de serviço que você tem evitado por orgulho?"
        }
      ],
      "order": 15,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-03-prayer",
      "studyId": "track-05-study-03",
      "type": "PRAYER",
      "title": "Ore",
      "iconKey": "ore",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial) Peça a Deus que revele as disputas silenciosas que você trava por reconhecimento, e peça coragem para servir como Jesus serviu, sem esperar a cabeceira da mesa."
        }
      ],
      "order": 16,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-03-keep",
      "studyId": "track-05-study-03",
      "type": "KEEP",
      "title": "Para Guardar",
      "iconKey": "guardar",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "João 13:14–15 — \"Ora, se eu, Senhor e Mestre, vos lavei os pés, vós deveis também lavar os pés uns aos outros. Porque eu vos dei exemplo, para que, como eu vos fiz, façais vós também.\""
        }
      ],
      "order": 17,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-03-group-mode",
      "studyId": "track-05-study-03",
      "type": "GROUP_MODE",
      "title": "Em Grupo",
      "iconKey": "grupo",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial, seguindo a progressão observação → compreensão → prática)"
        },
        {
          "type": "NUMBERED_LIST",
          "items": [
            "Qual das três histórias do início deste estudo mais se pareceu com uma situação que vocês já viveram ou testemunharam?",
            "Por que é tão difícil, mesmo entre discípulos de Jesus, assumir o papel do \"menor\"?",
            "Que atitude prática de serviço podemos assumir juntos, como grupo, nesta semana?"
          ]
        }
      ],
      "order": 18,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-03-deepen",
      "studyId": "track-05-study-03",
      "type": "DEEPEN",
      "title": "+ Aprofunde",
      "iconKey": "aprofunde",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "Por que lavar os pés era tão importante"
        },
        {
          "type": "PARAGRAPH",
          "text": "Nas estradas de terra e areia da Palestina do primeiro século, calçar sandálias significava chegar a qualquer lugar com os pés sujos. Lavar os pés dos convidados à entrada de uma casa era, portanto, um gesto de hospitalidade essencial — e normalmente reservado ao servo de posição mais baixa da casa, ou a um escravo. É nesse contexto que o gesto de Jesus se torna ainda mais impactante: Ele, o Mestre, assume voluntariamente a tarefa do servo mais humilde."
        },
        {
          "type": "SUBHEADING",
          "text": "Um padrão que se repete nos Evangelhos"
        },
        {
          "type": "PARAGRAPH",
          "text": "A disputa por posição entre os discípulos não aparece só uma vez. Em Marcos 10:35–45 e Mateus 20:20–28, Tiago e João (e depois os demais discípulos, indignados) disputam os melhores lugares no Reino. Jesus responde sempre da mesma forma: quem quiser ser grande, sirva."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 19,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-03-continue-journey",
      "studyId": "track-05-study-03",
      "type": "CONTINUE_JOURNEY",
      "title": "Continue a Jornada",
      "iconKey": "continue_jornada",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(a definir — próximo estudo da Trilha 5 ainda não atribuído nesta curadoria)"
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 20,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-03-references",
      "studyId": "track-05-study-03",
      "type": "REFERENCES",
      "title": "Referências Bíblicas",
      "iconKey": "referencias",
      "blocks": [
        {
          "type": "BULLET_LIST",
          "items": [
            "Lucas 22:7–13; Lucas 22:24–27",
            "João 13:1–17",
            "Marcos 10:35–45; Marcos 10:42–45 (acrescentada editorialmente em Conecte e Aprofunde)",
            "Mateus 20:20–28 (acrescentada editorialmente em Aprofunde)"
          ]
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 21,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-03-editorial-note",
      "studyId": "track-05-study-03",
      "type": "EDITORIAL_NOTE",
      "title": "Notas de Curadoria",
      "iconKey": "editorial_interno",
      "blocks": [
        {
          "type": "CALLOUT",
          "title": "Governança interna — não publicar",
          "text": "## ELEMENTOS ORIGINAIS PRESERVADOS\n- As **três histórias iniciais** do autor (a demissão inesperada, o casamento desgastado, a liderança não reconhecida na igreja), preservadas como recurso literário de abertura do estudo, em \"Antes de Entender\".\n- A explicação da **origem esportiva da expressão \"jogar a toalha\"**, dada pelo próprio autor.\n- A frase de virada do ensaio, que resume todo o argumento:\n> \"Que tal fazermos como Jesus? Jogue a toalha: em seu relacionamento, sua vida profissional e ministerial! JOGUE A TOALHA pelas razões corretas, pela motivação correta, não jogue a toalha por capricho, mas jogue a toalha na disputa do eu, da vaidade e do maior. Sirva!\"\n\n## NOTAS DE CURADORIA (uso interno — não publicar)\n| Elemento | Classificação |\n|---|---|\n| As três histórias iniciais, explicação da expressão \"jogar a toalha\", narrativa de Lucas 22/João 13, argumento central, conclusão | OBSERVED_DIRECT / REORGANIZED_FROM_SOURCE |\n| Texto Áureo (Lc 22:27) | REORGANIZED_FROM_SOURCE — o autor parafraseia esse versículo (\"o maior não é quem senta a cabeceira da mesa...\"); usei o texto bíblico direto |\n| Frase de virada do ensaio (\"Jogue a toalha... Sirva!\") | OBSERVED_VERBATIM — preservada integralmente como elemento próprio |\n| Pergunta Central, Objetivo, Verdade Prática, Journey Takeaway, Pratique Hoje, Perguntas para Refletir, Registre no Diário, Ore, Em Grupo, caixa de Cuidado na Interpretação | EDITORIAL_DERIVED |\n| Conecte (Mc 10:42–45) e trecho correspondente em + Aprofunde (Mc 10:35–45; Mt 20:20–28) | EDITORIAL_DERIVED — passagens não citadas pelo autor, acrescentadas para reforçar, com outra referência bíblica, o mesmo tema que ele já desenvolve a partir de Lucas/João |\n| + Aprofunde (contexto cultural da lavagem dos pés) | EDITORIAL_DERIVED — informação histórica de conhecimento bíblico geral |\n| Correções de digitação (\"estou casando\"→\"estou cansado\"; \"JOGUE A TOAHA\"→\"JOGUE A TOALHA\") | Ajuste ortográfico, sem alteração de sentido |\n| Continue a Jornada | UNRESOLVED — depende da atribuição de posição na Trilha 5 |\n| ID, slug, posição na trilha | Não atribuídos nesta etapa, conforme item 23 do padrão de curadoria |\n| Nome completo do autor | **Resolvido nesta curadoria**: Adriel Jackson Batista de Oliveira — recomenda-se atualizar também o documento anterior (\"Efeito Mulher Samaritana\") com esse nome |\n| Autorização de exibição pública do nome | Forte indício de autorização (bio pessoal enviada junto), mas recomenda-se confirmação explícita antes da publicação |\n\n**Status:** DRAFT — aguardando confirmação de autorização de nome, revisão de conteúdo e revisão teológica antes de qualquer aprovação ou publicação."
        }
      ],
      "order": 22,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-04-golden-text",
      "studyId": "track-05-study-04",
      "type": "GOLDEN_TEXT",
      "title": "Texto Áureo",
      "iconKey": "texto_aureo",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Referência: 1 Reis 18:21 Texto: \"Então Elias se chegou a todo o povo, e disse: Até quando coxeareis entre dois pensamentos? Se o Senhor é Deus, segui-o; e se Baal, segui-o.\""
        }
      ],
      "order": 1,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-04-practical-truth",
      "studyId": "track-05-study-04",
      "type": "PRACTICAL_TRUTH",
      "title": "Verdade Prática",
      "iconKey": "verdade_pratica",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(frase da própria autora, praticamente literal)"
        },
        {
          "type": "PARAGRAPH",
          "text": "Quando o altar é restaurado, o fogo pode voltar a cair."
        }
      ],
      "order": 2,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-04-bible-reading",
      "studyId": "track-05-study-04",
      "type": "BIBLE_READING",
      "title": "Leitura Bíblica",
      "iconKey": "leitura_biblica",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "1 Reis 18:20–39"
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 3,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-04-before-understanding",
      "studyId": "track-05-study-04",
      "type": "BEFORE_UNDERSTANDING",
      "title": "Antes de Entender",
      "iconKey": "antes_entender",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Israel atravessava um período de grande crise espiritual. O povo conhecia o Senhor, mas estava dividido — de um lado, o Deus de Israel; do outro, Baal. Diante desse cenário, Elias faz uma pergunta que continua ecoando até hoje: \"Até quando coxeareis entre dois pensamentos?\" (1 Rs 18:21). Em outras palavras: até quando vamos tentar caminhar com Deus e, ao mesmo tempo, manter aquilo que compete com Ele?"
        },
        {
          "type": "PARAGRAPH",
          "text": "Essa pergunta não ficou presa ao Monte Carmelo. Hoje somos cercados por muitas vozes — da cultura, das redes sociais, da opinião alheia, do dinheiro, do ego, da aparência, da necessidade de aprovação — e Deus continua perguntando: quem realmente governa o seu coração? Talvez o problema não seja que as pessoas deixaram de acreditar em Deus, mas que muitas querem Deus sem abrir mão dos próprios altares: querem o fogo, mas não o altar; querem a promessa, mas não a entrega; querem avivamento, mas não arrependimento. Antes do fogo, o altar precisa ser restaurado."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 4,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-04-read",
      "studyId": "track-05-study-04",
      "type": "READ",
      "title": "Leia",
      "iconKey": "leia",
      "blocks": [
        {
          "type": "BULLET_LIST",
          "items": [
            "1 Reis 18:20–21 — a convocação e o desafio de Elias",
            "1 Reis 18:30 — o altar em ruínas",
            "1 Reis 18:33–35 — a entrega do sacrifício e a água",
            "1 Reis 18:36–39 — a oração e o fogo"
          ]
        }
      ],
      "order": 5,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-04-observe",
      "studyId": "track-05-study-04",
      "type": "OBSERVE",
      "title": "Observe",
      "iconKey": "observe",
      "blocks": [
        {
          "type": "BULLET_LIST",
          "items": [
            "Elias convoca o povo dividido e pergunta até quando vão \"coxear entre dois pensamentos\" — servir a Deus sem abrir mão de Baal.",
            "Antes de pedir fogo, Elias repara o altar do Senhor, que estava em ruínas (v. 30) — primeiro o altar, depois o fogo.",
            "Ele prepara o sacrifício por completo, e ainda manda derramar água sobre o altar três vezes, tornando qualquer explicação humana impossível (v. 33–35).",
            "Sua oração é simples e direta, sem espetáculo — pede que o povo reconheça que o Senhor é Deus, não para exaltar seu próprio nome (v. 36–37).",
            "O fogo cai, consome tudo — sacrifício, lenha, pedras, pó e até a água — e o povo se prostra declarando: \"Só o Senhor é Deus!\" (v. 38–39)."
          ]
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 6,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-04-understand",
      "studyId": "track-05-study-04",
      "type": "UNDERSTAND",
      "title": "Entenda",
      "iconKey": "entenda",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "COMPREENDA"
        },
        {
          "type": "SUBHEADING",
          "text": "Antes do fogo, o altar precisa ser decidido e restaurado"
        },
        {
          "type": "PARAGRAPH",
          "text": "Elias não estava apenas confrontando os profetas de Baal — estava confrontando a indecisão do povo. Há um momento em que não dá mais para viver em cima do muro, servindo a Deus só quando se precisa de um milagre. Josué já havia declarado: \"Eu e a minha casa serviremos ao Senhor\" (Js 24:15) — não como possibilidade, mas como decisão."
        },
        {
          "type": "PARAGRAPH",
          "text": "E o texto mostra algo importante: Deus não mandou Elias construir um altar novo, mas restaurar o antigo. Talvez você sinta que \"acabou\", que não tem mais jeito — mas restauração significa que aquilo que foi danificado não perdeu seu valor. Deus não fala apenas em dar algo novo; Ele fala em restituir: \"e vos restituirei os anos que consumiu o gafanhoto\" (Jl 2:25). Às vezes, o convite não é para uma experiência nova, mas para voltar — voltar à oração, à Palavra, à comunhão, ao primeiro amor (Ap 2:4–5)."
        },
        {
          "type": "SUBHEADING",
          "text": "O altar é lugar de entrega, não de negociação"
        },
        {
          "type": "PARAGRAPH",
          "text": "Depois de restaurar o altar, Elias arma a lenha e prepara o sacrifício por completo (1 Rs 18:33). Altar sempre envolve entrega — Deus não quer apenas uma parte da nossa vida, mas a vida inteira: \"que apresenteis o vosso corpo em sacrifício vivo, santo e agradável a Deus\" (Rm 12:1). A pergunta não é apenas \"você quer o fogo?\", mas \"o que você está disposto a colocar no altar?\"."
        },
        {
          "type": "PARAGRAPH",
          "text": "Depois, Elias manda derramar água sobre o altar três vezes (1 Rs 18:34–35) — humanamente, isso tornava o milagre ainda mais improvável. Mas era proposital: quando Deus agisse, ninguém poderia atribuir o resultado a esforço humano. \"Para que a excelência do poder seja de Deus, e não de nós\" (2 Co 4:7)."
        },
        {
          "type": "SUBHEADING",
          "text": "O fogo não é o fim, é o começo da transformação"
        },
        {
          "type": "PARAGRAPH",
          "text": "A oração de Elias é simples: \"Responde-me, Senhor, responde-me, para que este povo conheça que tu és o Senhor Deus\" (1 Rs 18:36–37) — ele não pede fogo para exaltar seu próprio nome, mas para que Deus seja reconhecido. É o coração do verdadeiro avivamento: \"é necessário que ele cresça e que eu diminua\" (Jo 3:30)."
        },
        {
          "type": "PARAGRAPH",
          "text": "Quando o fogo cai e consome tudo, o povo se prostra: \"Só o Senhor é Deus!\" (1 Rs 18:39). Mas o fogo não veio apenas para emocionar — veio para produzir arrependimento e restauração. E, logo depois, Elias ouve o ruído de uma abundante chuva antes mesmo de vê-la (1 Rs 18:41) — \"a fé é o firme fundamento das coisas que se esperam e a prova das coisas que se não veem\" (Hb 11:1). A seca não teria a última palavra."
        }
      ],
      "order": 7,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-04-connect",
      "studyId": "track-05-study-04",
      "type": "CONNECT",
      "title": "Conecte",
      "iconKey": "conecte",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "A mesma tensão que Elias confrontou no Carmelo — servir a Deus sem abrir mão de outro senhor — Jesus resume mais tarde: \"Ninguém pode servir a dois senhores\" (Mt 6:24). Não dá para manter um altar para Deus e outro para o ego, o pecado, a aprovação das pessoas ou o dinheiro; a mesma decisão que Elias exigiu do povo continua sendo exigida de nós hoje."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 8,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-04-interpretation-caution",
      "studyId": "track-05-study-04",
      "type": "INTERPRETATION_CAUTION",
      "title": "Cuidado na Interpretação",
      "iconKey": "cuidado_interpretacao",
      "blocks": [
        {
          "type": "CALLOUT",
          "title": null,
          "text": "Cuidado na interpretação: restaurar o altar não é uma fórmula que garante um milagre visível e imediato — como se, ao entregarmos tudo a Deus, Ele fosse \"obrigado\" a responder do jeito que esperamos. A entrega e a restauração têm valor em si mesmas, como expressão de amor e obediência a Deus, independentemente de qual seja o resultado visível. O que o texto ensina é sobre ordem e sinceridade no relacionamento com Deus — não sobre uma transação garantida."
        }
      ],
      "order": 9,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-04-reflect",
      "studyId": "track-05-study-04",
      "type": "REFLECT",
      "title": "Reflita",
      "iconKey": "reflita",
      "blocks": [
        {
          "type": "BULLET_LIST",
          "items": [
            "Como está o altar da sua oração? Você ainda conversa com Deus?",
            "Como está o altar da Palavra? A Bíblia ainda alimenta sua alma?",
            "Como está o altar da sua família? Sua casa ainda é lugar de oração?",
            "Como está o altar da santidade? Existem coisas que você sabe que precisa abandonar?",
            "Como está o altar da entrega? Existe alguma área que você ainda não colocou nas mãos de Deus?",
            "Como está o altar do primeiro amor? Você ainda deseja a Deus, ou apenas aquilo que Ele pode lhe dar?"
          ]
        }
      ],
      "order": 10,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-04-apply",
      "studyId": "track-05-study-04",
      "type": "APPLY",
      "title": "Aplique",
      "iconKey": "aplique",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "APLIQUE"
        },
        {
          "type": "PARAGRAPH",
          "text": "Pare por alguns instantes e olhe para dentro, não para quem está ao seu lado:"
        },
        {
          "type": "PARAGRAPH",
          "text": "Elias não ficou negociando com Baal, nem tentou colocar Deus e Baal lado a lado — ele colocou os dois diante do povo e disse: escolham. Talvez seja hora de parar de pedir apenas \"Senhor, manda fogo\" e começar a dizer: \"Senhor, restaura o altar.\""
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 11,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-04-journey-takeaway",
      "studyId": "track-05-study-04",
      "type": "JOURNEY_TAKEAWAY",
      "title": "Para Levar da Jornada",
      "iconKey": "levar_jornada",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "Conclusão"
        },
        {
          "type": "PARAGRAPH",
          "text": "Ruínas não significam fim. Se Elias encontrou um altar em ruínas e conseguiu restaurá-lo, Deus também pode restaurar aquilo que parece perdido — sua oração, sua comunhão, sua família, sua santidade, seu primeiro amor. O mesmo Deus que respondeu a Elias continua sendo Deus; o mesmo Deus que ouviu Elias continua ouvindo. Mas é preciso lembrar da ordem: primeiro o altar, depois o sacrifício, depois a oração, então o fogo — e, depois do fogo, a chuva. Quando o altar volta ao lugar, a adoração volta ao lugar. Quando a adoração volta ao lugar, Deus volta a ocupar o centro. E quando Deus ocupa o centro, o fogo deixa de ser o objetivo e passa a ser consequência da Sua presença."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        },
        {
          "type": "SUBHEADING",
          "text": "Para Levar da Jornada"
        },
        {
          "type": "PARAGRAPH",
          "text": "(frase-síntese da própria autora, praticamente literal) Primeiro o altar. Depois o sacrifício. Depois a oração. Então o fogo. E depois do fogo, a chuva."
        }
      ],
      "order": 12,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-04-practice-today",
      "studyId": "track-05-study-04",
      "type": "PRACTICE_TODAY",
      "title": "Pratique Hoje",
      "iconKey": "pratique_hoje",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial) Hoje, escolha uma área do seu \"altar\" que está em ruínas — oração, a Palavra, a família, a santidade — e dê um passo concreto de restauração, em vez de esperar por uma experiência espiritual nova."
        }
      ],
      "order": 13,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-04-reflection-questions",
      "studyId": "track-05-study-04",
      "type": "REFLECTION_QUESTIONS",
      "title": "Perguntas para Refletir",
      "iconKey": "perguntas_refletir",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(selecionadas e adaptadas do exame de consciência que a própria autora já propunha no encerramento)"
        },
        {
          "type": "NUMBERED_LIST",
          "items": [
            "Como está o altar da minha oração — eu ainda converso com Deus com regularidade?",
            "Como está o altar da Palavra — a Bíblia ainda alimenta minha alma?",
            "Como está o altar da minha família — minha casa ainda é lugar de oração?",
            "Existe alguma área da minha vida que eu ainda não coloquei nas mãos de Deus?",
            "Eu ainda desejo a Deus, ou principalmente aquilo que Ele pode me dar?"
          ]
        }
      ],
      "order": 14,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-04-journal-prompt",
      "studyId": "track-05-study-04",
      "type": "JOURNAL_PROMPT",
      "title": "Registre no Diário",
      "iconKey": "diario",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial) Qual \"altar em ruínas\" você sente que Deus está te chamando a restaurar agora — não construir algo novo, mas voltar ao que você abandonou?"
        }
      ],
      "order": 15,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-04-prayer",
      "studyId": "track-05-study-04",
      "type": "PRAYER",
      "title": "Ore",
      "iconKey": "ore",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(oração sugerida pela própria autora, quase literal) \"Senhor, restaura o altar. Restaura minha oração, minha comunhão, minha família, minha santidade, meu primeiro amor — restaura aquilo que eu deixei cair.\""
        }
      ],
      "order": 16,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-04-keep",
      "studyId": "track-05-study-04",
      "type": "KEEP",
      "title": "Para Guardar",
      "iconKey": "guardar",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Joel 2:25 — \"E vos restituirei os anos que consumiu o gafanhoto.\""
        }
      ],
      "order": 17,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-04-group-mode",
      "studyId": "track-05-study-04",
      "type": "GROUP_MODE",
      "title": "Em Grupo",
      "iconKey": "grupo",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial, seguindo a progressão observação → compreensão → prática)"
        },
        {
          "type": "NUMBERED_LIST",
          "items": [
            "Vocês conseguem identificar \"dois altares\" — coisas que competem com Deus — comuns na vida das pessoas hoje?",
            "Por que muitas vezes pedimos \"fogo\" (uma resposta, um milagre) sem cuidar primeiro do altar — da nossa entrega e comunhão com Deus?",
            "Que área do altar de vocês, como grupo, precisa ser restaurada juntos nesta temporada?"
          ]
        }
      ],
      "order": 18,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-04-deepen",
      "studyId": "track-05-study-04",
      "type": "DEEPEN",
      "title": "+ Aprofunde",
      "iconKey": "aprofunde",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "O contexto do Monte Carmelo"
        },
        {
          "type": "PARAGRAPH",
          "text": "Israel vivia sob o reinado de Acabe e Jezabel, que promoviam ativamente o culto a Baal, e o país enfrentava uma seca de cerca de três anos, anunciada pelo próprio Elias como juízo de Deus (1 Rs 17:1). O confronto no Monte Carmelo não era apenas uma demonstração de poder, mas a resposta definitiva à pergunta de quem realmente governava a nação: o Senhor ou Baal, o suposto deus da chuva e da fertilidade — o que torna simbolicamente ainda mais forte o fato de a resposta de Deus vir, primeiro, como fogo, e só depois, como chuva."
        },
        {
          "type": "SUBHEADING",
          "text": "O que significa \"voltar ao primeiro amor\"?"
        },
        {
          "type": "PARAGRAPH",
          "text": "Em Apocalipse 2:4–5, Jesus não pede à igreja de Éfeso que construa algo novo, mas que se lembre de onde caiu, se arrependa e pratique as primeiras obras. É o mesmo padrão de Elias reparando o altar antigo, em vez de construir um novo: muitas vezes, o chamado de Deus não é para uma experiência inédita, mas para o retorno sincero a uma comunhão que já existiu e foi deixada de lado."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 19,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-04-continue-journey",
      "studyId": "track-05-study-04",
      "type": "CONTINUE_JOURNEY",
      "title": "Continue a Jornada",
      "iconKey": "continue_jornada",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(a definir — próximo estudo da Trilha 5 ainda não atribuído nesta curadoria)"
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 20,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-04-references",
      "studyId": "track-05-study-04",
      "type": "REFERENCES",
      "title": "Referências Bíblicas",
      "iconKey": "referencias",
      "blocks": [
        {
          "type": "BULLET_LIST",
          "items": [
            "1 Reis 18:20–41 (texto-base)",
            "Josué 24:15",
            "1 Samuel 16:7",
            "Joel 2:25",
            "Apocalipse 2:4–5",
            "Romanos 12:1",
            "2 Coríntios 4:7",
            "João 3:30",
            "Hebreus 11:1",
            "Mateus 6:24 (já usada pela autora no encerramento; reaproveitada em Conecte)",
            "1 Reis 17:1 (acrescentada editorialmente em + Aprofunde, para contexto histórico)"
          ]
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 21,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-04-editorial-note",
      "studyId": "track-05-study-04",
      "type": "EDITORIAL_NOTE",
      "title": "Notas de Curadoria",
      "iconKey": "editorial_interno",
      "blocks": [
        {
          "type": "CALLOUT",
          "title": "Governança interna — não publicar",
          "text": "## ELEMENTOS ORIGINAIS PRESERVADOS\n- A tríade retórica da autora, preservada em \"Antes de Entender\":\n> \"Querem o fogo, mas não querem o altar. Querem a promessa, mas não querem a entrega. Querem avivamento, mas não querem arrependimento.\"\n- A frase de fechamento sobre transformação:\n> \"Uma experiência com Deus que não produz transformação se torna apenas uma lembrança; o verdadeiro fogo muda o altar e muda quem está diante dele.\"\n- A oração de restauração, preservada quase integralmente na seção Ore.\n\n## NOTAS DE CURADORIA (uso interno — não publicar)\n| Elemento | Classificação |\n|---|---|\n| Tema, introdução, os 9 pontos de desenvolvimento, exame de consciência final, conclusão | OBSERVED_DIRECT / REORGANIZED_FROM_SOURCE — **com condensação significativa**, dado o volume e a repetição típica de uma mensagem falada |\n| Texto Áureo (1 Rs 18:21) | OBSERVED_DIRECT — já citado e comentado extensamente pela autora |\n| Verdade Prática, Para Levar da Jornada, oração de Ore | OBSERVED_VERBATIM — frases praticamente literais da autora |\n| Pergunta Central, Objetivo, Journey... já coberto; Pratique Hoje, Registre no Diário, Em Grupo, caixa de Cuidado na Interpretação | EDITORIAL_DERIVED |\n| Perguntas para Refletir | REORGANIZED_FROM_SOURCE — extraídas do próprio exame de consciência que a autora já propunha no encerramento |\n| Conecte (Mt 6:24) | REORGANIZED_FROM_SOURCE — a autora já cita esse versículo no encerramento; apenas o reposicionei como conexão formal |\n| + Aprofunde (contexto histórico; \"primeiro amor\") | EDITORIAL_DERIVED — contexto bíblico geral (1 Rs 17) e desenvolvimento de um versículo que a autora já citava (Ap 2:4-5) |\n| **Condensação do formato de prédica para estudo escrito** | Ponto de atenção geral — o material original tinha cerca de 3 a 4 vezes mais texto, com bastante repetição retórica própria de mensagem falada; cortei repetições mantendo o conteúdo e as melhores frases, mas recomendo que a autora revise se algo essencial da mensagem original foi perdido na condensação |\n| Continue a Jornada | UNRESOLVED — depende da atribuição de posição na Trilha 5 |\n| ID, slug, posição na trilha | Não atribuídos nesta etapa, conforme item 23 do padrão de curadoria |\n| Nome da autora / autorização de exibição pública | UNRESOLVED — nome e cargo informados, mas autorização de exibição pública ainda não confirmada |\n\n**Status:** DRAFT — aguardando confirmação de que a condensação preservou a mensagem pretendida pela autora, revisão de conteúdo e revisão teológica antes de qualquer aprovação ou publicação."
        }
      ],
      "order": 22,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-05-golden-text",
      "studyId": "track-05-study-05",
      "type": "GOLDEN_TEXT",
      "title": "Texto Áureo",
      "iconKey": "texto_aureo",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Referência: Efésios 2:8–9 Texto: \"Porque pela graça sois salvos, por meio da fé; e isto não vem de vós; é dom de Deus. Não vem das obras, para que ninguém se glorie.\""
        }
      ],
      "order": 1,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-05-practical-truth",
      "studyId": "track-05-study-05",
      "type": "PRACTICAL_TRUTH",
      "title": "Verdade Prática",
      "iconKey": "verdade_pratica",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(frase do próprio autor, praticamente literal, extraída da conclusão)"
        },
        {
          "type": "PARAGRAPH",
          "text": "A salvação é pela graça, recebida pela fé, e essa graça transforma a vida daquele que decide seguir Jesus."
        }
      ],
      "order": 2,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-05-bible-reading",
      "studyId": "track-05-study-05",
      "type": "BIBLE_READING",
      "title": "Leitura Bíblica",
      "iconKey": "leitura_biblica",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Efésios 2:8–9; Romanos 5:8; Atos 16:31; 2 Coríntios 5:17; Tito 2:11–12"
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 3,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-05-before-understanding",
      "studyId": "track-05-study-05",
      "type": "BEFORE_UNDERSTANDING",
      "title": "Antes de Entender",
      "iconKey": "antes_entender",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "A salvação é uma das maiores demonstrações do amor de Deus pelo ser humano. Desde o princípio, Deus desejou que o homem tivesse comunhão com Ele, mas o pecado trouxe separação entre os dois. Mesmo assim, Deus não desistiu de nós — Ele preparou um plano de salvação e, no tempo certo, enviou Jesus Cristo ao mundo para nos reconciliar com Ele."
        },
        {
          "type": "PARAGRAPH",
          "text": "Dizer que somos salvos pela graça é dizer que a salvação é um presente. Não conseguimos comprá-lo, nem podemos dizer que o merecemos por causa das nossas boas ações. A graça mostra que Deus decidiu nos amar, perdoar e oferecer uma nova oportunidade por meio de Jesus Cristo."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 4,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-05-read",
      "studyId": "track-05-study-05",
      "type": "READ",
      "title": "Leia",
      "iconKey": "leia",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Efésios 2:8–9; Romanos 5:8"
        }
      ],
      "order": 5,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-05-observe",
      "studyId": "track-05-study-05",
      "type": "OBSERVE",
      "title": "Observe",
      "iconKey": "observe",
      "blocks": [
        {
          "type": "BULLET_LIST",
          "items": [
            "Efésios 2:8–9 declara que somos salvos pela graça, mediante a fé — e isso \"não vem de vós\", não é fruto das obras, \"para que ninguém se glorie\".",
            "Romanos 5:8 mostra que Deus provou Seu amor ao enviar Cristo para morrer por nós \"sendo nós ainda pecadores\" — ou seja, antes de qualquer mérito da nossa parte.",
            "Em nenhum momento o texto credita a salvação a uma \"boa história\" ou ao fato de sermos melhores do que outras pessoas — a ênfase está inteiramente na iniciativa de Deus."
          ]
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 6,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-05-understand",
      "studyId": "track-05-study-05",
      "type": "UNDERSTAND",
      "title": "Entenda",
      "iconKey": "entenda",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "COMPREENDA"
        },
        {
          "type": "SUBHEADING",
          "text": "A graça é presente, não pagamento"
        },
        {
          "type": "PARAGRAPH",
          "text": "A Bíblia mostra que o pecado alcançou toda a humanidade, e o homem, por si mesmo, não consegue resolver esse problema. Por isso Deus enviou Seu Filho: Jesus veio para tomar sobre Si aquilo que era nosso, morreu na cruz pelos nossos pecados e ressuscitou. A salvação começa em Deus — Ele quem oferece o caminho, e esse caminho é Jesus. Não somos salvos porque conseguimos fazer tudo corretamente; todos nós precisamos da graça de Deus."
        },
        {
          "type": "SUBHEADING",
          "text": "A graça não ignora o pecado — ela o leva a sério"
        },
        {
          "type": "PARAGRAPH",
          "text": "A graça de Deus não significa que o pecado deixou de ser importante. Pelo contrário: foi justamente por causa do pecado que Jesus precisou morrer. A cruz mostra, ao mesmo tempo, a gravidade do pecado e o tamanho do amor de Deus — a graça nos mostra que Deus não ignorou nosso pecado, mas providenciou em Cristo uma solução para que pudéssemos ser perdoados e voltar a ter comunhão com Ele."
        },
        {
          "type": "SUBHEADING",
          "text": "Recebendo a graça pela fé"
        },
        {
          "type": "PARAGRAPH",
          "text": "Para receber essa salvação, precisamos responder a Deus com fé. Crer em Jesus não significa apenas acreditar que Ele existiu — é confiar nEle, reconhecer que precisamos dEle, arrepender-nos dos nossos pecados e entregar nossa vida a Ele. A fé verdadeira começa a produzir mudanças dentro de nós: \"se alguém está em Cristo, nova criatura é; as coisas velhas já passaram; eis que tudo se fez novo\" (2 Co 5:17)."
        }
      ],
      "order": 7,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-05-connect",
      "studyId": "track-05-study-05",
      "type": "CONNECT",
      "title": "Conecte",
      "iconKey": "conecte",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Logo depois de afirmar que a salvação \"não vem das obras, para que ninguém se glorie\" (Ef 2:9), o apóstolo Paulo continua, no versículo seguinte: \"Porque somos feitura Sua, criados em Cristo Jesus para as boas obras, as quais Deus preparou para que andássemos nelas\" (Ef 2:10). As boas obras não são a base da nossa salvação, mas são o propósito para o qual fomos salvos — não compram a graça, mas nascem dela."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 8,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-05-interpretation-caution",
      "studyId": "track-05-study-05",
      "type": "INTERPRETATION_CAUTION",
      "title": "Cuidado na Interpretação",
      "iconKey": "cuidado_interpretacao",
      "blocks": [
        {
          "type": "CALLOUT",
          "title": null,
          "text": "Cuidado na interpretação: a certeza de que a salvação é dom de Deus, e não conquista, não deve ser confundida com uma vida sem nenhuma transformação real. A fé verdadeira sempre produz mudança — não porque a mudança compre a salvação, mas porque ela é fruto natural de quem realmente foi alcançado pela graça."
        }
      ],
      "order": 9,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-05-reflect",
      "studyId": "track-05-study-05",
      "type": "REFLECT",
      "title": "Reflita",
      "iconKey": "reflita",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(criada editorialmente)"
        },
        {
          "type": "PARAGRAPH",
          "text": "Por que a salvação é chamada de \"graça\", e o que isso muda na forma como vivemos depois de salvos?"
        }
      ],
      "order": 10,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-05-apply",
      "studyId": "track-05-study-05",
      "type": "APPLY",
      "title": "Aplique",
      "iconKey": "aplique",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "APLIQUE"
        },
        {
          "type": "PARAGRAPH",
          "text": "Quando uma pessoa entende a graça de Deus, ela percebe que não precisa continuar presa ao passado. Em Cristo existe perdão e existe uma nova vida — isso não significa que a pessoa nunca mais enfrentará dificuldades ou tentações, mas significa que agora ela não precisa caminhar sozinha; Deus passa a fazer parte da sua caminhada, dando força para continuar."
        },
        {
          "type": "PARAGRAPH",
          "text": "As boas obras não são o preço para comprar a salvação — nós fazemos o bem porque fomos alcançados pela graça. A obediência é uma resposta de amor e gratidão a Deus: quando alguém realmente entende o que Jesus fez, passa a desejar agradar a Deus e viver de acordo com Sua Palavra (Tt 2:11–12)."
        },
        {
          "type": "PARAGRAPH",
          "text": "A graça nos lembra que ninguém está tão longe que não possa voltar para Deus, quando se arrepende e coloca sua fé em Cristo. Ao mesmo tempo, ela nos ensina a não tratar o pecado com desprezo, mas a valorizar o sacrifício de Jesus e procurar viver uma vida que agrade ao Senhor."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 11,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-05-journey-takeaway",
      "studyId": "track-05-study-05",
      "type": "JOURNEY_TAKEAWAY",
      "title": "Para Levar da Jornada",
      "iconKey": "levar_jornada",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "Conclusão"
        },
        {
          "type": "PARAGRAPH",
          "text": "A salvação pela graça não deve ser vista como algo distante ou complicado. É Deus oferecendo ao homem aquilo que ele não poderia conseguir sozinho. É o Pai chamando o ser humano de volta para perto dEle. É Jesus abrindo o caminho por meio da cruz. É o Espírito Santo trabalhando no coração e conduzindo a pessoa a uma nova maneira de viver."
        },
        {
          "type": "PARAGRAPH",
          "text": "No fim, a nossa esperança não está naquilo que conseguimos fazer, mas naquilo que Cristo fez por nós. A salvação é pela graça, recebida pela fé, e essa graça transforma a vida daquele que decide seguir Jesus."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        },
        {
          "type": "SUBHEADING",
          "text": "Para Levar da Jornada"
        },
        {
          "type": "PARAGRAPH",
          "text": "(frase praticamente literal do próprio autor) A nossa esperança não está naquilo que conseguimos fazer, mas naquilo que Cristo fez por nós."
        }
      ],
      "order": 12,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-05-practice-today",
      "studyId": "track-05-study-05",
      "type": "PRACTICE_TODAY",
      "title": "Pratique Hoje",
      "iconKey": "pratique_hoje",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial) Hoje, agradeça a Deus especificamente por um momento em que você recebeu perdão que não merecia, e viva um gesto concreto de gratidão — um ato de obediência ou de serviço — como resposta a essa graça, não como tentativa de merecê-la."
        }
      ],
      "order": 13,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-05-reflection-questions",
      "studyId": "track-05-study-05",
      "type": "REFLECTION_QUESTIONS",
      "title": "Perguntas para Refletir",
      "iconKey": "perguntas_refletir",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(elaboradas editorialmente a partir do conteúdo do autor)"
        },
        {
          "type": "NUMBERED_LIST",
          "items": [
            "Já entendi de verdade que a salvação é um presente, e não algo que conquistei?",
            "Tenho vivido preso a culpas do passado, mesmo já tendo recebido o perdão de Deus?",
            "Minha obediência a Deus nasce de gratidão, ou de medo de perder a salvação?",
            "Existe algum pecado que tenho tratado com desprezo, em vez de reconhecer o preço que Jesus pagou por ele?"
          ]
        }
      ],
      "order": 14,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-05-journal-prompt",
      "studyId": "track-05-study-05",
      "type": "JOURNAL_PROMPT",
      "title": "Registre no Diário",
      "iconKey": "diario",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial) Em que área da sua vida você ainda tenta \"merecer\" o amor de Deus, em vez de simplesmente recebê-lo pela fé?"
        }
      ],
      "order": 15,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-05-prayer",
      "studyId": "track-05-study-05",
      "type": "PRAYER",
      "title": "Ore",
      "iconKey": "ore",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(oração do próprio autor, enviada para esta seção)"
        },
        {
          "type": "PARAGRAPH",
          "text": "Senhor nosso Deus e nosso Pai, nós te agradecemos pela tua graça e pelo teu grande amor por nós. Obrigado porque, mesmo diante dos nossos erros e pecados, o Senhor não desistiu do ser humano, mas enviou Jesus Cristo para nos trazer salvação."
        },
        {
          "type": "PARAGRAPH",
          "text": "Senhor, olha para o ser humano nos dias de hoje. Muitas pessoas estão vivendo preocupadas, cansadas, feridas e sem saber para onde ir. Algumas procuram preencher o vazio do coração em tantas coisas, mas ainda continuam sentindo falta de algo. Que essas pessoas possam conhecer a tua graça e entender que somente em Jesus podem encontrar o verdadeiro perdão, a paz e uma nova vida."
        },
        {
          "type": "PARAGRAPH",
          "text": "Pai, alcança aquele que está distante de Ti. Toca o coração daquele que pensa que não existe mais solução para sua vida. Mostra que nenhum pecado é maior que a tua misericórdia quando existe arrependimento e fé em Cristo. Ajuda cada pessoa a reconhecer que precisa de Ti e a abrir o coração para receber a salvação que o Senhor oferece gratuitamente."
        },
        {
          "type": "PARAGRAPH",
          "text": "Ensina-nos também a valorizar a tua graça. Que não venhamos a tratar o pecado como algo normal, mas que possamos viver uma vida de gratidão e obediência, lembrando sempre do preço que Jesus pagou por nós na cruz."
        },
        {
          "type": "PARAGRAPH",
          "text": "Senhor, transforma vidas, restaura famílias, fortalece os que estão fracos e traz de volta aqueles que se afastaram. Que a mensagem da salvação pela graça alcance muitos corações e que pessoas possam entender que ainda existe esperança em Cristo."
        },
        {
          "type": "PARAGRAPH",
          "text": "Nós entregamos nossa vida em tuas mãos e confiamos no teu amor e na tua misericórdia. Que a tua graça nos acompanhe todos os dias e nos ajude a permanecer firmes até o fim."
        },
        {
          "type": "PARAGRAPH",
          "text": "Em nome de Jesus Cristo, nosso Senhor e Salvador. Amém."
        }
      ],
      "order": 16,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-05-keep",
      "studyId": "track-05-study-05",
      "type": "KEEP",
      "title": "Para Guardar",
      "iconKey": "guardar",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "2 Coríntios 5:17 — \"Assim que, se alguém está em Cristo, nova criatura é: as coisas velhas já passaram; eis que tudo se fez novo.\""
        }
      ],
      "order": 17,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-05-group-mode",
      "studyId": "track-05-study-05",
      "type": "GROUP_MODE",
      "title": "Em Grupo",
      "iconKey": "grupo",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial, seguindo a progressão observação → compreensão → prática)"
        },
        {
          "type": "NUMBERED_LIST",
          "items": [
            "O que mais chamou sua atenção na ideia de que a salvação é um presente, e não uma conquista?",
            "Por que é tão comum, mesmo entre cristãos, tentar \"merecer\" a salvação através de boas obras?",
            "Como podemos, juntos, viver de um jeito que reflita gratidão pela graça que recebemos?"
          ]
        }
      ],
      "order": 18,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-05-deepen",
      "studyId": "track-05-study-05",
      "type": "DEEPEN",
      "title": "+ Aprofunde",
      "iconKey": "aprofunde",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "Graça que salva, graça que educa"
        },
        {
          "type": "PARAGRAPH",
          "text": "Tito 2:11–12, citado pelo autor, fala de uma graça que não apenas salva, mas também \"ensina\" — educa o crente a renunciar à impiedade e às paixões mundanas, vivendo de forma sóbria, justa e piedosa. A graça, portanto, não é apenas o ponto de partida da vida cristã, mas também a força que sustenta o crescimento diário nela."
        },
        {
          "type": "SUBHEADING",
          "text": "O que significa ser \"nova criatura\"?"
        },
        {
          "type": "PARAGRAPH",
          "text": "A expressão de 2 Coríntios 5:17 não descreve apenas uma mudança de comportamento, mas uma nova identidade: \"as coisas velhas já passaram; eis que tudo se fez novo\". Isso não significa ausência de luta ou de crescimento gradual, mas uma mudança real de direção e de identidade diante de Deus, que começa no momento em que a pessoa coloca sua fé em Cristo."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 19,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-05-continue-journey",
      "studyId": "track-05-study-05",
      "type": "CONTINUE_JOURNEY",
      "title": "Continue a Jornada",
      "iconKey": "continue_jornada",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(a definir — próximo estudo da Trilha 5 ainda não atribuído nesta curadoria)"
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 20,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-05-references",
      "studyId": "track-05-study-05",
      "type": "REFERENCES",
      "title": "Referências Bíblicas",
      "iconKey": "referencias",
      "blocks": [
        {
          "type": "BULLET_LIST",
          "items": [
            "Efésios 2:8–9; Efésios 2:10 (acrescentada editorialmente em Conecte)",
            "Romanos 5:8",
            "Atos 16:31",
            "2 Coríntios 5:17",
            "Tito 2:11–12"
          ]
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 21,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-05-editorial-note",
      "studyId": "track-05-study-05",
      "type": "EDITORIAL_NOTE",
      "title": "Notas de Curadoria",
      "iconKey": "editorial_interno",
      "blocks": [
        {
          "type": "CALLOUT",
          "title": "Governança interna — não publicar",
          "text": "## ELEMENTOS ORIGINAIS PRESERVADOS\n- A síntese trinitária de fechamento do autor, preservada quase integralmente na Conclusão:\n> \"É o Pai chamando o ser humano de volta para perto dele. É Jesus abrindo o caminho por meio da cruz. É o Espírito Santo trabalhando no coração e conduzindo a pessoa a uma nova maneira de viver.\"\n- A oração de encerramento enviada pelo autor, preservada na íntegra na seção Ore.\n\n## NOTAS DE CURADORIA (uso interno — não publicar)\n| Elemento | Classificação |\n|---|---|\n| Todo o conteúdo teológico (graça como presente, cruz, fé, nova criatura, boas obras como resposta, conclusão) | OBSERVED_DIRECT / REORGANIZED_FROM_SOURCE — o texto do autor foi reorganizado na estrutura fixa, mas quase nenhuma frase foi reescrita de forma substancial |\n| Texto Áureo, Para Guardar, todas as demais citações bíblicas do corpo do estudo | OBSERVED_DIRECT — já citadas pelo autor |\n| Verdade Prática, Para Levar da Jornada | OBSERVED_VERBATIM — frases praticamente literais do autor |\n| Tema, Pergunta Central, Objetivo, Journey... já coberto; Pratique Hoje, Perguntas para Refletir, Registre no Diário, Em Grupo, caixa de Cuidado na Interpretação | EDITORIAL_DERIVED — o material original não tinha nenhuma dessas seções, nem uma estrutura em tópicos |\n| Ore | **Atualizado para OBSERVED_VERBATIM** — o autor enviou uma oração própria, que substituiu a versão editorial anterior |\n| Conecte (Ef 2:10) | EDITORIAL_DERIVED — versículo não citado pelo autor, mas é a continuação direta do texto que ele já usa (Ef 2:8-9), reforçando um ponto que ele próprio já fazia em prosa |\n| + Aprofunde | EDITORIAL_DERIVED — desdobramento teológico de dois versículos que o autor já citava (Tt 2:11-12 e 2 Co 5:17) |\n| Sobreposição temática com o estudo de Michael Batista da Silva | **Ponto de atenção editorial** — recomenda-se decisão sobre como posicionar os dois estudos na Trilha 5 sem redundância |\n| Continue a Jornada | UNRESOLVED — depende da atribuição de posição na Trilha 5 |\n| ID, slug, posição na trilha | Não atribuídos nesta etapa, conforme item 23 do padrão de curadoria |\n| Nome completo do autor | **Resolvido nesta atualização:** Hélio Nascimento Sousa — Presbítero, Professor de Escola Bíblica |\n| Autorização de exibição pública do nome | UNRESOLVED — recomenda-se confirmação explícita antes da publicação |\n\n**Status:** DRAFT — aguardando confirmação explícita de autorização de nome, decisão editorial sobre a sobreposição temática com o estudo de Michael Batista, revisão de conteúdo e revisão teológica antes de qualquer aprovação ou publicação."
        }
      ],
      "order": 22,
      "optional": true,
      "collapsible": true
    }
  ],
  "references": []
} as const;

const track05DraftBatch01Track: StudyTrack = {
  ...rawTrack05DraftBatch01Package.tracks[0],
  id: rawTrack05DraftBatch01Package.tracks[0].id as StudyTrackId,
  slug: rawTrack05DraftBatch01Package.tracks[0].slug as StudyTrackSlug,
};

const track05DraftBatch01Studies: readonly Study[] =
  rawTrack05DraftBatch01Package.studies.map((study) => ({
    ...study,
    id: study.id as StudyId,
    trackId: study.trackId as StudyTrackId,
    slug: study.slug as StudySlug,
    nextStudyId:
      study.nextStudyId === null
        ? null
        : (study.nextStudyId as StudyId),
  }));

const track05DraftBatch01Sections: readonly StudySection[] =
  rawTrack05DraftBatch01Package.sections.map((section) => ({
    ...section,
    id: section.id as StudySectionId,
    studyId: section.studyId as StudyId,
    type: section.type as StudySection["type"],
    blocks: section.blocks as unknown as StudySection["blocks"],
  }));

export const track05DraftBatch01Package: StudyContentPackage = {
  contentVersion: rawTrack05DraftBatch01Package.contentVersion,
  tracks: [track05DraftBatch01Track],
  studies: track05DraftBatch01Studies,
  sections: track05DraftBatch01Sections,
  references: rawTrack05DraftBatch01Package.references,
};
