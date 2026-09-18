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
      "title": "A OBRA REDENTORA DE CRISTO E O PLANO DA SALVAÇÃO",
      "summary": "A Bíblia apresenta a história humana marcada pelo amor de Deus, mas também pela ruptura causada pelo pecado. A submissão de Michael começa mostrando que o pecado separou o ser humano de Deus e que nenhuma pessoa consegue resolver essa condição por suas próprias obras.",
      "questionCentral": "Como Deus realizou, por meio de Jesus Cristo, a obra de salvação que o ser humano não poderia realizar por si mesmo?",
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
          "text": "João 3:16\nPorque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna."
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
          "type": "PARAGRAPH",
          "text": "A salvação é iniciativa da graça de Deus, realizada por meio de Jesus Cristo, recebida pela fé e refletida em uma vida transformada."
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
          "text": "João 3:16; Romanos 3:23-24; Efésios 2:8-9"
        },
        {
          "type": "PARAGRAPH",
          "text": "João 3:16; Romanos 3:23-24; Efésios 2:8-9"
        },
        {
          "type": "CALLOUT",
          "title": "Leitura Bíblica",
          "text": "João 3:16; Romanos 3:23-24; Efésios 2:8-9"
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
          "text": "A Bíblia apresenta a história humana marcada pelo amor de Deus, mas também pela ruptura causada pelo pecado. A submissão de Michael começa mostrando que o pecado separou o ser humano de Deus e que nenhuma pessoa consegue resolver essa condição por suas próprias obras."
        },
        {
          "type": "PARAGRAPH",
          "text": "A Bíblia apresenta a história humana marcada pelo amor de Deus, mas também pela ruptura causada pelo pecado. A submissão de Michael começa mostrando que o pecado separou o ser humano de Deus e que nenhuma pessoa consegue resolver essa condição por suas próprias obras."
        },
        {
          "type": "PARAGRAPH",
          "text": "A Bíblia apresenta a história humana marcada pelo amor de Deus, mas também pela ruptura causada pelo pecado. A submissão de Michael começa mostrando que o pecado separou o ser humano de Deus e que nenhuma pessoa consegue resolver essa condição por suas próprias obras."
        },
        {
          "type": "PARAGRAPH",
          "text": "A Bíblia apresenta a história humana marcada pelo amor de Deus, mas também pela ruptura causada pelo pecado. A submissão de Michael começa mostrando que o pecado separou o ser humano de Deus e que nenhuma pessoa consegue resolver essa condição por suas próprias obras."
        },
        {
          "type": "CALLOUT",
          "title": "Antes de entender",
          "text": "A Bíblia apresenta a história humana marcada pelo amor de Deus, mas também pela ruptura causada pelo pecado. A submissão de Michael começa mostrando que o pecado separou o ser humano de Deus e que nenhuma pessoa consegue resolver essa condição por suas próprias obras."
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
          "text": "É nesse cenário que o estudo apresenta o plano redentor de Deus. A obra de Jesus Cristo — sua vinda ao mundo, vida sem pecado, morte, ressurreição e exaltação — ocupa o centro da salvação. Por isso, antes de pensar no que o ser humano deve fazer, o estudo nos conduz a olhar para aquilo que Deus realizou em Cristo."
        },
        {
          "type": "PARAGRAPH",
          "text": "É nesse cenário que o estudo apresenta o plano redentor de Deus. A obra de Jesus Cristo — sua vinda ao mundo, vida sem pecado, morte, ressurreição e exaltação — ocupa o centro da salvação. Por isso, antes de pensar no que o ser humano deve fazer, o estudo nos conduz a olhar para aquilo que Deus realizou em Cristo."
        },
        {
          "type": "PARAGRAPH",
          "text": "É nesse cenário que o estudo apresenta o plano redentor de Deus. A obra de Jesus Cristo — sua vinda ao mundo, vida sem pecado, morte, ressurreição e exaltação — ocupa o centro da salvação. Por isso, antes de pensar no que o ser humano deve fazer, o estudo nos conduz a olhar para aquilo que Deus realizou em Cristo."
        },
        {
          "type": "PARAGRAPH",
          "text": "É nesse cenário que o estudo apresenta o plano redentor de Deus. A obra de Jesus Cristo — sua vinda ao mundo, vida sem pecado, morte, ressurreição e exaltação — ocupa o centro da salvação. Por isso, antes de pensar no que o ser humano deve fazer, o estudo nos conduz a olhar para aquilo que Deus realizou em Cristo."
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
          "type": "BULLET_LIST",
          "items": [
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
          ]
        },
        {
          "type": "CALLOUT",
          "title": "Leia",
          "text": "Romanos 3:23; Romanos 6:23; Isaías 59:2; Gênesis 3:15; João 1:14; Hebreus 4:15; Hebreus 10:4; 1 Pedro 2:24; Romanos 5:8; 1 Coríntios 15:17"
        },
        {
          "type": "SUBHEADING",
          "text": "Romanos 3:23; Romanos 6:23; Isaías 59:2; Gênesis 3:15; João 1:14; Hebreus 4:15; Hebreus 10:4; 1 Pedro 2:24; Romanos 5:8; 1 Coríntios 15:17"
        },
        {
          "type": "PARAGRAPH",
          "text": "Romanos 3:23; Romanos 6:23; Isaías 59:2; Gênesis 3:15; João 1:14; Hebreus 4:15; Hebreus 10:4; 1 Pedro 2:24; Romanos 5:8; 1 Coríntios 15:17"
        },
        {
          "type": "PARAGRAPH",
          "text": "Romanos 3:23; Romanos 6:23; Isaías 59:2; Gênesis 3:15; João 1:14; Hebreus 4:15; Hebreus 10:4; 1 Pedro 2:24; Romanos 5:8; 1 Coríntios 15:17"
        },
        {
          "type": "PARAGRAPH",
          "text": "Romanos 3:23; Romanos 6:23; Isaías 59:2; Gênesis 3:15; João 1:14; Hebreus 4:15; Hebreus 10:4; 1 Pedro 2:24; Romanos 5:8; 1 Coríntios 15:17"
        },
        {
          "type": "SUBHEADING",
          "text": "Romanos 3:23; Romanos 6:23; Isaías 59:2; Gênesis 3:15; João 1:14; Hebreus 4:15; Hebreus 10:4; 1 Pedro 2:24; Romanos 5:8; 1 Coríntios 15:17"
        },
        {
          "type": "PARAGRAPH",
          "text": "Romanos 3:23; Romanos 6:23; Isaías 59:2; Gênesis 3:15; João 1:14; Hebreus 4:15; Hebreus 10:4; 1 Pedro 2:24; Romanos 5:8; 1 Coríntios 15:17"
        },
        {
          "type": "PARAGRAPH",
          "text": "Romanos 3:23; Romanos 6:23; Isaías 59:2; Gênesis 3:15; João 1:14; Hebreus 4:15; Hebreus 10:4; 1 Pedro 2:24; Romanos 5:8; 1 Coríntios 15:17"
        },
        {
          "type": "CALLOUT",
          "title": "Leia",
          "text": "Romanos 3:23; Romanos 6:23; Isaías 59:2; Gênesis 3:15; João 1:14; Hebreus 4:15; Hebreus 10:4; 1 Pedro 2:24; Romanos 5:8; 1 Coríntios 15:17"
        },
        {
          "type": "SUBHEADING",
          "text": "Romanos 3:23; Romanos 6:23; Isaías 59:2; Gênesis 3:15; João 1:14; Hebreus 4:15; Hebreus 10:4; 1 Pedro 2:24; Romanos 5:8; 1 Coríntios 15:17"
        },
        {
          "type": "PARAGRAPH",
          "text": "Romanos 3:23; Romanos 6:23; Isaías 59:2; Gênesis 3:15; João 1:14; Hebreus 4:15; Hebreus 10:4; 1 Pedro 2:24; Romanos 5:8; 1 Coríntios 15:17"
        },
        {
          "type": "PARAGRAPH",
          "text": "Romanos 3:23; Romanos 6:23; Isaías 59:2; Gênesis 3:15; João 1:14; Hebreus 4:15; Hebreus 10:4; 1 Pedro 2:24; Romanos 5:8; 1 Coríntios 15:17"
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
          "type": "PARAGRAPH",
          "text": "O estudo mostra que todos pecaram, que o pecado produz culpa, morte e afastamento de Deus e que boas obras não conseguem apagar essa culpa."
        },
        {
          "type": "PARAGRAPH",
          "text": "O estudo mostra que todos pecaram, que o pecado produz culpa, morte e afastamento de Deus e que boas obras não conseguem apagar essa culpa."
        },
        {
          "type": "PARAGRAPH",
          "text": "O estudo mostra que todos pecaram, que o pecado produz culpa, morte e afastamento de Deus e que boas obras não conseguem apagar essa culpa."
        },
        {
          "type": "CALLOUT",
          "title": "O pecado criou uma separação que o ser humano não consegue resolver sozinho.",
          "text": "O estudo mostra que todos pecaram, que o pecado produz culpa, morte e afastamento de Deus e que boas obras não conseguem apagar essa culpa."
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
          "text": "A submissão apresenta a salvação não como improviso, mas como propósito de Deus. As promessas do Antigo Testamento apontavam para a vinda do Messias, e os sacrifícios mostravam a necessidade de expiação sem serem a solução definitiva para o pecado. Hebreus 10:4 destaca que o sangue de touros e bodes não remove pecados; esses sacrifícios apontavam para um sacrifício perfeito. Em Cristo, as figuras e promessas do Antigo Testamento encontram seu cumprimento."
        },
        {
          "type": "PARAGRAPH",
          "text": "A submissão apresenta a salvação não como improviso, mas como propósito de Deus. As promessas do Antigo Testamento apontavam para a vinda do Messias, e os sacrifícios mostravam a necessidade de expiação sem serem a solução definitiva para o pecado. Hebreus 10:4 destaca que o sangue de touros e bodes não remove pecados; esses sacrifícios apontavam para um sacrifício perfeito. Em Cristo, as figuras e promessas do Antigo Testamento encontram seu cumprimento."
        },
        {
          "type": "PARAGRAPH",
          "text": "A submissão apresenta a salvação não como improviso, mas como propósito de Deus. As promessas do Antigo Testamento apontavam para a vinda do Messias, e os sacrifícios mostravam a necessidade de expiação sem serem a solução definitiva para o pecado. Hebreus 10:4 destaca que o sangue de touros e bodes não remove pecados; esses sacrifícios apontavam para um sacrifício perfeito. Em Cristo, as figuras e promessas do Antigo Testamento encontram seu cumprimento."
        },
        {
          "type": "SUBHEADING",
          "text": "A submissão apresenta a salvação não como improviso, mas como propósito de Deus. As promessas do Antigo Testamento apontavam para a vinda do Messias, e os sacrifícios mostravam a necessidade de expiação sem serem a solução definitiva para o pecado. Hebreus 10:4 destaca que o sangue de touros e bodes não remove pecados; esses sacrifícios apontavam para um sacrifício perfeito. Em Cristo, as figuras e promessas do Antigo Testamento encontram seu cumprimento."
        },
        {
          "type": "PARAGRAPH",
          "text": "A submissão apresenta a salvação não como improviso, mas como propósito de Deus. As promessas do Antigo Testamento apontavam para a vinda do Messias, e os sacrifícios mostravam a necessidade de expiação sem serem a solução definitiva para o pecado. Hebreus 10:4 destaca que o sangue de touros e bodes não remove pecados; esses sacrifícios apontavam para um sacrifício perfeito. Em Cristo, as figuras e promessas do Antigo Testamento encontram seu cumprimento."
        },
        {
          "type": "PARAGRAPH",
          "text": "A submissão apresenta a salvação não como improviso, mas como propósito de Deus. As promessas do Antigo Testamento apontavam para a vinda do Messias, e os sacrifícios mostravam a necessidade de expiação sem serem a solução definitiva para o pecado. Hebreus 10:4 destaca que o sangue de touros e bodes não remove pecados; esses sacrifícios apontavam para um sacrifício perfeito. Em Cristo, as figuras e promessas do Antigo Testamento encontram seu cumprimento."
        },
        {
          "type": "CALLOUT",
          "title": "O plano de redenção foi anunciado e apontava para o sacrifício perfeito de Cristo.",
          "text": "A submissão apresenta a salvação não como improviso, mas como propósito de Deus. As promessas do Antigo Testamento apontavam para a vinda do Messias, e os sacrifícios mostravam a necessidade de expiação sem serem a solução definitiva para o pecado. Hebreus 10:4 destaca que o sangue de touros e bodes não remove pecados; esses sacrifícios apontavam para um sacrifício perfeito. Em Cristo, as figuras e promessas do Antigo Testamento encontram seu cumprimento."
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
          "type": "PARAGRAPH",
          "text": "A encarnação revela o Filho de Deus entrando na história humana. O estudo destaca que Jesus viveu sem pecado e, por isso, podia oferecer-se pelos pecadores."
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
          "text": "Michael apresenta a morte de Cristo como voluntária, sacrificial e substitutiva. Em seguida, mostra a ressurreição como vitória sobre a morte e fundamento da esperança cristã."
        },
        {
          "type": "PARAGRAPH",
          "text": "Michael apresenta a morte de Cristo como voluntária, sacrificial e substitutiva. Em seguida, mostra a ressurreição como vitória sobre a morte e fundamento da esperança cristã."
        },
        {
          "type": "PARAGRAPH",
          "text": "Michael apresenta a morte de Cristo como voluntária, sacrificial e substitutiva. Em seguida, mostra a ressurreição como vitória sobre a morte e fundamento da esperança cristã."
        },
        {
          "type": "CALLOUT",
          "title": "A cruz e a ressurreição estão no centro da mensagem do Evangelho.",
          "text": "Michael apresenta a morte de Cristo como voluntária, sacrificial e substitutiva. Em seguida, mostra a ressurreição como vitória sobre a morte e fundamento da esperança cristã."
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
          "type": "SUBHEADING",
          "text": "O estudo explica que salvação envolve perdão, justificação, nova vida e esperança eterna. Ela não é comprada nem conquistada por mérito humano; é recebida pela graça, mediante a fé em Cristo."
        },
        {
          "type": "PARAGRAPH",
          "text": "O estudo explica que salvação envolve perdão, justificação, nova vida e esperança eterna. Ela não é comprada nem conquistada por mérito humano; é recebida pela graça, mediante a fé em Cristo."
        },
        {
          "type": "SUBHEADING",
          "text": "O estudo explica que salvação envolve perdão, justificação, nova vida e esperança eterna. Ela não é comprada nem conquistada por mérito humano; é recebida pela graça, mediante a fé em Cristo."
        },
        {
          "type": "PARAGRAPH",
          "text": "O estudo explica que salvação envolve perdão, justificação, nova vida e esperança eterna. Ela não é comprada nem conquistada por mérito humano; é recebida pela graça, mediante a fé em Cristo."
        },
        {
          "type": "SUBHEADING",
          "text": "O estudo explica que salvação envolve perdão, justificação, nova vida e esperança eterna. Ela não é comprada nem conquistada por mérito humano; é recebida pela graça, mediante a fé em Cristo."
        },
        {
          "type": "PARAGRAPH",
          "text": "O estudo explica que salvação envolve perdão, justificação, nova vida e esperança eterna. Ela não é comprada nem conquistada por mérito humano; é recebida pela graça, mediante a fé em Cristo."
        },
        {
          "type": "PARAGRAPH",
          "text": "O estudo explica que salvação envolve perdão, justificação, nova vida e esperança eterna. Ela não é comprada nem conquistada por mérito humano; é recebida pela graça, mediante a fé em Cristo."
        },
        {
          "type": "CALLOUT",
          "title": "Salvação é graça recebida pela fé.",
          "text": "O estudo explica que salvação envolve perdão, justificação, nova vida e esperança eterna. Ela não é comprada nem conquistada por mérito humano; é recebida pela graça, mediante a fé em Cristo."
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
          "type": "PARAGRAPH",
          "text": "A submissão diferencia arrependimento de simples tristeza e apresenta a fé como confiança real em Cristo como Senhor e Salvador. Essa fé deve produzir frutos na vida."
        },
        {
          "type": "PARAGRAPH",
          "text": "A submissão diferencia arrependimento de simples tristeza e apresenta a fé como confiança real em Cristo como Senhor e Salvador. Essa fé deve produzir frutos na vida."
        },
        {
          "type": "PARAGRAPH",
          "text": "A submissão diferencia arrependimento de simples tristeza e apresenta a fé como confiança real em Cristo como Senhor e Salvador. Essa fé deve produzir frutos na vida."
        },
        {
          "type": "PARAGRAPH",
          "text": "A submissão diferencia arrependimento de simples tristeza e apresenta a fé como confiança real em Cristo como Senhor e Salvador. Essa fé deve produzir frutos na vida."
        },
        {
          "type": "CALLOUT",
          "title": "Arrependimento e fé são a resposta ao Evangelho.",
          "text": "A submissão diferencia arrependimento de simples tristeza e apresenta a fé como confiança real em Cristo como Senhor e Salvador. Essa fé deve produzir frutos na vida."
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
          "title": "A graça transforma a maneira de viver.",
          "text": "A graça não torna o pecado irrelevante. O estudo afirma que quem recebe a graça é chamado à gratidão, santidade e boas obras como fruto da salvação, e não como causa dela."
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
          "items": [
            "O pecado criou separação entre Deus e o ser humano, mas Cristo veio para reconciliar. Em Cristo, o pecador recebe perdão, acesso à presença de Deus e paz com o Criador. Essa confiança não se apoia na perfeição humana, mas na obra perfeita de Jesus. A submissão destaca ainda que Cristo é o único mediador entre Deus e os homens."
          ]
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
          "text": "A salvação não termina no momento da conversão. O salvo é chamado a crescer em conformidade com Cristo. Michael destaca que o Espírito Santo capacita o crente, que a Palavra de Deus é fundamental e que o cristão deve cultivar oração, estudar e praticar as Escrituras, buscar comunhão com outros irmãos e testemunhar de Cristo ao mundo. A santificação não é conquistada pela força humana isoladamente; o cristão depende diariamente da graça e da ação do Espírito Santo."
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
          "title": "A esperança da salvação aponta para a volta de Cristo e para a plenitude futura da redenção.",
          "text": "A salvação produz uma esperança que vai além desta vida. O cristão aguarda a volta de Cristo e a plenitude da redenção. Apocalipse 21 apresenta a esperança de novos céus e nova terra, e a submissão lembra a promessa de um futuro sem morte, dor e sofrimento para os Seus. Essa esperança não depende das circunstâncias deste mundo: Cristo venceu a morte e garante a esperança da vida eterna."
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
          "type": "PARAGRAPH",
          "text": "A aplicação original de Michael conduz o leitor a examinar sua resposta pessoal ao Evangelho. As seis perguntas abaixo são preservadas como núcleo prático do estudo."
        },
        {
          "type": "PARAGRAPH",
          "text": "A aplicação original de Michael conduz o leitor a examinar sua resposta pessoal ao Evangelho. As seis perguntas abaixo são preservadas como núcleo prático do estudo."
        },
        {
          "type": "CALLOUT",
          "title": "Aplique",
          "text": "A aplicação original de Michael conduz o leitor a examinar sua resposta pessoal ao Evangelho. As seis perguntas abaixo são preservadas como núcleo prático do estudo."
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
          "items": [
            "Eu reconheço que sou pecador e que preciso da graça de Deus?",
            "Minha confiança para a salvação está em Cristo ou em minhas próprias obras?",
            "Tenho verdadeiramente me arrependido dos meus pecados?",
            "Minha fé em Cristo tem produzido frutos em minha vida?",
            "Estou vivendo diariamente em comunhão com Deus?",
            "Tenho anunciado a outras pessoas aquilo que Cristo fez por mim?"
          ]
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
          "text": "A obra redentora de Cristo é o centro da mensagem do Evangelho. O pecado trouxe separação, culpa e morte, mas Deus revelou seu plano de salvação em Jesus.\n\nCristo veio ao mundo, viveu sem pecado, morreu pelos pecadores, ressuscitou e venceu a morte. A salvação é recebida pela graça, mediante a fé, e chama o ser humano ao arrependimento e o cristão a uma vida de santidade e transformação.\n\nA confiança do salvo não está em suas próprias obras, mas na obra perfeita de Cristo. A cruz revela a justiça e o amor de Deus, e a ressurreição revela a vitória de Cristo.\n\nO Evangelho anuncia que há perdão para o pecador arrependido, esperança para quem está perdido, reconciliação para quem está afastado de Deus e vida eterna para aquele que crê em Jesus Cristo.\n\nPor isso, a salvação não deve ser tratada como algo secundário. O cristão é chamado a confiar plenamente na obra de Cristo, abandonar o pecado, buscar uma vida de obediência e anunciar a outros a mensagem da salvação."
        },
        {
          "type": "PARAGRAPH",
          "text": "A obra redentora de Cristo é o centro da mensagem do Evangelho. O pecado trouxe separação, culpa e morte, mas Deus revelou seu plano de salvação em Jesus.\n\nCristo veio ao mundo, viveu sem pecado, morreu pelos pecadores, ressuscitou e venceu a morte. A salvação é recebida pela graça, mediante a fé, e chama o ser humano ao arrependimento e o cristão a uma vida de santidade e transformação.\n\nA confiança do salvo não está em suas próprias obras, mas na obra perfeita de Cristo. A cruz revela a justiça e o amor de Deus, e a ressurreição revela a vitória de Cristo.\n\nO Evangelho anuncia que há perdão para o pecador arrependido, esperança para quem está perdido, reconciliação para quem está afastado de Deus e vida eterna para aquele que crê em Jesus Cristo.\n\nPor isso, a salvação não deve ser tratada como algo secundário. O cristão é chamado a confiar plenamente na obra de Cristo, abandonar o pecado, buscar uma vida de obediência e anunciar a outros a mensagem da salvação."
        },
        {
          "type": "PARAGRAPH",
          "text": "A obra redentora de Cristo é o centro da mensagem do Evangelho. O pecado trouxe separação, culpa e morte, mas Deus revelou seu plano de salvação em Jesus.\n\nCristo veio ao mundo, viveu sem pecado, morreu pelos pecadores, ressuscitou e venceu a morte. A salvação é recebida pela graça, mediante a fé, e chama o ser humano ao arrependimento e o cristão a uma vida de santidade e transformação.\n\nA confiança do salvo não está em suas próprias obras, mas na obra perfeita de Cristo. A cruz revela a justiça e o amor de Deus, e a ressurreição revela a vitória de Cristo.\n\nO Evangelho anuncia que há perdão para o pecador arrependido, esperança para quem está perdido, reconciliação para quem está afastado de Deus e vida eterna para aquele que crê em Jesus Cristo.\n\nPor isso, a salvação não deve ser tratada como algo secundário. O cristão é chamado a confiar plenamente na obra de Cristo, abandonar o pecado, buscar uma vida de obediência e anunciar a outros a mensagem da salvação."
        },
        {
          "type": "CALLOUT",
          "title": "Conclusão",
          "text": "A obra redentora de Cristo é o centro da mensagem do Evangelho. O pecado trouxe separação, culpa e morte, mas Deus revelou seu plano de salvação em Jesus.\n\nCristo veio ao mundo, viveu sem pecado, morreu pelos pecadores, ressuscitou e venceu a morte. A salvação é recebida pela graça, mediante a fé, e chama o ser humano ao arrependimento e o cristão a uma vida de santidade e transformação.\n\nA confiança do salvo não está em suas próprias obras, mas na obra perfeita de Cristo. A cruz revela a justiça e o amor de Deus, e a ressurreição revela a vitória de Cristo.\n\nO Evangelho anuncia que há perdão para o pecador arrependido, esperança para quem está perdido, reconciliação para quem está afastado de Deus e vida eterna para aquele que crê em Jesus Cristo.\n\nPor isso, a salvação não deve ser tratada como algo secundário. O cristão é chamado a confiar plenamente na obra de Cristo, abandonar o pecado, buscar uma vida de obediência e anunciar a outros a mensagem da salvação."
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
          "type": "PARAGRAPH",
          "text": "1. Releia João 3:16, Romanos 3:23-24 e Efésios 2:8-9, observando o que cada texto mostra sobre a necessidade humana e a iniciativa de Deus.\n2. Retome as seis perguntas da aplicação final e identifique qual delas mais exige uma resposta prática hoje.\n3. Ore pedindo que sua confiança permaneça na obra de Cristo e que sua fé produza frutos visíveis em sua vida.\n4. Compartilhe com alguém, de forma simples, aquilo que o estudo apresenta sobre o que Cristo fez pela salvação."
        },
        {
          "type": "PARAGRAPH",
          "text": "1. Releia João 3:16, Romanos 3:23-24 e Efésios 2:8-9, observando o que cada texto mostra sobre a necessidade humana e a iniciativa de Deus.\n2. Retome as seis perguntas da aplicação final e identifique qual delas mais exige uma resposta prática hoje.\n3. Ore pedindo que sua confiança permaneça na obra de Cristo e que sua fé produza frutos visíveis em sua vida.\n4. Compartilhe com alguém, de forma simples, aquilo que o estudo apresenta sobre o que Cristo fez pela salvação."
        },
        {
          "type": "CALLOUT",
          "title": "Para continuar",
          "text": "1. Releia João 3:16, Romanos 3:23-24 e Efésios 2:8-9, observando o que cada texto mostra sobre a necessidade humana e a iniciativa de Deus.\n2. Retome as seis perguntas da aplicação final e identifique qual delas mais exige uma resposta prática hoje.\n3. Ore pedindo que sua confiança permaneça na obra de Cristo e que sua fé produza frutos visíveis em sua vida.\n4. Compartilhe com alguém, de forma simples, aquilo que o estudo apresenta sobre o que Cristo fez pela salvação."
        }
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
          "text": "O homem não poderia chegar até Deus por suas próprias forças; por isso, Deus veio até o homem na pessoa de Jesus Cristo, morreu pelos nossos pecados, ressuscitou para nossa justificação e oferece gratuitamente a salvação a todo aquele que crê."
        },
        {
          "type": "PARAGRAPH",
          "text": "O homem não poderia chegar até Deus por suas próprias forças; por isso, Deus veio até o homem na pessoa de Jesus Cristo, morreu pelos nossos pecados, ressuscitou para nossa justificação e oferece gratuitamente a salvação a todo aquele que crê."
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
          "type": "BULLET_LIST",
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
          ]
        },
        {
          "type": "CALLOUT",
          "title": "Referências",
          "text": "Gênesis 3; Gênesis 3:15; Isaías 53; Isaías 59:2; Eclesiastes 7:20; João 1:14; João 3:16; João 10:18; Romanos 3:23; Romanos 3:23-24; Romanos 3:24; Romanos 5:1; Romanos 5:8; Romanos 6:23; Romanos 8:1; Romanos 10:9-10; 1 Coríntios 15:17; 2 Coríntios 5:17; 2 Coríntios 5:18-19; Gálatas 5; Efésios 1:4-5; Efésios 1:7; Efésios 2:8-9; Filipenses 2:6-8; 1 Timóteo 2:5; Tito 2:11-12; Hebreus 4:15; Hebreus 10:4; Tiago 2; 1 Pedro 2:24; Apocalipse 21"
        }
      ],
      "order": 22,
      "optional": true,
      "collapsible": true
    }
  ],
  "references": []
} as unknown as StudyContentPackage;
