import type { StudyContentPackage } from "./studyContentPackage";

export const TRACK05_STUDY01_APPROVED_CANDIDATE_SHA256 =
  "82466AD048D57E81B1882FA4A340B8ECA945700E4AC2FA64704B72EF386552B3" as const;

export const track05Study01PublicAuthor = "Michael Batista da Silva" as const;

export const track05Study01Governance = {
  trackId: "track-05",
  permanentStudyId: "track-05-study-01",
  permanentSlug: "a-obra-redentora-de-cristo-e-o-plano-da-salvacao",
  permanentTrackPosition: 1,
  publicAuthorDisplayAuthorization: "AUTHORIZED",
  publicAuthorDisplayName: "Michael Batista da Silva",
  editorialStatus: "DRAFT",
  published: false,
  runtimeEligible: false,
  nextStudyId: null,
  technicalProfile: "JOURNEY_20_30_V1",
} as const;

export const track05Study01ApprovedCandidateV2 = {
  "package": "P17-P2-A21",
  "candidateVersion": "michael-journey-20-30-candidate-v2",
  "targetProfile": "JOURNEY_20_30_V1",
  "track": {
    "number": 5,
    "name": "Estudos Colaborativos",
    "nature": "COLLABORATIVE_LIVING_CURATED_COLLECTION"
  },
  "sourceIdentity": {
    "contributorNameObserved": "Michael Batista da Silva",
    "publicAuthorDisplayAuthorization": "UNRESOLVED_REQUIRES_EXPLICIT_AUTHORIZATION",
    "docxSha256": "8D3FCE26042C1A8BC0F0F0D6BDBF1FA827F66561C4133098E7BF865043158A1C",
    "pdfSha256": "1382DDE8912230D3440E586952717C6E7B45D5CE2E303C914175C9F46CD5665B",
    "pdfDocxTextualEquivalence": "UNRESOLVED_NOT_ASSERTED"
  },
  "governance": {
    "permanentStudyId": null,
    "permanentSlug": null,
    "permanentTrackPosition": null,
    "editorialStatus": "CANDIDATE_V2_FOR_REVIEW_ONLY",
    "published": false,
    "runtimeEligible": false,
    "runtimeMaterialized": false,
    "finalEditorialApproval": false
  },
  "provenancePolicy": {
    "OBSERVED_VERBATIM": "Texto presente literalmente na submissão observada.",
    "OBSERVED_DIRECT": "Informação presente diretamente na submissão, com formatação adaptada sem mudança de sentido.",
    "REORGANIZED_FROM_SOURCE": "Conteúdo da submissão redistribuído no Modelo Jornada, sem nova afirmação factual.",
    "EDITORIAL_DERIVED": "Redação editorial criada a partir de ideias já presentes na submissão; não é texto original do colaborador.",
    "UNRESOLVED": "Decisão ainda não autorizada ou não comprovada."
  },
  "study": {
    "tema": {
      "text": "A OBRA REDENTORA DE CRISTO E O PLANO DA SALVAÇÃO",
      "provenance": "OBSERVED_VERBATIM",
      "sourceAnchor": "ESTUDO BÍBLICO: A OBRA REDENTORA DE CRISTO E O PLANO DA SALVAÇÃO"
    },
    "perguntaCentral": {
      "text": "Como Deus realizou, por meio de Jesus Cristo, a obra de salvação que o ser humano não poderia realizar por si mesmo?",
      "provenance": "EDITORIAL_DERIVED",
      "sourceAnchors": [
        "O ser humano não consegue salvar a si mesmo por suas próprias obras.",
        "Cristo veio ao mundo para realizar a obra que nenhum ser humano poderia realizar.",
        "Deus oferece essa salvação por meio de Seu Filho."
      ]
    },
    "objetivo": {
      "text": "Compreender, à luz das Escrituras, o plano de Deus para salvar o ser humano por meio de Jesus Cristo.",
      "provenance": "OBSERVED_VERBATIM",
      "sourceAnchor": "Objetivo"
    },
    "textoAureo": {
      "reference": "João 3:16",
      "text": "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
      "provenance": "OBSERVED_VERBATIM",
      "sourceAnchor": "João 3:16 citado integralmente ao final da submissão"
    },
    "verdadePratica": {
      "text": "A salvação é iniciativa da graça de Deus, realizada por meio de Jesus Cristo, recebida pela fé e refletida em uma vida transformada.",
      "provenance": "EDITORIAL_DERIVED",
      "sourceAnchors": [
        "A salvação é, portanto, uma iniciativa da graça de Deus.",
        "A salvação é recebida pela graça, mediante a fé.",
        "A vida cristã deve revelar a transformação produzida pelo Evangelho."
      ]
    },
    "leituraBiblica": {
      "references": [
        "João 3:16",
        "Romanos 3:23-24",
        "Efésios 2:8-9"
      ],
      "provenance": "OBSERVED_DIRECT",
      "sourceAnchor": "Texto principal"
    },
    "antesDeEntender": {
      "paragraphs": [
        "A Bíblia apresenta a história humana marcada pelo amor de Deus, mas também pela ruptura causada pelo pecado. A submissão de Michael começa mostrando que o pecado separou o ser humano de Deus e que nenhuma pessoa consegue resolver essa condição por suas próprias obras.",
        "É nesse cenário que o estudo apresenta o plano redentor de Deus. A obra de Jesus Cristo — sua vinda ao mundo, vida sem pecado, morte, ressurreição e exaltação — ocupa o centro da salvação. Por isso, antes de pensar no que o ser humano deve fazer, o estudo nos conduz a olhar para aquilo que Deus realizou em Cristo."
      ],
      "provenance": "REORGANIZED_FROM_SOURCE",
      "sourceAnchors": [
        "1. INTRODUÇÃO",
        "2. O PROBLEMA DO PECADO",
        "3. O PLANO DE DEUS PARA A SALVAÇÃO"
      ]
    },
    "parteI": {
      "title": "I — O que a Bíblia mostra?",
      "read": {
        "references": [
          "Romanos 3:23",
          "Romanos 6:23",
          "Isaías 59:2",
          "Gênesis 3:15",
          "João 1:14",
          "Hebreus 4:15",
          "Hebreus 10:4",
          "1 Pedro 2:24",
          "Romanos 5:8",
          "1 Coríntios 15:17"
        ],
        "provenance": "REORGANIZED_FROM_SOURCE"
      },
      "observe": {
        "items": [
          {
            "heading": "O pecado criou uma separação que o ser humano não consegue resolver sozinho.",
            "text": "O estudo mostra que todos pecaram, que o pecado produz culpa, morte e afastamento de Deus e que boas obras não conseguem apagar essa culpa.",
            "provenance": "REORGANIZED_FROM_SOURCE",
            "sourceAnchors": [
              "2. O PROBLEMA DO PECADO",
              "Romanos 3:23",
              "Romanos 6:23",
              "Isaías 59:2"
            ]
          },
          {
            "heading": "O plano de redenção foi anunciado e apontava para o sacrifício perfeito de Cristo.",
            "text": "A submissão apresenta a salvação não como improviso, mas como propósito de Deus. As promessas do Antigo Testamento apontavam para a vinda do Messias, e os sacrifícios mostravam a necessidade de expiação sem serem a solução definitiva para o pecado. Hebreus 10:4 destaca que o sangue de touros e bodes não remove pecados; esses sacrifícios apontavam para um sacrifício perfeito. Em Cristo, as figuras e promessas do Antigo Testamento encontram seu cumprimento.",
            "provenance": "REORGANIZED_FROM_SOURCE",
            "sourceAnchors": [
              "3. O PLANO DE DEUS PARA A SALVAÇÃO",
              "Efésios 1:4-5",
              "Gênesis 3:15",
              "Hebreus 10:4",
              "Os sacrifícios do Antigo Testamento também apontavam para a necessidade de expiação.",
              "Esses sacrifícios apontavam para um sacrifício perfeito.",
              "Em Cristo, as figuras e promessas do Antigo Testamento encontram seu cumprimento."
            ]
          },
          {
            "heading": "Jesus veio ao mundo sem pecado para realizar a obra redentora.",
            "text": "A encarnação revela o Filho de Deus entrando na história humana. O estudo destaca que Jesus viveu sem pecado e, por isso, podia oferecer-se pelos pecadores.",
            "provenance": "REORGANIZED_FROM_SOURCE",
            "sourceAnchors": [
              "4. A ENCARNAÇÃO DE CRISTO",
              "João 1:14",
              "Hebreus 4:15"
            ]
          },
          {
            "heading": "A cruz e a ressurreição estão no centro da mensagem do Evangelho.",
            "text": "Michael apresenta a morte de Cristo como voluntária, sacrificial e substitutiva. Em seguida, mostra a ressurreição como vitória sobre a morte e fundamento da esperança cristã.",
            "provenance": "REORGANIZED_FROM_SOURCE",
            "sourceAnchors": [
              "5. A MORTE DE CRISTO NA CRUZ",
              "6. A RESSURREIÇÃO DE CRISTO",
              "1 Pedro 2:24",
              "Romanos 5:8",
              "1 Coríntios 15:17"
            ]
          }
        ],
        "provenance": "REORGANIZED_FROM_SOURCE"
      }
    },
    "parteII": {
      "title": "II — O que precisamos entender?",
      "compreenda": {
        "items": [
          {
            "heading": "Salvação é graça recebida pela fé.",
            "text": "O estudo explica que salvação envolve perdão, justificação, nova vida e esperança eterna. Ela não é comprada nem conquistada por mérito humano; é recebida pela graça, mediante a fé em Cristo.",
            "provenance": "REORGANIZED_FROM_SOURCE",
            "sourceAnchors": [
              "7. O QUE É A SALVAÇÃO?",
              "Romanos 5:1",
              "2 Coríntios 5:17",
              "Efésios 2:8-9"
            ]
          },
          {
            "heading": "Arrependimento e fé são a resposta ao Evangelho.",
            "text": "A submissão diferencia arrependimento de simples tristeza e apresenta a fé como confiança real em Cristo como Senhor e Salvador. Essa fé deve produzir frutos na vida.",
            "provenance": "REORGANIZED_FROM_SOURCE",
            "sourceAnchors": [
              "8. O ARREPENDIMENTO E A FÉ",
              "Romanos 10:9-10",
              "Tiago 2"
            ]
          },
          {
            "heading": "A graça transforma a maneira de viver.",
            "text": "A graça não torna o pecado irrelevante. O estudo afirma que quem recebe a graça é chamado à gratidão, santidade e boas obras como fruto da salvação, e não como causa dela.",
            "provenance": "REORGANIZED_FROM_SOURCE",
            "sourceAnchors": [
              "9. A GRAÇA DE DEUS",
              "Romanos 3:24",
              "Tito 2:11-12"
            ]
          },
          {
            "heading": "A reconciliação com Deus está baseada na obra de Cristo, nosso único mediador.",
            "text": "O pecado criou separação entre Deus e o ser humano, mas Cristo veio para reconciliar. Em Cristo, o pecador recebe perdão, acesso à presença de Deus e paz com o Criador. Essa confiança não se apoia na perfeição humana, mas na obra perfeita de Jesus. A submissão destaca ainda que Cristo é o único mediador entre Deus e os homens.",
            "provenance": "REORGANIZED_FROM_SOURCE",
            "sourceAnchors": [
              "10. A RECONCILIAÇÃO COM DEUS",
              "2 Coríntios 5:18-19",
              "Romanos 8:1",
              "1 Timóteo 2:5",
              "Cristo é nosso mediador diante de Deus.",
              "Por meio de Cristo, temos acesso ao Pai."
            ]
          },
          {
            "heading": "A santificação é uma vida contínua de transformação na dependência de Deus.",
            "text": "A salvação não termina no momento da conversão. O salvo é chamado a crescer em conformidade com Cristo. Michael destaca que o Espírito Santo capacita o crente, que a Palavra de Deus é fundamental e que o cristão deve cultivar oração, estudar e praticar as Escrituras, buscar comunhão com outros irmãos e testemunhar de Cristo ao mundo. A santificação não é conquistada pela força humana isoladamente; o cristão depende diariamente da graça e da ação do Espírito Santo.",
            "provenance": "REORGANIZED_FROM_SOURCE",
            "sourceAnchors": [
              "11. A SANTIFICAÇÃO",
              "Gálatas 5",
              "O Espírito Santo capacita o crente a viver segundo a vontade de Deus.",
              "A Palavra de Deus também é fundamental nesse processo.",
              "O cristão deve cultivar uma vida de oração.",
              "Deve estudar e praticar as Escrituras.",
              "Deve buscar comunhão com outros irmãos na fé.",
              "Deve testemunhar de Cristo ao mundo."
            ]
          },
          {
            "heading": "A esperança da salvação aponta para a volta de Cristo e para a plenitude futura da redenção.",
            "text": "A salvação produz uma esperança que vai além desta vida. O cristão aguarda a volta de Cristo e a plenitude da redenção. Apocalipse 21 apresenta a esperança de novos céus e nova terra, e a submissão lembra a promessa de um futuro sem morte, dor e sofrimento para os Seus. Essa esperança não depende das circunstâncias deste mundo: Cristo venceu a morte e garante a esperança da vida eterna.",
            "provenance": "REORGANIZED_FROM_SOURCE",
            "sourceAnchors": [
              "12. A SEGURANÇA E A ESPERANÇA DA SALVAÇÃO",
              "Apocalipse 21",
              "Apocalipse 21 apresenta a esperança de novos céus e nova terra.",
              "Deus promete um futuro sem morte, dor e sofrimento para os Seus.",
              "Cristo venceu a morte e garante a esperança da vida eterna."
            ]
          }
        ],
        "provenance": "REORGANIZED_FROM_SOURCE"
      }
    },
    "parteIII": {
      "title": "III — Como viver isso?",
      "aplique": {
        "intro": {
          "text": "A aplicação original de Michael conduz o leitor a examinar sua resposta pessoal ao Evangelho. As seis perguntas abaixo são preservadas como núcleo prático do estudo.",
          "provenance": "EDITORIAL_DERIVED",
          "sourceAnchor": "🙏 APLICAÇÃO FINAL"
        },
        "questions": [
          "Eu reconheço que sou pecador e que preciso da graça de Deus?",
          "Minha confiança para a salvação está em Cristo ou em minhas próprias obras?",
          "Tenho verdadeiramente me arrependido dos meus pecados?",
          "Minha fé em Cristo tem produzido frutos em minha vida?",
          "Estou vivendo diariamente em comunhão com Deus?",
          "Tenho anunciado a outras pessoas aquilo que Cristo fez por mim?"
        ],
        "questionsProvenance": "OBSERVED_VERBATIM",
        "sourceAnchor": "🙏 APLICAÇÃO FINAL"
      }
    },
    "conclusao": {
      "paragraphs": [
        "A obra redentora de Cristo é o centro da mensagem do Evangelho. O pecado trouxe separação, culpa e morte, mas Deus revelou seu plano de salvação em Jesus.",
        "Cristo veio ao mundo, viveu sem pecado, morreu pelos pecadores, ressuscitou e venceu a morte. A salvação é recebida pela graça, mediante a fé, e chama o ser humano ao arrependimento e o cristão a uma vida de santidade e transformação.",
        "A confiança do salvo não está em suas próprias obras, mas na obra perfeita de Cristo. A cruz revela a justiça e o amor de Deus, e a ressurreição revela a vitória de Cristo.",
        "O Evangelho anuncia que há perdão para o pecador arrependido, esperança para quem está perdido, reconciliação para quem está afastado de Deus e vida eterna para aquele que crê em Jesus Cristo.",
        "Por isso, a salvação não deve ser tratada como algo secundário. O cristão é chamado a confiar plenamente na obra de Cristo, abandonar o pecado, buscar uma vida de obediência e anunciar a outros a mensagem da salvação."
      ],
      "provenance": "REORGANIZED_FROM_SOURCE",
      "sourceAnchor": "13. CONCLUSÃO"
    },
    "paraContinuar": {
      "items": [
        "Releia João 3:16, Romanos 3:23-24 e Efésios 2:8-9, observando o que cada texto mostra sobre a necessidade humana e a iniciativa de Deus.",
        "Retome as seis perguntas da aplicação final e identifique qual delas mais exige uma resposta prática hoje.",
        "Ore pedindo que sua confiança permaneça na obra de Cristo e que sua fé produza frutos visíveis em sua vida.",
        "Compartilhe com alguém, de forma simples, aquilo que o estudo apresenta sobre o que Cristo fez pela salvação."
      ],
      "provenance": "EDITORIAL_DERIVED",
      "sourceAnchors": [
        "Texto principal",
        "🙏 APLICAÇÃO FINAL",
        "A vida cristã deve revelar a transformação produzida pelo Evangelho.",
        "Devemos anunciar a outros a mensagem da salvação."
      ]
    },
    "fraseCentralPreservada": {
      "text": "O homem não poderia chegar até Deus por suas próprias forças; por isso, Deus veio até o homem na pessoa de Jesus Cristo, morreu pelos nossos pecados, ressuscitou para nossa justificação e oferece gratuitamente a salvação a todo aquele que crê.",
      "provenance": "OBSERVED_VERBATIM",
      "sourceAnchor": "🔥 FRASE CENTRAL DO ESTUDO",
      "placement": "PRESERVED_SOURCE_ELEMENT_OUTSIDE_MANDATORY_JOURNEY_PROFILE"
    },
    "referencias": {
      "items": [
        "Gênesis 3",
        "Gênesis 3:15",
        "Isaías 53",
        "Isaías 59:2",
        "Eclesiastes 7:20",
        "João 1:14",
        "João 3:16",
        "João 10:18",
        "Romanos 3:23",
        "Romanos 3:23-24",
        "Romanos 3:24",
        "Romanos 5:1",
        "Romanos 5:8",
        "Romanos 6:23",
        "Romanos 8:1",
        "Romanos 10:9-10",
        "1 Coríntios 15:17",
        "2 Coríntios 5:17",
        "2 Coríntios 5:18-19",
        "Gálatas 5",
        "Efésios 1:4-5",
        "Efésios 1:7",
        "Efésios 2:8-9",
        "Filipenses 2:6-8",
        "1 Timóteo 2:5",
        "Tito 2:11-12",
        "Hebreus 4:15",
        "Hebreus 10:4",
        "Tiago 2",
        "1 Pedro 2:24",
        "Apocalipse 21"
      ],
      "provenance": "OBSERVED_DIRECT",
      "policy": "Somente referências explicitamente presentes na submissão observada; a candidate-v2 mantém exatamente o mesmo conjunto de 31 referências validado na candidate-v1."
    }
  },
  "reviewQuestions": [
    "A candidate-v2 preserva com fidelidade o desenvolvimento de Michael sobre os sacrifícios do Antigo Testamento e o sacrifício perfeito de Cristo?",
    "A candidate-v2 preserva corretamente Cristo como único mediador sem ampliar além da submissão?",
    "A candidate-v2 representa de forma suficiente o processo de santificação descrito por Michael, incluindo Espírito Santo, Palavra, oração, Escrituras, comunhão e testemunho?",
    "A candidate-v2 preserva corretamente a esperança de novos céus e nova terra, sem morte, dor e sofrimento?",
    "A conclusão v2 preserva adequadamente os elementos de perdão, esperança, reconciliação, vida eterna e anúncio da salvação presentes no original?",
    "A Frase Central do Estudo deve permanecer como destaque adicional do colaborador fora dos campos obrigatórios do Modelo Jornada?",
    "Há autorização expressa para exibir publicamente o nome de Michael Batista da Silva?",
    "Após aprovação editorial da v2, a versão poderá seguir para futura materialização DRAFT mediante autorização separada?"
  ]
} as const;

export const track05Study01Draft = {
  "contentVersion": "track-05-study-01-draft-v1",
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
      "id": "track-05-study-01",
      "trackId": "track-05",
      "number": 1,
      "slug": "a-obra-redentora-de-cristo-e-o-plano-da-salvacao",
      "title": "A Obra Redentora de Cristo e o Plano da Salvação",
      "summary": "A Bíblia conta a história da humanidade como uma história marcada pelo amor de Deus. Desde o princípio, Deus desejou ter comunhão com o ser humano — mas o pecado entrou no mundo pela desobediência de Adão e Eva (Gênesis 3) e rompeu essa comunhão. Romanos 3:23 declara que todos pecaram e estão destituídos da glória de Deus: o pecado não é apenas uma falha moral, é uma rebelião contra o Criador, e sua consequência é a morte (Rm 6:23).",
      "questionCentral": "Como Deus realizou, por meio de Jesus Cristo, a salvação que o ser humano não poderia realizar por si mesmo?",
      "objective": "Compreender, à luz das Escrituras, o plano de Deus para salvar o ser humano por meio de Jesus Cristo.",
      "estimatedMinutes": {
        "minimum": 24,
        "maximum": 28
      },
      "heroImage": "track-05-study-01-hero",
      "nextStudyId": null,
      "audienceLevel": null,
      "tags": [],
      "published": false
    }
  ],
  "sections": [
    {
      "id": "track-05-study-01-golden-text",
      "studyId": "track-05-study-01",
      "type": "GOLDEN_TEXT",
      "title": "Texto Áureo",
      "iconKey": "texto_aureo",
      "blocks": [
    {
        "type": "PARAGRAPH",
        "text": "Refer\u00EAncia: Jo\u00E3o 3:16\nTexto: \"Porque Deus amou o mundo de tal maneira que deu o seu Filho unig\u00EAnito, para que todo aquele que nele cr\u00EA n\u00E3o pere\u00E7a, mas tenha a vida eterna.\""
    }
  ],
      "order": 1,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-01-practical-truth",
      "studyId": "track-05-study-01",
      "type": "PRACTICAL_TRUTH",
      "title": "Verdade Prática",
      "iconKey": "verdade_pratica",
      "blocks": [
        {
          type: "PARAGRAPH",
          text: "A salvação é iniciativa da graça de Deus, realizada por meio de Jesus Cristo, recebida pela fé e refletida em uma vida transformada.",
        }
      ],
      "order": 2,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-01-bible-reading",
      "studyId": "track-05-study-01",
      "type": "BIBLE_READING",
      "title": "Leitura Bíblica",
      "iconKey": "leitura_biblica",
      "blocks": [
    {
        "type": "PARAGRAPH",
        "text": "Jo\u00E3o 3:16; Romanos 3:23\u201324; Ef\u00E9sios 2:8\u20139"
    }
  ],
      "order": 3,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-01-before-understanding",
      "studyId": "track-05-study-01",
      "type": "BEFORE_UNDERSTANDING",
      "title": "Antes de entender",
      "iconKey": "leia",
      "blocks": [
    {
        "type": "PARAGRAPH",
        "text": "A B\u00EDblia conta a hist\u00F3ria da humanidade como uma hist\u00F3ria marcada pelo amor de Deus. Desde o princ\u00EDpio, Deus desejou ter comunh\u00E3o com o ser humano \u2014 mas o pecado entrou no mundo pela desobedi\u00EAncia de Ad\u00E3o e Eva (G\u00EAnesis 3) e rompeu essa comunh\u00E3o. Romanos 3:23 declara que todos pecaram e est\u00E3o destitu\u00EDdos da gl\u00F3ria de Deus: o pecado n\u00E3o \u00E9 apenas uma falha moral, \u00E9 uma rebeli\u00E3o contra o Criador, e sua consequ\u00EAncia \u00E9 a morte (Rm 6:23)."
    },
    {
        "type": "PARAGRAPH",
        "text": "O ser humano n\u00E3o consegue salvar a si mesmo por suas pr\u00F3prias obras. Mas Deus n\u00E3o abandonou a humanidade em sua condi\u00E7\u00E3o ca\u00EDda \u2014 desde a queda, Ele revelou progressivamente o Seu plano de reden\u00E7\u00E3o, que encontra seu centro e cumprimento na pessoa de Jesus Cristo. Cristo veio para realizar, por meio de Sua encarna\u00E7\u00E3o, morte, ressurrei\u00E7\u00E3o e exalta\u00E7\u00E3o, a obra que nenhum ser humano poderia realizar. A salva\u00E7\u00E3o \u00E9, portanto, uma iniciativa da gra\u00E7a de Deus."
    },
    {
        "type": "CALLOUT",
        title: null,
          "text": "O homem n\u00E3o poderia chegar at\u00E9 Deus por suas pr\u00F3prias for\u00E7as; por isso, Deus veio at\u00E9 o homem na pessoa de Jesus Cristo, morreu pelos nossos pecados, ressuscitou para nossa justifica\u00E7\u00E3o e oferece gratuitamente a salva\u00E7\u00E3o a todo aquele que cr\u00EA."
    }
  ],
      "order": 4,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-01-read",
      "studyId": "track-05-study-01",
      "type": "READ",
      "title": "Antes de entender",
      "iconKey": "leia",
      "blocks": [
    {
        "type": "PARAGRAPH",
        "text": "G\u00EAnesis 3 (a entrada do pecado)\nRomanos 3:23\u201324\nRomanos 6:23\nJo\u00E3o 3:16\nEf\u00E9sios 2:8\u20139"
    }
  ],
      "order": 5,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-01-observe",
      "studyId": "track-05-study-01",
      "type": "OBSERVE",
      "title": "Leia",
      "iconKey": "observe",
      "blocks": [
    {
        "type": "PARAGRAPH",
        "text": "O pecado entrou no mundo pela desobedi\u00EAncia e rompeu a comunh\u00E3o entre Deus e o homem (Gn 3; Is 59:2).\nNenhuma pessoa pode afirmar que jamais pecou \u2014 \"n\u00E3o h\u00E1 homem justo sobre a terra que fa\u00E7a o bem e nunca peque\" (Ec 7:20).\nA consequ\u00EAncia do pecado \u00E9 a morte, e o ser humano \u00E9 incapaz de salvar a si mesmo por suas pr\u00F3prias obras (Rm 6:23).\nMesmo diante disso, o texto mostra que a salva\u00E7\u00E3o \u00E9 oferecida como dom \u2014 \"pela gra\u00E7a sois salvos, mediante a f\u00E9... n\u00E3o vem de v\u00F3s, \u00E9 dom de Deus\" (Ef 2:8\u20139) \u2014 e como promessa de vida eterna para quem cr\u00EA (Jo 3:16)."
    }
  ],
      "order": 6,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-01-understand",
      "studyId": "track-05-study-01",
      "type": "UNDERSTAND",
      "title": "O pecado criou uma separação que o ser humano não consegue resolver sozinho.",
      "iconKey": "compreenda_entenda",
      "blocks": [
    {
        "type": "SUBHEADING",
        "text": "O problema do pecado e a necessidade de um Salvador"
    },
    {
        "type": "PARAGRAPH",
        "text": "O pecado separa o homem da presen\u00E7a santa de Deus (Is 59:2), produz culpa e escravid\u00E3o espiritual. Essa separa\u00E7\u00E3o n\u00E3o poderia ser resolvida por boas obras \u2014 nossos esfor\u00E7os n\u00E3o conseguem apagar a culpa produzida pelo pecado. Era necess\u00E1ria uma interven\u00E7\u00E3o divina: algu\u00E9m santo e sem pecado. Esse Salvador \u00E9 Jesus Cristo."
    },
    {
        "type": "SUBHEADING",
        "text": "A obra de Cristo: encarna\u00E7\u00E3o, cruz e ressurrei\u00E7\u00E3o"
    },
    {
        "type": "PARAGRAPH",
        "text": "O plano de Deus n\u00E3o foi improvisado ap\u00F3s a queda \u2014 j\u00E1 estava estabelecido em Seu prop\u00F3sito eterno (Ef 1:4\u20135), e as promessas do Antigo Testamento apontavam para a vinda do Messias."
    },
    {
        "type": "PARAGRAPH",
        "text": "Encarna\u00E7\u00E3o: \"o Verbo se fez carne e habitou entre n\u00F3s\" (Jo 1:14). Jesus \u00E9 verdadeiramente Deus e verdadeiramente homem; Ele Se humilhou e assumiu a forma de servo (Fp 2:6\u20138), foi tentado em tudo, mas sem pecado (Hb 4:15) \u2014 Sua vida perfeita era fundamental para Sua miss\u00E3o redentora.\nCruz: Jesus n\u00E3o morreu por acidente; Ele entregou voluntariamente Sua vida (Jo 10:18). Sua morte foi sacrificial e substitutiva \u2014 Ele levou sobre Si o castigo que o pecado merecia (1 Pe 2:24), cumprindo o que Isa\u00EDas 53 j\u00E1 havia profetizado. A cruz revela, ao mesmo tempo, a justi\u00E7a e o amor de Deus: \"Deus prova o seu amor para conosco pelo fato de ter Cristo morrido por n\u00F3s, sendo n\u00F3s ainda pecadores\" (Rm 5:8).\nRessurrei\u00E7\u00E3o: no terceiro dia, Jesus ressuscitou, vencendo a morte e confirmando a efic\u00E1cia de Sua obra redentora. \"Se Cristo n\u00E3o ressuscitou, a nossa f\u00E9 \u00E9 v\u00E3\" (1 Co 15:17) \u2014 mas Ele ressuscitou verdadeiramente, e essa vit\u00F3ria garante esperan\u00E7a para todos os que est\u00E3o nEle."
    },
    {
        "type": "SUBHEADING",
        "text": "A salva\u00E7\u00E3o pela gra\u00E7a, mediante a f\u00E9"
    },
    {
        "type": "PARAGRAPH",
        "text": "Salva\u00E7\u00E3o significa ser resgatado da condena\u00E7\u00E3o e reconciliado com Deus: envolve perd\u00E3o, justifica\u00E7\u00E3o (Deus declara justo quem cr\u00EA \u2014 Rm 5:1) e regenera\u00E7\u00E3o \u2014 \"se algu\u00E9m est\u00E1 em Cristo, nova criatura \u00E9\" (2 Co 5:17). Ela \u00E9 recebida pela gra\u00E7a, mediante a f\u00E9, n\u00E3o pelas obras (Ef 2:8\u20139). A gra\u00E7a \u00E9 o favor imerecido de Deus: n\u00E3o podemos comprar nem merecer a salva\u00E7\u00E3o; toda a gl\u00F3ria pertence a Deus."
    },
    {
        "type": "PARAGRAPH",
        "text": "A resposta humana a essa gra\u00E7a envolve arrependimento \u2014 reconhecer o pecado e voltar-se para Deus, n\u00E3o apenas lamentar suas consequ\u00EAncias \u2014 e f\u00E9, que n\u00E3o \u00E9 apenas acreditar que Jesus existiu, mas confiar nEle como Senhor e Salvador (Rm 10:9\u201310). Uma f\u00E9 verdadeira produz frutos e n\u00E3o permanece sem obras (Tg 2)."
    }
  ],
      "order": 7,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-01-connect",
      "studyId": "track-05-study-01",
      "type": "CONNECT",
      "title": "O plano de redenção foi anunciado e apontava para o sacrifício perfeito de Cristo.",
      "iconKey": "conecte",
      "blocks": [
    {
        "type": "PARAGRAPH",
        "text": "As promessas do Antigo Testamento apontavam para o que Cristo cumpriria. G\u00EAnesis 3:15 \u00E9 a primeira promessa de vit\u00F3ria sobre o mal \u2014 a descend\u00EAncia da mulher feriria a cabe\u00E7a da serpente. Os sacrif\u00EDcios do Antigo Testamento apontavam para a necessidade de expia\u00E7\u00E3o, mas \"\u00E9 imposs\u00EDvel que o sangue de touros e bodes remova pecados\" (Hb 10:4); eles apontavam para um sacrif\u00EDcio perfeito. \u00C9 por isso que Jo\u00E3o Batista aponta para Jesus dizendo: \"Eis o Cordeiro de Deus, que tira o pecado do mundo.\" Em Cristo, as figuras e promessas do Antigo Testamento encontram seu cumprimento \u2014 uma interpreta\u00E7\u00E3o que o pr\u00F3prio Novo Testamento faz explicitamente."
    }
  ],
      "order": 8,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-01-interpretation-caution",
      "studyId": "track-05-study-01",
      "type": "INTERPRETATION_CAUTION",
      "title": "Jesus veio ao mundo sem pecado para realizar a obra redentora.",
      "iconKey": "cuidado_para_nao_confundir",
      "blocks": [
    {
        "type": "CALLOUT",
        title: null,
          "text": "a graça não significa que o pecado ou as boas obras não importam. A cruz demonstra o alto preço pago por nossa redenção, e a graça que salva também educa o crente para viver de maneira piedosa (Tt 2:11–12). As boas obras são fruto da salvação recebida — não a causa dela."
    }
  ],
      "order": 9,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-01-reflect",
      "studyId": "track-05-study-01",
      "type": "REFLECT",
      "title": "A cruz e a ressurreição estão no centro da mensagem do Evangelho.",
      "iconKey": "reflita",
      "blocks": [
    {
        "type": "PARAGRAPH",
        "text": "Minha confian\u00E7a para a salva\u00E7\u00E3o est\u00E1 em Cristo ou em minhas pr\u00F3prias obras?"
    },
    {
        "type": "PARAGRAPH",
        "text": "Tenho verdadeiramente me arrependido dos meus pecados?"
    },
    {
        "type": "PARAGRAPH",
        "text": "Minha f\u00E9 em Cristo tem produzido frutos concretos na minha vida?"
    }
  ],
      "order": 10,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-01-apply",
      "studyId": "track-05-study-01",
      "type": "APPLY",
      "title": "Salvação é graça recebida pela fé.",
      "iconKey": "aplique",
      "blocks": [
        {
          type: "PARAGRAPH",
          text: "A obra de Cristo produz uma nova relação e um novo caminho de vida:",
        },
        {
          type: "PARAGRAPH",
          text: "Reconciliação: o pecado criou separação entre Deus e o homem, mas em Cristo \"Deus estava reconciliando consigo o mundo\" (2 Co 5:18–19). Não há mais condenação para os que estão em Cristo Jesus (Rm 8:1); podemos nos aproximar de Deus com confiança — não baseada em nossa perfeição, mas na obra perfeita de Jesus, nosso único mediador (1 Tm 2:5).\nSantificação: a salvação não termina na conversão. Deus chama o salvo a uma vida de santificação, marcada pelo fruto do Espírito — amor, alegria, paz, paciência, bondade, domínio próprio (Gl 5) — sustentada pela oração, pela Palavra e pela comunhão com outros irmãos.\nEsperança: o cristão aguarda a volta de Cristo e a plenitude da redenção — novos céus e nova terra, sem morte, dor ou sofrimento (Ap 21). Essa esperança não depende das circunstâncias deste mundo, porque Cristo já venceu a morte.",
        }
      ],
      "order": 11,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-01-journey-takeaway",
      "studyId": "track-05-study-01",
      "type": "JOURNEY_TAKEAWAY",
      "title": "Arrependimento e fé são a resposta ao Evangelho.",
      "iconKey": "levamos_da_jornada",
      "blocks": [
    {
        "type": "SUBHEADING",
        "text": "Conclus\u00E3o"
    },
    {
        "type": "PARAGRAPH",
        "text": "A obra redentora de Cristo \u00E9 o centro da mensagem do Evangelho. O pecado trouxe separa\u00E7\u00E3o, culpa e morte, mas Deus revelou Seu plano de salva\u00E7\u00E3o: Jesus veio, viveu sem pecado, morreu na cruz por n\u00F3s, ressuscitou ao terceiro dia e venceu a morte, oferecendo vida eterna a todo aquele que cr\u00EA."
    },
    {
        "type": "PARAGRAPH",
        "text": "Essa salva\u00E7\u00E3o \u00E9 recebida pela gra\u00E7a, mediante a f\u00E9 \u2014 e o ser humano \u00E9 chamado ao arrependimento e \u00E0 confian\u00E7a em Cristo. Depois de salvo, o crist\u00E3o \u00E9 chamado a viver em santidade, revelando a transforma\u00E7\u00E3o produzida pelo Evangelho. Nossa confian\u00E7a n\u00E3o est\u00E1 em nossas obras, mas na obra perfeita de Jesus: a cruz revela a justi\u00E7a e o amor de Deus; a ressurrei\u00E7\u00E3o revela Sua vit\u00F3ria. H\u00E1 perd\u00E3o para o pecador arrependido, esperan\u00E7a para quem est\u00E1 perdido, reconcilia\u00E7\u00E3o para quem est\u00E1 afastado de Deus e vida eterna para quem cr\u00EA em Jesus Cristo."
    },
    {
        "type": "SUBHEADING",
        "text": "Para levar da Jornada"
    },
    {
        "type": "PARAGRAPH",
        "text": "A salvação não é algo que conquistamos — é um presente que recebemos pela graça, mediante a fé em Jesus Cristo, que morreu, ressuscitou e nos oferece vida eterna."
    }
  ],
      "order": 12,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-01-practice-today",
      "studyId": "track-05-study-01",
      "type": "PRACTICE_TODAY",
      "title": "A graça transforma a maneira de viver.",
      "iconKey": "pratique_hoje",
      "blocks": [
    {
        "type": "CALLOUT",
        title: null,
          "text": "Hoje, conte a alguém, com suas próprias palavras, o que Cristo fez por você."
    }
  ],
      "order": 13,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-01-reflection-questions",
      "studyId": "track-05-study-01",
      "type": "REFLECTION_QUESTIONS",
      "title": "A reconciliação com Deus está baseada na obra de Cristo, nosso único mediador.",
      "iconKey": "para_refletir",
      "blocks": [
    {
        "type": "BULLET_LIST",
        "items": ["Eu reconhe\u00E7o que sou pecador e que preciso da gra\u00E7a de Deus?", "Minha confian\u00E7a para a salva\u00E7\u00E3o est\u00E1 em Cristo ou em minhas pr\u00F3prias obras?", "Tenho verdadeiramente me arrependido dos meus pecados?", "Minha f\u00E9 em Cristo tem produzido frutos em minha vida?", "Estou vivendo diariamente em comunh\u00E3o com Deus?"]
    }
  ],
      "order": 14,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-01-journal-prompt",
      "studyId": "track-05-study-01",
      "type": "JOURNAL_PROMPT",
      "title": "A santificação é uma vida contínua de transformação na dependência de Deus.",
      "iconKey": "registrar_diario",
      "blocks": [
    {
        "type": "PARAGRAPH",
        "text": "O que mudou — ou ainda precisa mudar — na sua vida desde que você creu na obra que Cristo realizou por você?"
    }
  ],
      "order": 15,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-01-prayer",
      "studyId": "track-05-study-01",
      "type": "PRAYER",
      "title": "A esperança da salvação aponta para a volta de Cristo e para a plenitude futura da redenção.",
      "iconKey": "ore",
      "blocks": [
    {
        "type": "CALLOUT",
        title: null,
          "text": "Agradeça a Deus pela salvação que Ele ofereceu gratuitamente em Cristo, e peça que Ele o ajude a viver de um jeito coerente com a graça que você recebeu."
    }
  ],
      "order": 16,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-01-keep",
      "studyId": "track-05-study-01",
      "type": "KEEP",
      "title": "Aplique",
      "iconKey": "para_guardar",
      "blocks": [
    {
        "type": "CALLOUT",
        title: null,
          "text": "Ef\u00E9sios 2:8\u20139 \u2014 \"Porque pela gra\u00E7a sois salvos, mediante a f\u00E9; e isto n\u00E3o vem de v\u00F3s, \u00E9 dom de Deus. N\u00E3o vem das obras, para que ningu\u00E9m se glorie.\""
    }
  ],
      "order": 17,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-01-group-mode",
      "studyId": "track-05-study-01",
      "type": "GROUP_MODE",
      "title": "Perguntas para aplicar",
      "iconKey": "modo_grupo",
      "blocks": [
    {
        "type": "NUMBERED_LIST",
        "items": ["O que mais chamou sua aten\u00E7\u00E3o na forma como Deus realizou a salva\u00E7\u00E3o por meio de Cristo?", "Qual parte da obra de Cristo \u2014 encarna\u00E7\u00E3o, cruz ou ressurrei\u00E7\u00E3o \u2014 ficou mais clara para voc\u00EA neste estudo?", "Como podemos, juntos, viver e anunciar essa salva\u00E7\u00E3o nesta semana?"]
    }
  ],
      "order": 18,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-01-deepen",
      "studyId": "track-05-study-01",
      "type": "DEEPEN",
      "title": "Conclusão",
      "iconKey": "aprofunde",
      "blocks": [
    {
        "type": "PARAGRAPH",
        "text": "Os sacrif\u00EDcios do Antigo Testamento e o Cordeiro de Deus\nHebreus 10:4 afirma que \u00E9 imposs\u00EDvel que o sangue de touros e bodes remova pecados \u2014 os sacrif\u00EDcios do Antigo Testamento apontavam para a necessidade de um sacrif\u00EDcio perfeito e definitivo. \u00C9 por isso que, no Novo Testamento, Jesus \u00E9 apresentado como o Cordeiro de Deus que tira o pecado do mundo: em Cristo, o sistema sacrificial encontra seu cumprimento."
    },
    {
        "type": "PARAGRAPH",
        "text": "Santifica\u00E7\u00E3o: a salva\u00E7\u00E3o que continua transformando\nA vida crist\u00E3 \u00E9 um processo cont\u00EDnuo de transforma\u00E7\u00E3o, sustentado pela a\u00E7\u00E3o do Esp\u00EDrito Santo, e n\u00E3o apenas pelo esfor\u00E7o humano. O fruto do Esp\u00EDrito (Gl 5) \u2014 amor, alegria, paz, paci\u00EAncia, bondade, dom\u00EDnio pr\u00F3prio \u2014 \u00E9 a evid\u00EAncia vis\u00EDvel dessa transforma\u00E7\u00E3o, cultivada pela ora\u00E7\u00E3o, pelo estudo da Palavra e pela comunh\u00E3o com outros crentes."
    },
    {
        "type": "PARAGRAPH",
        "text": "Seguran\u00E7a e esperan\u00E7a da salva\u00E7\u00E3o\nA esperan\u00E7a crist\u00E3 n\u00E3o est\u00E1 fundamentada nas circunst\u00E2ncias deste mundo, mas nas promessas de Deus. Apocalipse 21 descreve um futuro sem morte, dor ou sofrimento para os que pertencem a Cristo \u2014 uma esperan\u00E7a presente e futura ao mesmo tempo, j\u00E1 experimentada em parte agora e plenamente cumprida na volta de Cristo."
    }
  ],
      "order": 19,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-01-continue-journey",
      "studyId": "track-05-study-01",
      "type": "CONTINUE_JOURNEY",
      "title": "Para continuar",
      "iconKey": "continue_jornada",
      "blocks": [
        {
          type: "NUMBERED_LIST",
          items: [
            "Releia João 3:16, Romanos 3:23-24 e Efésios 2:8-9, observando o que cada texto mostra sobre a necessidade humana e a iniciativa de Deus.",
            "Retome as perguntas da aplicação final e identifique qual delas mais exige uma resposta prática hoje.",
            "Ore pedindo que sua confiança permaneça na obra de Cristo e que sua fé produza frutos visíveis em sua vida.",
            "Compartilhe com alguém, de forma simples, aquilo que o estudo apresenta sobre o que Cristo fez pela salvação.",
          ],
        },
      ],
      "order": 20,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-01-references",
      "studyId": "track-05-study-01",
      "type": "REFERENCES",
      "title": "Frase Central do Estudo",
      "iconKey": "referencias",
      "blocks": [
    {
        "type": "PARAGRAPH",
        "text": "G\u00EAnesis 3; G\u00EAnesis 3:15; Isa\u00EDas 59:2; Eclesiastes 7:20; Isa\u00EDas 53; Romanos 3:23\u201324; Romanos 3:24; Romanos 5:1; Romanos 5:8; Romanos 6:23; Romanos 8:1; Romanos 10:9\u201310; 1 Cor\u00EDntios 15:17; 2 Cor\u00EDntios 5:17; 2 Cor\u00EDntios 5:18\u201319; G\u00E1latas 5; Ef\u00E9sios 1:4\u20135; Ef\u00E9sios 1:7; Ef\u00E9sios 2:8\u20139; Filipenses 2:6\u20138; Tito 2:11\u201312; Hebreus 4:15; Hebreus 10:4; Tiago 2; 1 Pedro 2:24; 1 Tim\u00F3teo 2:5; Jo\u00E3o 1:14; Jo\u00E3o 3:16; Jo\u00E3o 10:18; Apocalipse 21"
    }
  ],
      "order": 21,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-01-editorial-note",
      "studyId": "track-05-study-01",
      "type": "EDITORIAL_NOTE",
      "title": "Referências",
      "iconKey": "referencias",
      "blocks": [
    {
        "type": "CALLOUT",
        title: null,
          "text": "| Elemento | Classificação |\n|---|---|\n| Objetivo, Introdução, os 12 blocos de desenvolvimento, Conclusão, perguntas de aplicação | OBSERVEDDIRECT / REORGANIZEDFROMSOURCE |\n| Texto Áureo (João 3:16, já citado pelo autor ao final) | OBSERVEDDIRECT |\n| Frase central do estudo | OBSERVEDVERBATIM — preservada integralmente como elemento próprio |\n| Pergunta Central, Verdade Prática, Journey Takeaway, Pratique Hoje, Registre no Diário, Ore, Em Grupo, redação da caixa de Cuidado na Interpretação | EDITORIALDERIVED |\n| Conecte (Gn 3:15 / sacrifícios / Cordeiro de Deus) | REORGANIZEDFROMSOURCE (conteúdo já presente na seção 3 do original, reagrupado) |\n| Bloco + Aprofunde (sacrifícios do AT, santificação, segurança e esperança) | REORGANIZEDFROMSOURCE — conteúdo original das seções 3, 11 e 12, deslocado do corpo principal para manter os 20–30 min |\n| Perguntas para Refletir | REORGANIZEDFROMSOURCE — 5 das 6 perguntas originais de \"Aplicação Final\"; a 6ª (\"Tenho anunciado...\") foi transformada em Pratique Hoje |\n| Continue a Jornada | RESOLVED — preservado como bloco genérico de continuidade, sem referência a estudo futuro específico |\n| ID e posição na trilha | RESOLVED — track-05-study-01, estudo 1 da Trilha 5 |\n| Nome do autor (exibição pública) | UNRESOLVED — aguardando autorização de Pb. Michael Batista da Silva |\n| Versão dos textos bíblicos | UNRESOLVED — revisão editorial necessária antes de publicação |\n| Revisão teológica para publicação | UNRESOLVED — necessária antes de publicação |\n\nStatus: DRAFT — integração estrutural concluída; publicação permanece não autorizada até o fechamento das pendências editoriais e teológicas."
    }
  ],
      "order": 22,
      "optional": true,
      "collapsible": true
    }
  ],
  "references": []
} as unknown as StudyContentPackage;
