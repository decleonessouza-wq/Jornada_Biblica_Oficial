/* eslint-disable max-len, quote-props */
/**
 * P17-P2-A11 — Controlled B01 Track 1 DRAFT source integration.
 *
 * Generated exclusively from the 18 approved P17-P2-A10-R2-R1-R1
 * read-only candidates. This module is intentionally standalone: it is not
 * imported or exported by runtime/UI code in P17-P2-A11.
 */

type Track01DraftStudy = Readonly<{
  id: string;
  trackId: string;
  number: number;
  slug: string;
  editorialStatus: string;
  published: boolean;
  runtimeEligible: boolean;
  nextStudyId: string | null;
  terminal: boolean;
  technicalProfile: string;
  [key: string]: unknown;
}>;

type Track01DraftContinuity = Readonly<{
  expectedNextStudyNumber: number | null;
  detectedNextStudyNumber: number | null;
  nextStudyId: string | null;
  terminal: boolean;
  evidenceKind: string;
  valid: boolean;
}>;

type Track01DraftQuality = Readonly<{
  forbiddenControlCharCount: number;
  pageHeaderLeakCount: number;
  questionSemanticLeakCount: number;
  objectiveSemanticLeakCount: number;
  continueAppendixLeakCount: number;
  profileMarkerSetMatch: boolean;
  structuredSectionCountMatch: boolean;
  nextStudyIdValid: boolean;
  [key: string]: unknown;
}>;

type Track01TerminalCompletion = Readonly<{
  sourceHeading: string;
  contentText: string;
  trackCompleted: number;
  completedStudyCount: number;
  nextTrackId: string;
  nextTrackTitle: string;
}>;

type Track01DraftCandidatePayload = Readonly<{
  schema: string;
  readinessOnly: boolean;
  runtimePayload: boolean;
  batch: Readonly<{ id: string; technicalProfile: string; [key: string]: unknown }>;
  study: Track01DraftStudy;
  sections: readonly Readonly<{ key: string; type: string; order: number; sourceHeading: string; contentText: string }>[];
  terminalCompletion: Track01TerminalCompletion | null;
  continuity: Track01DraftContinuity;
  quality: Track01DraftQuality;
  [key: string]: unknown;
}>;

export type Track01DraftCandidateSource = Readonly<{
  approvedCandidateSha256: string;
  payload: Track01DraftCandidatePayload;
}>;

export const TRACK_01_DRAFT_BATCH_INTEGRATION = {
  batchId: "B01_TRACK_01",
  sourceProof: "P17-P2-A10-R2-R1-R1",
  technicalProfile: "TRACK_1_ORIGINAL_V1",
  editorialStatus: "DRAFT",
  published: false,
  runtimeEligible: false,
  studyCount: 18,
  candidates: [
    {
      approvedCandidateSha256: "405C70805C90AC317DDE1A2AD64483D374881FB988C29CBC13C13925F94F137E",
      payload: {
        "schema": "P17-P2-A10-R2-R1-R1_TRACK1_BATCH_SIMULATION_CANDIDATE_V1",
        "readinessOnly": true,
        "runtimePayload": false,
        "batch": {
          "id": "B01_TRACK_01",
          "sequence": 1,
          "trackNumber": 1,
          "expectedTrackStudyCount": 18,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "source": {
          "relativePath": "trilha_01\\Biblia_Jornada_Estudo_01_No_Principio_Por_Que_Deus_Criou.pdf",
          "bytes": 945472,
          "sha256": "D6DF2E1877A4C43637A655543E6E544FD21B7874D5ED92B538BF4517A111CF78",
          "pageCount": 9,
          "extractedCharacterCount": 11376,
          "expectedExtractedCharacterCount": 11376,
          "extractedTextSha256": "D11B455A48447EA7D0B157ABE28664BFB99A156404EAC58273BA628A483F55E3",
          "a5NormalizedTextSha256": "FBD3BE37A0EDF88E6358A694225A74919F55FDC24AADBFE47E11A4038E14B3C9"
        },
        "study": {
          "id": "track-01-study-01",
          "trackId": "track-01",
          "number": 1,
          "slug": "no-principio-por-que-deus-criou",
          "questionCentral": "Se a história da Bíblia começa na criação, o que Gênesis 1–2 nos ensina sobre Deus, sobre o ser humano e sobre o propósito da nossa existência?",
          "primaryTexts": "Gênesis 1–2",
          "complementaryReadings": "Salmos 8 • João 1:1–3 • Colossenses 1:15–17 • Apocalipse 4:11",
          "estimatedTime": "10–15 minutos",
          "objective": "Ao final, queremos compreender quatro verdades simples e importantes: • Deus é o Criador de todas as coisas. • A criação não surgiu sem propósito. • O ser humano ocupa um lugar especial na criação porque foi feito à imagem de Deus. • A Bíblia começa mostrando vida, ordem, bondade e comunhão antes de apresentar o problema do pecado. Esta primeira verdade é importante porque todo o restante da Bíblia parte dela.",
          "openingTakeaway": "",
          "editorialStatus": "DRAFT",
          "published": false,
          "runtimeEligible": false,
          "nextStudyId": "track-01-study-02",
          "terminal": false,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "sourceDeclaredProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "expectedProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkerCount": 12,
        "structuredSectionCount": 10,
        "sections": [
          {
            "key": "LEIA",
            "type": "READ",
            "order": 1,
            "sourceHeading": "LEIA",
            "contentText": "Leia Gênesis capítulos 1 e 2 com calma.\nNão tente responder tudo imediatamente. Primeiro observe o que o\npróprio texto apresenta.\nGênesis não começa falando sobre Abraão, Israel, Moisés ou a\nIgreja.\nA Bíblia começa com uma declaração muito maior:\nDeus já estava lá.\nAntes de existir céu, terra, animais, plantas ou seres humanos, Deus\né apresentado como aquele que cria.\nEssa é a primeira verdade que a Bíblia coloca diante de nós."
          },
          {
            "key": "OBSERVE",
            "type": "OBSERVE",
            "order": 2,
            "sourceHeading": "OBSERVE NO TEXTO",
            "contentText": "1. Quem aparece agindo desde o início?\n2. O que acontece quando Deus fala?\n3. Quantas vezes o texto mostra que aquilo que Deus fez era bom?\n4. O que há de diferente na criação do ser humano?\n5. Que responsabilidade Deus entrega ao homem e à mulher?\n6. Deus coloca o homem apenas para descansar no jardim ou também lhe\ndá trabalho e responsabilidade?\n7. Como é a relação entre Deus, o ser humano e a criação antes da entrada\ndo pecado?\n8. O que o descanso do sétimo dia mostra sobre a obra que havia sido\nrealizada?\nAntes de continuar\nTente responder essas perguntas diretamente a partir dos capítulos 1\ne 2."
          },
          {
            "key": "ENTENDA",
            "type": "UNDERSTAND",
            "order": 3,
            "sourceHeading": "ENTENDA",
            "contentText": "1. Deus é o ponto de partida de tudo\n“No princípio, Deus...” — Gênesis 1:1\nA Bíblia não começa tentando provar a existência de Deus. Ela\ncomeça apresentando Deus como o Criador.\nEle cria os céus e a terra. Cria a luz. Organiza os espaços. Faz surgir\na vegetação. Cria os luminares. Cria os animais. E finalmente cria o\nser humano.\nExiste uma sequência. O que estava sem forma vai recebendo\nordem. O que estava vazio vai sendo preenchido.\nMensagem principal\nO mundo não é apresentado na Bíblia como algo sem direção. A\ncriação está debaixo da vontade e da ação de Deus.\nApocalipse 4:11 reforça essa ideia ao declarar que todas as coisas\nexistem porque Deus as criou segundo sua vontade.\n2. Deus não criou porque precisava de alguma\ncoisa\nÀs vezes ouvimos a ideia de que Deus criou o homem porque estava\nsozinho.\nO texto não diz isso\nGênesis não afirma que Deus criou porque estava sozinho. A Bíblia\ntambém não apresenta Deus como alguém incompleto, que\nprecisava criar pessoas para preencher uma falta.\nAtos 17:24–25 ensina que Deus não depende do homem para\nreceber aquilo que lhe falta; pelo contrário, é Ele quem dá vida e\ntodas as coisas.\nPodemos afirmar\nDeus criou porque quis criar. E aquilo que Ele criou tinha propósito\ndiante dele.\n3. A criação é apresentada como boa\nDurante Gênesis 1 encontramos repetidamente uma afirmação:\nDeus viu que era bom.\nE depois da criação do ser humano, Gênesis 1:31 diz que Deus viu\ntudo o que havia feito e considerou aquilo muito bom.\nIsso será extremamente importante no próximo estudo. Porque\nquando chegarmos ao pecado, ao sofrimento e à morte,\nprecisaremos lembrar que essas coisas não aparecem em Gênesis 1\ncomo parte da bondade original da criação.\nA história começa com\nVida • ordem • provisão • beleza • relacionamento • responsabilidade •\ncomunhão com Deus\n4. O ser humano recebe um lugar especial\nExiste uma diferença importante quando o texto chega à criação do\nhomem e da mulher. Em Gênesis 1:26–27, Deus declara que o ser\nhumano seria criado à sua imagem.\nIsso não significa que o homem seja Deus. Também não significa\nsimplesmente que Deus tenha um corpo semelhante ao nosso.\nO próprio texto mostra algumas consequências dessa posição\nespecial: homem e mulher recebem responsabilidade sobre a\ncriação, a missão de serem fecundos e o dever de cuidar e\nadministrar aquilo que Deus colocou diante deles.\nUma observação importante\nGênesis 2 mostra o homem sendo colocado no jardim para cultivá-lo\ne guardá-lo. Portanto, trabalho e responsabilidade já existiam antes\ndo pecado.\n5. A vida humana possui dignidade\nSe homem e mulher foram criados à imagem de Deus, então o valor\nda vida humana não depende apenas de dinheiro, posição,\nconhecimento, idade, capacidade física, profissão, aparência ou\nreconhecimento das outras pessoas.\nExiste uma dignidade ligada ao próprio ato criador de Deus. Gênesis\n1:27 também apresenta homem e mulher dentro dessa mesma\ndeclaração da imagem de Deus.\n6. O homem não foi criado para viver\nindependente de Deus\nO primeiro ser humano recebe de Deus vida, lugar, alimento,\nmissão, relacionamento e limites.\nVerdade que seguirá por toda a Bíblia\nA criatura não ocupa o lugar do Criador.\nO homem possui autoridade sobre a criação, mas essa autoridade\nfoi recebida. Ele administra aquilo que pertence, em última análise,\na Deus."
          },
          {
            "key": "CONECTE",
            "type": "CONNECT",
            "order": 4,
            "sourceHeading": "CONECTE AS ESCRITURAS",
            "contentText": "Gênesis não fica isolado no começo da Bíblia. Outros livros voltam\nao tema da criação.\nGênesis 1–2\nDeus cria todas as coisas e faz o ser humano à\nsua imagem.\nSalmos 8\nMesmo diante da grandeza da criação, Deus\nconcede ao homem uma posição de\nresponsabilidade.\nJoão 1:1–3\nJoão apresenta o Verbo existente desde o\nprincípio e afirma que todas as coisas foram\nfeitas por meio dele.\nColossenses\n1:15–17\nCristo é apresentado em relação direta com a\ncriação: todas as coisas foram criadas por meio\ndele e para ele.\nApocalipse 4:11\nNo último livro da Bíblia, Deus continua sendo\nadorado como aquele que criou todas as coisas.\nPerceba a conexão\nA Bíblia começa com o Criador e termina com a criação adorando o\nCriador.\nCOMO ESTE\nESTUDO SE\nRELACIONA COM\nCRISTO?\nAqui não precisamos criar uma interpretação escondida ou\nsimbólica. O próprio Novo Testamento faz essa ligação.\nJoão 1:1–3 afirma que todas as coisas foram feitas por meio do\nVerbo. Colossenses 1:15–17 relaciona diretamente Cristo com a\ncriação.\nPortanto, segundo o Novo Testamento, Jesus não aparece apenas\nmuito depois, em Mateus. Cristo está relacionado à própria obra da\ncriação.\nConexão central\nAquele que encontraremos no Evangelho como Salvador não está\nseparado da história que começou em Gênesis.\nO QUE\nAPRENDEMOS\nSOBRE DEUS?\n• Deus existe antes da criação.\n• Possui poder para criar.\n• Estabelece ordem.\n• Dá vida e provê.\n• Determina limites.\n• Considera boa sua criação.\n• Dá responsabilidade ao ser humano.\n• É diferente e maior do que tudo aquilo que criou.\nResumo\nDeus não faz parte da criação. Ele é o Criador dela.\nO QUE\nAPRENDEMOS\nSOBRE O SER\nHUMANO?\n• Foi criado por Deus.\n• Não é resultado de si mesmo.\n• Foi feito à imagem de Deus.\n• Recebeu dignidade e responsabilidade.\n• Foi criado para viver em relação com Deus.\n• Recebeu a missão de cuidar da criação.\n• Não recebeu liberdade para ocupar o lugar do Criador.\nUma pergunta melhor\nEm vez de perguntar apenas “O que eu quero fazer da minha vida?”,\nGênesis nos leva a perguntar também: “Para que Deus me deu a\nvida?”"
          },
          {
            "key": "APLIQUE",
            "type": "APPLY",
            "order": 5,
            "sourceHeading": "APLIQUE À VIDA",
            "contentText": "1. Minha vida tem valor\nSeu valor mais profundo não começa na opinião das outras\npessoas. Gênesis nos apresenta o ser humano como criação de\nDeus e portador de uma dignidade especial.\n2. Minha vida também envolve\nresponsabilidade\nDeus não colocou o homem no jardim apenas para receber. Ele\ntambém lhe deu algo para fazer. Uma vida com propósito não é\napenas uma vida cheia de benefícios. Também envolve\nresponsabilidade.\n3. Eu não sou o centro de tudo\nA ordem importa\nA Bíblia começa com “No princípio, Deus...” e não com “No princípio, o\nhomem...”.\nA vida bíblica começa quando entendemos que Deus ocupa o lugar\nde Deus e nós ocupamos o lugar de criaturas amadas e\nresponsáveis diante dele.\n4. A criação merece cuidado\nSe o mundo pertence ao Criador e o homem recebeu\nresponsabilidade sobre ele, não devemos tratar aquilo que Deus\ncriou como se não tivesse valor algum. Cuidar, administrar e usar\ncom responsabilidade também fazem parte da visão apresentada\nem Gênesis."
          },
          {
            "key": "REFLECTION_QUESTIONS",
            "type": "REFLECTION_QUESTIONS",
            "order": 6,
            "sourceHeading": "PARA REFLETIR",
            "contentText": "1. O que mais chamou sua atenção em Gênesis 1–2?\n2. O que muda quando reconheço Deus como Criador?\n3. Tenho enxergado minha vida como algo sem propósito ou como uma\nvida recebida de Deus?\n4. Como tenho cuidado das responsabilidades que Deus colocou diante de\nmim?\n5. Minha ideia de valor pessoal depende mais de Deus ou da opinião das\noutras pessoas?\n6. Em quais áreas tenho tentado viver como se não dependesse do Criador?"
          },
          {
            "key": "JOURNAL_PROMPT",
            "type": "JOURNAL_PROMPT",
            "order": 7,
            "sourceHeading": "REGISTRAR NO DIÁRIO",
            "contentText": "Se minha vida veio de Deus, qual responsabilidade preciso tratar com\nmais seriedade hoje?"
          },
          {
            "key": "PRAYER",
            "type": "PRAYER",
            "order": 8,
            "sourceHeading": "ORE",
            "contentText": "Senhor, obrigado pela vida e por tudo aquilo que criaste. Ajuda-me a\nreconhecer que Tu és o Criador e que minha vida não existe sem\npropósito. Ensina-me a cuidar bem daquilo que colocaste em minhas\nmãos e a viver de maneira que reconheça tua vontade. Amém."
          },
          {
            "key": "KEEP",
            "type": "KEEP",
            "order": 9,
            "sourceHeading": "PARA GUARDAR",
            "contentText": "Gênesis 1:27\nLeia e marque esse versículo em sua Bíblia. Ele resume uma das\ngrandes verdades deste estudo: o ser humano foi criado por Deus e\nrecebeu uma dignidade especial por ter sido feito à sua imagem.\nADICIONAR AOS FAVORITOS"
          },
          {
            "key": "CONTINUE_JOURNEY",
            "type": "CONTINUE_JOURNEY",
            "order": 10,
            "sourceHeading": "CONTINUE SUA JORNADA",
            "contentText": "Até aqui encontramos uma criação descrita\ncomo muito boa.\nMas basta olhar ao nosso redor para perceber que o mundo atual\npossui dor, violência, injustiça, doença, separação, pecado e morte.\nEntão surge uma pergunta inevitável\nSe Deus criou tudo bom, o que aconteceu?\nPróximo estudo\n02 — Quando tudo mudou:\na entrada do pecado\nTexto principal\nGênesis 3\nNele começaremos a compreender por que o restante da Bíblia\npassa a falar de redenção, promessa e salvação."
          }
        ],
        "terminalCompletion": null,
        "sourceAppendix": {
          "heading": "Referências bíblicas utilizadas",
          "contentText": "Texto principal: Gênesis 1–2\nConexões principais: Salmos 8; João 1:1–3; Colossenses 1:15–17; Apocalipse\n4:11\nReferência complementar: Atos 17:24–25\nNota editorial\nEste estudo procura permanecer nas afirmações diretas das\npassagens utilizadas. A relação entre Cristo e a criação não foi\napresentada como interpretação criada pelo estudo: ela é afirmada\ndiretamente em João 1:1–3 e Colossenses 1:15–17. Também evitamos\nafirmar motivos que Gênesis não apresenta, como a ideia popular de\nque “Deus criou o homem porque estava sozinho”.\nFim do Estudo 01"
        },
        "normalization": {
          "removedForbiddenControlCharCount": 1,
          "removedPageHeaderLineCount": 36
        },
        "canonicalSource": {
          "lineCount": 267,
          "sha256": "DAA0BD564C6E5D78174B6E15081B9C4B650985931FD5D711440FD9D65DE3E115",
          "preambleLines": [
            "TRILHA 1 • O PLANO ETERNO DE DEUS",
            "01 — No princípio:",
            "por que Deus criou?"
          ]
        },
        "continuity": {
          "expectedNextStudyNumber": 2,
          "detectedNextStudyNumber": 2,
          "nextStudyId": "track-01-study-02",
          "terminal": false,
          "evidenceKind": "EXPLICIT_NUMBER",
          "valid": true
        },
        "quality": {
          "forbiddenControlCharCount": 0,
          "pageHeaderLeakCount": 0,
          "questionSemanticLeakCount": 0,
          "objectiveSemanticLeakCount": 0,
          "continueAppendixLeakCount": 0,
          "profileMarkerSetMatch": true,
          "structuredSectionCountMatch": true,
          "nextStudyIdValid": true,
          "terminalCompletionValid": null
        }
      },
    },
    {
      approvedCandidateSha256: "145945B6948D1EC74A5C4345183FC378FC5D4F315FD46F6C1C7DE93AA5EB2AC3",
      payload: {
        "schema": "P17-P2-A10-R2-R1-R1_TRACK1_BATCH_SIMULATION_CANDIDATE_V1",
        "readinessOnly": true,
        "runtimePayload": false,
        "batch": {
          "id": "B01_TRACK_01",
          "sequence": 1,
          "trackNumber": 1,
          "expectedTrackStudyCount": 18,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "source": {
          "relativePath": "trilha_01\\Biblia_Jornada_Estudo_02_Quando_Tudo_Mudou_A_Entrada_Do_Pecado.pdf",
          "bytes": 948632,
          "sha256": "AB638A386A3FA97519DC944066FAFE9AED6349AB5C4CB17109C536E09C0BAF9F",
          "pageCount": 10,
          "extractedCharacterCount": 13916,
          "expectedExtractedCharacterCount": 13916,
          "extractedTextSha256": "B862B2B7017F157B9A7EA91900C02CAF9B65C4ACFAE332E4D3D5CBCA7C12CEDF",
          "a5NormalizedTextSha256": "A6D207F6E832D848C756623633F44ADB84076231AC49A1365DA4E6FE0F634871"
        },
        "study": {
          "id": "track-01-study-02",
          "trackId": "track-01",
          "number": 2,
          "slug": "quando-tudo-mudou-a-entrada-do-pecado",
          "questionCentral": "Se Deus criou tudo muito bom, como o pecado entrou na história humana e o que Gênesis 3 mostra sobre suas consequências?",
          "primaryTexts": "Gênesis 3",
          "complementaryReadings": "Gênesis 2:15–17 • Romanos 5:12–19 • Romanos 6:23 • 1 Coríntios 15:21–22 • Apocalipse 21:1–5",
          "estimatedTime": "10–15 minutos",
          "objective": "Ao final, queremos compreender cinco verdades importantes: • O pecado aparece em Gênesis 3 como uma ruptura da confiança e da obediência a Deus. • A tentação começa colocando em dúvida aquilo que Deus disse. • O pecado afeta a relação do ser humano com Deus, consigo mesmo, com o próximo e com a criação. • Mesmo ao anunciar as consequências do pecado, Deus não abandona imediatamente a humanidade. • Gênesis 3 prepara o restante da Bíblia para a necessidade de redenção. No estudo anterior encontramos uma criação marcada por ordem, vida, bondade e comunhão. Agora surge a grande pergunta: Como chegamos daquele mundo de Gênesis 1–2 ao mundo de dor, culpa, violência e morte que conhecemos? Gênesis 3 começa a responder.",
          "openingTakeaway": "",
          "editorialStatus": "DRAFT",
          "published": false,
          "runtimeEligible": false,
          "nextStudyId": "track-01-study-03",
          "terminal": false,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "sourceDeclaredProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "expectedProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkerCount": 12,
        "structuredSectionCount": 10,
        "sections": [
          {
            "key": "LEIA",
            "type": "READ",
            "order": 1,
            "sourceHeading": "LEIA",
            "contentText": "Leia Gênesis 3 inteiro com atenção.\nAntes de procurar explicações, acompanhe a sequência dos\nacontecimentos:\n1. A serpente conversa com a mulher.\n2. A palavra de Deus é questionada.\n3. O fruto é tomado e comido.\n4. O homem também participa.\n5. Os dois percebem sua nudez.\n6. Tentam se esconder.\n7. Deus os chama.\n8. Começam as acusações.\n9. Deus anuncia consequências.\n10. O casal deixa o jardim.\nUma mudança profunda\nÉ uma mudança profunda em apenas um capítulo."
          },
          {
            "key": "OBSERVE",
            "type": "OBSERVE",
            "order": 2,
            "sourceHeading": "OBSERVE NO TEXTO",
            "contentText": "1. Qual foi a primeira pergunta feita pela serpente?\n2. O que acontece com aquilo que Deus havia dito em Gênesis 2:16–17?\n3. O fruto é apresentado apenas como alimento ou também como algo\ndesejável?\n4. O que acontece imediatamente depois que o homem e a mulher comem?\n5. Qual é a primeira reação deles quando percebem que Deus se aproxima?\n6. O homem assume imediatamente sua responsabilidade?\n7. A mulher assume imediatamente sua responsabilidade?\n8. Que áreas da vida passam a sofrer consequências?\n9. Deus deixa de procurar o ser humano depois do pecado?\n10. O que muda entre Gênesis 2 e Gênesis 3?\nAntes de continuar\nEssas perguntas são importantes porque Gênesis 3 não fala apenas\nsobre comer um fruto. O capítulo mostra uma mudança na relação\nentre a humanidade e Deus."
          },
          {
            "key": "ENTENDA",
            "type": "UNDERSTAND",
            "order": 3,
            "sourceHeading": "ENTENDA",
            "contentText": "1. A tentação começa mexendo com a Palavra\nde Deus\nA primeira estratégia da serpente não é dizer simplesmente:\n“Desobedeça a Deus.” Ela começa questionando aquilo que Deus\nhavia dito.\nA questão mais profunda\nPosso confiar no que Deus disse?\nDepois, a consequência anunciada por Deus também é colocada em\ndúvida. O padrão é claro: Deus realmente falou isso? Deus está\ndizendo toda a verdade? Talvez Deus esteja impedindo você de ter\nalgo melhor.\n2. O problema não estava apenas no fruto\nÀs vezes a história é apresentada de maneira tão simples que\nparece que todo o problema foi: “Deus tinha uma árvore e alguém\ncomeu uma fruta proibida.” Mas Gênesis 3 apresenta algo maior.\nDeus havia estabelecido um limite. O ser humano recebeu liberdade\ne responsabilidade, mas continuava sendo criatura. Ao atravessar\nconscientemente aquele limite, homem e mulher procuram\ndeterminar por si mesmos aquilo que deveriam receber de Deus.\n• Desconfiança.\n• Desejo.\n• Desobediência.\n• Rejeição do limite estabelecido por Deus.\nO ato e a ruptura\nO fruto é o ato visível. A ruptura acontece no coração da relação com\nDeus.\n3. O pecado promete algo, mas entrega outra\ncoisa\nA mulher observa que o fruto parecia bom para comer, agradável\naos olhos e desejável para obter sabedoria.\nA promessa parecia atraente. Mas depois de comerem, eles não\naparecem mais livres.\nO resultado\nVergonha • medo • esconderijo • acusações\nIsso revela um padrão que veremos muitas vezes na Bíblia: o\npecado pode se apresentar como liberdade, mas frequentemente\nproduz escravidão, culpa e ruptura.\n4. A primeira consequência aparece dentro\ndeles\nAntes de qualquer expulsão do jardim, algo já mudou. Homem e\nmulher percebem sua nudez e tentam cobri-la.\nAntes, Gênesis 2 termina dizendo que estavam nus e não sentiam\nvergonha. Agora existe vergonha. Isso mostra que o pecado não\nproduz apenas uma consequência externa. Algo acontece dentro do\nser humano.\n5. Depois vem o medo de Deus\nQuando percebem a presença de Deus, eles se escondem. Essa é\numa das mudanças mais fortes entre Gênesis 2 e Gênesis 3.\nAntes havia comunhão. Agora existe medo. Antes o relacionamento\ncom Deus aparece como parte da vida. Agora o ser humano tenta\nfugir da presença dele.\nUma grande ruptura\nO pecado rompe a comunhão entre a criatura e o Criador.\n6. Deus chama o homem\nExiste uma pergunta importante no capítulo: Deus havia perdido o\nhomem de vista? Não.\nQuando Deus pergunta onde ele está, o texto não precisa ser\nentendido como se Deus estivesse desinformado procurando\nfisicamente pelo casal. A narrativa apresenta Deus chamando o ser\nhumano a se apresentar diante dele.\nA pergunta confronta\n“Onde você está?” Não apenas geograficamente, mas agora, diante\nde Deus.\n7. O pecado também afeta os relacionamentos\nQuando Deus pergunta o que aconteceu, encontramos outra\nmudança. O homem responde apontando para a mulher e, em sua\nresposta, também menciona que foi Deus quem lhe deu aquela\nmulher. A mulher aponta para a serpente.\nA responsabilidade começa a ser empurrada de uma pessoa para\noutra. Em Gênesis 2 encontramos parceria. Em Gênesis 3 começam\nacusação, defesa, culpa e conflito.\n8. A própria criação passa a ser afetada\nGênesis 3 também mostra consequências no trabalho e na relação\ndo homem com a terra.\nLembre-se do estudo anterior\nO trabalho já existia antes do pecado. Depois da queda, porém, ele\npassa a envolver dificuldade, fadiga, espinhos e resistência da terra.\n9. A morte entra no horizonte humano\nEm Gênesis 2 Deus havia advertido sobre a morte. Em Gênesis 3, ao\nanunciar as consequências, Deus diz ao homem que ele retornaria\nao pó.\nRomanos 5 relaciona a entrada do pecado no mundo com a morte.\nRomanos 6:23 também associa o pecado à morte. A Bíblia, portanto,\nnão trata a morte como um detalhe sem importância."
          },
          {
            "key": "CONECTE",
            "type": "CONNECT",
            "order": 4,
            "sourceHeading": "CONECTE AS ESCRITURAS",
            "contentText": "Gênesis 3 abre um problema que o restante da Bíblia continuará\ndesenvolvendo.\nGênesis 2\nDeus dá vida, provisão, responsabilidade e um\nlimite.\nGênesis 3\nA palavra de Deus é questionada e o limite é\nquebrado.\nRomanos 5\nPaulo relaciona Adão à entrada do pecado e da\nmorte na história humana.\n1 Coríntios 15\nAdão e Cristo aparecem em contraste quando\nPaulo fala de morte e ressurreição.\nApocalipse 21\nNo fim da história bíblica, morte, luto e dor não\nterão a palavra final.\nPerceba o movimento\nGênesis mostra como a ruptura entrou na história. O restante da\nBíblia começa a revelar como Deus tratará essa ruptura.\nEXISTE ESPERANÇA JÁ\nEM GÊNESIS 3?\nAqui precisamos ter cuidado. Depois de anunciar juízo sobre a\nserpente, Gênesis 3:15 fala de uma futura inimizade entre a\ndescendência da mulher e a serpente, e de um conflito em que a\ncabeça da serpente seria atingida.\nEntendimento cristão tradicional\nMuitos cristãos ao longo da história enxergam Gênesis 3:15 como a\nprimeira indicação da futura vitória de Cristo sobre o mal. Esse\nentendimento costuma ser chamado de “primeiro anúncio do\nevangelho”.\nÉ importante distinguir duas coisas:\n• O texto de Gênesis, em seu contexto imediato, anuncia conflito e futura\nderrota da serpente.\n• A leitura cristã posterior, considerando toda a Bíblia, relaciona essa\npromessa com a vitória de Cristo.\nPortanto, não precisamos afirmar que Gênesis 3 explica sozinho\ntodos os detalhes sobre Jesus. A conexão se torna mais clara\nquando observamos o desenvolvimento posterior das Escrituras.\nCOMO ESTE ESTUDO\nSE RELACIONA COM\nCRISTO?\nO Novo Testamento faz uma comparação muito importante entre\nAdão e Cristo.\nRomanos 5 mostra que por meio de um homem entram pecado e\nmorte; e por meio de Cristo chegam graça, justiça e vida.\n1 Coríntios 15 também coloca Adão e Cristo em contraste ao tratar\nda morte e da ressurreição.\nConexão central\nJesus não aparece na história bíblica apenas para ensinar bons\nprincípios. Ele vem enfrentar o problema que já começou a aparecer\nem Gênesis: pecado, separação e morte.\nO QUE APRENDEMOS\nSOBRE DEUS?\n• Deus estabelece limites.\n• Leva a desobediência a sério.\n• Confronta o pecado.\n• Chama o ser humano a responder por seus atos.\n• É justo ao anunciar consequências.\n• Continua se dirigindo à humanidade mesmo depois da queda.\nResumo\nO pecado muda o ser humano. Não muda Deus em alguém\nindiferente ao bem e ao mal.\nO QUE APRENDEMOS\nSOBRE O SER\nHUMANO?\n• Pode duvidar da Palavra de Deus.\n• Pode desejar aquilo que Deus proibiu.\n• Pode escolher desobedecer.\n• Pode sentir vergonha e tentar esconder-se.\n• Pode ter medo.\n• Pode fugir da responsabilidade.\n• Pode culpar outras pessoas.\nUm espelho atual\nQuantas vezes ainda fazemos: “Eu sei o que Deus disse, mas...” ou “A\nculpa não foi exatamente minha...”?"
          },
          {
            "key": "APLIQUE",
            "type": "APPLY",
            "order": 5,
            "sourceHeading": "APLIQUE À VIDA",
            "contentText": "1. Nem toda dúvida é inocente\nFazer perguntas sinceras é diferente de usar perguntas para\njustificar aquilo que já decidimos fazer.\nPergunte a si mesmo\nEstou tentando entender o que Deus disse ou tentando encontrar\numa maneira de não obedecer?\n2. O pecado costuma parecer atraente antes de\nmostrar suas consequências\nO fruto parecia desejável. As consequências não pareciam fazer\nparte da proposta.\nO pecado apresenta\nO momento — mas esconde o depois.\n3. Esconder-se não resolve a culpa\nDepois do pecado, o casal tenta cobrir-se, esconder-se e\njustificar-se. Nenhuma dessas coisas apaga o que aconteceu.\nReconhecer nossa condição diante de Deus é muito diferente de\ntentar escondê-la.\n4. Culpar os outros impede que eu veja minha\nprópria responsabilidade\nO homem aponta para a mulher. A mulher aponta para a serpente.\nExistiam outros participantes na história, mas cada pessoa ainda\nprecisava responder por sua própria decisão.\nPodemos ter sido pressionados, influenciados, enganados ou\nferidos. Ainda assim, diante de nossas escolhas, precisamos\naprender a reconhecer a parte que nos pertence.\n5. O pecado nunca fica totalmente isolado\n• Comunhão com Deus.\n• Visão de si.\n• Relacionamento com outras pessoas.\n• Trabalho.\n• Criação.\n• Vida e morte.\nA Bíblia trata o pecado como algo sério porque seus efeitos também\nsão sérios."
          },
          {
            "key": "REFLECTION_QUESTIONS",
            "type": "REFLECTION_QUESTIONS",
            "order": 6,
            "sourceHeading": "PARA REFLETIR",
            "contentText": "1. O que mais chamou sua atenção em Gênesis 3?\n2. Em que momento a tentação começa?\n3. Tenho facilidade em confiar na Palavra de Deus quando ela contraria\nmeus desejos?\n4. Quando erro, minha primeira reação é reconhecer ou justificar?\n5. Existe alguma área em que estou tentando responsabilizar outra pessoa\npor uma escolha que também foi minha?\n6. Há algo do qual estou tentando me esconder de Deus?\n7. O que este capítulo me ensina sobre a seriedade do pecado?"
          },
          {
            "key": "JOURNAL_PROMPT",
            "type": "JOURNAL_PROMPT",
            "order": 7,
            "sourceHeading": "REGISTRAR NO DIÁRIO",
            "contentText": "Em qual área da minha vida preciso parar de me esconder, justificar\nou transferir responsabilidade e ser sincero diante de Deus?"
          },
          {
            "key": "PRAYER",
            "type": "PRAYER",
            "order": 8,
            "sourceHeading": "ORE",
            "contentText": "Senhor, ajuda-me a confiar na tua Palavra e a reconhecer quando\nmeus desejos tentam ocupar o lugar da tua vontade. Dá-me coragem\npara admitir meus erros, abandonar desculpas e buscar em ti\nrestauração. Ensina-me a levar o pecado a sério sem perder de vista\ntua graça e teu propósito de salvação. Amém."
          },
          {
            "key": "KEEP",
            "type": "KEEP",
            "order": 9,
            "sourceHeading": "PARA GUARDAR",
            "contentText": "Romanos 5:12\nLeia esse versículo em sua Bíblia e observe a ligação que Paulo faz\nentre pecado, humanidade e morte. Depois compare com Romanos\n5:18–19, onde Cristo aparece como resposta a esse problema.\nADICIONAR AOS FAVORITOS"
          },
          {
            "key": "CONTINUE_JOURNEY",
            "type": "CONTINUE_JOURNEY",
            "order": 10,
            "sourceHeading": "CONTINUE SUA JORNADA",
            "contentText": "Agora sabemos que algo realmente mudou.\nA criação era muito boa. O pecado entrou. A comunhão foi\nquebrada. A morte apareceu no horizonte.\nMas surge uma pergunta fundamental\nDeus desistiu do ser humano depois da queda?\nGênesis mostrará que não. Mesmo em uma história marcada pela\ndesobediência, Deus começa a revelar que seu propósito ainda\ncontinuará.\nPróximo estudo\n03 — A primeira promessa\nde redenção\nPergunta central\nDeus abandonou o homem depois da queda?\nNesse próximo estudo vamos examinar com cuidado o que Gênesis\napresenta imediatamente depois da entrada do pecado e como a\nesperança de redenção começa a surgir na narrativa bíblica."
          }
        ],
        "terminalCompletion": null,
        "sourceAppendix": {
          "heading": "Referências bíblicas utilizadas",
          "contentText": "Texto principal: Gênesis 3\nContexto imediato: Gênesis 2:15–17\nConexões principais: Romanos 5:12–19; Romanos 6:23; 1 Coríntios\n15:21–22; Apocalipse 21:1–5\nNota editorial\nNeste estudo, a maior parte das conclusões foi construída\ndiretamente a partir de Gênesis 3 e das conexões explícitas feitas pelo\nNovo Testamento. A identificação de Gênesis 3:15 como anúncio\ninicial da futura vitória de Cristo foi apresentada separadamente\ncomo entendimento cristão tradicional, porque essa conclusão\ndepende da leitura do versículo à luz do desenvolvimento posterior\nda Bíblia.\nFim do Estudo 02"
        },
        "normalization": {
          "removedForbiddenControlCharCount": 1,
          "removedPageHeaderLineCount": 40
        },
        "canonicalSource": {
          "lineCount": 314,
          "sha256": "CBF5E0C5B7BA019AF33C2D183AD0DE800AD425F07CD6432EA9E3262D3C6B670B",
          "preambleLines": [
            "TRILHA 1 • O PLANO ETERNO DE DEUS",
            "02 — Quando tudo mudou:",
            "a entrada do pecado"
          ]
        },
        "continuity": {
          "expectedNextStudyNumber": 3,
          "detectedNextStudyNumber": 3,
          "nextStudyId": "track-01-study-03",
          "terminal": false,
          "evidenceKind": "EXPLICIT_NUMBER",
          "valid": true
        },
        "quality": {
          "forbiddenControlCharCount": 0,
          "pageHeaderLeakCount": 0,
          "questionSemanticLeakCount": 0,
          "objectiveSemanticLeakCount": 0,
          "continueAppendixLeakCount": 0,
          "profileMarkerSetMatch": true,
          "structuredSectionCountMatch": true,
          "nextStudyIdValid": true,
          "terminalCompletionValid": null
        }
      },
    },
    {
      approvedCandidateSha256: "2FD54DB578AF00A3FE1DAC0A1F4C4D8454E47E7299E92D8EB3B08188F63E34F9",
      payload: {
        "schema": "P17-P2-A10-R2-R1-R1_TRACK1_BATCH_SIMULATION_CANDIDATE_V1",
        "readinessOnly": true,
        "runtimePayload": false,
        "batch": {
          "id": "B01_TRACK_01",
          "sequence": 1,
          "trackNumber": 1,
          "expectedTrackStudyCount": 18,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "source": {
          "relativePath": "trilha_01\\Biblia_Jornada_Estudo_03_A_Primeira_Promessa_De_Redencao.pdf",
          "bytes": 954742,
          "sha256": "D9A19BB2205329D30043EEBD77CDB0685DCA0B868D932564E419C1CF4BEF92B5",
          "pageCount": 13,
          "extractedCharacterCount": 16640,
          "expectedExtractedCharacterCount": 16640,
          "extractedTextSha256": "A07A656A7A383F89F511403718B1F9DDF24F9BB2CC51E4618DB82813103FCDA5",
          "a5NormalizedTextSha256": "53720F99E568B2151ECA00635495BA59B9C758E1F667C6A62B8F4510B862E123"
        },
        "study": {
          "id": "track-01-study-03",
          "trackId": "track-01",
          "number": 3,
          "slug": "a-primeira-promessa-de-redencao",
          "questionCentral": "Depois da entrada do pecado, Deus abandonou o ser humano ou começou a revelar que o mal não teria a palavra final?",
          "primaryTexts": "Gênesis 3:14–24",
          "complementaryReadings": "Gênesis 3:1–13 • Gálatas 4:4–5 • Romanos 16:20 • Hebreus 2:14–15 • 1 João 3:8 • Apocalipse 21:1–5",
          "estimatedTime": "10–15 minutos",
          "objective": "Ao final, queremos compreender cinco verdades importantes: • Deus não ignora o pecado nem suas consequências. • Mesmo depois da queda, Deus continua falando com o ser humano. • Gênesis 3:15 apresenta uma esperança em meio ao juízo. • A Bíblia desenvolverá progressivamente a expectativa de vitória sobre o mal. • Para os cristãos, essa esperança encontra seu cumprimento maior em Jesus Cristo. Guarde esta ideia O pecado entrou na história, mas Deus não abandonou a história. No estudo anterior vimos ruptura, medo, culpa, conflito e morte entrando no horizonte humano. Agora começaremos a enxergar algo que atravessará toda a Bíblia: Deus ainda tem um propósito.",
          "openingTakeaway": "",
          "editorialStatus": "DRAFT",
          "published": false,
          "runtimeEligible": false,
          "nextStudyId": "track-01-study-04",
          "terminal": false,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "sourceDeclaredProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "expectedProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkerCount": 12,
        "structuredSectionCount": 10,
        "sections": [
          {
            "key": "LEIA",
            "type": "READ",
            "order": 1,
            "sourceHeading": "LEIA",
            "contentText": "Leia novamente Gênesis 3:14–24.\nDesta vez, preste atenção não somente nas consequências\nanunciadas por Deus, mas também em tudo aquilo que acontece\ndepois da desobediência.\n• Deus continua falando.\n• Deus anuncia juízo.\n• Aparece uma palavra sobre a futura derrota da serpente.\n• Deus faz vestimentas para o homem e a mulher.\n• A vida humana continua.\n• O casal deixa o jardim.\n• O acesso à árvore da vida é impedido.\nA história continua\nGênesis 3 não termina dizendo: “E Deus nunca mais quis saber da\nhumanidade.”"
          },
          {
            "key": "OBSERVE",
            "type": "OBSERVE",
            "order": 2,
            "sourceHeading": "OBSERVE NO TEXTO",
            "contentText": "1. Deus fala primeiro com quem, depois de confrontar o homem e a\nmulher?\n2. O que Gênesis 3:15 diz que existirá entre a serpente e a mulher?\n3. O texto fala apenas da mulher ou também de sua descendência?\n4. O que aconteceria com a cabeça da serpente?\n5. O que aconteceria com o calcanhar da descendência da mulher?\n6. Deus retira todas as consequências do pecado?\n7. Quem faz vestimentas para o homem e a mulher?\n8. O casal permanece no jardim?\n9. A humanidade deixa de existir depois da queda?\n10. O capítulo termina com o pecado vencendo completamente o propósito\nde Deus?\nAntes de continuar\nEste estudo depende especialmente de perceber a diferença entre\nduas coisas: Deus julgar o pecado e Deus desistir do pecador. Não\nsão a mesma coisa."
          },
          {
            "key": "ENTENDA",
            "type": "UNDERSTAND",
            "order": 3,
            "sourceHeading": "ENTENDA",
            "contentText": "1. Deus não trata o pecado como algo sem\nimportância\nGênesis 3 não apresenta uma mensagem como: “Tudo bem, não\naconteceu nada.” Aconteceu.\nA desobediência trouxe consequências reais. A relação com Deus foi\nrompida. Os relacionamentos humanos foram afetados. O trabalho\nse tornou difícil. A morte passou a fazer parte da realidade humana.\nO casal deixou o jardim.\nUm problema verdadeiro\nQuando falamos de esperança e redenção, não estamos dizendo que\nDeus simplesmente fingiu que o pecado não existia. A esperança\nbíblica começa porque existe um problema verdadeiro que precisa\nser resolvido.\n2. Mesmo julgando, Deus continua falando\nEsse detalhe é fácil de passar despercebido. O ser humano pecou,\nescondeu-se e tentou justificar-se. Mas Deus ainda fala. Ainda\nconfronta. Ainda anuncia o que acontecerá. Ainda age na história.\nUma verdade importante\nA queda não fez Deus abandonar imediatamente a humanidade à\nprópria sorte.\nA relação foi profundamente ferida, mas a história entre Deus e o\nser humano não terminou em Gênesis 3. Grande parte do restante\nda Bíblia mostrará Deus agindo justamente em direção a uma\nhumanidade marcada pelo pecado.\n3. Uma palavra de esperança aparece no meio\ndo juízo\nChegamos a Gênesis 3:15. Deus fala à serpente e anuncia que\nhaveria inimizade entre a serpente e a mulher, e entre a\ndescendência da serpente e a descendência da mulher.\nDepois vem uma imagem de conflito: uma parte atingiria o\ncalcanhar; a outra atingiria a cabeça.\nMensagem no contexto imediato\nA serpente não terá vitória absoluta. Haverá conflito e ferimento, mas\nsua cabeça será atingida. O mal não terá a palavra final.\n4. O que significa “descendência da mulher”?\nAqui precisamos ser cuidadosos. A palavra aponta, de maneira\nsimples, para aquilo que viria depois da mulher: sua descendência,\nsua posteridade.\nO próprio livro de Gênesis começará a acompanhar gerações: Adão,\nSete, Noé, Sem, Abraão, Isaque, Jacó e assim por diante.\nA Bíblia passa a acompanhar uma história de descendência,\npromessa e propósito. Mas Gênesis 3:15, sozinho, ainda não\napresenta todos os detalhes que encontraremos depois.\nRespeitando o texto\nGênesis 3:15 não diz explicitamente: “Essa pessoa será chamada Jesus\nde Nazaré, nascerá em Belém, morrerá numa cruz e ressuscitará ao\nterceiro dia.” Esses detalhes serão revelados posteriormente.\nPor isso, precisamos respeitar a maneira como a revelação bíblica\nse desenvolve.\nINTERPRETAÇÃO\nCRISTÃ IMPORTANTE\nGênesis 3:15 e a primeira promessa do\nEvangelho\nAo longo da história cristã, muitos intérpretes entenderam Gênesis\n3:15 como a primeira indicação da futura vitória de Cristo sobre\nSatanás e o mal.\nEssa interpretação é conhecida tradicionalmente como a ideia do\nprimeiro anúncio do Evangelho.\nEm linguagem simples\nDepois da queda, Deus já começa a indicar que o mal não vencerá\npara sempre.\nMas é importante distinguir:\n• O que Gênesis 3:15 diz diretamente: haverá conflito entre a serpente e a\ndescendência da mulher, e a cabeça da serpente será atingida.\n• O entendimento cristão ao olhar para toda a Bíblia: a vitória definitiva\nsobre Satanás, pecado e morte acontece por meio de Cristo.\nEssa segunda afirmação não depende apenas de Gênesis 3. Ela é\nfortalecida pelo desenvolvimento posterior das Escrituras."
          },
          {
            "key": "CONECTE",
            "type": "CONNECT",
            "order": 4,
            "sourceHeading": "CONECTE AS ESCRITURAS",
            "contentText": "Gênesis 3:15\nA serpente não terá vitória definitiva.\nGálatas 4:4–5\nNo tempo determinado, Deus envia seu Filho,\nnascido de mulher, para realizar sua obra de\nredenção.\nHebreus 2:14–15\nCristo participa da condição humana e, por meio\nde sua morte, vence aquele que tinha o poder\nda morte.\n1 João 3:8\nO Filho de Deus se manifesta para destruir as\nobras do diabo.\nRomanos 16:20\nPaulo afirma que Deus esmagará Satanás.\nApocalipse\nA Bíblia apresenta finalmente a derrota do mal e\na restauração da criação.\nPerceba o desenvolvimento\nO tema que começou discretamente em Gênesis cresce ao longo das\nEscrituras.\n5. A redenção começa como promessa antes de\naparecer como cumprimento\nEssa ideia é muito importante para entender o Plano Eterno de\nDeus. Em Gênesis 3 ainda não temos a cruz, a ressurreição, a Igreja,\na pregação aos gentios ou a Nova Jerusalém.\nMas a história começa a caminhar nessa direção. Deus não revela\ntudo de uma vez.\nComo o nascer do dia\nPrimeiro aparece uma pequena luz. Depois o cenário começa a ficar\nmais claro. Ao longo da Bíblia veremos promessa, mais promessa,\nalianças e profecias, até chegarmos ao cumprimento em Cristo.\n6. Deus cobre a vergonha do casal\nGênesis 3:21 apresenta outro detalhe: Deus faz vestimentas para\nAdão e Eva. Antes disso, eles haviam tentado cobrir a própria nudez.\nAgora Deus lhes fornece vestimentas.\nO texto mostra claramente uma ação de cuidado de Deus mesmo\ndepois da queda.\nCuidado com uma afirmação comum\nÀs vezes se diz: “Aqui aconteceu o primeiro sacrifício de sangue para\nperdoar pecados.” Gênesis 3:21 não diz isso diretamente. O texto\nafirma que Deus fez vestimentas de pele, mas não chama esse ato de\nsacrifício expiatório nem declara que ele perdoou o pecado do casal.\nÉ possível concluir que um animal esteve envolvido para que\nhouvesse pele, mas não devemos construir como certeza algo que o\ntexto não explica. Mais adiante, a Bíblia desenvolverá claramente o\ntema de sacrifício.\n7. Ser expulso do jardim também possui uma\nexplicação no texto\nAdão e Eva não permanecem no Éden. Isso é consequência grave da\nqueda.\nMas Gênesis 3:22 também informa uma razão relacionada à árvore\nda vida: o homem não deveria estender a mão, comer dela e viver\npara sempre naquela condição.\nO acesso é fechado. Querubins são colocados na entrada. A\nseparação agora é real.\nMas a história não termina aqui\nA Bíblia não terminará com um jardim perdido. Essa conexão só ficará\ncompletamente clara quando chegarmos ao fim da Jornada.\nDO JARDIM PERDIDO\nAO JARDIM\nRESTAURADO\nGênesis 2\nÁrvore da vida • presença de Deus • vida •\ncomunhão.\nGênesis 3\nPecado • separação • perda do acesso • morte.\nApocalipse 21–22\nDeus habitando com seu povo • fim da morte •\nrestauração • árvore da vida novamente\nacessível.\nA grande história\nA Bíblia começa com um mundo bom que é ferido pelo pecado e\ntermina apresentando a restauração definitiva de Deus. A redenção\nfaz parte da grande história bíblica.\nCOMO ESTE ESTUDO SE\nRELACIONA COM\nCRISTO?\nCristo aparece no Novo Testamento como aquele que enfrenta\njustamente os grandes inimigos que aparecem depois da queda:\npecado, morte e Satanás.\nJesus não vem apenas ensinar como ser uma pessoa melhor. Ele\nvem realizar uma obra de salvação.\nHebreus 2 relaciona sua morte à derrota daquele que tinha o poder\nda morte. 1 João 3:8 fala da destruição das obras do diabo.\nRomanos 5 coloca Cristo em contraste com Adão, e 1 Coríntios 15\nrelaciona Cristo à vitória sobre a morte.\nOlhando toda a Bíblia\nA esperança que começa a aparecer depois da queda encontra seu\ncentro em Jesus Cristo.\nO QUE APRENDEMOS\nSOBRE DEUS?\n• Não ignora o pecado.\n• É justo.\n• Continua agindo depois da queda.\n• Não perde o controle da história.\n• Anuncia que o mal não vencerá para sempre.\n• Continua cuidando do ser humano.\n• Mantém seu propósito mesmo em uma criação ferida.\nResumo\nO pecado do homem é sério, mas não é poderoso o bastante para\ndestruir o propósito de Deus.\nO QUE APRENDEMOS\nSOBRE O SER HUMANO?\n• Sofre as consequências da desobediência.\n• Perde o acesso ao jardim.\n• Experimenta separação.\n• Caminha em direção à morte.\n• Não consegue resolver sozinho o problema que criou.\nUma necessidade começa a ficar clara\nA humanidade precisa de algo que não consegue produzir sozinha.\nPrecisamos de redenção.\nO QUE É REDENÇÃO?\nComo essa palavra fará parte de muitos estudos, vale explicá-la de\nmaneira simples.\nNa Bíblia, a ideia de redenção está ligada a libertar, resgatar e\nrecuperar mediante uma ação salvadora.\nEm nossa trilha, usaremos “redenção” para falar da obra de Deus\nem resgatar pessoas do pecado e conduzir seu propósito de\nrestauração.\nGuarde assim\nRedenção é Deus agindo para resgatar aquilo que o pecado colocou\nem ruína.\nEsse tema crescerá muito ao longo da Bíblia."
          },
          {
            "key": "APLIQUE",
            "type": "APPLY",
            "order": 5,
            "sourceHeading": "APLIQUE À VIDA",
            "contentText": "1. Meu erro não precisa ser o capítulo final\nGênesis 3 é uma história de desobediência real e consequências\nreais. Mas não é o último capítulo da Bíblia.\nGraça e seriedade\nIsso não transforma o pecado em algo pequeno. Transforma a graça\nde Deus em algo maior do que nosso desespero.\n2. Deus não precisa esconder a verdade para\noferecer esperança\nA Bíblia não oferece esperança fingindo que tudo está bem. Deus\nprimeiro mostra o problema. Depois começa a mostrar sua\nresposta.\nEsperança cristã não é\n“Nada aconteceu.” É: “Aconteceu, é sério, mas Deus ainda pode agir.”\nAPLIQUE À VIDA\n3. Não tente construir sua própria redenção\nAdão e Eva tentaram cobrir sua vergonha. Mas o grande problema\nentre humanidade e Deus não seria resolvido com folhas.\nAo longo da Bíblia veremos repetidamente que a salvação depende\nda iniciativa de Deus. Isso nos ensina humildade.\nNem todo problema espiritual pode ser resolvido apenas com mais\nesforço, boa aparência, religiosidade ou promessas humanas.\nPrecisamos da ação de Deus.\n4. O mal não terá a última palavra\nEssa esperança começa pequena em Gênesis, mas crescerá por\ntoda a Bíblia.\nTalvez você esteja atravessando uma situação em que parece que o\nmal venceu. Gênesis 3 não promete que não haverá sofrimento.\nPelo contrário: mostra que haverá conflito.\nAinda assim\nA última palavra ainda não foi dada. Deus continua agindo."
          },
          {
            "key": "REFLECTION_QUESTIONS",
            "type": "REFLECTION_QUESTIONS",
            "order": 6,
            "sourceHeading": "PARA REFLETIR",
            "contentText": "1. Depois do estudo anterior, eu imaginava Gênesis 3 apenas como uma\nhistória de condenação?\n2. O que muda quando percebo que Deus continua falando e agindo depois\nda queda?\n3. Por que é importante não diminuir a seriedade do pecado?\n4. Por que também é errado pensar que o pecado destruiu completamente\no propósito de Deus?\n5. Tenho tentado “cobrir” sozinho alguma culpa que preciso apresentar\nsinceramente a Deus?\n6. O que significa para mim saber que a Bíblia apresenta uma história de\nredenção?\n7. Em que situação da minha vida preciso lembrar que o mal não terá\nnecessariamente a última palavra?"
          },
          {
            "key": "JOURNAL_PROMPT",
            "type": "JOURNAL_PROMPT",
            "order": 7,
            "sourceHeading": "REGISTRAR NO DIÁRIO",
            "contentText": "Existe alguma parte da minha história que tenho tratado como se\nDeus não pudesse mais continuar?"
          },
          {
            "key": "PRAYER",
            "type": "PRAYER",
            "order": 8,
            "sourceHeading": "ORE",
            "contentText": "Senhor, obrigado porque, mesmo diante do pecado humano, teu\npropósito não terminou. Ajuda-me a reconhecer meus erros sem\nfugir de ti e a confiar na salvação que vem de tua iniciativa. Ensina-me\na enxergar a Bíblia como uma história em que tua graça continua\nagindo e prepara meu coração para compreender cada vez mais teu\nplano de redenção. Amém."
          },
          {
            "key": "KEEP",
            "type": "KEEP",
            "order": 9,
            "sourceHeading": "PARA GUARDAR",
            "contentText": "Gênesis 3:15\nLeia o versículo em sua Bíblia. Não tente colocar nele mais detalhes\ndo que o próprio texto apresenta.\nMensagem principal neste ponto da Jornada\nA serpente e o mal não terão vitória definitiva. Durante os próximos\nestudos, observe como essa esperança vai ficando cada vez mais\nclara.\nADICIONAR AOS FAVORITOS"
          },
          {
            "key": "CONTINUE_JOURNEY",
            "type": "CONTINUE_JOURNEY",
            "order": 10,
            "sourceHeading": "CONTINUE SUA JORNADA",
            "contentText": "Agora sabemos três coisas:\nEstudo 01\nDeus criou tudo muito bom.\nEstudo 02\nO pecado entrou e trouxe ruptura.\nEstudo 03\nMesmo depois da queda, o propósito de Deus continua e surge\nesperança de vitória sobre o mal.\nMas a humanidade continuará crescendo. Novas gerações virão. E,\nmuitos capítulos depois, Deus fará uma promessa extraordinária a\num homem chamado Abraão.\nEssa promessa envolverá terra, descendência, bênção e algo ainda\nmaior: todas as famílias da terra.\nPróximo estudo\n04 — Abraão e a promessa\nPergunta central\nPor que Deus escolheu uma família para alcançar as nações?\nTextos principais\nGênesis 12:1–3 • Gênesis 15 • Gênesis 17 • Gênesis 22:15–18\nNo próximo estudo começaremos a perceber como o propósito de\nDeus passa da promessa inicial para uma história concreta de\naliança, família e bênção para as nações."
          }
        ],
        "terminalCompletion": null,
        "sourceAppendix": {
          "heading": "REFERÊNCIAS BÍBLICAS",
          "contentText": "Texto principal: Gênesis 3:14–24\nContexto: Gênesis 3:1–13\nConexões principais: Gálatas 4:4–5; Romanos 16:20; Hebreus 2:14–15; 1\nJoão 3:8; Romanos 5; 1 Coríntios 15; Apocalipse 21–22\nNOTA EDITORIAL\nNeste estudo foram feitas duas distinções para preservar fidelidade\nao texto.\n1. Gênesis 3:15\nA afirmação de que o texto contém uma primeira indicação da\nfutura vitória de Cristo foi identificada como interpretação cristã\ntradicional, construída a partir da leitura de Gênesis à luz do\ndesenvolvimento posterior das Escrituras.\nO próprio Gênesis 3:15 não apresenta, sozinho, todos os detalhes\ndo Evangelho.\n2. Gênesis 3:21\nNão afirmamos que as vestimentas de pele constituem\nexplicitamente o “primeiro sacrifício pelo pecado”, porque o texto\nnão chama aquele acontecimento de sacrifício nem explica dessa\nforma sua finalidade.\nO desenvolvimento bíblico do sistema de sacrifícios será tratado\nposteriormente em estudo próprio.\nRegra editorial do Bíblia Jornada\nDizer com clareza aquilo que a Bíblia afirma, distinguir aquilo que é\ninterpretação e evitar transformar suposições em doutrina.\nTrilha 1 • Estudo 03/18 • Versão para revisão\nFim do Estudo 03"
        },
        "normalization": {
          "removedForbiddenControlCharCount": 1,
          "removedPageHeaderLineCount": 52
        },
        "canonicalSource": {
          "lineCount": 368,
          "sha256": "9C60A23F3D8E732E4C7C672D234CDF312BDC4BF68DC6BAF9F66BF4202A84B989",
          "preambleLines": [
            "TRILHA 1 • O PLANO ETERNO DE DEUS",
            "03 — A primeira promessa",
            "de redenção"
          ]
        },
        "continuity": {
          "expectedNextStudyNumber": 4,
          "detectedNextStudyNumber": 4,
          "nextStudyId": "track-01-study-04",
          "terminal": false,
          "evidenceKind": "EXPLICIT_NUMBER",
          "valid": true
        },
        "quality": {
          "forbiddenControlCharCount": 0,
          "pageHeaderLeakCount": 0,
          "questionSemanticLeakCount": 0,
          "objectiveSemanticLeakCount": 0,
          "continueAppendixLeakCount": 0,
          "profileMarkerSetMatch": true,
          "structuredSectionCountMatch": true,
          "nextStudyIdValid": true,
          "terminalCompletionValid": null
        }
      },
    },
    {
      approvedCandidateSha256: "DBC2BD0A733C07BA6541C5634B69C02B719BEB5176C341B8DA508230B487AD2C",
      payload: {
        "schema": "P17-P2-A10-R2-R1-R1_TRACK1_BATCH_SIMULATION_CANDIDATE_V1",
        "readinessOnly": true,
        "runtimePayload": false,
        "batch": {
          "id": "B01_TRACK_01",
          "sequence": 1,
          "trackNumber": 1,
          "expectedTrackStudyCount": 18,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "source": {
          "relativePath": "trilha_01\\Biblia_Jornada_Estudo_04_Abraao_E_A_Promessa.pdf",
          "bytes": 967503,
          "sha256": "9F4B185DFB10269F9ED8845DBD1041377DF1ACF4902EDECCC742B2CDE4CA5B20",
          "pageCount": 11,
          "extractedCharacterCount": 17125,
          "expectedExtractedCharacterCount": 17125,
          "extractedTextSha256": "3A8F973784330F0BB04E7AE1DFF0C7CFA6F85610C149FBB0CBF6E5F17A42E466",
          "a5NormalizedTextSha256": "AC99C62E8DA879ECF1D2316EEE84EFD47A207E9D21B5DA246C92F5C7047D8011"
        },
        "study": {
          "id": "track-01-study-04",
          "trackId": "track-01",
          "number": 4,
          "slug": "abraao-e-a-promessa",
          "questionCentral": "Por que Deus escolheu uma família e como essa promessa se relaciona com a bênção destinada a todas as nações?",
          "primaryTexts": "Gênesis 12:1-3 • Gênesis 15 • Gênesis 17 • Gênesis 22:15-18",
          "complementaryReadings": "Gênesis 11:1-9 • Romanos 4:1-5, 16-25 • Gálatas 3:6-9, 16 • Hebreus 11:8-12",
          "estimatedTime": "12-15 minutos",
          "objective": "Ao final, queremos compreender cinco verdades: • Deus chama Abraão e inicia com ele uma etapa decisiva do seu plano. • A promessa envolve terra, descendência e bênção. • A escolha de Abraão não termina nele: Deus declara que, por meio dessa história, todas as famílias da terra seriam alcançadas. • Abraão é apresentado como alguém que responde à promessa de Deus com fé, embora sua caminhada também tenha falhas. • O Novo Testamento relaciona a promessa feita a Abraão diretamente com o Evangelho e com Cristo.",
          "openingTakeaway": "Deus escolhe uma família não para esquecer as outras famílias, mas para fazer dessa família um caminho de bênção para as nações.",
          "editorialStatus": "DRAFT",
          "published": false,
          "runtimeEligible": false,
          "nextStudyId": "track-01-study-05",
          "terminal": false,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "sourceDeclaredProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "expectedProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkerCount": 12,
        "structuredSectionCount": 10,
        "sections": [
          {
            "key": "LEIA",
            "type": "READ",
            "order": 1,
            "sourceHeading": "LEIA",
            "contentText": "Comece por Gênesis 12:1-3.\nDepois leia: Gênesis 15, Gênesis 17 e Gênesis 22:15-18.\nAo ler, procure acompanhar aquilo que Deus repete. Você encontrará principalmente três\ngrandes elementos: terra, descendência e bênção.\nMas existe uma quarta ideia que não pode ser esquecida: as nações.\nA promessa nunca foi apenas: “Abraão será muito importante.” Existe um propósito maior."
          },
          {
            "key": "OBSERVE",
            "type": "OBSERVE",
            "order": 2,
            "sourceHeading": "OBSERVE NO TEXTO",
            "contentText": "• O que Deus pede que Abrão deixe para trás?\n• O que Deus promete fazer dele?\n• Quem seria alcançado pela bênção relacionada a Abraão?\n• Em Gênesis 15, qual preocupação Abraão apresenta a Deus?\n• O que Deus mostra a Abraão quando fala de sua descendência?\n• O que Gênesis 15:6 diz sobre a reação de Abraão à promessa?\n• Em Gênesis 17, que mudança acontece no nome de Abrão?\n• Deus limita sua promessa a uma única geração?\n• O que é reafirmado depois da prova de Gênesis 22?\n• Em algum momento a promessa deixa de mencionar as nações?\nObserve especialmente a repetição. Quando uma ideia aparece diversas vezes, devemos\nprestar atenção."
          },
          {
            "key": "ENTENDA",
            "type": "UNDERSTAND",
            "order": 3,
            "sourceHeading": "ENTENDA",
            "contentText": "1. A história de Abraão surge depois de um problema que\nenvolve toda a humanidade\nAntes de Abraão, Gênesis já apresentou a criação, a queda, Caim e Abel, a crescente\nviolência, o dilúvio e Babel.\nEm Gênesis 11, a humanidade aparece novamente marcada por orgulho e dispersão. Então\nGênesis 12 muda o foco. Deus chama um homem: Abrão.\nÀ primeira vista, pode parecer que a Bíblia deixou de falar da humanidade para contar\napenas a história de uma família. Mas observe Gênesis 12:3.\nDeus declara que todas as famílias da terra seriam abençoadas por meio daquilo que\ncomeçaria com Abraão.\nIdeia-chave\nA história fica menor no começo para alcançar algo muito maior depois.\nDeus começa com uma pessoa. Depois uma família. Depois um povo. Mas o objetivo nunca\nperde de vista as nações.\n2. Deus chama Abraão antes de mostrar todos os detalhes\nDeus manda Abrão sair de sua terra, de sua parentela e da casa de seu pai, para uma terra\nque lhe seria mostrada.\nIsso exige confiança. Abraão não recebe primeiro um mapa completo com tudo explicado.\nRecebe uma promessa e um chamado.\nHebreus 11 destaca exatamente essa atitude. Abraão parte sem conhecer completamente\no destino final.\nIsso não significa agir sem qualquer razão. Ele parte porque Deus falou. A fé bíblica aqui\nnão aparece como pensamento positivo. É confiança em uma promessa recebida de Deus.\n3. A promessa possui três grandes elementos\nTerra. Deus promete levar Abraão a uma terra. Essa terra terá papel importante na história\nde Israel.\nDescendência. Existe um problema evidente: Abraão ainda não possui o filho por meio do\nqual a promessa continuaria. Ele envelhece. Sara também envelhece. Humanamente, a\npromessa parece cada vez mais difícil. Mesmo assim, Deus continua reafirmando que\nAbraão teria descendência.\nBênção. Deus diz que abençoaria Abraão. Mas a bênção não termina nele. Gênesis 12:2-3\nliga a bênção recebida à bênção que alcançaria outros.\nResumo\nAbraão é abençoado para se tornar instrumento de bênção.\n4. A promessa depende primeiro da iniciativa de Deus\nÉ importante perceber a ordem. Gênesis 12 não começa dizendo: “Abraão realizou grandes\nobras e então Deus decidiu recompensá-lo.”\nA iniciativa começa em Deus. Deus chama. Deus promete. Abraão responde.\nIsso será muito importante posteriormente, porque o Novo Testamento usará Abraão\njustamente ao explicar a relação entre promessa, fé e graça.\n5. Abraão crê em Deus\nEm Gênesis 15, Abraão está preocupado. Como a promessa de descendência poderia\nacontecer se ele ainda não tinha o filho prometido?\nDeus o leva para fora e usa as estrelas como imagem da descendência futura. Então\nGênesis 15:6 declara que Abraão creu no Senhor.\nEssa afirmação se torna extremamente importante no Novo Testamento. Paulo a retomará\nem Romanos e Gálatas.\nPonto central\nAbraão confia naquele que fez a promessa.\nIsso não significa que Abraão nunca teve dúvidas ou nunca tomou decisões erradas. Sua\nhistória mostra momentos de fraqueza. Mas Gênesis destaca sua fé na promessa de Deus.\n6. Abraão não é apresentado como um homem perfeito\nÀs vezes podemos transformar personagens bíblicos em figuras quase sem falhas. A própria\nBíblia não faz isso.\n• Abraão teve medo.\n• Tomou decisões questionáveis.\n• Tentou resolver algumas situações por caminhos humanos.\n• Teve momentos de dúvida.\nPor exemplo, a história envolvendo Hagar mostra as consequências de tentar produzir pela\nprópria iniciativa aquilo que Deus havia prometido realizar.\nIsso torna a história mais real. A Bíblia não está dizendo: “Deus escolheu Abraão porque\nAbraão nunca errava.” Ela mostra um homem aprendendo a confiar em Deus durante uma\nlonga caminhada.\n7. Deus estabelece uma aliança\nEm Gênesis 15 e 17 aparece de forma clara a ideia de aliança.\nEm linguagem simples, uma aliança bíblica é um compromisso estabelecido de maneira\nséria, com promessas e responsabilidades definidas.\nDeus reafirma a descendência, a terra e a continuidade da promessa.\nEm Gênesis 17, Abrão passa a ser chamado Abraão. O nome está ligado à promessa de que\nele seria pai de uma multidão de nações.\nSara também participa dessa promessa. A história não depende apenas de Abraão ter\nmuitos descendentes por qualquer caminho. Existe uma linha específica da promessa que\ncontinuará através de Isaque.\n8. A promessa não é apenas sobre Israel\nIsrael terá papel central. Mas desde Gênesis 12 encontramos algo maior: todas as famílias\nda terra.\nEm Gênesis 18:18, a ideia aparece novamente. Em Gênesis 22:18, depois da prova\nenvolvendo Isaque, a promessa é reafirmada em relação às nações.\nIsso impede uma leitura muito limitada. Deus realmente trabalhará de maneira especial\natravés de Israel. Mas seu propósito final não é simplesmente beneficiar um povo e ignorar\ntodos os outros. A promessa possui alcance universal."
          },
          {
            "key": "CONECTE",
            "type": "CONNECT",
            "order": 4,
            "sourceHeading": "CONECTE AS ESCRITURAS",
            "contentText": "Gênesis 12\nAbraão é chamado. Deus promete bênção para todas as famílias da terra.\nGênesis 15\nAbraão crê na promessa. Deus reafirma descendência e aliança.\nGênesis 17\nA aliança é reafirmada e Isaque é apresentado como parte da continuidade da\npromessa.\nGênesis 22\nA bênção às nações é novamente mencionada.\nGálatas 3\nPaulo relaciona a promessa feita a Abraão com o Evangelho e com Cristo.\nApocalipse\nEncontramos pessoas de todas as nações, povos e línguas diante de Deus.\nA promessa que começou com uma família se conecta a uma história que alcança povos do\nmundo inteiro.\n✝️ COMO ESTE ESTUDO SE RELACIONA COM CRISTO?\nO Novo Testamento faz essa conexão de maneira direta.\nEm Gálatas 3, Paulo volta à história de Abraão. Ele afirma que a Escritura anunciou\nantecipadamente que Deus justificaria os gentios pela fé e cita a promessa: as nações\nseriam abençoadas em Abraão.\nPaulo também relaciona a promessa da descendência a Cristo.\nAqui precisamos fazer uma distinção importante.\nUMA INTERPRETAÇÃO APOSTÓLICA IMPORTANTE\nPaulo e a “descendência” de Abraão\nEm Gálatas 3:16, Paulo interpreta a promessa feita a Abraão de maneira centrada em\nCristo. Ele relaciona a “descendência” prometida a Cristo.\nIsso não é uma interpretação criada pelo nosso estudo. É a própria interpretação\napresentada por Paulo no Novo Testamento.\nAo mesmo tempo, no livro de Gênesis a palavra “descendência” também aparece ligada à\nposteridade de Abraão de maneira coletiva. Portanto, devemos permitir que cada texto fale\ndentro do seu contexto.\nPodemos dizer com segurança\nGênesis apresenta uma promessa ligada à descendência de Abraão; Paulo,\nescrevendo aos Gálatas, mostra que o cumprimento maior dessa promessa\nconverge em Cristo.\n9. A bênção chega às nações por meio do Evangelho\nAgora o plano começa a ficar mais claro.\n• Em Gênesis: Abraão recebe a promessa.\n• Mais tarde: surge Israel.\n• Muito depois: Jesus nasce dentro dessa história.\n• Depois da morte e ressurreição de Cristo: o Evangelho é anunciado às nações.\nIsso ajuda a entender por que Mateus começa mostrando uma genealogia que liga Jesus a\nAbraão. Não é uma lista aleatória de nomes. Jesus aparece dentro da história da promessa.\nO QUE APRENDEMOS SOBRE DEUS?\n• Deus toma a iniciativa.\n• Chama pessoas para participar de seu propósito.\n• Faz promessas.\n• Permanece fiel apesar das limitações humanas.\n• Trabalha ao longo de gerações.\n• Não perde de vista as nações.\n• Pode realizar aquilo que parece humanamente impossível.\nUma verdade importante\nDeus trabalha com uma história longa.\nAbraão não viu pessoalmente todos os resultados finais da promessa. Mas a promessa\ncontinuou depois dele.\nO QUE APRENDEMOS SOBRE O SER HUMANO?\nAbraão nos mostra que a caminhada de fé envolve:\n• ouvir;\n• sair;\n• confiar;\n• esperar;\n• errar;\n• aprender;\n• continuar.\nA fé não significa conhecer antecipadamente cada detalhe. Também não significa nunca\nenfrentar perguntas.\nAbraão enfrentou longos períodos entre promessa e cumprimento.\nIsso é importante. Às vezes queremos: promessa hoje; cumprimento amanhã. A Bíblia\nfrequentemente mostra processos muito maiores.\nUMA PALAVRA IMPORTANTE: ALIANÇA\nEssa palavra aparecerá várias vezes na nossa Jornada.\nEm linguagem simples\nAliança é um compromisso sério estabelecido por Deus dentro de seu\nrelacionamento e propósito com pessoas.\nAo longo da Bíblia encontraremos diferentes alianças e promessas. Não precisamos\nentender todos os detalhes agora.\nNeste momento, basta perceber: Deus não está improvisando. Ele estabelece\ncompromissos e conduz a história segundo seu propósito."
          },
          {
            "key": "APLIQUE",
            "type": "APPLY",
            "order": 5,
            "sourceHeading": "❤️ APLIQUE À VIDA",
            "contentText": "1. Deus pode começar algo maior do que aquilo que conseguimos\nenxergar\nQuando Abraão parte, ele não vê Israel. Não vê Moisés. Não vê Davi. Não vê Jesus em\nBelém. Não vê a Igreja alcançando povos.\nMas sua obediência faz parte dessa história. Isso nos ensina humildade. Talvez nem sempre\nvejamos o tamanho daquilo que Deus fará através de uma vida obediente.\n2. Ser abençoado também envolve abençoar\nAbraão não recebe bênção apenas para acumulá-la. A promessa possui direção: bênção\nchegando a outros.\nIsso confronta uma fé baseada apenas em: “O que Deus pode me dar?”\nUma pergunta melhor\nComo aquilo que Deus colocou em minha vida pode servir também a outras\npessoas?\n3. Esperar também faz parte da fé\nEntre a promessa e o nascimento de Isaque existe tempo. Muito tempo. Abraão aprende\nque não controla o calendário de Deus.\nIsso não significa que toda espera pessoal seja necessariamente uma promessa específica\nde Deus. Precisamos evitar transformar nossos desejos em promessas bíblicas.\nMas quando Deus realmente prometeu algo em sua Palavra, podemos confiar em seu\ncaráter.\n4. Não tente ajudar Deus desobedecendo\nA história de Abraão e Hagar mostra como tentativas humanas de acelerar uma promessa\npodem trazer consequências dolorosas.\nExiste uma diferença entre agir com responsabilidade e tentar produzir pela desobediência\naquilo que Deus não mandou fazer.\nA fé não é passividade. Mas também não é manipular as coisas para obrigar Deus a cumprir\naquilo que queremos.\n5. A fé bíblica olha para quem prometeu\nAbraão não confia porque a situação parecia fácil. Em muitos momentos, parecia o\ncontrário.\nEle aprende a confiar porque Deus havia falado. Romanos 4 destaca justamente essa\ndimensão.\nA esperança não estava na capacidade humana de Abraão. Estava no Deus que prometeu."
          },
          {
            "key": "REFLECTION_QUESTIONS",
            "type": "REFLECTION_QUESTIONS",
            "order": 6,
            "sourceHeading": "❤️ PARA REFLETIR",
            "contentText": "• O que mais chama sua atenção na promessa de Gênesis 12:1-3?\n• Por que é importante que “todas as famílias da terra” apareçam já no início da história de\nAbraão?\n• Tenho pensado nas bênçãos de Deus apenas em benefício próprio?\n• Existe alguma área em que estou tentando controlar aquilo que deveria confiar a Deus?\n• Consigo distinguir uma promessa bíblica real de um desejo pessoal?\n• Como reajo quando existe tempo entre aquilo que espero e aquilo que acontece?\n• O que a história de Abraão me ensina sobre fé imperfeita, mas perseverante?"
          },
          {
            "key": "JOURNAL_PROMPT",
            "type": "JOURNAL_PROMPT",
            "order": 7,
            "sourceHeading": "Registrar no Diário",
            "contentText": "Tenho vivido apenas buscando bênçãos para mim, ou também permitindo que\nDeus use minha vida para abençoar outras pessoas?"
          },
          {
            "key": "PRAYER",
            "type": "PRAYER",
            "order": 8,
            "sourceHeading": "ORE",
            "contentText": "Oração sugerida\nSenhor, obrigado porque teu propósito é maior do que aquilo que consigo\nenxergar. Ensina-me a confiar na tua Palavra, esperar com paciência e não\ntentar substituir tua vontade pelos meus próprios atalhos. Usa minha vida para\nabençoar outras pessoas e ajuda-me a compreender cada vez melhor como tua\npromessa se cumpre em Cristo. Amém."
          },
          {
            "key": "KEEP",
            "type": "KEEP",
            "order": 9,
            "sourceHeading": "PARA GUARDAR",
            "contentText": "Gênesis 12:3\nLeia o versículo completo em sua Bíblia.\nPreste atenção especialmente à última parte da promessa: a bênção alcançaria todas as\nfamílias da terra.\nEssa frase será uma chave para compreender muitos acontecimentos que virão depois.\n♡ Adicionar aos Favoritos\nGuarde Gênesis 12:3 para acompanhar como essa promessa se desenvolve ao\nlongo da Jornada."
          },
          {
            "key": "CONTINUE_JOURNEY",
            "type": "CONTINUE_JOURNEY",
            "order": 10,
            "sourceHeading": "➡️ CONTINUE SUA JORNADA",
            "contentText": "Até aqui nossa linha está ficando mais clara:\nEstudo 01 - Criação\nDeus cria tudo muito bom.\nEstudo 02 - Queda\nO pecado entra e produz ruptura.\nEstudo 03 - Esperança\nO mal não terá a palavra final.\nEstudo 04 - Promessa\nDeus chama Abraão e anuncia bênção para as nações.\nMas agora existe uma pergunta. A família de Abraão crescerá. Seus descendentes formarão\num povo. E esse povo acabará vivendo em uma situação terrível: escravidão no Egito.\nComo a promessa continuará se o povo da promessa estiver preso?\nÉ nesse ponto que encontramos um dos maiores acontecimentos do Antigo Testamento.\nPróximo estudo\nEstudo 05 - Êxodo: libertação e redenção\nPergunta central: O que a libertação de Israel do Egito revela sobre a maneira\ncomo Deus salva?\nTextos principais: Êxodo 1-15\nNo próximo estudo veremos escravidão, clamor, Moisés, Páscoa, sangue, mar, libertação e\num povo aprendendo que não se libertou por sua própria força."
          }
        ],
        "terminalCompletion": null,
        "sourceAppendix": {
          "heading": "REFERÊNCIAS BÍBLICAS UTILIZADAS",
          "contentText": "Textos principais\nGênesis 12:1-3\nGênesis 15\nGênesis 17\nGênesis 22:15-18\nContexto\nGênesis 11:1-9\nConexões principais\nRomanos 4:1-5, 16-25\nGálatas 3:6-9, 16\nHebreus 11:8-12\nNOTA EDITORIAL IMPORTANTE\nNeste estudo procuramos distinguir três níveis.\n1. O que Gênesis afirma diretamente\n• Deus promete a Abraão terra.\n• Deus promete descendência.\n• Deus promete bênção.\n• Deus anuncia alcance às nações.\n2. O que o restante do Antigo Testamento desenvolverá\nA descendência de Abraão se tornará um povo dentro da história da aliança.\n3. O que o Novo Testamento interpreta\nEm Gálatas 3, Paulo apresenta uma leitura cristológica da promessa e relaciona seu\ncumprimento maior a Cristo e à bênção que alcança os gentios.\nEssa conexão foi apresentada como interpretação apostólica explícita, porque aparece\ndiretamente no texto do Novo Testamento, e não como uma associação criada\nposteriormente pelo estudo.\nTambém evitamos apresentar Abraão como um personagem perfeito. A própria narrativa\nbíblica registra suas fraquezas e decisões equivocadas.\nSTATUS EDITORIAL\nTrilha\nO Plano Eterno de Deus\nEstudo\n04/18 - Abraão e a promessa\nVersão\nRascunho 1 para revisão\nSituação\nDRAFT - aguardando revisão de conteúdo e revisão bíblica"
        },
        "normalization": {
          "removedForbiddenControlCharCount": 9,
          "removedPageHeaderLineCount": 44
        },
        "canonicalSource": {
          "lineCount": 325,
          "sha256": "A8991EFA46EE9D7F922485E1A96F20BDD711E8FAEB8932CEEC9EEF2CCE26EC4F",
          "preambleLines": [
            "TRILHA 1 • O PLANO ETERNO DE DEUS",
            "04 - Abraão e a promessa"
          ]
        },
        "continuity": {
          "expectedNextStudyNumber": 5,
          "detectedNextStudyNumber": 5,
          "nextStudyId": "track-01-study-05",
          "terminal": false,
          "evidenceKind": "EXPLICIT_NUMBER",
          "valid": true
        },
        "quality": {
          "forbiddenControlCharCount": 0,
          "pageHeaderLeakCount": 0,
          "questionSemanticLeakCount": 0,
          "objectiveSemanticLeakCount": 0,
          "continueAppendixLeakCount": 0,
          "profileMarkerSetMatch": true,
          "structuredSectionCountMatch": true,
          "nextStudyIdValid": true,
          "terminalCompletionValid": null
        }
      },
    },
    {
      approvedCandidateSha256: "4AA4C3122CA3C67A8798EEA1AF619B7EDE358FB974C8BC3F565B4316D6D40F94",
      payload: {
        "schema": "P17-P2-A10-R2-R1-R1_TRACK1_BATCH_SIMULATION_CANDIDATE_V1",
        "readinessOnly": true,
        "runtimePayload": false,
        "batch": {
          "id": "B01_TRACK_01",
          "sequence": 1,
          "trackNumber": 1,
          "expectedTrackStudyCount": 18,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "source": {
          "relativePath": "trilha_01\\Biblia_Jornada_Estudo_05_Exodo_Libertacao_E_Redencao.pdf",
          "bytes": 972897,
          "sha256": "035721647B7A9C9C4E2AD3D7EE4934528B63BBE114E8EFB850C96DB612FE6C77",
          "pageCount": 13,
          "extractedCharacterCount": 20701,
          "expectedExtractedCharacterCount": 20701,
          "extractedTextSha256": "B47F6E0000DE963008C3F734B438082EA074D3FAF6F4CB83E131B9AACDBEB1E9",
          "a5NormalizedTextSha256": "1F134D07FF44897EA964CE38CE225A04C5C4C4A3D0FC64AD2A3DEC2F51A68B8A"
        },
        "study": {
          "id": "track-01-study-05",
          "trackId": "track-01",
          "number": 5,
          "slug": "exodo-libertacao-e-redencao",
          "questionCentral": "O que a libertação de Israel do Egito revela sobre a maneira como Deus salva?",
          "primaryTexts": "Êxodo 1-15 Leituras-chave Êxodo 2:23-25 • 3:7-10 • 6:2-8 • 12:1-32 • 14:10-31 • 15:1-18",
          "complementaryReadings": "Gênesis 15:13-16 • Salmos 105:23-45 • 1 Coríntios 5:7 • 10:1-4 • Hebreus 11:28-29 • 1 Pedro 1:18-19",
          "estimatedTime": "15-20 minutos",
          "objective": "Ao final, queremos compreender seis verdades principais: • A escravidão no Egito não significa que Deus tenha esquecido a promessa feita a Abraão. • Deus vê o sofrimento, ouve o clamor e age na história. • A libertação de Israel acontece principalmente pela ação e pelo poder de Deus, e não pela força do próprio povo. • A Páscoa marca uma noite de juízo e, ao mesmo tempo, de livramento. • Deus não tira Israel do Egito simplesmente para deixá-lo sem direção: Ele o liberta para ser seu povo. • O Novo Testamento usa acontecimentos do Êxodo para ajudar os cristãos a compreender aspectos da obra de Cristo e da salvação.",
          "openingTakeaway": "Na Bíblia, redenção não é apenas sair de alguma coisa. É ser resgatado para pertencer a Deus e viver segundo seu propósito.",
          "editorialStatus": "DRAFT",
          "published": false,
          "runtimeEligible": false,
          "nextStudyId": "track-01-study-06",
          "terminal": false,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "sourceDeclaredProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "expectedProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkerCount": 12,
        "structuredSectionCount": 10,
        "sections": [
          {
            "key": "LEIA",
            "type": "READ",
            "order": 1,
            "sourceHeading": "LEIA",
            "contentText": "Êxodo 1-15 é uma parte extensa da Bíblia. Se possível, leia os capítulos completos durante\nsua Jornada.\nPara este estudo, concentre-se especialmente nas seguintes passagens:\n• Êxodo 2:23-25: o povo geme debaixo da escravidão e clama.\n• Êxodo 3:7-10: Deus diz que viu a aflição do povo e ouviu seu clamor.\n• Êxodo 6:2-8: Deus reafirma sua aliança e anuncia que libertará Israel.\n• Êxodo 12: a primeira Páscoa e a saída do Egito.\n• Êxodo 14: Israel diante do mar e a grande libertação.\n• Êxodo 15: o povo responde cantando ao Senhor.\nPergunta para acompanhar a leitura\nNão enxergue apenas uma sequência de milagres. Pergunte: O que Deus está\nfazendo e por quê?"
          },
          {
            "key": "OBSERVE",
            "type": "OBSERVE",
            "order": 2,
            "sourceHeading": "OBSERVE NO TEXTO",
            "contentText": "• Como os israelitas passam a ser tratados no Egito?\n• O crescimento do povo significa que eles estavam livres?\n• O que Êxodo 2:23-25 diz que Deus ouviu e lembrou?\n• Em Êxodo 3, o que Deus diz ter visto?\n• Quem toma a iniciativa de libertar Israel?\n• Qual papel Moisés recebe nessa missão?\n• O que Faraó repete várias vezes diante da ordem de Deus?\n• O que as pragas revelam sobre o confronto entre Deus e o poder do Egito?\n• O que as famílias israelitas deveriam fazer na noite da Páscoa?\n• O sangue nas portas funcionava como um objeto mágico ou estava ligado à ordem dada por\nDeus?\n• Como Israel reage quando vê o exército egípcio se aproximando?\n• Quem abre o caminho através do mar?\n• O que acontece depois que Israel atravessa?\n• Para quem o povo dirige seu cântico em Êxodo 15?\n• O Êxodo termina exaltando a capacidade de Israel ou a ação de Deus?\nIdeia-chave\nIsrael estava preso, mas Deus não estava impedido de agir."
          },
          {
            "key": "ENTENDA",
            "type": "UNDERSTAND",
            "order": 3,
            "sourceHeading": "ENTENDA",
            "contentText": "1. A promessa parece estar ameaçada\nNo estudo anterior vimos Deus prometendo a Abraão descendência, terra, bênção e alcance\nàs nações.\nAgora abrimos Êxodo e encontramos os descendentes de Abraão no Egito. Eles se\nmultiplicaram, mas estão escravizados.\nUm novo Faraó os trata como ameaça. O povo sofre trabalhos pesados, perseguição e uma\nordem de morte contra meninos hebreus.\nÀ primeira vista, parece uma contradição: como o povo da promessa pode estar\nescravizado?\nMas Gênesis 15:13-16 já havia mostrado que esse período não pegaria Deus de surpresa. A\ndificuldade da história não cancelou a promessa.\n2. Deus ouve o clamor\nÊxodo 2:23-25 é uma passagem fundamental. O povo geme, clama e Deus ouve.\nO texto também diz que Deus se lembra de sua aliança com Abraão, Isaque e Jacó.\nQuando a Bíblia diz que Deus “se lembrou”, não significa que Ele havia esquecido e\nrecuperou uma informação perdida. A narrativa mostra Deus agindo concretamente em\nfidelidade à aliança.\nÊxodo 3 reforça isso: Deus viu, ouviu, conhece o sofrimento e desce para libertar.\nVerdade importante\nO Deus do Êxodo não aparece distante e indiferente. Ele vê a situação de seu\npovo e entra na história para agir.\n3. Deus chama Moisés, mas Moisés não é o salvador principal da\nhistória\nMoisés ocupa um papel enorme no livro de Êxodo. Deus o chama, envia-o a Faraó, ele fala,\nconduz o povo e intercede.\nMas observe quem realiza a libertação. Deus diz repetidamente: Eu vos tirarei. Eu vos\nlivrarei. Eu vos resgatarei. Eu vos tomarei por meu povo.\nA libertação não é apresentada como uma revolução militar hebraica vencendo o Egito.\nResumo\nMoisés é instrumento. Deus é o Libertador.\n4. A ordem de Deus confronta diretamente o domínio de Faraó\nA mensagem levada a Faraó é clara: deixe o povo ir. Mas Faraó resiste.\nO Egito era uma grande potência. Faraó possuía autoridade política, econômica e militar.\nIsrael não.\nAs pragas mostram progressivamente que Faraó não consegue impedir a ação de Deus. O\nrio, a terra, os animais, a produção, a saúde, a luz e a vida são atingidos.\nMensagem principal\nO poder humano não consegue ocupar o lugar de Deus.\n5. E o endurecimento do coração de Faraó?\nEssa passagem frequentemente gera debates. O livro de Êxodo usa diferentes expressões:\nem alguns momentos Faraó endurece seu coração; em outros seu coração permanece\nendurecido; e em outros Deus endurece o coração de Faraó.\nExistem diferentes discussões teológicas sobre como compreender todos os detalhes dessa\nrelação entre responsabilidade humana e ação divina.\nO que podemos afirmar sem entrar na polêmica?\nO texto apresenta Faraó como alguém que resiste repetidamente à ordem de\nDeus, mesmo diante de oportunidades e sinais. Ao mesmo tempo, mostra Deus\nexercendo soberania e trazendo juízo sobre essa resistência.\nNosso estudo não precisa resolver aqui todas as discussões sobre liberdade humana e\nsoberania divina. Podemos permanecer no ponto claro da narrativa: Faraó resiste a Deus, e\nsua resistência não consegue impedir o propósito de Deus.\n6. A Páscoa acontece em uma noite de juízo\nÊxodo 12 é uma das passagens mais importantes do Antigo Testamento.\nDeus anuncia o último juízo sobre o Egito: a morte dos primogênitos. É um texto sério e\ndifícil. Não devemos transformá-lo em uma história infantil sem peso.\nO Êxodo apresenta Deus julgando uma nação que havia mantido Israel em dura escravidão e\ncuja liderança havia ordenado a morte dos filhos dos hebreus.\nAo mesmo tempo, Israel recebe instruções específicas para aquela noite: cada família\ndeveria separar um cordeiro, prepará-lo conforme a orientação dada e colocar o sangue nos\nlugares indicados das portas.\nUMA PALAVRA IMPORTANTE: PÁSCOA\nO nome está ligado ao ato de Deus passar por cima/poupar as casas identificadas conforme\nsua ordem naquela noite.\nPor isso, a Páscoa nasce como memorial de:\n• juízo;\n• livramento;\n• libertação;\n• memória.\nMemória de Israel\nNós éramos escravos e Deus nos tirou daqui.\nA festa não deveria celebrar a força do povo. Deveria celebrar a ação de Deus.\n7. O sangue não é apresentado como magia\nÉ importante evitar uma interpretação supersticiosa.\nO sangue na porta não funcionava porque possuía uma espécie de poder mágico\nindependente. O povo estava obedecendo à instrução específica dada por Deus.\nO sinal estava inserido dentro de uma promessa de livramento. O centro continua sendo:\nDeus falou; o povo deveria confiar; e agir conforme a ordem recebida.\n8. Depois da Páscoa, Israel finalmente sai\nFaraó permite a partida. Depois de gerações de escravidão, Israel deixa o Egito.\nMas Faraó muda novamente de atitude e envia seu exército atrás do povo.\nIsrael fica entre o exército egípcio e o mar. Humanamente, a situação parece sem saída.\n9. Israel não abre o mar\nÊxodo 14 não apresenta o povo descobrindo uma saída por inteligência militar. Eles estão\ncom medo, reclamam e questionam Moisés.\nEntão Deus abre o caminho. Moisés participa conforme a ordem recebida, mas o poder que\ncria a passagem não vem de Israel.\nEles atravessam em segurança. Quando o exército egípcio tenta seguir, ocorre o juízo.\nMensagem central\nA salvação do povo naquele momento depende da ação de Deus."
          },
          {
            "key": "CONECTE",
            "type": "CONNECT",
            "order": 4,
            "sourceHeading": "CONECTE AS ESCRITURAS",
            "contentText": "Gênesis 15\nDeus anuncia que os descendentes de Abraão sofreriam opressão, mas seriam\nlibertos.\nÊxodo 2-6\nO povo clama. Deus ouve. Deus lembra de sua aliança e anuncia libertação.\nÊxodo 12\nA Páscoa marca juízo e livramento.\nÊxodo 14\nDeus abre caminho onde Israel não tinha capacidade de criar um.\nÊxodo 15\nO povo celebra aquilo que o Senhor fez.\nResto do Antigo Testamento\nO Êxodo passa a ser lembrado como uma das maiores demonstrações da\nfidelidade e do poder de Deus.\nA frase “Eu sou o Senhor que te tirei da terra do Egito” se tornará parte fundamental da\nidentidade de Israel.\n10. A libertação não termina simplesmente com “vocês agora\npodem fazer qualquer coisa”\nDeus não liberta Israel para dizer: agora vocês estão livres de Faraó; façam o que quiserem.\nEm Êxodo 6:7, Deus declara: Eu vos tomarei por meu povo.\nA libertação possui destino. Israel sai do domínio de Faraó para viver como povo de Deus.\nRedenção\nRedenção não é somente liberdade de um senhor antigo. É libertação para uma\nnova relação com Deus.\nCOMO ESTE ESTUDO SE RELACIONA COM CRISTO?\nAqui precisamos distinguir cuidadosamente o sentido original do Êxodo e a maneira como o\nNovo Testamento utiliza seus temas.\nPrimeiro: o Êxodo é um acontecimento real dentro da história de Israel. Seu sentido imediato\né a libertação dos israelitas da escravidão no Egito.\nNão devemos transformar cada objeto, detalhe ou personagem do livro em um símbolo\nsecreto de Jesus.\nSegundo: o próprio Novo Testamento estabelece algumas conexões com Cristo e a vida\ncristã. Essas conexões, sim, podemos apresentar com segurança.\nUMA INTERPRETAÇÃO APOSTÓLICA EXPLÍCITA\n“Cristo, nossa Páscoa”\nEm 1 Coríntios 5:7, Paulo chama Cristo de “nossa Páscoa”.\nIsso cria uma ligação cristã explícita entre Jesus e o tema pascal.\nPaulo não está dizendo que todos os detalhes de Êxodo 12 escondiam significados secretos.\nMas ele usa a Páscoa como uma importante chave para compreender Cristo.\nAssim como a primeira Páscoa envolvia juízo, morte e livramento, o Novo Testamento\napresenta a morte de Cristo dentro da obra de salvação.\n11. Pedro também usa linguagem de resgate e sangue\n1 Pedro 1:18-19 fala aos cristãos sobre terem sido resgatados e relaciona esse resgate ao\nprecioso sangue de Cristo.\nPedro usa a imagem de um cordeiro sem defeito. Isso se encaixa dentro de uma grande\nlinguagem bíblica de resgate, sacrifício e redenção.\nPrecisamos evitar afirmar que Pedro está explicando exclusivamente Êxodo 12 nesse texto.\nMas existe uma relação clara entre a linguagem bíblica do cordeiro, do sangue e da\nredenção.\n12. Paulo também relaciona a travessia do mar à experiência do\npovo de Deus\nEm 1 Coríntios 10:1-4, Paulo relembra a nuvem, o mar, Moisés, o alimento e a água.\nEle utiliza a experiência de Israel como advertência e ensino para a Igreja e emprega\nlinguagem relacionada ao batismo ao descrever a experiência de Israel com Moisés na\nnuvem e no mar.\nAtenção\nIsso não significa que devemos simplesmente afirmar que a travessia do Mar\nVermelho é exatamente o batismo cristão. Paulo utiliza o acontecimento como\ncomparação e instrução dentro da argumentação de 1 Coríntios 10.\n13. A redenção do Êxodo prepara uma linguagem que atravessa a\nBíblia\nDepois do Êxodo, palavras e ideias como resgatar, libertar, salvar, tirar da escravidão e\npertencer a Deus ganham grande força na história bíblica.\nO Êxodo se torna uma memória fundamental para Israel: O Deus que servimos é o Deus que\nnos tirou da escravidão.\nQuando chegarmos ao Novo Testamento, veremos essa linguagem sendo usada para\nexplicar uma libertação ainda mais profunda: a libertação do pecado e da morte.\nO QUE APRENDEMOS SOBRE DEUS?\n• Deus vê a aflição.\n• Ouve o clamor.\n• Conhece o sofrimento.\n• Permanece fiel à sua aliança.\n• Chama pessoas para participar de sua obra.\n• Confronta a opressão.\n• Julga o mal.\n• Possui poder sobre estruturas humanas.\n• Abre caminhos impossíveis ao povo.\n• Liberta.\n• Deseja formar para si um povo.\nResumo\nDeus não apenas promete salvação; Ele age para salvar.\nO QUE APRENDEMOS SOBRE O SER HUMANO?\n• Pode clamar em sofrimento.\n• Pode sentir medo.\n• Pode duvidar mesmo depois de ver sinais.\n• Pode reclamar diante das dificuldades.\n• Depende de uma libertação que não consegue produzir sozinho.\n• Precisa aprender a confiar depois de ser libertado.\nIsso será importante. Sair do Egito acontece em uma noite. Tirar o Egito do coração do povo\nserá um processo muito mais longo.\nA liberdade física não significa que Israel já aprendeu automaticamente a viver como povo\nde Deus.\nO QUE É REDENÇÃO?\nJá introduzimos essa palavra no estudo anterior. Agora ela ganha uma imagem concreta.\nDefinição simples\nRedenção é uma ação de resgate e libertação realizada para tirar alguém de uma\ncondição de domínio e trazê-lo para uma nova realidade.\nNo Êxodo: Israel era escravo de Faraó. Deus o liberta. Israel passa a ser chamado povo de\nDeus.\nNo Novo Testamento, essa linguagem será usada para explicar a obra salvadora de Cristo.\nImportante\nO Êxodo não é o Evangelho completo, mas fornece uma linguagem muito\nimportante para compreendermos a salvação."
          },
          {
            "key": "APLIQUE",
            "type": "APPLY",
            "order": 5,
            "sourceHeading": "APLIQUE À VIDA",
            "contentText": "1. Deus não é indiferente ao sofrimento\nIsrael geme. Deus ouve. Isso não significa que toda situação difícil será resolvida\nimediatamente da maneira que imaginamos.\nIsrael sofreu por muito tempo antes da libertação. Mas a Bíblia não apresenta Deus como\nalguém incapaz de enxergar o sofrimento humano. Podemos levar nosso clamor a Ele.\n2. Nem toda demora significa abandono\nTalvez um israelita tivesse perguntado: “Onde está a promessa feita a Abraão?” A\nescravidão parecia contradizer tudo.\nMas Deus ainda estava conduzindo a história.\nPrecisamos ter cuidado para não transformar qualquer desejo pessoal em promessa de\nDeus. Mas aquilo que Deus realmente prometeu em sua Palavra continua digno de\nconfiança.\n3. Existem coisas das quais não conseguimos nos libertar apenas\ncom força de vontade\nIsrael não derrotou Faraó por motivação pessoal.\nExistem situações espirituais em que precisamos reconhecer nossa dependência de Deus.\nEspecialmente quando falamos do pecado, o Novo Testamento não apresenta salvação\ncomo simples: “Tente ser uma pessoa melhor.” Existe uma obra de Deus que precisamos\nreceber.\n4. Liberdade não significa ausência de direção\nÀs vezes pensamos: “Ser livre significa ninguém dizer o que devo fazer.”\nO Êxodo apresenta outra perspectiva. Israel é libertado do domínio de Faraó para viver sob a\ndireção de Deus.\nLiberdade bíblica\nLiberdade não é simplesmente fazer qualquer coisa. É também ser livre para\nviver aquilo para o qual Deus nos chamou.\n5. Nunca esqueça de onde Deus tirou você\nA Páscoa se torna memória. Israel deveria contar essa história às próximas gerações.\nA memória da graça protege contra a ilusão de autossuficiência.\nTambém podemos lembrar: Quem eu era? O que Deus fez? O que tenho recebido pela\ngraça? Isso produz gratidão."
          },
          {
            "key": "REFLECTION_QUESTIONS",
            "type": "REFLECTION_QUESTIONS",
            "order": 6,
            "sourceHeading": "PARA REFLETIR",
            "contentText": "• O que mais chamou sua atenção na forma como Deus responde ao sofrimento de Israel?\n• Por que a expressão “Deus ouviu” é importante nesse contexto?\n• O que o confronto com Faraó ensina sobre o poder humano?\n• Tenho confundido liberdade com viver sem qualquer direção?\n• Existe alguma área em que estou tentando me libertar apenas pela minha própria força?\n• Que atitudes de Israel diante do mar também aparecem em mim quando sinto medo?\n• Tenho cultivado memória das coisas que Deus já fez?\n• O que significa para mim ser libertado para pertencer a Deus?"
          },
          {
            "key": "JOURNAL_PROMPT",
            "type": "JOURNAL_PROMPT",
            "order": 7,
            "sourceHeading": "Registrar no Diário",
            "contentText": "De qual tipo de escravidão, medo ou maneira antiga de viver preciso parar de\ntentar escapar sozinho e aprender a depender de Deus?"
          },
          {
            "key": "PRAYER",
            "type": "PRAYER",
            "order": 8,
            "sourceHeading": "ORE",
            "contentText": "Oração sugerida\nSenhor, Tu és o Deus que vê, ouve e age. Obrigado porque a tua Palavra mostra\nque o teu poder é maior do que aquilo que escraviza e oprime. Ensina-me a\nconfiar em ti, reconhecer minha dependência e viver não apenas buscando\nliberdade, mas desejando pertencer a ti e cumprir teu propósito. Ajuda-me a\nlembrar da tua graça e a caminhar em obediência. Amém."
          },
          {
            "key": "KEEP",
            "type": "KEEP",
            "order": 9,
            "sourceHeading": "PARA GUARDAR",
            "contentText": "Êxodo 6:6-7\nLeia esses versículos completos em sua Bíblia.\nObserve os verbos que Deus usa: tirar, livrar, resgatar, tomar por povo.\nEles resumem muito bem o movimento deste estudo.\nAdicionar aos Favoritos\nDeus não anuncia apenas saída da escravidão. Ele anuncia relacionamento."
          },
          {
            "key": "CONTINUE_JOURNEY",
            "type": "CONTINUE_JOURNEY",
            "order": 10,
            "sourceHeading": "CONTINUE SUA JORNADA",
            "contentText": "Estudo 01 - Criação\nDeus cria tudo muito bom.\nEstudo 02 - Queda\nO pecado entra e produz ruptura.\nEstudo 03 - Esperança\nO mal não terá a palavra final.\nEstudo 04 - Promessa\nDeus chama Abraão e anuncia bênção para as nações.\nEstudo 05 - Redenção\nDeus tira os descendentes de Abraão da escravidão e os toma para si como povo.\nMas surge outra pergunta: Depois de libertar Israel, como esse povo deveria viver?\nEles conheceram a escravidão. Agora precisam aprender quem é Deus, como se relacionar\ncom Ele, como viver em comunidade, o que é santo, o que é justo e como um povo redimido\ndeve agir.\nPróximo estudo\nEstudo 06 - A Lei e a santidade de Deus\nPergunta central: Se Deus já havia libertado Israel do Egito, por que Ele lhe deu a\nLei?\nTextos principais: Êxodo 19-20 • Deuteronômio 6:1-9 • Levítico 19:1-18\nNo próximo estudo veremos uma ordem muito importante: Israel não obedece para\nconquistar a libertação do Egito. A Lei é dada a um povo que já havia sido libertado."
          }
        ],
        "terminalCompletion": null,
        "sourceAppendix": {
          "heading": "REFERÊNCIAS BÍBLICAS UTILIZADAS",
          "contentText": "Textos principais\nÊxodo 1-15\nPassagens-chave\nÊxodo 2:23-25\nÊxodo 3:7-10\nÊxodo 6:2-8\nÊxodo 12:1-32\nÊxodo 14:10-31\nÊxodo 15:1-18\nContexto anterior\nGênesis 15:13-16\nConexões posteriores\nSalmos 105:23-45\n1 Coríntios 5:7\n1 Coríntios 10:1-4\nHebreus 11:28-29\n1 Pedro 1:18-19\nNOTA EDITORIAL IMPORTANTE\nPara manter fidelidade bíblica, este estudo fez algumas distinções importantes.\n1. Êxodo e a salvação cristã\nA libertação do Egito foi apresentada primeiro em seu sentido histórico: Deus libertou Israel\nda escravidão egípcia.\nDepois foram apresentadas somente conexões cristãs que possuem apoio explícito no Novo\nTestamento.\n2. Cristo e a Páscoa\nA relação entre Cristo e a Páscoa não foi criada pelo estudo. 1 Coríntios 5:7 chama\nexplicitamente Cristo de nossa Páscoa.\nPor isso essa conexão foi apresentada como interpretação apostólica explícita.\n3. O sangue nas portas\nNão foi tratado como objeto mágico nem foram atribuídos ao sangue significados que Êxodo\n12 não apresenta diretamente.\nO sinal fazia parte da ordem e da promessa de Deus naquela noite.\n4. Faraó e o endurecimento do coração\nReconhecemos que o texto fala tanto da responsabilidade e resistência de Faraó quanto da\nação soberana de Deus.\nComo existem diferentes discussões teológicas sobre a relação entre esses elementos, o\nestudo não adotou uma explicação polêmica como se fosse a única leitura possível.\nPonto claro da narrativa\nFaraó resiste repetidamente, Deus traz juízo, e a resistência humana não\nconsegue impedir o propósito divino.\n5. A travessia do mar e o batismo\n1 Coríntios 10 utiliza linguagem relacionada ao batismo ao relembrar Israel na nuvem e no\nmar.\nO estudo não afirmou que a travessia é simplesmente idêntica ao batismo cristão. A conexão\nfoi mantida dentro da comparação feita pelo próprio apóstolo Paulo.\nSTATUS EDITORIAL\nTrilha\nO Plano Eterno de Deus\nEstudo\n05/18 - Êxodo: libertação e redenção\nVersão\nRascunho 1 para revisão\nSituação\nDRAFT - aguardando revisão de conteúdo e revisão bíblica"
        },
        "normalization": {
          "removedForbiddenControlCharCount": 0,
          "removedPageHeaderLineCount": 52
        },
        "canonicalSource": {
          "lineCount": 387,
          "sha256": "BDB2366EF0DD06D54C6567C7D1038117847328AF07DD0B0345FEBBBE1FA344D0",
          "preambleLines": [
            "TRILHA 1 • O PLANO ETERNO DE DEUS",
            "05 - Êxodo: libertação e redenção"
          ]
        },
        "continuity": {
          "expectedNextStudyNumber": 6,
          "detectedNextStudyNumber": 6,
          "nextStudyId": "track-01-study-06",
          "terminal": false,
          "evidenceKind": "EXPLICIT_NUMBER",
          "valid": true
        },
        "quality": {
          "forbiddenControlCharCount": 0,
          "pageHeaderLeakCount": 0,
          "questionSemanticLeakCount": 0,
          "objectiveSemanticLeakCount": 0,
          "continueAppendixLeakCount": 0,
          "profileMarkerSetMatch": true,
          "structuredSectionCountMatch": true,
          "nextStudyIdValid": true,
          "terminalCompletionValid": null
        }
      },
    },
    {
      approvedCandidateSha256: "51E5EBB2EB777591063CDDF8C10E13ADBF3296658D126B42C8EF82BA9FA17D38",
      payload: {
        "schema": "P17-P2-A10-R2-R1-R1_TRACK1_BATCH_SIMULATION_CANDIDATE_V1",
        "readinessOnly": true,
        "runtimePayload": false,
        "batch": {
          "id": "B01_TRACK_01",
          "sequence": 1,
          "trackNumber": 1,
          "expectedTrackStudyCount": 18,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "source": {
          "relativePath": "trilha_01\\Biblia_Jornada_Estudo_06_A_Lei_E_A_Santidade_De_Deus.pdf",
          "bytes": 983506,
          "sha256": "9AF17810D92B0519074F763DDE805105F652D21E6624B9B5B906F2F550D5B024",
          "pageCount": 12,
          "extractedCharacterCount": 21337,
          "expectedExtractedCharacterCount": 21337,
          "extractedTextSha256": "3FD48D9F7E72140FB77FDEBAB8C9F8E41E15B7347FC2C8EBFD038A1F43C9D8A8",
          "a5NormalizedTextSha256": "D76F53EADF8E7160D65BE7E353B808F4344A131423BCFAC328DD5FE75B898A29"
        },
        "study": {
          "id": "track-01-study-06",
          "trackId": "track-01",
          "number": 6,
          "slug": "a-lei-e-a-santidade-de-deus",
          "questionCentral": "Se Deus ja havia libertado Israel do Egito, por que Ele lhe deu a Lei?",
          "primaryTexts": "Exodo 19-20 | Deuteronomio 6:1-9 | Levitico 19:1-18",
          "complementaryReadings": "Exodo 24:1-8 | Deuteronomio 10:12-13 | Salmos 19:7-11 | Mateus 5:17-20 | 22:34-40 | Romanos 7:12 | 13:8-10",
          "estimatedTime": "15-20 minutos",
          "objective": "Ao final, queremos compreender seis verdades principais: • Deus entrega sua Lei a um povo que ja havia sido libertado do Egito. • A Lei faz parte da alianca de Deus com Israel e ensina como esse povo deveria viver diante dele. • Os mandamentos revelam que Deus e santo e que sua vontade alcanca tanto a adoracao quanto a vida cotidiana. • Amar a Deus e amar o proximo nao sao ideias criadas no Novo Testamento: ja aparecem no coracao da Lei. • A Lei tambem evidencia a seriedade do pecado e a incapacidade humana de viver perfeitamente segundo a vontade de Deus. • Jesus nao trata a Lei como algo sem valor; Ele a leva ao seu cumprimento e mostra seu centro no amor a Deus e ao proximo. Guarde desde o comeco Primeiro Deus liberta Israel. Depois ensina Israel a viver como povo libertado.",
          "openingTakeaway": "",
          "editorialStatus": "DRAFT",
          "published": false,
          "runtimeEligible": false,
          "nextStudyId": "track-01-study-07",
          "terminal": false,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "sourceDeclaredProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "expectedProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkerCount": 12,
        "structuredSectionCount": 10,
        "sections": [
          {
            "key": "LEIA",
            "type": "READ",
            "order": 1,
            "sourceHeading": "LEIA",
            "contentText": "Leia primeiro Exodo 19 e 20.\nDepois leia Deuteronomio 6:1-9 e Levitico 19:1-18.\nAo fazer isso, observe que a Lei nao aparece antes do Exodo. Israel ja havia clamado, sido tirado do Egito,\natravessado o mar e visto o poder de Deus. Somente depois o povo chega ao monte Sinai.\nPergunta que orienta a leitura\nComo um povo que pertence a Deus deve viver?"
          },
          {
            "key": "OBSERVE",
            "type": "OBSERVE",
            "order": 2,
            "sourceHeading": "OBSERVE NO TEXTO",
            "contentText": "• O que Deus recorda a Israel em Exodo 19:4?\n• Deus comeca falando sobre aquilo que Israel fez por Ele ou sobre aquilo que Ele fez por Israel?\n• Como Deus descreve aquilo que deseja que Israel seja entre as nacoes?\n• O que acontece antes de os Dez Mandamentos serem anunciados?\n• Como comeca Exodo 20?\n• Qual acontecimento Deus relembra antes de dizer “nao teras outros deuses”?\n• Os mandamentos tratam somente de culto?\n• Existem mandamentos relacionados a familia, vida, casamento, propriedade, verdade e desejos?\n• Em Deuteronomio 6, qual deve ser a atitude de Israel diante de Deus?\n• O ensino deveria ficar restrito ao templo ou fazer parte da vida familiar?\n• Em Levitico 19, por que o povo e chamado a ser santo?\n• O que Levitico 19:18 ensina sobre o proximo?\n• A santidade aparece somente em cerimonias religiosas ou tambem na maneira de tratar pessoas?\nPergunta para todo o estudo\nQue tipo de vida combina com um povo que foi resgatado por Deus?"
          },
          {
            "key": "ENTENDA",
            "type": "UNDERSTAND",
            "order": 3,
            "sourceHeading": "ENTENDA",
            "contentText": "1. A Lei vem depois da libertacao\nEssa talvez seja a verdade mais importante deste estudo.\nAntes de dar os Dez Mandamentos, Deus lembra Israel: Eu tirei voces do Egito.\nA ordem da historia e: escravidao -> libertacao -> alianca -> Lei.\nNao e: Lei -> obediencia perfeita -> libertacao do Egito.\nIsrael nao recebe os mandamentos para conquistar retroativamente sua saida do Egito. Deus ja havia agido.\nIsso nao torna a obediencia sem importancia. Pelo contrario. A obediencia agora aparece como resposta de\num povo que foi chamado para pertencer a Deus.\nResumo\nDeus nao diz: “Obedecam para que eu talvez os tire do Egito.” Ele diz, em essencia: “Eu os tirei\ndo Egito; agora aprendam a viver como meu povo.”\n2. A Lei faz parte de uma alianca\nNo estudo sobre Abraao encontramos a palavra alianca. Agora ela aparece novamente.\nNo Sinai, Deus estabelece uma relacao de alianca com Israel como povo.\nExodo 19 mostra Deus dizendo que Israel seria sua propriedade especial, reino de sacerdotes e nacao santa.\nIsso significa que Israel teria uma identidade e uma responsabilidade. Nao deveria simplesmente copiar as\npraticas das nacoes ao redor.\nO povo que havia sido separado para Deus precisava aprender a viver de maneira coerente com quem Deus\ne.\nUMA PALAVRA IMPORTANTE: SANTIDADE\nA palavra “santo” pode parecer complicada. Mas podemos comecar de forma simples.\nSer santo envolve a ideia de: ser separado para Deus; pertencer a Ele; viver de maneira coerente com seu\ncarater e vontade.\nLevitico 19 comeca com uma ordem forte: o povo deveria ser santo porque Deus e santo.\nIsso significa que a santidade nao comeca com preferencias humanas. Ela comeca em Deus.\nDeus e o padrao\nSantidade biblica nasce de quem Deus e.\n3. Santidade nao e apenas “parecer religioso”\nQuando algumas pessoas escutam “santidade”, pensam apenas em roupas, costumes, aparencia e regras\nexternas.\nMas leia Levitico 19. A santidade alcanca muitas areas.\n• relacionamento com os pais;\n• idolatria;\n• cuidado com pobres e estrangeiros;\n• honestidade;\n• roubo;\n• mentira;\n• exploracao de trabalhadores;\n• tratamento de pessoas vulneraveis;\n• justica;\n• fofoca e difamacao;\n• odio;\n• vinganca;\n• amor ao proximo.\nVerdade importante\nNa Biblia, santidade nao e apenas aquilo que uma pessoa faz durante o culto. Tambem envolve\na maneira como ela trata outras pessoas.\n4. Os Dez Mandamentos comecam com Deus\nExodo 20 nao comeca com o ser humano. Comeca com Deus se apresentando.\nEle lembra sua acao: Eu sou o Senhor... que te tirei da terra do Egito. Depois vem os mandamentos.\nOs primeiros tratam diretamente da relacao com Deus: nao ter outros deuses; nao fazer idolos para\nadoracao; nao usar o nome de Deus de maneira indevida; guardar o dia de descanso conforme a alianca\ndada a Israel.\nDepois aparecem mandamentos ligados as relacoes humanas: honrar pai e mae; nao matar; nao adulterar;\nnao furtar; nao dar falso testemunho; nao cobicar.\nA Lei conecta\nAdoracao e vida cotidiana.\n5. A Lei alcanca ate os desejos\nO ultimo dos Dez Mandamentos merece atencao. “Nao cobicar” nao trata apenas de uma acao externa.\nTrata de algo que acontece dentro da pessoa.\nIsso mostra que a vontade de Deus nao esta interessada apenas em comportamento visivel. O problema\nhumano tambem envolve desejos, motivacoes e intencoes.\nMais tarde, Jesus aprofundara fortemente esse ponto ao ensinar que pecado nao deve ser tratado apenas\ncomo aquilo que conseguimos enxergar externamente.\n6. A Lei deveria fazer parte da vida diaria\nDeuteronomio 6 mostra que a Palavra de Deus nao deveria aparecer apenas em momentos religiosos.\nO povo deveria guardar essas palavras no coracao, ensina-las aos filhos, conversar sobre elas em casa,\nlembrar delas ao sair, ao deitar e ao levantar.\nEm linguagem atual\nA fe nao deveria ficar limitada a algumas horas da semana.\nDeus deveria fazer parte da vida cotidiana de Israel. Isso combina profundamente com a proposta do Biblia\nJornada: a Palavra acompanhando a pessoa durante sua caminhada diaria.\n7. O maior mandamento ja estava na Lei\nEm Deuteronomio 6 encontramos uma das declaracoes mais importantes de todo o Antigo Testamento:\nIsrael deveria amar o Senhor com todo o seu ser.\nMuito tempo depois, quando perguntam a Jesus qual e o grande mandamento, Ele cita justamente\nDeuteronomio 6:5.\nDepois acrescenta: “Amaras o teu proximo como a ti mesmo”, vindo de Levitico 19:18.\nIsso e muito importante. As vezes ouvimos uma caricatura como: “No Antigo Testamento so havia regras;\nJesus inventou o amor no Novo Testamento.” A propria Biblia mostra que isso e incorreto.\nCentro\nO amor a Deus e ao proximo ja fazia parte da Lei. Jesus coloca esses mandamentos no centro."
          },
          {
            "key": "CONECTE",
            "type": "CONNECT",
            "order": 4,
            "sourceHeading": "CONECTE AS ESCRITURAS",
            "contentText": "Exodo 6\nDeus promete: Eu vos livrarei. Eu vos resgatarei. Eu vos tomarei por meu povo.\nExodo 12-14\nDeus realiza a libertacao.\nExodo 19\nDeus chama Israel para ser seu povo de maneira distinta entre as nacoes.\nExodo 20\nDeus entrega os Dez Mandamentos.\nDeuteronomio 6\nA Lei deve estar no coracao e fazer parte da vida cotidiana.\nLevitico 19\nSantidade alcanca a maneira de tratar Deus e tambem as pessoas.\nMateus 22\nJesus destaca amar a Deus e amar o proximo.\nSequencia importante\nRedencao -> relacionamento -> obediencia.\n8. A Lei tambem revela a seriedade do pecado\nAo dizer “nao faca isso” e “faca aquilo”, Deus estabelece aquilo que e certo e errado para Israel dentro da\nalianca.\nA Lei tambem deixa mais evidente a distancia entre a vontade de Deus e o comportamento humano.\nIsrael logo mostrara que nao consegue viver perfeitamente de acordo com aquilo que recebeu. Essa\ndificuldade acompanhara grande parte da historia do povo.\nPergunta que cresce no Antigo Testamento\nComo um Deus santo pode habitar no meio de um povo que continua pecando?\nEssa pergunta nos levara ao proximo estudo sobre sacrificios.\nCOMO ESTE ESTUDO SE RELACIONA COM CRISTO?\nEssa e uma area em que precisamos ser especialmente cuidadosos.\nA relacao entre cristaos e a Lei de Moises gerou muitos debates ao longo da historia da Igreja.\nPortanto, nao devemos resolver uma questao ampla com frases simplistas como: “A Lei acabou e nao serve\npara nada.” ou “Todo cristao deve cumprir cada mandamento dado a Israel exatamente da mesma forma.”\nNenhuma dessas frases representa bem toda a discussao biblica. Precisamos acompanhar aquilo que o\nNovo Testamento realmente diz.\nO QUE JESUS DIZ SOBRE A LEI?\nEm Mateus 5:17, Jesus afirma que nao veio destruir a Lei e os Profetas, mas cumprir.\nA palavra “cumprir” e importante. Jesus nao trata o Antigo Testamento como algo inutil. Ele se apresenta\ndentro da historia iniciada nele.\nAo mesmo tempo, a vinda, morte, ressurreicao e nova alianca em Cristo mudam a maneira como o povo de\nDeus se relaciona com aspectos da Lei dada a Israel.\nO proprio Novo Testamento demonstra isso em temas como sacrificios, sacerdocio, alimentos, circuncisao,\nfestas e templo.\nEsses assuntos serao tratados cuidadosamente quando aparecerem em nossa Jornada.\n9. Jesus mostra o coracao da Lei\nEm Mateus 22, Jesus e perguntado sobre o maior mandamento. Sua resposta une dois textos:\nDeuteronomio 6:5 - amar a Deus e Levitico 19:18 - amar o proximo.\nJesus declara que toda a Lei e os Profetas dependem desses mandamentos.\nIsso nao significa: “Se eu disser que amo, nao importa como vivo.” Na Biblia, amor e obediencia nao sao\ninimigos. O amor verdadeiro produz uma maneira de viver.\n10. Paulo tambem chama a Lei de santa\nRomanos 7:12 declara que a Lei e santa e que o mandamento e santo, justo e bom.\nIsso evita outra conclusao equivocada: o problema principal nao era que a Lei fosse ma.\nPaulo mostra que existe um problema no proprio ser humano marcado pelo pecado.\nImagine um espelho. O espelho nao cria a sujeira no rosto. Ele revela aquilo que ja esta la.\nEssa comparacao pode nos ajudar a compreender uma das funcoes que o Novo Testamento atribui a Lei.\nUMA INTERPRETACAO TEOLOGICA COMUM: “TRES TIPOS DE LEI”\nAo longo da historia crista, muitos estudiosos dividiram as leis do Antigo Testamento em tres grupos: moral,\ncivil e cerimonial.\nEssa divisao pode ser util para organizar o estudo. Porem, precisamos destacar:\nAtencao editorial\nA Biblia nao apresenta a Lei de Moises em uma lista oficial usando exatamente essas tres\ncategorias.\nTrata-se de uma organizacao teologica posterior usada por muitas tradicoes cristas.\nPor isso, o Biblia Jornada nao deve apresentar essa divisao como se fosse um versiculo biblico.\nEm nossos estudos, seguiremos um caminho mais seguro:\n• observar o mandamento dentro do contexto de Israel;\n• verificar se e como o Novo Testamento retoma aquele tema;\n• identificar o principio biblico envolvido;\n• evitar aplicar diretamente ao cristao aquilo que o Novo Testamento mostra ter sido cumprido ou\ntransformado na nova alianca.\n11. Entao os cristaos precisam obedecer a Lei de Moises?\nA resposta exige cuidado.\nOs cristaos reconhecem o Antigo Testamento como Palavra de Deus. A Lei continua sendo extremamente\nimportante para conhecer a historia da salvacao, o carater e a santidade de Deus, entender o pecado,\ncompreender Israel, compreender a obra de Cristo e aprender principios de justica, amor e obediencia.\nAo mesmo tempo, o Novo Testamento nao coloca cristaos gentios simplesmente debaixo da alianca do\nSinai como se nada tivesse acontecido com a vinda de Cristo.\nAtos, Romanos, Galatas, Colossenses e Hebreus mostram que essa questao precisou ser tratada\ndiretamente pela Igreja.\nNao vamos tentar resolver tudo neste estudo.\nPodemos guardar\nO cristao le a Lei atraves daquilo que Deus realizou em Cristo e do ensino que o proprio Novo\nTestamento fornece.\n12. Obediencia nao compra salvacao\nExiste uma aplicacao importante. E facil transformar religiao numa tentativa de negociacao: “Se eu fizer\ntudo certo, Deus tera obrigacao de me aceitar.”\nMas observe novamente Israel. A libertacao do Egito veio antes da entrega dos mandamentos.\nNo Novo Testamento, a salvacao tambem sera apresentada como obra da graca de Deus, recebida pela fe.\nA obediencia possui lugar fundamental. Mas ela nao deve ser transformada em moeda para comprar a\ngraca.\nOrdem correta\nObedecemos porque pertencemos a Deus - nao para colocar Deus em divida conosco.\nO QUE APRENDEMOS SOBRE DEUS?\n• Deus e santo.\n• Deseja relacionamento com seu povo.\n• Estabelece o que e certo e errado.\n• Se importa com adoracao verdadeira.\n• Se importa com a familia.\n• Se importa com a vida humana.\n• Se importa com justica.\n• Se importa com verdade.\n• Se importa com o pobre e vulneravel.\n• Se importa com nossos atos.\n• Se importa tambem com nosso coracao.\nSantidade nao significa frieza\nO mesmo Deus que diz “Sejam santos” tambem ensina “Amem o proximo”.\nO QUE APRENDEMOS SOBRE O SER HUMANO?\n• Liberdade nao e ausencia de limites.\n• Nossos desejos nem sempre sao bons.\n• Precisamos de orientacao.\n• A maneira como tratamos pessoas importa a Deus.\n• Religiao externa nao substitui um coracao voltado para Deus.\n• Conhecimento da vontade de Deus nao significa automaticamente capacidade de obedecer perfeitamente.\nIsrael recebeu uma boa Lei. Mas possuir os mandamentos nao resolveu automaticamente o problema do\ncoracao humano. Essa tensao continuara crescendo."
          },
          {
            "key": "APLIQUE",
            "type": "APPLY",
            "order": 5,
            "sourceHeading": "APLIQUE A VIDA",
            "contentText": "1. Nao separe culto de carater\nUma pessoa pode cantar muito bem no culto e tratar mal as pessoas durante a semana. Levitico 19 mostra\nque essa separacao nao combina com a santidade biblica.\nNossa fe precisa aparecer tambem no trabalho, em casa, nas palavras, nos negocios, nos relacionamentos e\nna maneira de tratar quem nao pode nos oferecer nada em troca.\n2. Antes de perguntar “e proibido?”, pergunte tambem “isso combina com Deus?”\nAs vezes reduzimos a vida crista a procurar uma lista minima: “Posso ou nao posso?”\nA santidade vai alem.\nPergunta melhor\nEssa escolha combina com o carater e a vontade de Deus revelados nas Escrituras?\n3. Nao transforme obediencia em orgulho\nConhecer mandamentos pode facilmente produzir comparacao: “Eu faco isso e aquela pessoa nao faz.”\nMas a Lei tambem nos lembra de nossa propria necessidade. Quanto mais seriamente enxergamos a\nsantidade de Deus, menos espaco deveria existir para arrogancia espiritual.\n4. A Palavra precisa sair da reuniao e entrar na rotina\nDeuteronomio 6 coloca a Palavra em casa, no caminho, ao deitar e ao levantar.\nIsso significa que vida com Deus nao e apenas frequentar um culto. E permitir que sua Palavra forme nossas\nescolhas todos os dias.\n5. Amar a Deus e amar o proximo nao podem ser separados\nE possivel afirmar: “Eu amo muito a Deus” e ao mesmo tempo viver em odio, mentira, injustica, exploracao e\nfalta de misericordia.\nLevitico e o ensino de Jesus colocam essas coisas juntas. Quem leva Deus a serio precisa levar pessoas a\nserio."
          },
          {
            "key": "REFLECTION_QUESTIONS",
            "type": "REFLECTION_QUESTIONS",
            "order": 6,
            "sourceHeading": "PARA REFLETIR",
            "contentText": "• Eu havia percebido que Israel foi libertado antes de receber os Dez Mandamentos?\n• O que essa ordem muda na minha compreensao de obediencia?\n• Quando penso em santidade, penso apenas em costumes externos ou tambem em carater e\nrelacionamento?\n• Existe alguma area da minha vida em que meu comportamento nao combina com aquilo que afirmo crer?\n• Como tenho tratado pessoas vulneraveis ou que nao podem me oferecer vantagens?\n• Tenho usado conhecimento biblico para crescer em humildade ou para me sentir superior?\n• A Palavra de Deus faz parte apenas dos meus cultos ou tambem da minha rotina?\n• Como amor a Deus e amor ao proximo aparecem juntos na minha vida?"
          },
          {
            "key": "JOURNAL_PROMPT",
            "type": "JOURNAL_PROMPT",
            "order": 7,
            "sourceHeading": "Registrar no Diario",
            "contentText": "Qual area da minha vida cotidiana precisa mostrar com mais clareza que eu pertenco a Deus?"
          },
          {
            "key": "PRAYER",
            "type": "PRAYER",
            "order": 8,
            "sourceHeading": "ORE",
            "contentText": "Oracao sugerida\nSenhor, Tu es santo e bom. Obrigado porque tua Palavra nao apenas mostra o que desejas,\nmas tambem revela quem Tu es. Ensina-me a obedecer sem orgulho, amar-te de todo o\ncoracao e tratar meu proximo com justica, verdade e misericordia. Que minha fe nao fique\napenas nas palavras ou nos cultos, mas transforme minhas escolhas diarias. Amem."
          },
          {
            "key": "KEEP",
            "type": "KEEP",
            "order": 9,
            "sourceHeading": "PARA GUARDAR",
            "contentText": "Deuteronomio 6:5\nLeia o versiculo completo em sua Biblia.\nEle resume uma verdade central: Deus nao quer apenas atos externos. Ele chama seu povo a ama-lo com\ntodo o ser.\nDepois compare com Levitico 19:18. Esses dois textos serao usados pelo proprio Jesus para explicar o\ncoracao da Lei.\nAdicionar aos Favoritos\nGuarde Deuteronomio 6:5 e Levitico 19:18 para acompanhar como Jesus os utiliza no Novo\nTestamento."
          },
          {
            "key": "CONTINUE_JOURNEY",
            "type": "CONTINUE_JOURNEY",
            "order": 10,
            "sourceHeading": "CONTINUE SUA JORNADA",
            "contentText": "Estudo 01 - Criacao\nDeus cria tudo muito bom.\nEstudo 02 - Queda\nO pecado entra e produz ruptura.\nEstudo 03 - Esperanca\nO mal nao tera a palavra final.\nEstudo 04 - Promessa\nDeus chama Abraao e anuncia bencao para as nacoes.\nEstudo 05 - Redencao\nDeus liberta Israel da escravidao.\nEstudo 06 - Lei\nDeus ensina o povo libertado a viver em alianca e santidade.\nMas logo aparece um problema.\nDeus e santo. A Lei e santa. O povo e chamado a ser santo. Mas o povo continua pecando.\nPergunta decisiva\nComo um povo pecador poderia continuar se aproximando de um Deus santo?\nE nesse contexto que precisamos entender altar, sacrificio, sangue, sacerdotes, expiacao e perdao.\nProximo estudo\nEstudo 07 - O sistema de sacrificios\nPergunta central: Por que havia sangue, altar e sacrificios na vida de Israel?\nTextos principais: Levitico 1 | 4 | 16 | 17:11\nNo proximo estudo teremos um cuidado especial para nao transformar cada detalhe dos sacrificios em\nsimbolos inventados. Primeiro entenderemos o que os sacrificios significavam dentro da propria alianca de\nIsrael. Depois veremos como o Novo Testamento relaciona esse sistema a obra de Cristo."
          }
        ],
        "terminalCompletion": null,
        "sourceAppendix": {
          "heading": "REFERENCIAS BIBLICAS UTILIZADAS",
          "contentText": "Textos principais\nExodo 19-20\nDeuteronomio 6:1-9\nLevitico 19:1-18\nContexto da alianca\nExodo 24:1-8\nDeuteronomio 10:12-13\nConexoes biblicas\nSalmos 19:7-11\nMateus 5:17-20\nMateus 22:34-40\nRomanos 7:12\nRomanos 13:8-10\nNOTA EDITORIAL IMPORTANTE\nEste estudo exige algumas distincoes para evitar simplificacoes comuns.\n1. A Lei vem depois da libertacao\nA narrativa de Exodo foi mantida em sua ordem: Deus liberta Israel antes de entregar a Lei no Sinai.\nIsso nao significa que obediencia seja opcional. Significa que a Lei nao e apresentada como o preco que\nIsrael pagou para conquistar a saida do Egito.\n2. Jesus e a Lei\nMateus 5:17 foi apresentado sem reduzir “cumprir” a uma explicacao unica e simplista.\nExistem diferentes discussoes sobre todas as implicacoes dessa afirmacao.\nPonto claro\nJesus nao apresenta a Lei e os Profetas como inuteis ou errados; Ele se apresenta como\naquele em quem seu proposito chega ao cumprimento.\n3. “Lei moral, civil e cerimonial”\nEssa divisao foi identificada explicitamente como um modelo teologico posterior usado por muitas tradicoes\ncristas.\nA Biblia nao apresenta os mandamentos mosaicos em uma tabela oficial com essas tres categorias. Por isso,\no estudo nao adotou essa classificacao como se fosse linguagem direta da Escritura.\n4. Cristaos e a Lei de Moises\nNao afirmamos nem que “a Lei nao serve mais para nada” nem que “todo cristao deve cumprir cada\nmandamento do Sinai exatamente como Israel”.\nO Novo Testamento trata de forma ampla a relacao entre Cristo, nova alianca, Igreja e Lei. Esse\ndesenvolvimento sera apresentado progressivamente a medida que nossa Jornada avancar.\n5. Amor a Deus e ao proximo\nA relacao entre esses dois mandamentos nao e interpretacao criada pelo estudo.\nO proprio Jesus, em Mateus 22:34-40, cita Deuteronomio 6:5 e Levitico 19:18 como centrais para\ncompreender a Lei e os Profetas.\nSTATUS EDITORIAL\nTrilha\nO Plano Eterno de Deus\nEstudo\n06/18 - A Lei e a santidade de Deus\nVersao\nRascunho 1 para revisao\nSituacao\nDRAFT - aguardando revisao de conteudo e revisao biblica"
        },
        "normalization": {
          "removedForbiddenControlCharCount": 0,
          "removedPageHeaderLineCount": 48
        },
        "canonicalSource": {
          "lineCount": 369,
          "sha256": "76D24503047E96ABD36BBF4F975045DF167E8834867ADAC5CD0DCA56379B836F",
          "preambleLines": [
            "TRILHA 1 | O PLANO ETERNO DE DEUS",
            "06 - A Lei e a santidade de Deus"
          ]
        },
        "continuity": {
          "expectedNextStudyNumber": 7,
          "detectedNextStudyNumber": 7,
          "nextStudyId": "track-01-study-07",
          "terminal": false,
          "evidenceKind": "EXPLICIT_NUMBER",
          "valid": true
        },
        "quality": {
          "forbiddenControlCharCount": 0,
          "pageHeaderLeakCount": 0,
          "questionSemanticLeakCount": 0,
          "objectiveSemanticLeakCount": 0,
          "continueAppendixLeakCount": 0,
          "profileMarkerSetMatch": true,
          "structuredSectionCountMatch": true,
          "nextStudyIdValid": true,
          "terminalCompletionValid": null
        }
      },
    },
    {
      approvedCandidateSha256: "DFDE8626FF9986CDFC429D0404EB3A25CD18B2B129F1C085419E98264C75E988",
      payload: {
        "schema": "P17-P2-A10-R2-R1-R1_TRACK1_BATCH_SIMULATION_CANDIDATE_V1",
        "readinessOnly": true,
        "runtimePayload": false,
        "batch": {
          "id": "B01_TRACK_01",
          "sequence": 1,
          "trackNumber": 1,
          "expectedTrackStudyCount": 18,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "source": {
          "relativePath": "trilha_01\\Biblia_Jornada_Estudo_07_O_Sistema_De_Sacrificios.pdf",
          "bytes": 971916,
          "sha256": "BDD9D6A5FEA7857B8DF6E99553D44B011B5E5D1436C3334BA988F9C5BFA7B37D",
          "pageCount": 13,
          "extractedCharacterCount": 19977,
          "expectedExtractedCharacterCount": 19977,
          "extractedTextSha256": "BA46584D46561C334564D23830F5B09E3579844AB4142249E564FADE97FD8B4E",
          "a5NormalizedTextSha256": "BB81118556B606BEA1577D2292C5AA8B9E92100F83937221B063CFC4AD07951F"
        },
        "study": {
          "id": "track-01-study-07",
          "trackId": "track-01",
          "number": 7,
          "slug": "o-sistema-de-sacrificios",
          "questionCentral": "Por que havia sangue, altar e sacrifícios na vida de Israel?",
          "primaryTexts": "Levítico 1 • Levítico 4 • Levítico 16 • Levítico 17:11",
          "complementaryReadings": "Êxodo 29:38-46 • Salmos 51:16-17 • Isaías 1:11-17 • Hebreus 9:11-28 • Hebreus 10:1-18 • 1 Pedro 1:18-19",
          "estimatedTime": "15-20 minutos",
          "objective": "Ao final, queremos compreender seis verdades principais: • Os sacrifícios faziam parte da vida da aliança de Israel. • Nem todo sacrifício tinha exatamente a mesma finalidade. • O sangue estava ligado à vida e, em certos sacrifícios, à expiação. • Os sacrifícios não eram uma licença para continuar pecando sem arrependimento. • O sistema mostrava a seriedade do pecado e a necessidade de aproximação de um Deus santo. • O Novo Testamento apresenta Jesus como o cumprimento definitivo daquilo que os sacrifícios não conseguiam realizar de forma final. Guarde esta ideia Os sacrifícios não tornavam o pecado pequeno. Pelo contrário: mostravam que aproximar um povo pecador de um Deus santo era uma questão séria.",
          "openingTakeaway": "",
          "editorialStatus": "DRAFT",
          "published": false,
          "runtimeEligible": false,
          "nextStudyId": "track-01-study-08",
          "terminal": false,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "sourceDeclaredProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "expectedProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkerCount": 12,
        "structuredSectionCount": 10,
        "sections": [
          {
            "key": "LEIA",
            "type": "READ",
            "order": 1,
            "sourceHeading": "LEIA",
            "contentText": "Para compreender este estudo, leia com calma:\n• Levítico 1: o holocausto.\n• Levítico 4: o sacrifício relacionado ao pecado involuntário.\n• Levítico 16: o Dia da Expiação.\n• Levítico 17:11: um dos textos mais importantes para compreender o papel do sangue.\nAo ler, não tente decorar todos os detalhes de animais, utensílios e procedimentos.\nPerguntas para acompanhar a leitura\nPrimeiro procure responder: Qual problema está sendo tratado? E o que Deus\nestá ensinando Israel por meio desse sistema?"
          },
          {
            "key": "OBSERVE",
            "type": "OBSERVE",
            "order": 2,
            "sourceHeading": "OBSERVE NO TEXTO",
            "contentText": "• Quem estabelece as regras dos sacrifícios?\n• Todos os sacrifícios apresentados em Levítico são iguais?\n• Existe diferença entre ofertas de adoração e ofertas relacionadas ao pecado?\n• Em Levítico 4, que tipo de pecado aparece repetidamente?\n• Qual papel o sacerdote desempenha?\n• O que acontece com o sangue em determinados sacrifícios?\n• O que Levítico 17:11 diz sobre a vida e o sangue?\n• Em Levítico 16, quem entra no lugar mais santo?\n• Isso acontece todos os dias ou em uma ocasião específica?\n• O sacerdote oferece sacrifício apenas pelo povo ou também por si mesmo?\n• O que acontece com o bode enviado para longe no Dia da Expiação?\n• O povo podia desprezar a justiça, continuar no pecado e pensar que o simples ritual\nresolveria tudo?\nEvite uma explicação superficial\nIsrael não sacrificava animais simplesmente porque Deus 'gostava de sacrifícios'.\nO sistema tinha funções específicas dentro da aliança."
          },
          {
            "key": "ENTENDA",
            "type": "UNDERSTAND",
            "order": 3,
            "sourceHeading": "ENTENDA",
            "contentText": "1. Os sacrifícios aparecem dentro de uma história que já começou\nNão podemos abrir Levítico e esquecer tudo o que estudamos até aqui.\nNossa sequência foi: Criação → Queda → Promessa → Abraão → Êxodo → Lei.\nIsrael já havia sido libertado. Agora Deus estava formando esse povo para viver em sua\npresença.\nMas havia um problema. Deus é santo. O povo continua pecando.\nQuestão central\nComo um povo imperfeito pode continuar vivendo em aliança com um Deus\nsanto?\nO sistema sacrificial faz parte da resposta dada a Israel naquele momento da história.\n2. Nem todo sacrifício tinha a mesma finalidade\nÉ importante não colocar todos os sacrifícios de Levítico dentro de uma única categoria.\nO livro apresenta diferentes ofertas relacionadas a adoração, gratidão, comunhão,\ndedicação, pecado e culpa.\nPor isso, não é correto dizer: “Todo animal sacrificado existia simplesmente para pagar por\num pecado específico.”\nNeste estudo, nosso foco principal estará nos sacrifícios relacionados ao pecado, expiação e\naproximação de Deus.\nUMA PALAVRA IMPORTANTE: EXPIAÇÃO\nEssa palavra aparece muitas vezes quando estudamos Levítico.\nDefinição simples\nExpiação é uma ação determinada por Deus para tratar o problema do pecado e\npermitir que a relação do povo com Ele fosse restaurada ou mantida dentro da\naliança.\nNeste ponto da Jornada, podemos guardar: Expiação é Deus estabelecendo um meio para\nlidar com o pecado e suas consequências dentro da relação com seu povo.\n3. O sangue está ligado à vida\nLevítico 17:11 é fundamental. O texto declara que a vida da carne está no sangue.\nE Deus diz ter dado o sangue sobre o altar para fazer expiação.\nIsso significa que o sangue não aparece como um objeto mágico. Também não significa que\nDeus simplesmente gostava de sangue.\nLigação apresentada pelo próprio texto\nsangue → vida → altar → expiação\nExiste uma vida sendo apresentada diante de Deus dentro do sistema que Ele estabeleceu.\nIsso mostra a seriedade do pecado.\n4. O pecado não é tratado como algo barato\nQuando uma pessoa lê Levítico rapidamente, pode pensar: “Por que tudo isso era\nnecessário?”\nUma das respostas que o próprio sistema transmite é: o pecado é sério.\nA desobediência não é apenas uma pequena falha sem importância. Ela afeta a relação com\nDeus.\nA santidade de Deus e o pecado humano não são tratados como se fossem compatíveis sem\nnenhuma consequência.\n5. O animal não significava que o pecador podia continuar fazendo\nqualquer coisa\nEssa distinção é muito importante.\nO sistema sacrificial nunca deveria ser usado assim: “Eu faço o que quiser durante a semana\ne depois ofereço um animal para resolver tudo.”\nOs profetas mais tarde condenam exatamente essa atitude.\nIsaías 1 mostra Deus rejeitando práticas religiosas de um povo que continuava vivendo em\ninjustiça.\nSalmos 51 também mostra que Deus não deseja apenas uma cerimônia exterior sem um\ncoração quebrantado.\nPrincípio\nO sacrifício nunca deveria ser uma desculpa para amar o pecado.\n6. Alguns sacrifícios tratavam pecados involuntários\nLevítico 4 menciona repetidamente situações em que alguém peca sem intenção consciente\ne posteriormente percebe sua culpa.\nIsso é importante. O texto não apresenta o sistema como uma simples fórmula para planejar\num pecado, praticá-lo conscientemente e depois comprar perdão com um animal.\nExistiam diferenças entre tipos de transgressão e diferentes orientações dentro da Lei.\nPonto seguro\nO sistema estava regulamentado por Deus e não deveria ser manipulado pelo\npecador.\n7. O sacerdote tinha uma função de mediação\nNos sacrifícios, o sacerdote aparece frequentemente entre o povo e os procedimentos do\naltar.\nIsso acontece de maneira ainda mais clara em Levítico 16.\nNo Dia da Expiação, o sumo sacerdote entra no lugar mais santo.\nMas observe um detalhe: ele também precisa oferecer sacrifício por seus próprios pecados.\nO sacerdote é mediador. Mas ele também é pecador. Ele não é a solução final para o\nproblema humano.\nEsse detalhe será muito importante quando chegarmos ao livro de Hebreus.\n8. O Dia da Expiação\nLevítico 16 descreve um dos dias mais importantes do calendário de Israel.\nEra uma ocasião especial de purificação e expiação.\nO sumo sacerdote realiza procedimentos por si mesmo, sua casa, o povo e o santuário.\nDois bodes aparecem de maneira especial. Um é sacrificado. O outro é enviado para longe\ndepois de receber simbolicamente sobre si as iniquidades do povo.\nImagem central\nO pecado precisa ser tratado e removido.\n9. O bode enviado para longe\nÀs vezes essa parte gera muitas interpretações. Precisamos permanecer no que o texto\nmostra com clareza.\nLevítico 16 descreve o sacerdote confessando sobre o bode as iniquidades de Israel, e o\nanimal sendo levado para uma região afastada.\nA imagem comunica a remoção dos pecados do meio do povo.\nNão precisamos transformar cada detalhe do animal ou de seu destino em significados que o\ntexto não explica.\nPonto central\nA culpa é apresentada como algo que precisa ser removido."
          },
          {
            "key": "CONECTE",
            "type": "CONNECT",
            "order": 4,
            "sourceHeading": "CONECTE AS ESCRITURAS",
            "contentText": "Levítico 17\nO sangue é ligado à vida e à expiação sobre o altar.\nLevítico 16\nO Dia da Expiação trata do pecado do povo e da purificação necessária para a\nvida diante de Deus.\nSalmos 51\nDavi reconhece que ritual sem um coração verdadeiramente arrependido não\nbasta.\nIsaías 1\nDeus rejeita religião exterior quando ela convive com injustiça e falta de\narrependimento.\nHebreus 9-10\nO Novo Testamento explica que o sistema sacrificial não oferecia solução\ndefinitiva e final para o problema do pecado.\nCristo\nJesus é apresentado como aquele cuja obra não precisa ser repetida\ncontinuamente.\nCOMO ESTE ESTUDO SE RELACIONA COM CRISTO?\nO livro de Hebreus faz uma conexão direta e extensa entre sacerdócio, santuário, sangue,\nsacrifícios, nova aliança e obra de Cristo.\nPor isso, neste estudo não precisamos inventar simbolismos. O próprio Novo Testamento\nfornece a conexão.\nUMA INTERPRETAÇÃO APOSTÓLICA EXPLÍCITA\nOs sacrifícios eram repetidos; a obra de Cristo é apresentada como\ndefinitiva\nHebreus destaca um contraste importante.\nOs sacerdotes realizavam repetidamente seu serviço. Os sacrifícios eram oferecidos\ncontinuamente.\nIsso mostrava que o sistema ainda não havia produzido uma solução definitiva para o\npecado.\nHebreus 10 afirma que os sacrifícios funcionavam como uma lembrança contínua dos\npecados.\nEntão Cristo é apresentado de maneira diferente. Ele oferece sua obra uma vez por todas.\nContraste central\nO que era repetido encontra em Cristo uma realização definitiva.\n10. Jesus é apresentado como sacerdote e como sacrifício\nEssa é uma das particularidades da mensagem de Hebreus.\nCristo não é apresentado apenas como mais um sacerdote igual aos anteriores. Nem apenas\ncomo mais uma vítima sacrificada.\nHebreus apresenta Jesus como Sumo Sacerdote e como aquele que oferece a si mesmo.\nO sacerdote levítico precisava tratar seus próprios pecados, oferecia sacrifícios de outros,\nmorria e era substituído.\nCristo é apresentado como santo e sem pecado, oferecendo-se de maneira definitiva.\n11. 'O sangue de Cristo'\nO Novo Testamento utiliza repetidamente a linguagem do sangue de Jesus.\nPrecisamos evitar duas distorções.\nPrimeira: tratar o sangue como se fosse uma substância mágica separada da morte de\nCristo.\nBiblicamente, falar do sangue de Cristo está profundamente ligado à entrega de sua vida e à\nsua morte sacrificial.\nSegunda: tratar essa linguagem como algo sem importância.\nO Novo Testamento dá grande valor ao sangue de Cristo. 1 Pedro 1:18-19 fala do precioso\nsangue de Cristo. Hebreus relaciona seu sangue à nova aliança e à purificação.\nEquilíbrio\nNão tratamos o sangue como magia, nem como detalhe sem importância. Ele\ncomunica a entrega da vida de Cristo em sua obra sacrificial.\n12. O sistema de sacrifícios não era a solução final\nHebreus é bastante claro nesse ponto.\nOs sacrifícios de animais não conseguiam resolver definitivamente o problema do pecado.\nIsso não significa que o sistema dado por Deus fosse inútil. Ele possuía função real dentro da\naliança de Israel.\nMas também apontava para uma necessidade maior.\nSe os sacrifícios precisavam continuar dia após dia e ano após ano, isso mostrava que ainda\nfaltava algo definitivo.\nHebreus apresenta esse algo como cumprido em Cristo.\n13. O sacrifício de Cristo não precisa ser repetido\nEssa é uma das grandes mensagens de Hebreus 9-10.\nJesus não entra em uma sequência infinita de sacrifícios. Sua obra é apresentada como\nsuficiente e realizada de maneira decisiva.\nConfiança cristã\nNossa confiança não está em perguntar se outro sacrifício ainda precisa\nacontecer. O Novo Testamento aponta para a obra concluída de Cristo.\nO QUE APRENDEMOS SOBRE DEUS?\n• Deus é santo.\n• Leva o pecado a sério.\n• Não deixa o ser humano inventar sozinho como se aproximar dele.\n• Estabelece meios de expiação dentro da aliança.\n• Deseja habitar no meio do seu povo.\n• Não se satisfaz com religião exterior sem arrependimento.\n• Conduz a história para uma solução maior e definitiva.\nVerdade central\nDeus deseja relacionamento, mas esse relacionamento não pode simplesmente\nfingir que o pecado não existe.\nO QUE APRENDEMOS SOBRE O SER HUMANO?\n• O ser humano peca.\n• Carrega culpa.\n• Precisa de perdão.\n• Precisa de mediação.\n• Não consegue purificar a si mesmo apenas por esforço.\n• Pode cair na tentação de substituir arrependimento por religião exterior.\n• Precisa de uma solução que vá além de rituais repetidos.\nIsso nos conduz diretamente à necessidade de Cristo.\nSACRIFÍCIO NÃO É SUBORNO\nExiste uma ideia pagã comum em muitas culturas antigas: oferecer algo aos deuses para\nconvencê-los a fazer aquilo que queremos.\nNão devemos ler os sacrifícios bíblicos dessa maneira.\nIsrael não deveria oferecer um animal para comprar Deus, manipular Deus, obrigar Deus ou\nnegociar vantagens pessoais.\nOs sacrifícios fazem parte da aliança e das orientações estabelecidas pelo próprio Deus.\nResumo\nO altar não era um balcão de negociação com Deus."
          },
          {
            "key": "APLIQUE",
            "type": "APPLY",
            "order": 5,
            "sourceHeading": "APLIQUE À VIDA",
            "contentText": "1. Não trate o pecado como se fosse algo pequeno\nVivemos em uma época em que muitas atitudes são facilmente justificadas: “Todo mundo\nfaz.” “Não é tão grave.” “Deus entende.”\nO sistema sacrificial nos lembra que a Bíblia nunca trata o pecado com indiferença.\nGraça não significa que o pecado deixou de ser sério. Significa que Deus providenciou uma\nresposta maior do que nosso pecado.\n2. Religião não substitui arrependimento\nÉ possível ir ao culto, cantar, orar, dar ofertas, participar de atividades e continuar\ncultivando conscientemente injustiça e pecado.\nOs profetas denunciaram exatamente essa contradição.\nDeus não deseja apenas atividade religiosa. Ele deseja verdade no coração e uma vida\ntransformada.\n3. Não tente pagar sua própria culpa\nÀs vezes, depois de errarmos, tentamos compensar fazendo mais coisas boas, punindo a nós\nmesmos, vivendo presos à culpa ou tentando merecer novamente o amor de Deus.\nO Evangelho aponta para outro caminho.\nNossa confiança não está em criar um sacrifício pessoal maior que o pecado. Está na obra\nque Deus realizou em Cristo.\n4. Perdão não significa falta de valor moral\nSe existe perdão, alguém pode pensar: “Então o pecado não importa.”\nA Bíblia ensina justamente o contrário.\nO custo e a seriedade da redenção mostram o peso do problema.\nA graça não torna o pecado insignificante. A graça mostra o quanto Deus fez para lidar com\nele.\n5. Aproxime-se de Deus com sinceridade\nHebreus leva a mensagem dos sacrifícios para uma conclusão maravilhosa.\nPor causa da obra de Cristo, o crente é convidado a se aproximar de Deus com confiança.\nNão porque seja perfeito. Mas porque existe um mediador suficiente.\nEssa confiança não é arrogância. É confiança naquilo que Cristo fez."
          },
          {
            "key": "REFLECTION_QUESTIONS",
            "type": "REFLECTION_QUESTIONS",
            "order": 6,
            "sourceHeading": "PARA REFLETIR",
            "contentText": "• Eu costumava pensar que todos os sacrifícios do Antigo Testamento tinham exatamente a\nmesma finalidade?\n• O que Levítico 17:11 me ensina sobre sangue e vida?\n• Por que é importante que o sumo sacerdote também precisasse de sacrifício?\n• Tenho usado atividades religiosas para evitar lidar com pecados reais?\n• Existe alguma culpa que estou tentando “pagar” sozinho?\n• O que muda quando entendo que Cristo é apresentado como sacrifício definitivo?\n• Minha compreensão da graça me leva a levar o pecado mais ou menos a sério?\n• Tenho me aproximado de Deus confiando em meu desempenho ou na obra de Cristo?"
          },
          {
            "key": "JOURNAL_PROMPT",
            "type": "JOURNAL_PROMPT",
            "order": 7,
            "sourceHeading": "Registrar no Diário",
            "contentText": "Existe algum erro do meu passado que ainda estou tentando pagar com culpa,\nesforço ou autopunição em vez de levá-lo sinceramente a Deus?"
          },
          {
            "key": "PRAYER",
            "type": "PRAYER",
            "order": 8,
            "sourceHeading": "ORE",
            "contentText": "Oração sugerida\nSenhor, obrigado porque és santo e não ignoras o pecado, mas também não\nabandonaste o ser humano à culpa. Ajuda-me a compreender a seriedade do\npecado e a grandeza daquilo que realizaste em Cristo. Livra-me de uma religião\napenas exterior e dá-me um coração sincero, arrependido e confiante em tua\ngraça. Amém."
          },
          {
            "key": "KEEP",
            "type": "KEEP",
            "order": 9,
            "sourceHeading": "PARA GUARDAR",
            "contentText": "Levítico 17:11\nLeia o versículo inteiro.\nObserve a ligação feita pelo próprio texto entre vida, sangue, altar e expiação.\nDepois leia Hebreus 10:11-14.\nCompare sacrifícios repetidos com a obra de Cristo apresentada como definitiva.\nAdicionar aos Favoritos\nGuarde Levítico 17:11 e Hebreus 10:11-14 para acompanhar essa conexão ao\nlongo da Jornada."
          },
          {
            "key": "CONTINUE_JOURNEY",
            "type": "CONTINUE_JOURNEY",
            "order": 10,
            "sourceHeading": "CONTINUE SUA JORNADA",
            "contentText": "Estudo 01 - Criação\nDeus cria tudo muito bom.\nEstudo 02 - Queda\nO pecado produz ruptura.\nEstudo 03 - Esperança\nO mal não terá a palavra final.\nEstudo 04 - Promessa\nAbraão recebe uma promessa que alcançará as nações.\nEstudo 05 - Redenção\nDeus liberta Israel da escravidão.\nEstudo 06 - Lei\nO povo libertado aprende a viver em santidade.\nEstudo 07 - Sacrifício\nDeus estabelece meios para tratar o pecado dentro da aliança, enquanto a\nhistória caminha para uma solução definitiva.\nMas Israel ainda terá outra grande etapa. O povo entrará na terra. Terá líderes. Depois\npedirá um rei.\nEntre esses reis surgirá Davi. E Deus fará a ele uma promessa extraordinária: seu reino e sua\ndescendência terão um papel especial no propósito de Deus.\nIsso abrirá outra grande linha da Bíblia: a esperança de um Rei.\nPróximo estudo\nEstudo 08 - Reino e promessa a Davi\nPergunta central: O que Deus prometeu a Davi e por que essa promessa se torna\ntão importante para compreender o Messias?\nTextos principais: 2 Samuel 7:1-17 • Salmos 89:1-4, 19-37 • Salmos 132:11-18\nNo próximo estudo veremos como Abraão → Israel → Davi → Reino → Messias começam a\nformar uma linha cada vez mais clara dentro do Plano Eterno de Deus."
          }
        ],
        "terminalCompletion": null,
        "sourceAppendix": {
          "heading": "REFERÊNCIAS BÍBLICAS UTILIZADAS",
          "contentText": "Textos principais\nLevítico 1\nLevítico 4\nLevítico 16\nLevítico 17:11\nContexto adicional\nÊxodo 29:38-46\nCrítica bíblica ao ritual vazio\nSalmos 51:16-17\nIsaías 1:11-17\nConexões no Novo Testamento\nHebreus 9:11-28\nHebreus 10:1-18\n1 Pedro 1:18-19\nNOTA EDITORIAL IMPORTANTE\nNeste estudo foram preservadas algumas distinções importantes.\n1. Nem todo sacrifício era igual\nNão apresentamos todos os sacrifícios de Levítico como se fossem ofertas pelo pecado. O\nlivro possui diferentes tipos de ofertas com finalidades distintas.\n2. O sangue não foi tratado como magia\nA explicação foi baseada em Levítico 17:11: a vida está no sangue e Deus o deu sobre o altar\npara expiação.\nNão acrescentamos propriedades místicas que o texto não apresenta.\n3. Cristo e os sacrifícios\nA relação foi construída principalmente a partir de Hebreus 9-10, onde o próprio Novo\nTestamento interpreta explicitamente o sistema sacrificial em relação a Cristo.\nPortanto, não precisamos transformar arbitrariamente cada detalhe de Levítico em um\nsímbolo de Jesus.\n4. O bode de Levítico 16\nO estudo manteve o significado claramente apresentado no texto: remoção das iniquidades\ndo povo.\nNão foram adotadas interpretações especulativas sobre todos os detalhes do bode ou do\nlocal para onde era levado.\n5. Sacrifício e arrependimento\nSalmos 51 e Isaías 1 foram usados para mostrar que a própria Bíblia rejeita a ideia de ritual\nreligioso separado de arrependimento, justiça e sinceridade diante de Deus.\nSTATUS EDITORIAL\nTrilha\nO Plano Eterno de Deus\nEstudo\n07/18 - O sistema de sacrifícios\nVersão\nRascunho 1 para revisão\nSituação\nDRAFT - aguardando revisão de conteúdo e revisão bíblica"
        },
        "normalization": {
          "removedForbiddenControlCharCount": 0,
          "removedPageHeaderLineCount": 52
        },
        "canonicalSource": {
          "lineCount": 377,
          "sha256": "5F6503BDAEDFBC5A6B484020559C7A2C3E5A77BDB89487E68ACD6BD8C3863F0A",
          "preambleLines": [
            "TRILHA 1 • O PLANO ETERNO DE DEUS",
            "07 - O sistema de sacrifícios"
          ]
        },
        "continuity": {
          "expectedNextStudyNumber": 8,
          "detectedNextStudyNumber": 8,
          "nextStudyId": "track-01-study-08",
          "terminal": false,
          "evidenceKind": "EXPLICIT_NUMBER",
          "valid": true
        },
        "quality": {
          "forbiddenControlCharCount": 0,
          "pageHeaderLeakCount": 0,
          "questionSemanticLeakCount": 0,
          "objectiveSemanticLeakCount": 0,
          "continueAppendixLeakCount": 0,
          "profileMarkerSetMatch": true,
          "structuredSectionCountMatch": true,
          "nextStudyIdValid": true,
          "terminalCompletionValid": null
        }
      },
    },
    {
      approvedCandidateSha256: "D62CAD5B3800F46F3A73797DEDEB5F1BC1936C77F4A7C1EA008C92DD688810A5",
      payload: {
        "schema": "P17-P2-A10-R2-R1-R1_TRACK1_BATCH_SIMULATION_CANDIDATE_V1",
        "readinessOnly": true,
        "runtimePayload": false,
        "batch": {
          "id": "B01_TRACK_01",
          "sequence": 1,
          "trackNumber": 1,
          "expectedTrackStudyCount": 18,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "source": {
          "relativePath": "trilha_01\\Biblia_Jornada_Estudo_08_Reino_E_Promessa_A_Davi.pdf",
          "bytes": 965230,
          "sha256": "E078EEAA0D40AB0BEB64888DD963ED4614962A7046433ABC4F5C2599B61FA6B8",
          "pageCount": 13,
          "extractedCharacterCount": 20256,
          "expectedExtractedCharacterCount": 20256,
          "extractedTextSha256": "4B69238B62B58A44D14B909EC6D2B416435109A21EB79958C99B045A572C37C2",
          "a5NormalizedTextSha256": "587BAD3F75357A15DA45BB08A02799643F7388D5E22DFCD1CDE6617199BDAB5A"
        },
        "study": {
          "id": "track-01-study-08",
          "trackId": "track-01",
          "number": 8,
          "slug": "reino-e-promessa-a-davi",
          "questionCentral": "O que Deus prometeu a Davi e por que essa promessa se torna tão importante para compreender o Messias?",
          "primaryTexts": "2 Samuel 7:1-17 • Salmos 89:1-4, 19-37 • Salmos 132:11-18",
          "complementaryReadings": "1 Samuel 16:1-13 • 2 Samuel 5:1-5 • Isaías 9:6-7 • Isaías 11:1-10 • Jeremias 23:5-6 • Lucas 1:30-33 • Atos 2:29-36",
          "estimatedTime": "15-20 minutos",
          "objective": "Ao final, queremos compreender seis verdades principais: • Deus escolhe Davi e estabelece com ele uma promessa que terá grande importância no restante da Bíblia. • A promessa envolve casa, reino e trono. • Parte da promessa se relaciona diretamente com a descendência histórica de Davi. • Ao longo do Antigo Testamento, a esperança de um futuro Rei ligado a Davi cresce cada vez mais. • Os profetas passam a anunciar um governante justo que restauraria o povo. • O Novo Testamento apresenta Jesus como o descendente de Davi em quem essa esperança encontra seu cumprimento maior. Guarde desde o começo A promessa feita a Abraão apontava para bênção às nações. A promessa feita a Davi acrescenta outra peça importante: a esperança de um Rei.",
          "openingTakeaway": "",
          "editorialStatus": "DRAFT",
          "published": false,
          "runtimeEligible": false,
          "nextStudyId": "track-01-study-09",
          "terminal": false,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "sourceDeclaredProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "expectedProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkerCount": 12,
        "structuredSectionCount": 10,
        "sections": [
          {
            "key": "LEIA",
            "type": "READ",
            "order": 1,
            "sourceHeading": "LEIA",
            "contentText": "Comece por 2 Samuel 7:1-17.\nDepois leia Salmos 89:1-4, 19-37 e Salmos 132:11-18.\nAntes de interpretar, procure perceber as palavras que se repetem: casa, descendência, reino, trono, para\nsempre.\nEssas palavras serão muito importantes."
          },
          {
            "key": "OBSERVE",
            "type": "OBSERVE",
            "order": 2,
            "sourceHeading": "OBSERVE NO TEXTO",
            "contentText": "• Qual era o desejo de Davi em 2 Samuel 7?\n• Davi queria construir o quê para Deus?\n• O que Deus responde por meio do profeta Natã?\n• Quem havia tirado Davi de uma posição simples e o colocado como líder?\n• Quem promete fazer um “nome” para Davi?\n• Deus diz que Davi edificará uma casa para Ele ou que Deus edificará uma “casa” para Davi?\n• Nesse contexto, o que “casa” passa a significar?\n• O que Deus promete a respeito da descendência de Davi?\n• O que é dito sobre reino e trono?\n• O descendente imediato de Davi poderia errar?\n• Deus promete que a linhagem de Davi nunca enfrentaria disciplina?\n• O Salmo 89 mostra apenas alegria ou também tensão entre promessa e realidade?\n• Por que os profetas continuariam falando de um futuro Rei descendente de Davi?\nPonto de atenção\nA promessa não deve ser reduzida a: “Davi foi um grande rei.” A questão é muito maior."
          },
          {
            "key": "ENTENDA",
            "type": "UNDERSTAND",
            "order": 3,
            "sourceHeading": "ENTENDA",
            "contentText": "1. Davi não começa sua história como rei\nAntes de 2 Samuel 7, Davi já passou por uma longa caminhada.\nEle aparece inicialmente como um jovem ligado ao cuidado de ovelhas.\nEm 1 Samuel 16, Deus o escolhe enquanto Saul ainda ocupa o trono.\nMais tarde, Davi enfrenta conflitos, é perseguido, passa por períodos de espera e finalmente se torna rei\nsobre Israel.\nEssa trajetória é importante. O reino de Davi não começa porque ele simplesmente decidiu conquistar uma\nposição. A narrativa apresenta sua ascensão dentro da ação de Deus.\n2. Davi quer construir uma casa para Deus\nEm 2 Samuel 7, Davi está estabelecido em Jerusalém.\nEle percebe uma diferença. Davi vive em uma casa de cedro, enquanto a arca de Deus permanece em uma\ntenda.\nEntão ele deseja construir um templo para Deus.\nÀ primeira vista, parece uma ótima ideia. O profeta Natã inicialmente aprova.\nMas naquela noite Deus envia uma mensagem diferente. Davi não seria aquele que construiria o templo.\nSeu filho teria essa responsabilidade.\nMas então acontece uma mudança interessante.\nDavi queria construir uma casa para Deus. Deus responde dizendo que faria uma casa para Davi.\nUMA PALAVRA IMPORTANTE: “CASA”\nNesse texto, “casa” aparece com sentidos diferentes.\nPrimeiro: casa = edifício. Davi queria construir uma casa para Deus.\nDepois: casa = dinastia, família real, linhagem.\nQuando Deus diz que edificará uma casa para Davi, não está prometendo apenas uma construção bonita.\nEstá falando sobre sua descendência e sua linhagem real.\nResumo\nDavi queria construir um edifício para Deus; Deus promete estabelecer uma dinastia para\nDavi.\n3. A promessa começa com algo que Deus já havia feito\nAntes de anunciar o futuro, Deus lembra Davi do passado.\nEm essência: Eu te tirei de onde você estava. Eu estive com você. Eu derrotei seus inimigos.\nIsso segue um padrão que já vimos.\nCom Israel, Deus primeiro liberta e depois dá a Lei. Com Davi, Deus primeiro lembra sua ação e depois\nanuncia a promessa.\nIsso evita a ideia de que Davi esteja comprando uma bênção por oferecer um templo. A iniciativa continua\nem Deus.\n4. Deus promete um descendente para Davi\n2 Samuel 7 afirma que, depois de Davi, um descendente dele seria levantado.\nEsse descendente teria um reino estabelecido e também construiria uma casa para o nome de Deus.\nNo contexto histórico imediato, essa parte aponta claramente para Salomão.\nSalomão é filho de Davi, assume o reino e constrói o templo em Jerusalém.\nSentido imediato\nA promessa possui um cumprimento histórico imediato ligado à descendência real de Davi,\nespecialmente Salomão.\n5. Mas a promessa parece ir além de Salomão\nAo mesmo tempo, 2 Samuel 7 usa uma linguagem muito forte sobre reino, trono e permanência.\nA promessa passa a estar ligada à continuidade da casa de Davi.\nDepois disso, o restante do Antigo Testamento manterá viva a expectativa de um Rei ligado a essa\nlinhagem.\nIsso se torna especialmente importante porque os reis descendentes de Davi não serão perfeitos.\nMuitos falharão gravemente. O reino será dividido. Jerusalém será conquistada. A monarquia visível\nchegará a uma grande crise.\nPergunta que cresce\nO que aconteceu com a promessa feita a Davi?\nOs profetas responderão mantendo viva a esperança.\n6. A promessa não significa que todos os descendentes de Davi seriam bons reis\nEsse ponto precisa ficar claro.\n2 Samuel 7 não diz que cada descendente de Davi seria perfeito.\nNa verdade, o próprio texto menciona possibilidade de pecado e disciplina.\nDepois, a história mostra reis fiéis e reis muito infiéis.\nPrincípio\nA fidelidade de Deus à promessa não significa aprovação automática de tudo que os reis\nfariam.\n7. Davi também não é um rei perfeito\nÉ igualmente importante não idealizar Davi.\nEle é chamado por Deus, recebe promessas e possui momentos extraordinários de fé.\nMas também comete pecados graves. A história envolvendo Bate-Seba e Urias deixa isso muito claro.\nDavi não é o Rei perfeito que resolverá definitivamente o problema do pecado.\nIsso cria uma tensão: se a esperança depende de um Rei, precisamos de um Rei melhor do que Davi."
          },
          {
            "key": "CONECTE",
            "type": "CONNECT",
            "order": 4,
            "sourceHeading": "CONECTE AS ESCRITURAS",
            "contentText": "2 Samuel 7\nDeus promete estabelecer a casa, reino e trono de Davi.\nSalmos 89\nA promessa a Davi é celebrada, mas o salmo também enfrenta a aparente crise dessa\npromessa.\nSalmos 132\nDeus reafirma a promessa relacionada à descendência de Davi.\nIsaías 9\nSurge a esperança de um governante cujo reino estará ligado ao trono de Davi.\nIsaías 11\nUm novo ramo surgirá da linhagem de Jessé, pai de Davi.\nJeremias 23\nDeus promete levantar a Davi um Renovo justo.\nNovo Testamento\nJesus é apresentado repetidamente como Filho de Davi.\nLinha que se forma\nDavi → promessa → crise da monarquia → esperança profética → Messias.\nUMA PALAVRA IMPORTANTE: MESSIAS\nEssa palavra aparecerá cada vez mais.\n“Messias” vem da ideia de ungido.\nNo Antigo Testamento, reis e outras pessoas podiam ser ungidos para determinadas funções.\nQuando a esperança bíblica passa a esperar de maneira especial um futuro Rei enviado por Deus, a ideia do\nMessias ganha grande importância.\nNo Novo Testamento, “Cristo” corresponde à ideia de “Messias” ou “Ungido”.\nEm linguagem simples\nJesus Cristo não significa simplesmente “Jesus + sobrenome Cristo”. “Cristo” é um título:\nJesus, o Messias.\n8. Por que o povo começa a esperar um futuro Rei?\nPorque a história real dos reis não resolveu o problema.\nSaul fracassa. Davi possui falhas graves. Salomão começa bem, mas também termina sua história com\ngrandes problemas.\nDepois, o reino é dividido, reis maus aparecem, a idolatria cresce, Israel entra em crise e Jerusalém cai.\nSe dependesse apenas da qualidade dos reis humanos, a esperança pareceria perdida.\nMas os profetas continuam anunciando\nDeus ainda levantará um Rei justo.\nA esperança messiânica não nasce de uma monarquia perfeita. Ela cresce justamente em meio ao fracasso\ndos reis.\n9. Isaías apresenta um Rei ligado a Davi\nIsaías 9 fala de um governo ligado ao trono de Davi.\nIsaías 11 usa outra imagem. Ele fala de um ramo saindo do tronco de Jessé, pai de Davi.\nImagine uma árvore cortada. Parece acabada. Mas dela nasce um novo broto.\nA monarquia davídica poderia parecer destruída. Mesmo assim, Deus ainda poderia fazer surgir aquilo que\nprometeu.\nIsaías apresenta esse futuro governante associado a justiça, fidelidade, ação do Espírito de Deus e paz.\n10. Jeremias também mantém a promessa viva\nJeremias vive em um período de grande crise.\nJerusalém está caminhando para destruição. O reino está desmoronando.\nMesmo assim, Jeremias 23 fala de um Renovo justo levantado para Davi.\nEsse Rei governaria com justiça.\nForça da promessa\nA promessa é lembrada justamente quando tudo parece provar que ela fracassou.\nCOMO ESTE ESTUDO SE RELACIONA COM CRISTO?\nAqui a conexão é muito forte porque o próprio Novo Testamento apresenta Jesus dentro dessa história.\nNão precisamos criar um simbolismo escondido. Os Evangelhos fazem essa ligação diretamente.\nUMA INTERPRETAÇÃO APOSTÓLICA EXPLÍCITA\nJesus e o trono de Davi\nEm Lucas 1:30-33, o anúncio sobre Jesus inclui uma declaração direta: Deus lhe dará o trono de Davi, seu\npai; Ele reinará; e seu reino não terá fim.\nEssa linguagem retoma claramente a promessa de 2 Samuel 7.\nConexão explícita\nO Novo Testamento apresenta Jesus como o Rei prometido dentro da linhagem de Davi.\nEssa não é uma conexão inventada pelo estudo. Ela está explícita no texto de Lucas.\n11. “Filho de Davi” é mais do que uma informação familiar\nNos Evangelhos, pessoas chamam Jesus de Filho de Davi.\nIsso possui significado maior do que simplesmente dizer: “Jesus tinha um antepassado chamado Davi.”\nO título carrega esperança messiânica. Ele aponta para realeza, promessa e expectativa de um Rei.\nPor isso Mateus começa sua genealogia apresentando Jesus ligado a Abraão e a Davi.\nAs duas grandes promessas começam a se encontrar.\nAbraão → Davi → Jesus\nAbraão: bênção às nações.\nDavi: um Rei e um reino.\nJesus: o Novo Testamento apresenta ambas as linhas convergindo nele.\n12. Pedro usa a promessa a Davi ao anunciar a ressurreição\nEm Atos 2, Pedro fala sobre Davi, sua morte, sua sepultura, a promessa recebida e a ressurreição de Cristo.\nPedro apresenta Jesus ressuscitado e exaltado como cumprimento da esperança ligada a Davi.\nA realeza de Jesus não é apresentada simplesmente como um novo rei político sentado imediatamente no\npalácio de Jerusalém.\nO Novo Testamento apresenta um Rei ressuscitado e exaltado. Isso amplia nossa compreensão do Reino.\n13. O Reino de Jesus é maior que o reino político de Davi\nDavi governou um território específico. Possuía exército, capital, fronteiras e inimigos humanos.\nO reino de Cristo, no Novo Testamento, não pode ser reduzido simplesmente à repetição política do reino\nde Davi.\nJesus anuncia o Reino de Deus. Seu governo alcança uma dimensão muito maior.\nEssa questão será desenvolvida posteriormente.\nNeste ponto, basta perceber\nJesus cumpre a esperança davídica sem ser uma simples cópia de Davi. Ele é apresentado\ncomo um Rei maior.\n14. Por que Jesus precisa ser um Rei diferente?\nPorque os reis anteriores mostraram um problema.\nMesmo bons líderes continuam sendo humanos pecadores.\nPoder político não cura o coração. Exército não remove culpa. Palácio não vence a morte.\nUma administração melhor pode resolver muitos problemas sociais, mas não resolve o problema mais\nprofundo apresentado desde Gênesis 3.\nPor isso, o Rei prometido precisa fazer algo que nenhum rei anterior conseguiu fazer.\nO QUE APRENDEMOS SOBRE DEUS?\n• Deus conduz a história ao longo de gerações.\n• Estabelece promessas.\n• Permanece fiel mesmo quando os homens falham.\n• Não depende da perfeição dos reis para cumprir seu propósito.\n• Julga a desobediência sem abandonar sua promessa.\n• Prepara progressivamente a esperança de um Rei.\n• Mantém sua palavra mesmo quando as circunstâncias parecem contrárias.\nVerdade central\nQuando o reino humano fracassa, a promessa de Deus continua.\nO QUE APRENDEMOS SOBRE O SER HUMANO?\n• Bons líderes também possuem fraquezas.\n• Poder pode revelar e ampliar problemas do coração.\n• Nenhum governante humano deve ocupar o lugar de Deus.\n• Liderança não elimina a necessidade de santidade.\n• Até pessoas usadas por Deus precisam de arrependimento.\n• O ser humano precisa de um Rei melhor.\nProteção importante\nNenhum líder humano será o salvador definitivo da humanidade. A Bíblia desloca nossa\nesperança final para Deus e para seu Messias."
          },
          {
            "key": "APLIQUE",
            "type": "APPLY",
            "order": 5,
            "sourceHeading": "APLIQUE À VIDA",
            "contentText": "1. Não coloque em pessoas uma esperança que pertence a Deus\nLíderes podem ser importantes: pastores, pais, governantes, professores e chefes.\nTodos podem exercer influência real. Mas nenhum ser humano merece ocupar o lugar de nossa esperança\nfinal.\nPessoas falham. Deus permanece fiel.\n2. Uma posição importante não torna alguém imune ao pecado\nDavi foi rei, escolhido e usado por Deus. Mesmo assim, caiu gravemente.\nIsso nos ensina a não confundir chamado com perfeição.\nQuanto maior a responsabilidade, maior também deve ser a vigilância.\n3. Deus pode continuar sua obra mesmo depois de grandes fracassos humanos\nIsso não significa que pecado não tenha consequências. A casa de Davi enfrentará problemas sérios.\nMas o erro humano não consegue destruir o propósito final de Deus.\nEssa verdade traz esperança sem diminuir responsabilidade.\n4. Nem toda promessa se cumpre no tempo que imaginamos\nA promessa a Davi atravessa séculos.\nMuitos morreram sem ver seu cumprimento completo.\nIsso nos ensina novamente: Deus trabalha em uma história maior do que uma única geração.\nPrecisamos evitar transformar desejos pessoais em promessas. Mas aquilo que Deus realmente prometeu\npermanece seguro mesmo quando exige espera.\n5. Jesus não deve ser apenas parte da nossa vida; Ele é Rei\nÉ possível gostar de Jesus como professor, conselheiro, exemplo ou ajudador.\nMas o Novo Testamento também o apresenta como Senhor e Rei.\nIsso significa que seguir Jesus envolve perguntar: Quem governa minhas escolhas?\nSe Jesus é Rei, fé envolve também submissão."
          },
          {
            "key": "REFLECTION_QUESTIONS",
            "type": "REFLECTION_QUESTIONS",
            "order": 6,
            "sourceHeading": "PARA REFLETIR",
            "contentText": "• O que mais chamou sua atenção na promessa de 2 Samuel 7?\n• Por que “casa” possui mais de um sentido nesse capítulo?\n• Por que Salomão é importante para o cumprimento imediato da promessa?\n• Por que a promessa parece ir além de Salomão?\n• Tenho a tendência de idealizar líderes espirituais ou políticos?\n• O que os erros de Davi me ensinam sobre liderança e pecado?\n• Tenho colocado em alguma pessoa uma esperança que deveria estar em Deus?\n• O que muda quando reconheço Jesus não apenas como Salvador, mas também como Rei?"
          },
          {
            "key": "JOURNAL_PROMPT",
            "type": "JOURNAL_PROMPT",
            "order": 7,
            "sourceHeading": "Registrar no Diário",
            "contentText": "Existe alguma área da minha vida em que digo que Jesus é Senhor, mas ainda prefiro governar\nsozinho?"
          },
          {
            "key": "PRAYER",
            "type": "PRAYER",
            "order": 8,
            "sourceHeading": "ORE",
            "contentText": "Oração sugerida\nSenhor, obrigado porque tua fidelidade não depende da perfeição humana. Tu conduziste tua\npromessa através das gerações e revelaste em Cristo o Rei que precisamos. Ajuda-me a não\ncolocar minha esperança final em pessoas e ensina-me a reconhecer Jesus como Senhor\ntambém nas minhas escolhas diárias. Amém."
          },
          {
            "key": "KEEP",
            "type": "KEEP",
            "order": 9,
            "sourceHeading": "PARA GUARDAR",
            "contentText": "2 Samuel 7:16\nLeia o versículo completo em sua Bíblia.\nObserve as palavras: casa, reino, trono.\nDepois leia Lucas 1:32-33.\nCompare a promessa feita a Davi com aquilo que o anjo declara sobre Jesus.\nEssa é uma das conexões mais importantes de toda a nossa Jornada.\nAdicionar aos Favoritos\nGuarde 2 Samuel 7:16 e Lucas 1:32-33 para acompanhar a linha do Reino e do Messias."
          },
          {
            "key": "CONTINUE_JOURNEY",
            "type": "CONTINUE_JOURNEY",
            "order": 10,
            "sourceHeading": "CONTINUE SUA JORNADA",
            "contentText": "Estudo 01 - Criação\nDeus cria tudo muito bom.\nEstudo 02 - Queda\nO pecado produz ruptura.\nEstudo 03 - Esperança\nO mal não terá a palavra final.\nEstudo 04 - Promessa a Abraão\nA bênção alcançará as nações.\nEstudo 05 - Êxodo\nDeus liberta seu povo.\nEstudo 06 - Lei\nO povo aprende a viver em santidade.\nEstudo 07 - Sacrifícios\nO pecado precisa ser tratado diante de um Deus santo.\nEstudo 08 - Reino\nDeus promete a Davi uma linhagem real e mantém viva a esperança de um Rei.\nMas então a história entra em crise.\nMuitos reis falham. O povo se afasta de Deus. A injustiça cresce. O reino se divide. Jerusalém sofre. O\nexílio chega.\nParece que a promessa a Abraão fracassou, a Lei fracassou e o reino de Davi fracassou.\nÉ nesse momento que os profetas ganham enorme importância.\nEles não anunciam apenas juízo. Também anunciam esperança.\nFalam sobre um Rei, um Servo, uma nova aliança, um novo coração, restauração e a ação futura de Deus.\nPróximo estudo\nEstudo 09 - Os profetas anunciam esperança\nPergunta central: Em meio ao fracasso de Israel e de seus reis, o que os profetas começaram a\nanunciar sobre o futuro?\nTextos principais: Isaías 9:1-7 • Isaías 11:1-10 • Isaías 52:13-53:12 • Jeremias 31:31-34 •\nEzequiel 36:22-28\nNo próximo estudo veremos uma mudança muito importante: a esperança bíblica deixa de ser apenas\n“voltar aos bons tempos” e passa a apontar para uma obra de Deus ainda maior."
          }
        ],
        "terminalCompletion": null,
        "sourceAppendix": {
          "heading": "REFERÊNCIAS BÍBLICAS UTILIZADAS",
          "contentText": "Textos principais\n2 Samuel 7:1-17\nSalmos 89:1-4, 19-37\nSalmos 132:11-18\nContexto de Davi\n1 Samuel 16:1-13\n2 Samuel 5:1-5\nEsperança profética\nIsaías 9:6-7\nIsaías 11:1-10\nJeremias 23:5-6\nConexões no Novo Testamento\nLucas 1:30-33\nAtos 2:29-36\nNOTA EDITORIAL IMPORTANTE\nNeste estudo algumas distinções foram mantidas para evitar interpretações exageradas.\n1. Salomão e a promessa de 2 Samuel 7\nO texto possui um cumprimento histórico imediato ligado à descendência de Davi, especialmente Salomão,\nque constrói o templo.\nPor isso, não apresentamos cada frase de 2 Samuel 7 como se se referisse exclusivamente e diretamente a\nJesus.\n2. A promessa também cria uma expectativa maior\nAo longo dos Salmos e dos Profetas, a promessa davídica passa a alimentar a esperança de um futuro Rei.\nEssa linha foi mostrada através de textos bíblicos posteriores, e não apenas por inferência isolada a partir\nde 2 Samuel 7.\n3. Jesus e Davi\nA ligação entre Jesus e a promessa davídica foi apresentada como conexão explícita do Novo Testamento.\nLucas 1:32-33 aplica diretamente a linguagem do trono de Davi a Jesus.\nAtos 2 também relaciona a promessa a Davi com a ressurreição e exaltação de Cristo.\n4. “Messias”\nFoi explicado que “Messias” significa “Ungido” e que “Cristo” corresponde a esse título no Novo\nTestamento.\nNão tratamos “Cristo” como sobrenome de Jesus.\n5. Reino de Cristo\nO estudo evitou reduzir o Reino de Cristo a uma simples repetição política do antigo reino de Davi.\nO Novo Testamento apresenta uma realidade maior, que será desenvolvida progressivamente nos\npróximos estudos.\nSTATUS EDITORIAL\nTrilha\nO Plano Eterno de Deus\nEstudo\n08/18 - Reino e promessa a Davi\nVersão\nRascunho 1 para revisão\nSituação\nDRAFT - aguardando revisão de conteúdo e revisão bíblica"
        },
        "normalization": {
          "removedForbiddenControlCharCount": 0,
          "removedPageHeaderLineCount": 52
        },
        "canonicalSource": {
          "lineCount": 360,
          "sha256": "4CC98C5DD4552C12B1A74A49ACB7A832FB587E10FAE4DEB880FF4ED3AC82B4AA",
          "preambleLines": [
            "TRILHA 1 • O PLANO ETERNO DE DEUS",
            "08 - Reino e promessa a Davi"
          ]
        },
        "continuity": {
          "expectedNextStudyNumber": 9,
          "detectedNextStudyNumber": 9,
          "nextStudyId": "track-01-study-09",
          "terminal": false,
          "evidenceKind": "EXPLICIT_NUMBER",
          "valid": true
        },
        "quality": {
          "forbiddenControlCharCount": 0,
          "pageHeaderLeakCount": 0,
          "questionSemanticLeakCount": 0,
          "objectiveSemanticLeakCount": 0,
          "continueAppendixLeakCount": 0,
          "profileMarkerSetMatch": true,
          "structuredSectionCountMatch": true,
          "nextStudyIdValid": true,
          "terminalCompletionValid": null
        }
      },
    },
    {
      approvedCandidateSha256: "F8B2AE55E6513036FA3CB542CC84D0EFDA393B1E36171AAE47A38417ACCB1CAE",
      payload: {
        "schema": "P17-P2-A10-R2-R1-R1_TRACK1_BATCH_SIMULATION_CANDIDATE_V1",
        "readinessOnly": true,
        "runtimePayload": false,
        "batch": {
          "id": "B01_TRACK_01",
          "sequence": 1,
          "trackNumber": 1,
          "expectedTrackStudyCount": 18,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "source": {
          "relativePath": "trilha_01\\Biblia_Jornada_Estudo_09_Os_Profetas_Anunciam_Esperanca.pdf",
          "bytes": 970229,
          "sha256": "5C5563A98BBA3F82B0B288DDF724DBD97AE6C5E5ED88AFA664D5809F23995304",
          "pageCount": 7,
          "extractedCharacterCount": 9454,
          "expectedExtractedCharacterCount": 9454,
          "extractedTextSha256": "3F7C25CCD11008E446537A9D670F32B5A7650068583A2B668FDFBEC593556AEA",
          "a5NormalizedTextSha256": "5D2F0F5A402AE9CBA6FB5848C842D7B6BAB89C029E28FEFC3D9B7527CAC5CFF3"
        },
        "study": {
          "id": "track-01-study-09",
          "trackId": "track-01",
          "number": 9,
          "slug": "os-profetas-anunciam-esperanca",
          "questionCentral": "Em meio ao pecado, à queda dos reis e à crise de Israel, o que Deus começou a anunciar por meio dos profetas sobre o futuro?",
          "primaryTexts": "Isaías 9:1-7 • Isaías 11:1-10 • Isaías 52:13-53:12 • Jeremias 31:31-34 • Ezequiel 36:22-28",
          "complementaryReadings": "Jeremias 23:5-6 • Lucas 1:31-33 • Lucas 22:20 • Atos 8:30-35 • Hebreus 8:6-13",
          "estimatedTime": "10-12 minutos",
          "objective": "Ao final, queremos perceber quatro grandes esperanças anunciadas pelos profetas: • Um Rei justo. • Um Servo que sofre. • Uma nova aliança. • Um novo coração e uma nova ação de Deus no seu povo. Guarde esta ideia Quando o povo fracassa, Deus não abandona seu propósito. Ele anuncia que fará algo ainda maior.",
          "openingTakeaway": "",
          "editorialStatus": "DRAFT",
          "published": false,
          "runtimeEligible": false,
          "nextStudyId": "track-01-study-10",
          "terminal": false,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "sourceDeclaredProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "expectedProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkerCount": 12,
        "structuredSectionCount": 10,
        "sections": [
          {
            "key": "LEIA",
            "type": "READ",
            "order": 1,
            "sourceHeading": "LEIA",
            "contentText": "Leia as cinco passagens principais. Não tente entender cada detalhe profético de uma vez.\nDuas perguntas para guiar a leitura\nQual é o problema? E o que Deus promete fazer?"
          },
          {
            "key": "OBSERVE",
            "type": "OBSERVE",
            "order": 2,
            "sourceHeading": "OBSERVE",
            "contentText": "• Em Isaías 9 e 11, que tipo de governante é esperado?\n• O que diferencia esse Rei dos reis que já haviam falhado?\n• Em Isaías 53, o Servo aparece apenas vencendo ou também sofrendo?\n• Jeremias 31 fala apenas de renovação ou de uma nova aliança?\n• Onde a Lei seria colocada nessa nova aliança?\n• Em Ezequiel 36, o que Deus promete fazer com o coração do povo?\n• Quem toma a iniciativa dessas mudanças: o povo ou Deus?"
          },
          {
            "key": "ENTENDA",
            "type": "UNDERSTAND",
            "order": 3,
            "sourceHeading": "ENTENDA",
            "contentText": "1. Os profetas falam em tempos de crise\nOs profetas não aparecem porque tudo estava funcionando perfeitamente. Israel e Judá viveram idolatria,\ninjustiça, desobediência, reis infiéis, divisão, invasões e exílio.\nParecia que tudo o que estudamos anteriormente estava desmoronando.\nPergunta da época\nAs promessas de Deus terminaram?\nA resposta dos profetas é não. Eles anunciam juízo sobre o pecado, mas também anunciam esperança.\n2. Um Rei justo ainda viria\nJá vimos que Deus fez uma promessa a Davi. Mas os reis seguintes mostraram repetidamente suas\nlimitações.\nIsaías anuncia um futuro governante ligado à linhagem de Davi. Isaías 11 fala de um ramo que surgiria da\nlinhagem de Jessé.\nEsse governante seria marcado por justiça, fidelidade, ação do Espírito de Deus e cuidado com os fracos.\nA esperança muda\nNão é apenas: “Precisamos de outro rei.” Torna-se: “Precisamos do Rei que Deus prometeu.”\n3. O futuro também envolve um Servo que sofre\nIsaías 52-53 apresenta uma figura surpreendente. O Servo de Deus não aparece apenas exercendo poder.\nEle sofre, é rejeitado, é ferido, leva sobre si dores e pecados e depois é exaltado.\nIsso acrescenta algo novo: o plano de Deus não envolveria apenas governo. Envolveria também sofrimento\nligado à salvação de outros.\n4. Deus promete uma nova aliança\nJeremias 31 é uma das passagens mais importantes do Antigo Testamento.\nDeus promete uma nova aliança. A Lei não ficaria apenas diante das pessoas; Deus a colocaria dentro delas.\nTambém aparecem relacionamento com Deus, conhecimento de Deus e perdão.\nPonto central\nO problema de Israel não era apenas falta de mandamentos. O problema também estava no\ncoração humano.\n5. Deus promete um novo coração\nEzequiel 36 desenvolve essa esperança. Deus promete purificação, novo coração, novo espírito e seu\nEspírito atuando no povo.\nA solução não seria simplesmente: “Tentem mais uma vez, só que com mais força.”\nMudança decisiva\nDeus promete agir dentro do seu povo."
          },
          {
            "key": "CONECTE",
            "type": "CONNECT",
            "order": 4,
            "sourceHeading": "CONECTE AS ESCRITURAS",
            "contentText": "Isaías 9 e 11\nUm Rei justo.\nIsaías 52-53\nUm Servo que sofre.\nJeremias 31\nUma nova aliança.\nEzequiel 36\nUm novo coração e a ação do Espírito.\nEssas promessas ainda não explicam todos os detalhes. Mas a expectativa está ficando muito mais clara.\nCOMO ESTE ESTUDO SE RELACIONA COM CRISTO?\nO próprio Novo Testamento relaciona essas esperanças a Jesus.\n• Rei prometido: Lucas 1:31-33 relaciona Jesus diretamente ao trono de Davi.\n• Servo sofredor: em Atos 8:30-35, Filipe anuncia Jesus a partir de Isaías 53.\n• Nova aliança: em Lucas 22:20, Jesus fala da nova aliança ligada ao seu sangue.\n• Hebreus 8: cita Jeremias 31 para explicar a nova aliança.\nConexão bíblica explícita\nO próprio Novo Testamento apresenta Jesus como aquele em quem essas grandes esperanças\ncomeçam a convergir.\nUMA DISTINÇÃO IMPORTANTE\nNem toda profecia deve ser tratada como se fosse um código secreto contendo todos os detalhes futuros.\nOs profetas falaram primeiro a pessoas reais, vivendo situações reais. Seus textos possuíam contexto\nhistórico.\nAo mesmo tempo, o Novo Testamento mostra que algumas dessas promessas possuíam um alcance maior\nque encontra cumprimento em Cristo.\nNosso caminho\nEntender primeiro o texto em seu contexto e depois observar como a própria Bíblia\ndesenvolve sua mensagem.\nO QUE APRENDEMOS SOBRE DEUS?\n• Leva o pecado a sério.\n• Disciplina seu povo.\n• Permanece fiel às suas promessas.\n• Pode trazer esperança em meio à ruína.\n• Promete transformar o coração.\n• Prepara um Rei.\n• Anuncia uma nova aliança.\n• Conduz a história para a redenção.\nVerdade central\nDeus não apenas promete mudar as circunstâncias. Ele promete transformar pessoas.\nO QUE APRENDEMOS SOBRE O SER HUMANO?\n• Regras externas não resolvem sozinhas o problema interior.\n• Bons líderes não são suficientes.\n• Esforço humano não produz uma transformação completa.\n• Precisamos de perdão.\n• Precisamos de um novo coração.\n• Precisamos da ação de Deus.\nIsso prepara o caminho diretamente para Jesus."
          },
          {
            "key": "APLIQUE",
            "type": "APPLY",
            "order": 5,
            "sourceHeading": "APLIQUE À VIDA",
            "contentText": "1. Deus pode trabalhar mesmo quando tudo parece perdido\nOs profetas anunciaram esperança justamente em períodos de crise. Circunstâncias ruins não significam\nautomaticamente que Deus perdeu o controle.\n2. O problema não está apenas ao nosso redor\nÉ fácil pensar: “Se minhas circunstâncias mudassem, tudo estaria resolvido.” Os profetas mostram algo mais\nprofundo: o ser humano também precisa ser transformado por dentro.\n3. Cristianismo não é apenas comportamento externo\nÉ possível aprender regras sem ter o coração transformado. Jeremias e Ezequiel apontam para uma relação\ncom Deus que alcança o interior da pessoa.\n4. A esperança bíblica possui um centro\nQuanto mais avançamos, menos a Bíblia aponta para um sistema, um governo humano ou o esforço das\npessoas. A esperança começa a se concentrar cada vez mais naquele que Deus enviaria."
          },
          {
            "key": "REFLECTION_QUESTIONS",
            "type": "REFLECTION_QUESTIONS",
            "order": 6,
            "sourceHeading": "PARA REFLETIR",
            "contentText": "• Qual das quatro promessas deste estudo mais chamou minha atenção?\n• Tenho buscado apenas mudança de circunstâncias ou também transformação interior?\n• Minha vida com Deus está baseada apenas em comportamento externo?\n• O que significa para mim precisar de um novo coração?\n• Como esses textos aumentam minha compreensão sobre Jesus?"
          },
          {
            "key": "JOURNAL_PROMPT",
            "type": "JOURNAL_PROMPT",
            "order": 7,
            "sourceHeading": "Registrar no Diário",
            "contentText": "O que precisa mudar não apenas ao meu redor, mas também dentro de mim?"
          },
          {
            "key": "PRAYER",
            "type": "PRAYER",
            "order": 8,
            "sourceHeading": "ORE",
            "contentText": "Oração sugerida\nSenhor, obrigado porque não abandonaste teu propósito mesmo diante do pecado e do\nfracasso humano. Dá-me um coração disposto a ouvir tua Palavra e transforma aquilo que não\nconsigo mudar sozinho. Ajuda-me a compreender cada vez mais a esperança que anunciaste e\nque se cumpre em Cristo. Amém."
          },
          {
            "key": "KEEP",
            "type": "KEEP",
            "order": 9,
            "sourceHeading": "PARA GUARDAR",
            "contentText": "Jeremias 31:33\nLeia o versículo completo.\nObserve esta ideia: Deus promete colocar sua Lei dentro do seu povo e escrevê-la no coração.\nDepois leia Hebreus 8:10 e perceba como o Novo Testamento retoma essa promessa.\nAdicionar aos Favoritos\nGuarde Jeremias 31:33 e Hebreus 8:10 para acompanhar o tema da nova aliança."
          },
          {
            "key": "CONTINUE_JOURNEY",
            "type": "CONTINUE_JOURNEY",
            "order": 10,
            "sourceHeading": "CONTINUE SUA JORNADA",
            "contentText": "Nossa história chegou a um ponto decisivo: Criação → Queda → Promessa → Redenção → Lei →\nSacrifícios → Reino → Profetas.\nAgora séculos de promessa e expectativa chegam a um momento central: Jesus aparece.\nPróximo estudo\nEstudo 10 - Jesus e o cumprimento das promessas\nPergunta central: Por que Jesus ocupa o centro da história bíblica?\nTextos principais: Mateus 1:1-17 • Lucas 4:16-21 • Lucas 24:25-27, 44-49 • Gálatas 4:4-5\nNo próximo estudo vamos conectar as principais linhas construídas até aqui e perceber como o Novo\nTestamento apresenta Jesus dentro da história de Abraão, Davi, dos profetas e da redenção."
          }
        ],
        "terminalCompletion": null,
        "sourceAppendix": {
          "heading": "REFERÊNCIAS BÍBLICAS UTILIZADAS",
          "contentText": "Textos principais\nIsaías 9:1-7\nIsaías 11:1-10\nIsaías 52:13-53:12\nJeremias 31:31-34\nEzequiel 36:22-28\nConexões no Novo Testamento\nLucas 1:31-33\nLucas 22:20\nAtos 8:30-35\nHebreus 8:6-13\nNOTA EDITORIAL\n• Não tratamos todas as profecias como previsões isoladas sem contexto.\n• Diferenciamos o contexto histórico dos profetas de seu desenvolvimento posterior.\n• As conexões com Jesus foram apresentadas principalmente quando o próprio Novo Testamento as\nestabelece.\n• Não transformamos detalhes proféticos em simbolismos especulativos.\nSTATUS EDITORIAL\nTrilha\nO Plano Eterno de Deus\nEstudo\n09/18 - Os profetas anunciam esperança\nVersão\nRascunho 1 para revisão\nSituação\nDRAFT - aguardando revisão bíblica e editorial"
        },
        "normalization": {
          "removedForbiddenControlCharCount": 0,
          "removedPageHeaderLineCount": 28
        },
        "canonicalSource": {
          "lineCount": 183,
          "sha256": "498E9DA0ADF9CB385BE9F9EA372B5CAAA53C4502CC5E668FAC94B043F50B9C61",
          "preambleLines": [
            "TRILHA 1 • O PLANO ETERNO DE DEUS",
            "09 - Os profetas anunciam esperança"
          ]
        },
        "continuity": {
          "expectedNextStudyNumber": 10,
          "detectedNextStudyNumber": 10,
          "nextStudyId": "track-01-study-10",
          "terminal": false,
          "evidenceKind": "EXPLICIT_NUMBER",
          "valid": true
        },
        "quality": {
          "forbiddenControlCharCount": 0,
          "pageHeaderLeakCount": 0,
          "questionSemanticLeakCount": 0,
          "objectiveSemanticLeakCount": 0,
          "continueAppendixLeakCount": 0,
          "profileMarkerSetMatch": true,
          "structuredSectionCountMatch": true,
          "nextStudyIdValid": true,
          "terminalCompletionValid": null
        }
      },
    },
    {
      approvedCandidateSha256: "2B21F5582D53A7AFD273641B153B6817B7741A51D920CAE7F7626C0A595E4499",
      payload: {
        "schema": "P17-P2-A10-R2-R1-R1_TRACK1_BATCH_SIMULATION_CANDIDATE_V1",
        "readinessOnly": true,
        "runtimePayload": false,
        "batch": {
          "id": "B01_TRACK_01",
          "sequence": 1,
          "trackNumber": 1,
          "expectedTrackStudyCount": 18,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "source": {
          "relativePath": "trilha_01\\Biblia_Jornada_Estudo_10_Jesus_E_O_Cumprimento_Das_Promessas.pdf",
          "bytes": 970927,
          "sha256": "2B1A987C28B06A16E6D92C3411DD8842B0D603DF9F4B8583ECA8BB8E6ADBFABF",
          "pageCount": 7,
          "extractedCharacterCount": 10414,
          "expectedExtractedCharacterCount": 10414,
          "extractedTextSha256": "706D127215DD84CAB1A40D12F0ADB7148D49074CCCFF9336A51ED899E9162D9B",
          "a5NormalizedTextSha256": "DFA65147ED341ACF4AA5838D12231DB1047CAC2D1C778D650E939CFF62629380"
        },
        "study": {
          "id": "track-01-study-10",
          "trackId": "track-01",
          "number": 10,
          "slug": "jesus-e-o-cumprimento-das-promessas",
          "questionCentral": "Por que Jesus ocupa o centro da história bíblica?",
          "primaryTexts": "Mateus 1:1-17 • Lucas 4:16-21 • Lucas 24:25-27, 44-49 • Gálatas 4:4-5",
          "complementaryReadings": "Mateus 5:17 • João 5:39-40 • Romanos 1:1-4 • Gálatas 3:16 • Hebreus 1:1-3",
          "estimatedTime": "10-12 minutos",
          "objective": "Ao final, queremos compreender quatro verdades: • Jesus não aparece no Novo Testamento como alguem desconectado do Antigo Testamento. • O Novo Testamento o apresenta dentro das promessas feitas a Abraão, Davi e pelos profetas. • Jesus afirma que as Escrituras apontam para a obra que Deus realizaria por meio dele. • Compreender Jesus ajuda a enxergar a Bíblia como uma história conectada, e não como uma coleção de histórias separadas. Guarde esta ideia Jesus não entra no meio da Bíblia para comecar outra história. Ele entra na história que Deus já vinha conduzindo.",
          "openingTakeaway": "",
          "editorialStatus": "DRAFT",
          "published": false,
          "runtimeEligible": false,
          "nextStudyId": "track-01-study-11",
          "terminal": false,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "sourceDeclaredProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "expectedProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkerCount": 12,
        "structuredSectionCount": 10,
        "sections": [
          {
            "key": "LEIA",
            "type": "READ",
            "order": 1,
            "sourceHeading": "LEIA",
            "contentText": "Comece com Mateus 1:1-17. As genealogias podem parecer apenas listas de nomes, mas observe como\nMateus apresenta Jesus logo no primeiro versículo:\n• Jesus Cristo;\n• filho de Davi;\n• filho de Abraão.\nDepois leia Lucas 4:16-21, Lucas 24:25-27, 44-49 e Gálatas 4:4-5.\nPergunta para acompanhar a leitura\nComo cada passagem relaciona Jesus com aquilo que Deus já havia prometido?"
          },
          {
            "key": "OBSERVE",
            "type": "OBSERVE",
            "order": 2,
            "sourceHeading": "OBSERVE",
            "contentText": "• Por que Mateus menciona Abraão e Davi logo no inicio?\n• Em Lucas 4, qual passagem Jesus lê na sinagoga?\n• O que Jesus declara depois da leitura?\n• Em Lucas 24, quais partes das Escrituras Jesus menciona?\n• O que os discípulos ainda não haviam compreendido?\n• Em Gálatas 4, Jesus aparece no momento certo ou por acaso?\n• O Novo Testamento apresenta Jesus como interrupção ou continuidade do plano de Deus?"
          },
          {
            "key": "ENTENDA",
            "type": "UNDERSTAND",
            "order": 3,
            "sourceHeading": "ENTENDA",
            "contentText": "1. Jesus aparece dentro da história de Abraão\nNo Estudo 04 vimos que Deus prometeu a Abraão uma bênção que alcancaria as nações.\nMateus comeca seu Evangelho ligando Jesus diretamente a Abraão. Paulo também faz essa conexão em\nGálatas 3.\nPonto central\nA chegada de Jesus faz parte da longa história da promessa.\n2. Jesus aparece dentro da história de Davi\nTambem vimos que Deus prometeu a Davi uma linhagem real. Por isso Mateus chama Jesus de filho de\nDavi.\nLucas 1 também havia anunciado que Jesus receberia o trono de Davi.\nEsperanca real\nO Novo Testamento apresenta Jesus como o Rei esperado da linhagem de Davi.\n3. Jesus se apresenta dentro da esperanca dos profetas\nEm Lucas 4, Jesus entra em uma sinagoga e lê uma passagem de Isaías. O texto fala de boas noticias,\nlibertacao e acao de Deus.\nDepois Jesus declara que aquela Escritura estava se cumprindo diante deles.\nEle não esta apenas dizendo: “Eu gosto desse texto.” Ele esta se colocando dentro daquilo que o profeta\nanunciava."
          },
          {
            "key": "CONECTE",
            "type": "CONNECT",
            "order": 4,
            "sourceHeading": "CONECTE A JORNADA",
            "contentText": "Criação\nDeus cria um mundo bom.\nQueda\nO pecado traz ruptura.\nAbraão\nDeus anuncia bênção para as nações.\nÊxodo\nDeus revela seu poder para libertar.\nLei\nDeus ensina seu povo a viver.\nSacrifícios\nO pecado precisa ser tratado.\nDavi\nSurge a promessa de um Rei.\nProfetas\nDeus anuncia nova aliança, novo coração, Rei e Servo.\nJesus\nEssas linhas comecam a convergir.\nÉ por isso que Jesus ocupa uma posição tao central na Bíblia.\n4. Jesus ensina seus discípulos a ler as Escrituras dessa maneira\nLucas 24 acontece depois da ressurreição. Os discípulos estavam confusos e não haviam entendido como\nsofrimento, morte e ressurreição faziam parte da história.\nEntao Jesus explica as Escrituras. Lucas menciona Moisés, Profetas e Salmos, representando as grandes\npartes das Escrituras de Israel.\nJesus mostra que sua missão deveria ser compreendida dentro dessa história.\nUMA DISTINCAO IMPORTANTE\nDizer que as Escrituras apontam para Cristo não significa afirmar que todo versículo do Antigo Testamento\nseja uma previsão direta sobre Jesus.\nUma lei sobre agricultura, uma genealogia, uma batalha ou um proverbio não precisam ser transformados\nartificialmente em símbolos secretos de Cristo.\nCaminho seguro\n1. Entender o texto em seu contexto.\n2. Ver seu papel na história bíblica.\n3. Observar se o Novo Testamento o relaciona diretamente a Cristo.\n4. Entender como ele contribui para a história que chega até Jesus.\nCristo é o centro da história bíblica sem que precisemos inventar significados escondidos em cada detalhe.\n5. “Cumprimento” não significa apenas previsão realizada\nQuando pensamos em profecia, muitas vezes imaginamos alguem prevendo um acontecimento e depois ele\nacontecendo. Isso realmente existe na Bíblia.\nMas o conceito de cumprimento pode ser mais amplo. Jesus também leva adiante e completa grandes\ntemas da história bíblica.\n• promessa;\n• reino;\n• aliança;\n• redenção;\n• sacrificio;\n• presenca de Deus.\nEsses temas foram sendo construidos durante séculos. No Novo Testamento, eles encontram em Cristo\nseu desenvolvimento decisivo.\n6. Jesus chega no “tempo determinado”\nGálatas 4:4 diz que, quando chegou a plenitude do tempo, Deus enviou seu Filho.\nA linguagem mostra propósito. Abraão, Israel, Êxodo, Lei, Davi e Profetas aparecem antes da chegada de\nJesus.\nResumo\nO Evangelho possui uma história antes de Mateus 1.\nO QUE JESUS CUMPRE?\n• Promessa a Abraão: a bênção alcancaria as nações.\n• Promessa a Davi: um Rei viria de sua linhagem.\n• Esperanca dos profetas: Deus traria restauracao, nova aliança e transformacao.\n• Problema do pecado: a humanidade precisava de uma solucao mais profunda que leis, lideres ou esforço\nhumano.\nConvergencia\nO Novo Testamento apresenta Jesus no encontro dessas linhas.\nO QUE APRENDEMOS SOBRE DEUS?\n• Conduz a história com propósito.\n• Permanece fiel por gerações.\n• Nao esquece suas promessas.\n• Revela seu plano progressivamente.\n• Envia Cristo no tempo determinado.\n• Une diferentes partes da história da redenção em seu propósito.\nVerdade importante\nDeus não improvisa a salvação.\nO QUE APRENDEMOS SOBRE JESUS?\nJesus não e apresentado apenas como um professor sábio, exemplo moral ou realizador de milagres.\n• Messias;\n• Filho de Davi;\n• descendente de Abraão;\n• cumprimento das promessas;\n• centro da mensagem apostolica.\nPergunta mais profunda\nNao basta perguntar: “O que Jesus ensinou?” Tambem precisamos perguntar: “Quem Jesus é\ndentro da história de Deus?”"
          },
          {
            "key": "APLIQUE",
            "type": "APPLY",
            "order": 5,
            "sourceHeading": "APLIQUE A VIDA",
            "contentText": "1. Leia a Bíblia como uma história conectada\nNao trate Abraão, Moisés, Davi, Isaías e Jesus como personagens de histórias completamente separadas.\nUma parte prepara a próxima.\n2. Nao transforme Jesus apenas em conselheiro\nJesus pode nos ensinar muito sobre a vida. Mas o Novo Testamento o apresenta como muito mais do que\nalguem que oferece bons conselhos. Ele está no centro da obra de Deus para salvar.\n3. Evite interpretações inventadas\nEncontrar Cristo na Bíblia não significa forcar Cristo em cada detalhe. Fidelidade bíblica e melhor do que\ncriatividade sem fundamento.\n4. Conhecer Jesus ajuda a compreender a Bíblia inteira\nQuanto melhor entendemos quem Ele é, o que veio fazer e como os apostolos interpretam sua obra, mais\nclara fica a conexão entre Antigo e Novo Testamento."
          },
          {
            "key": "REFLECTION_QUESTIONS",
            "type": "REFLECTION_QUESTIONS",
            "order": 6,
            "sourceHeading": "PARA REFLETIR",
            "contentText": "• Eu costumava enxergar a Bíblia como uma única história ou como várias histórias separadas?\n• Por que Abraão e Davi aparecem logo no inicio de Mateus?\n• O que Lucas 24 ensina sobre a maneira como Jesus lia as Escrituras?\n• Tenho reduzido Jesus apenas a alguem que me ajuda nos problemas?\n• O que muda quando percebo que Ele ocupa o centro da história da redenção?"
          },
          {
            "key": "JOURNAL_PROMPT",
            "type": "JOURNAL_PROMPT",
            "order": 7,
            "sourceHeading": "Registrar no Diario",
            "contentText": "Quem Jesus tem sido para mim: apenas alguem que me ajuda ou o centro da minha fé e da\nminha história?"
          },
          {
            "key": "PRAYER",
            "type": "PRAYER",
            "order": 8,
            "sourceHeading": "ORE",
            "contentText": "Oração sugerida\nSenhor, obrigado porque conduziste tua história com fidelidade e cumpriste tuas promessas\nem Cristo. Ajuda-me a conhecer Jesus com mais profundidade e a ler tua Palavra percebendo\ncomo cada etapa da história revela teu propósito. Livra-me de interpretações sem fundamento\ne ensina-me a permanecer fiel ao que as Escrituras dizem. Amém."
          },
          {
            "key": "KEEP",
            "type": "KEEP",
            "order": 9,
            "sourceHeading": "PARA GUARDAR",
            "contentText": "Lucas 24:44\nLeia o versículo completo. Observe como Jesus menciona Lei de Moisés, Profetas e Salmos.\nDepois leia os versículos seguintes e perceba como sofrimento, ressurreição e anuncio as nações aparecem\nconectados.\nAdicionar aos Favoritos\nGuarde Lucas 24:44-49 para acompanhar como Jesus relaciona sua missão com as Escrituras."
          },
          {
            "key": "CONTINUE_JOURNEY",
            "type": "CONTINUE_JOURNEY",
            "order": 10,
            "sourceHeading": "CONTINUE SUA JORNADA",
            "contentText": "Chegamos a Jesus. Agora precisamos observar com atenção aquilo que esta no centro de sua missão.\nO próximo passo nos leva a Jerusalem. Jesus sera preso, condenado e crucificado. A primeira vista, parece\nderrota. Mas o Novo Testamento apresenta a cruz como parte central da salvação.\nPróximo estudo\nEstudo 11 - A cruz\nPergunta central: O que realmente aconteceu no Calvario e por que a morte de Jesus e central\npara o Evangelho?\nTextos principais: Marcos 15:21-39 • Isaías 53:4-6 • Romanos 3:21-26 • 1 Pedro 2:21-25\nNo próximo estudo vamos entender a cruz sem reduzir sua mensagem a uma única frase e sem criar\nexplicações que ultrapassem aquilo que as Escrituras afirmam."
          }
        ],
        "terminalCompletion": null,
        "sourceAppendix": {
          "heading": "REFERENCIAS BIBLICAS UTILIZADAS",
          "contentText": "Textos principais\nMateus 1:1-17\nLucas 4:16-21\nLucas 24:25-27, 44-49\nGálatas 4:4-5\nConexoes\nMateus 5:17\nJoão 5:39-40\nRomanos 1:1-4\nGálatas 3:16\nHebreus 1:1-3\nNOTA EDITORIAL\n• Jesus foi apresentado como cumprimento das promessas porque o próprio Novo Testamento estabelece\nessas conexões.\n• “Cumprimento” não foi reduzido somente a previsões pontuais, mas também ao desenvolvimento da\nhistória bíblica.\n• Nao afirmamos que cada versículo do Antigo Testamento seja uma profecia direta ou um símbolo oculto\nde Cristo.\nSTATUS EDITORIAL\nEstudo 10/18\nTrilha: O Plano Eterno de Deus\nTítulo: Jesus e o cumprimento das promessas\nVersão: Rascunho 1 para revisão\nSituação: DRAFT - aguardando revisão bíblica e editorial"
        },
        "normalization": {
          "removedForbiddenControlCharCount": 0,
          "removedPageHeaderLineCount": 28
        },
        "canonicalSource": {
          "lineCount": 209,
          "sha256": "3819E7AA5A442E3FE7DFCD3527DD3351E7D16AB9B6B443BD425CEB6386097CE9",
          "preambleLines": [
            "TRILHA 1 - O PLANO ETERNO DE DEUS",
            "10 - Jesus e o cumprimento das promessas"
          ]
        },
        "continuity": {
          "expectedNextStudyNumber": 11,
          "detectedNextStudyNumber": 11,
          "nextStudyId": "track-01-study-11",
          "terminal": false,
          "evidenceKind": "EXPLICIT_NUMBER",
          "valid": true
        },
        "quality": {
          "forbiddenControlCharCount": 0,
          "pageHeaderLeakCount": 0,
          "questionSemanticLeakCount": 0,
          "objectiveSemanticLeakCount": 0,
          "continueAppendixLeakCount": 0,
          "profileMarkerSetMatch": true,
          "structuredSectionCountMatch": true,
          "nextStudyIdValid": true,
          "terminalCompletionValid": null
        }
      },
    },
    {
      approvedCandidateSha256: "0A7AF13E0FEBC94E23C7CB70E7A33519E1940E9B02D7D032881D910530EDA7DC",
      payload: {
        "schema": "P17-P2-A10-R2-R1-R1_TRACK1_BATCH_SIMULATION_CANDIDATE_V1",
        "readinessOnly": true,
        "runtimePayload": false,
        "batch": {
          "id": "B01_TRACK_01",
          "sequence": 1,
          "trackNumber": 1,
          "expectedTrackStudyCount": 18,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "source": {
          "relativePath": "trilha_01\\Biblia_Jornada_Estudo_11_A_Cruz_O_Que_Realmente_Aconteceu_No_Calvario.pdf",
          "bytes": 976511,
          "sha256": "1677F1D1C6451A85CCC25B565FD8FD72538DC85A6C56D378809D17059B7D0DEE",
          "pageCount": 9,
          "extractedCharacterCount": 13692,
          "expectedExtractedCharacterCount": 13692,
          "extractedTextSha256": "94914A2A22D1D4011259F303E9E9205F9B74D553897009E06965BC0B51850DD1",
          "a5NormalizedTextSha256": "1696DF2ACF71C3CCCC34D2C0BD4DCE49FAC27F8857DA4260DFFC18A568B47295"
        },
        "study": {
          "id": "track-01-study-11",
          "trackId": "track-01",
          "number": 11,
          "slug": "a-cruz-o-que-realmente-aconteceu-no-calvario",
          "questionCentral": "Por que a morte de Jesus na cruz está no centro do Evangelho?",
          "primaryTexts": "Marcos 15:21-39 | Isaías 53:4-6 | Romanos 3:21-26 | 1 Pedro 2:21-25",
          "complementaryReadings": "João 10:17-18 | Romanos 5:6-11 | 2 Coríntios 5:18-21 | Colossenses 2:13-15 | 1 Coríntios 15:3-4",
          "estimatedTime": "12-15 minutos",
          "objective": "Queremos entender cinco verdades principais: • Jesus realmente foi crucificado e morreu. • Sua morte não foi apresentada pelos apóstolos como um acidente sem sentido. • O Novo Testamento diz que Cristo morreu por nossos pecados. • Na cruz encontramos perdão, reconciliação e libertação. • A cruz revela ao mesmo tempo a seriedade do pecado e a profundidade do amor de Deus. Guarde esta verdade Na cruz, Deus não ignora o pecado nem abandona o pecador. Em Cristo, Ele age para nos reconciliar consigo.",
          "openingTakeaway": "",
          "editorialStatus": "DRAFT",
          "published": false,
          "runtimeEligible": false,
          "nextStudyId": "track-01-study-12",
          "terminal": false,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "sourceDeclaredProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "expectedProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkerCount": 12,
        "structuredSectionCount": 10,
        "sections": [
          {
            "key": "LEIA",
            "type": "READ",
            "order": 1,
            "sourceHeading": "LEIA",
            "contentText": "Comece por Marcos 15:21-39. Leia devagar. Não tente correr diretamente para uma explicação teológica.\nPrimeiro veja a cena.\nJesus está rejeitado, condenado, humilhado, crucificado, cercado por zombaria e finalmente morre.\nDepois leia Isaías 53:4-6, Romanos 3:21-26 e 1 Pedro 2:21-25.\nObserve especialmente\nAs expressões relacionadas a pecado, culpa, justiça, feridas, reconciliação e perdão."
          },
          {
            "key": "OBSERVE",
            "type": "OBSERVE",
            "order": 2,
            "sourceHeading": "OBSERVE",
            "contentText": "• Jesus morre como alguém poderoso aos olhos humanos ou como alguém aparentemente derrotado?\n• O que acontece quando Ele morre?\n• Isaías 53 fala apenas do sofrimento do Servo ou relaciona esse sofrimento aos pecados de outros?\n• O que 1 Pedro diz que Jesus levou sobre si?\n• Segundo Romanos 5, o que a morte de Cristo demonstra sobre o amor de Deus?\n• Em 2 Coríntios 5, quem toma a iniciativa da reconciliação?\n• A cruz é apresentada apenas como exemplo de coragem ou como algo que realiza salvação?"
          },
          {
            "key": "ENTENDA",
            "type": "UNDERSTAND",
            "order": 3,
            "sourceHeading": "ENTENDA",
            "contentText": "1. Jesus realmente morreu\nPode parecer óbvio, mas precisamos começar aqui. O Evangelho cristão não diz apenas: “Jesus sofreu\nmuito.” Diz que Ele morreu.\nMarcos descreve a crucificação dentro de um acontecimento histórico. Jesus é condenado sob autoridade\nromana, levado ao lugar da execução e crucificado.\nSua morte não é uma metáfora espiritual. Ela faz parte da história que os primeiros cristãos anunciaram.\nCentro da mensagem apostólica\nCristo morreu por nossos pecados, foi sepultado e ressuscitou.\n2. A cruz foi uma injustiça humana - mas não apenas isso\nJesus foi condenado mesmo sendo inocente. Houve inveja, pressão, covardia, violência e abuso de\nautoridade. Homens realmente foram responsáveis por aquilo que fizeram.\nMas os apóstolos não enxergaram a cruz apenas como: “um homem bom foi assassinado injustamente.” Eles\nperceberam, depois da ressurreição, que Deus estava realizando ali algo para a salvação.\nDuas dimensões\nFoi um grande pecado cometido por seres humanos e, ao mesmo tempo, Deus usou aquela\naparente derrota dentro de seu plano de redenção.\n3. Jesus morreu por nossos pecados\nEssa é uma das declarações mais simples e mais profundas do Novo Testamento.\n1 Coríntios 15:3 resume a mensagem apostólica: Cristo morreu por nossos pecados.\nIsso significa que sua morte possui relação direta com nosso problema diante de Deus.\nVoltamos ao que vimos desde Gênesis 3: o pecado rompe, culpa, escraviza, separa e produz morte.\nA cruz entra justamente nesse problema. Não é apenas uma mensagem sobre sofrimento. É uma resposta\nde Deus ao pecado humano.\n4. Ele levou nossos pecados\n1 Pedro 2 utiliza linguagem muito forte. Pedro diz que Cristo levou nossos pecados em seu corpo no\nmadeiro.\nPedro também retoma claramente Isaías 53. Ali encontramos a imagem do Servo sofrendo por causa das\ntransgressões de outros.\nPodemos dizer com segurança: o Novo Testamento apresenta Jesus sofrendo em nosso favor e carregando\naquilo que estava relacionado à nossa culpa.\nSubstituição - em linguagem simples\nEle sofre em favor de quem deveria estar respondendo pelo pecado.\nPARE UM MOMENTO AQUI\nExiste uma diferença entre saber a frase “Jesus morreu por mim” e realmente deixar essa verdade chegar ao\ncoração.\nA cruz diz duas coisas ao mesmo tempo\nSeu pecado é sério.\nMas você foi amado de maneira profunda.\nEla não permite que tratemos o pecado com leveza. Mas também não permite que pensemos que Deus não\ndeseja nos resgatar.\n5. A cruz traz reconciliação\nExiste outra palavra importante no Novo Testamento: reconciliação. Quando existe ruptura, reconciliação\nsignifica restauração do relacionamento.\n2 Coríntios 5 apresenta Deus agindo em Cristo para reconciliar consigo o mundo. Romanos 5 também\nafirma que fomos reconciliados com Deus pela morte de seu Filho.\nMais que apagar uma ficha\nO objetivo da salvação não é apenas apagar uma lista de erros. É restaurar relacionamento com\nDeus.\n6. A cruz e a justificação\nRomanos 3 fala de outra realidade: justificação.\nDefinição simples\nDeus declara justo aquele que, pela fé, recebe aquilo que Cristo realizou - não porque nunca\npecou, mas porque sua salvação está fundamentada na graça de Deus.\nPaulo insiste que essa justificação é pela graça. Não é salário por desempenho religioso. Não é prêmio para\nquem conseguiu limpar a própria vida.\nDiante da cruz, todos dependemos da graça.\n7. A cruz também fala de vitória\nÀs vezes explicamos a cruz apenas em termos de culpa e perdão. Esses temas são essenciais. Mas o Novo\nTestamento apresenta ainda outra dimensão.\nColossenses 2 relaciona a obra de Cristo à derrota dos poderes que se levantavam contra nós.\nParece estranho: Jesus está pregado em uma cruz e os inimigos parecem vencer.\nParadoxo da cruz\nAquilo que parecia ser o triunfo do mal se torna parte de sua derrota.\nEssa vitória será confirmada de maneira decisiva na ressurreição.\nUMA CRUZ, VÁRIAS IMAGENS BÍBLICAS\nSacrifício\nO pecado é tratado diante de Deus.\nSubstituição\nCristo sofre em favor de pecadores.\nRedenção\nHá libertação de uma condição de escravidão.\nReconciliação\nO relacionamento com Deus é restaurado.\nJustificação\nO pecador é recebido pela graça mediante a fé.\nVitória\nO mal não terá a palavra final.\nNão precisamos colocar essas imagens para competir entre si. Elas mostram diferentes lados da mesma\nobra de Cristo.\n8. A cruz revela justiça e amor\nÀs vezes alguém pergunta: “Se Deus ama, por que simplesmente não ignora o pecado?”\nPorque amor verdadeiro não chama o mal de bem. Pense em injustiça, abuso, violência e opressão. Um\nDeus que simplesmente dissesse “nada disso importa” não seria um Deus justo.\nA Bíblia apresenta Deus levando o pecado a sério e, ao mesmo tempo, agindo para salvar pecadores.\nRomanos 5\nDeus demonstra seu amor porque Cristo morre por nós quando ainda éramos pecadores.\nDeus não precisou fingir que o pecado não existia para nos amar.\n9. Jesus não é apresentado como uma vítima contra a própria vontade\nIsso também precisa ficar claro.\nÀs vezes a cruz é explicada de uma forma que parece colocar um Pai desejando castigar contra um Filho\ntentando escapar. Esse não é o retrato completo do Novo Testamento.\nJesus diz em João 10 que entrega sua vida voluntariamente. O Novo Testamento apresenta Pai e Filho\nunidos na obra da salvação.\nImportante\nA cruz é uma entrega voluntária de amor, não a história de um Filho indefeso surpreendido por\num Pai cruel."
          },
          {
            "key": "CONECTE",
            "type": "CONNECT",
            "order": 4,
            "sourceHeading": "CONECTE A JORNADA",
            "contentText": "Gênesis 3\nO pecado entra na história.\nÊxodo\nAprendemos a linguagem de libertação e redenção.\nLevítico\nAprendemos sobre sacrifício, sangue e expiação.\nIsaías 53\nUm Servo sofre por causa dos pecados de outros.\nJesus\nO Novo Testamento apresenta Cristo entregando sua vida pelos pecadores.\nCruz\nPerdão, reconciliação, redenção e vitória se encontram na obra de Cristo.\nA cruz não caiu do céu como uma ideia desconectada. A Bíblia vinha preparando nossa compreensão.\nO QUE APRENDEMOS SOBRE DEUS?\n• Deus é santo.\n• Leva o pecado a sério.\n• É justo.\n• Ama pecadores.\n• Toma a iniciativa da reconciliação.\n• Oferece graça.\n• Não abandona seu propósito de redenção.\nVerdade para guardar\nDeus não nos salva à distância. Em Cristo, Ele entra no sofrimento e entrega-se por nós.\nO QUE APRENDEMOS SOBRE NÓS?\nA cruz desmonta dois extremos:\nMeu pecado não é tão sério\nA cruz responde: é mais sério do que você imagina.\nMeu pecado é grande demais para a graça de Deus\nA cruz responde: a graça de Deus é maior do que você imagina.\nNão banalizamos o pecado. E não diminuímos a graça."
          },
          {
            "key": "APLIQUE",
            "type": "APPLY",
            "order": 5,
            "sourceHeading": "APLIQUE À VIDA",
            "contentText": "1. Pare de tentar comprar aquilo que Deus oferece pela graça\nNão existe quantidade de atividade religiosa capaz de colocar Deus em dívida conosco. A salvação é\nrecebida, não comprada.\n2. Não transforme culpa em residência permanente\nO arrependimento é necessário. Mas viver tentando pagar para sempre por aquilo que levamos\nsinceramente a Cristo não é confiar no Evangelho. A cruz nos chama ao arrependimento e depois à\nconfiança.\n3. Olhe para o pecado com seriedade - e para Deus com esperança\nA cruz não permite uma vida indiferente ao pecado. Mas também não permite desespero diante dele. Ela\nnos chama a voltar para Deus.\n4. Quem foi alcançado pela cruz aprende a perdoar\nIsso não significa fingir que feridas não existem nem permanecer em situações abusivas. Mas quem recebe\ngraça começa a compreender que a vida cristã não combina com alimentar eternamente o desejo de\nvingança."
          },
          {
            "key": "REFLECTION_QUESTIONS",
            "type": "REFLECTION_QUESTIONS",
            "order": 6,
            "sourceHeading": "PARA REFLETIR",
            "contentText": "• Quando penso na cruz, vejo apenas sofrimento ou também salvação?\n• Tenho tratado algum pecado como algo pequeno?\n• Existe alguma culpa pela qual ainda tento me punir?\n• Minha fé está baseada no meu desempenho ou naquilo que Cristo fez?\n• O que significa para mim saber que Deus tomou a iniciativa da reconciliação?\n• Quando ouço “Jesus morreu por mim”, essa frase ainda toca meu coração ou se tornou apenas uma\nexpressão conhecida?"
          },
          {
            "key": "JOURNAL_PROMPT",
            "type": "JOURNAL_PROMPT",
            "order": 7,
            "sourceHeading": "Registrar no Diário",
            "contentText": "Que culpa, pecado ou ferida preciso levar novamente à cruz e entregar sinceramente a Deus?"
          },
          {
            "key": "PRAYER",
            "type": "PRAYER",
            "order": 8,
            "sourceHeading": "ORE",
            "contentText": "Oração sugerida\nSenhor, diante da cruz eu reconheço a seriedade do meu pecado e, ao mesmo tempo, a\ngrandeza do teu amor. Obrigado porque Cristo se entregou por nós e abriu o caminho da\nreconciliação. Ensina-me a viver em arrependimento sem desespero, em gratidão sem orgulho\ne em liberdade sem brincar com o pecado. Que a cruz nunca se torne para mim apenas um\nsímbolo conhecido, mas permaneça viva no centro da minha fé. Amém."
          },
          {
            "key": "KEEP",
            "type": "KEEP",
            "order": 9,
            "sourceHeading": "PARA GUARDAR",
            "contentText": "Romanos 5:8\nLeia o versículo completo.\nObserve quando Deus demonstra seu amor: não depois que os pecadores se tornam perfeitos, mas\nenquanto ainda são pecadores.\nDepois leia 1 Pedro 2:24. Veja como o amor de Deus e a obra de Cristo se encontram na cruz.\nAdicionar aos Favoritos\nGuarde Romanos 5:8 e 1 Pedro 2:24 para revisitar o centro da mensagem da cruz."
          },
          {
            "key": "CONTINUE_JOURNEY",
            "type": "CONTINUE_JOURNEY",
            "order": 10,
            "sourceHeading": "CONTINUE SUA JORNADA",
            "contentText": "Na sexta-feira da crucificação, parece que tudo terminou. O Mestre está morto. Os discípulos estão\ndispersos. A esperança parece enterrada.\nSe a história terminasse no túmulo, a cruz seria apenas mais uma execução injusta.\nMas a mensagem cristã não termina na sexta-feira\nO túmulo não permanece ocupado.\nPróximo estudo\nEstudo 12 - A ressurreição: por que ela muda tudo?\nPergunta central: Por que a ressurreição de Jesus é indispensável para a fé cristã?\nTextos principais: Lucas 24:1-12 | 1 Coríntios 15:1-22 | Romanos 6:4-11\nNo próximo estudo veremos por que Paulo chega a dizer que, se Cristo não ressuscitou, a fé cristã perde\nseu fundamento."
          }
        ],
        "terminalCompletion": null,
        "sourceAppendix": {
          "heading": "REFERÊNCIAS BÍBLICAS UTILIZADAS",
          "contentText": "Textos principais\nMarcos 15:21-39\nIsaías 53:4-6\nRomanos 3:21-26\n1 Pedro 2:21-25\nConexões\nJoão 10:17-18\nRomanos 5:6-11\n2 Coríntios 5:18-21\nColossenses 2:13-15\n1 Coríntios 15:3-4\nNOTA EDITORIAL\nEste estudo evitou reduzir a cruz a uma única teoria.\nO Novo Testamento utiliza várias imagens - sacrifício, substituição, redenção, reconciliação, justificação e\nvitória - e elas foram apresentadas como complementares.\nTambém evitamos transformar o sangue de Cristo em linguagem mágica ou apresentar Pai e Filho como\nadversários. A morte de Jesus foi apresentada conforme o conjunto do Novo Testamento: uma entrega\nvoluntária de Cristo dentro da ação amorosa e salvadora de Deus.\nSTATUS EDITORIAL\nTrilha\nO Plano Eterno de Deus\nEstudo\n11/18 - A cruz: o que realmente aconteceu no Calvário?\nVersão\nRascunho 1 para revisão\nSituação\nDRAFT - aguardando revisão bíblica e editorial"
        },
        "normalization": {
          "removedForbiddenControlCharCount": 0,
          "removedPageHeaderLineCount": 36
        },
        "canonicalSource": {
          "lineCount": 254,
          "sha256": "0533181640C26074A6621C61C43DF0474A14578DAC3FD6FA52536E69837FFEAA",
          "preambleLines": [
            "TRILHA 1 | O PLANO ETERNO DE DEUS",
            "11 - A cruz: o que realmente aconteceu no",
            "Calvário?"
          ]
        },
        "continuity": {
          "expectedNextStudyNumber": 12,
          "detectedNextStudyNumber": 12,
          "nextStudyId": "track-01-study-12",
          "terminal": false,
          "evidenceKind": "EXPLICIT_NUMBER",
          "valid": true
        },
        "quality": {
          "forbiddenControlCharCount": 0,
          "pageHeaderLeakCount": 0,
          "questionSemanticLeakCount": 0,
          "objectiveSemanticLeakCount": 0,
          "continueAppendixLeakCount": 0,
          "profileMarkerSetMatch": true,
          "structuredSectionCountMatch": true,
          "nextStudyIdValid": true,
          "terminalCompletionValid": null
        }
      },
    },
    {
      approvedCandidateSha256: "AE18A5F44715BC31ECFEA3E2E97C628D840635919554C291A06C65610604A3B2",
      payload: {
        "schema": "P17-P2-A10-R2-R1-R1_TRACK1_BATCH_SIMULATION_CANDIDATE_V1",
        "readinessOnly": true,
        "runtimePayload": false,
        "batch": {
          "id": "B01_TRACK_01",
          "sequence": 1,
          "trackNumber": 1,
          "expectedTrackStudyCount": 18,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "source": {
          "relativePath": "trilha_01\\Biblia_Jornada_Estudo_12_A_Ressurreicao_Por_Que_Ela_Muda_Tudo.pdf",
          "bytes": 978914,
          "sha256": "D62E4C592DE1C2815BF95C360DB3E552BCEDEB2F5A768386CCBAEEDD64F91671",
          "pageCount": 10,
          "extractedCharacterCount": 15575,
          "expectedExtractedCharacterCount": 15575,
          "extractedTextSha256": "29B0120A83F4B270C9556D58D7673F563AD07862C7D74183BBE89748C432A4E7",
          "a5NormalizedTextSha256": "9EA9666658B057A8FCA03DE4C725AE8E4DF4059FAA3945EF1A8765DE4C64FA5A"
        },
        "study": {
          "id": "track-01-study-12",
          "trackId": "track-01",
          "number": 12,
          "slug": "a-ressurreicao-por-que-ela-muda-tudo",
          "questionCentral": "Por que a ressurreição de Jesus é indispensável para a fé cristã?",
          "primaryTexts": "Lucas 24:1-12 | 1 Coríntios 15:1-22 | Romanos 6:4-11",
          "complementaryReadings": "João 20:19-29 | Atos 2:22-36 | Romanos 8:11, 18-25 | 1 Coríntios 15:35-58 | 1 Pedro 1:3-5",
          "estimatedTime": "12-15 minutos",
          "objective": "Queremos compreender cinco verdades: • O Novo Testamento apresenta a ressurreição de Jesus como um acontecimento real, e não apenas como uma ideia espiritual. • A ressurreição confirma que a cruz não terminou em derrota. • Jesus ressuscitado é apresentado como Senhor e vencedor da morte. • A ressurreição também está ligada à nova vida do cristão hoje. • A esperança cristã inclui nossa própria ressurreição futura. Guarde esta verdade A cruz mostra que Cristo entrou na morte por nós. A ressurreição anuncia que a morte não conseguiu mantê-lo.",
          "openingTakeaway": "",
          "editorialStatus": "DRAFT",
          "published": false,
          "runtimeEligible": false,
          "nextStudyId": "track-01-study-13",
          "terminal": false,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "sourceDeclaredProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "expectedProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkerCount": 12,
        "structuredSectionCount": 10,
        "sections": [
          {
            "key": "LEIA",
            "type": "READ",
            "order": 1,
            "sourceHeading": "LEIA",
            "contentText": "Comece por Lucas 24:1-12. Tente ler a cena como se ainda não soubesse o final.\nAs mulheres vão ao túmulo esperando encontrar um corpo. Elas não chegam esperando uma ressurreição.\nEncontram a pedra removida e o corpo de Jesus não está ali.\nA notícia\nEle ressuscitou.\nDepois leia 1 Coríntios 15:1-22. Observe quantas vezes Paulo fala sobre morte, sepultamento, ressurreição,\ntestemunhas, fé e esperança.\nPor fim, leia Romanos 6:4-11 e veja como Paulo liga a ressurreição de Cristo à maneira como o cristão deve\nviver agora."
          },
          {
            "key": "OBSERVE",
            "type": "OBSERVE",
            "order": 2,
            "sourceHeading": "OBSERVE",
            "contentText": "• O que as mulheres esperavam encontrar no túmulo?\n• Os discípulos acreditaram imediatamente no relato?\n• Em 1 Coríntios 15, Paulo apresenta apenas uma experiência interior ou fala de morte, sepultamento,\nressurreição e testemunhas?\n• O que aconteceria com a fé cristã se Cristo não tivesse ressuscitado?\n• Paulo relaciona a ressurreição apenas ao passado ou também ao nosso futuro?\n• Em Romanos 6, que relação existe entre a ressurreição de Cristo e uma nova maneira de viver?\n• Em 1 Coríntios 15, por que Jesus é chamado de “primícias”?"
          },
          {
            "key": "ENTENDA",
            "type": "UNDERSTAND",
            "order": 3,
            "sourceHeading": "ENTENDA",
            "contentText": "1. O túmulo estava vazio - mas a mensagem vai além do túmulo vazio\nOs Evangelhos afirmam que Jesus foi sepultado e que depois o túmulo foi encontrado vazio. Isso é\nimportante.\nMas a fé cristã não está baseada apenas na frase: “Não encontraram o corpo.”\nO Novo Testamento também afirma que Jesus apareceu vivo aos seus seguidores.\nLucas, João e 1 Coríntios registram encontros com o Cristo ressuscitado.\nO anúncio apostólico\nOs discípulos não anunciaram apenas que Jesus continuava vivo em suas lembranças. Eles\nanunciaram: Deus o ressuscitou dentre os mortos.\n2. Ressurreição não é apenas 'a alma de Jesus continuou existindo'\nQuando o Novo Testamento fala da ressurreição de Jesus, não está simplesmente dizendo que seu espírito\ncontinuou vivendo depois que seu corpo morreu.\nOs Evangelhos apresentam Jesus ressuscitado interagindo com os discípulos. Ele é reconhecido, fala, é visto\ne, em alguns relatos, come com eles.\nEm João 20, Tomé é convidado a observar suas feridas.\nExiste continuidade entre Jesus crucificado e Jesus ressuscitado. Mas existe também transformação.\nUMA DISTINÇÃO IMPORTANTE: RESSURREIÇÃO NÃO É O MESMO\nQUE REVIVER\nA Bíblia registra outras pessoas que voltaram à vida. Lázaro, por exemplo.\nMas Lázaro voltou à vida mortal. Algum tempo depois, morreria novamente.\nA ressurreição de Jesus é apresentada de outra maneira.\nRomanos 6 afirma que Cristo, ressuscitado dentre os mortos, não morre mais.\nA diferença\nJesus não apenas escapou temporariamente da morte. Ele venceu seu domínio.\n3. A ressurreição muda o significado da cruz\nNa sexta-feira, a cruz parecia provar: Roma venceu. Os inimigos venceram. Jesus perdeu.\nMas o domingo muda nossa leitura da sexta-feira.\nA ressurreição não apaga a cruz. Ela revela que a cruz não foi a derrota final de Cristo.\nUma só mensagem\nOs apóstolos anunciam juntos: Jesus foi crucificado e Deus o ressuscitou.\n4. Se Cristo não ressuscitou, o cristianismo perde seu fundamento\nPaulo é muito direto em 1 Coríntios 15.\nEle não diz que a ressurreição seria interessante, mas que nossa fé continuaria basicamente igual sem ela.\nSe Cristo não ressuscitou, a pregação apostólica é vazia, a fé é inútil, os apóstolos estariam dando falso\ntestemunho sobre Deus e a esperança dos que morreram em Cristo estaria perdida.\nConclusão de Paulo\nA fé cristã depende realmente da ressurreição de Jesus.\n5. A ressurreição confirma quem Jesus é\nDepois da ressurreição, a pregação dos apóstolos apresenta Jesus como Messias, Senhor e Cristo exaltado.\nEm Atos 2, Pedro anuncia que aquele que foi crucificado foi ressuscitado por Deus e exaltado.\nIsso se conecta diretamente com tudo o que vimos nos estudos anteriores.\nO Rei prometido a Davi não terminou derrotado num túmulo. O Servo que sofreu não permaneceu na\nmorte. O Cristo crucificado vive.\nPARE UM MOMENTO AQUI\nTalvez a frase “Jesus ressuscitou” seja tão conhecida que já não nos surpreenda.\nMas tente ouvi-la novamente.\nUm homem foi executado. Seu corpo foi sepultado. Seus seguidores perderam a esperança. E então\ncomeçaram a anunciar ao mundo: Nós o vimos vivo.\nO coração da mensagem\nO cristianismo nasce dessa convicção: a morte não teve a palavra final.\n6. Jesus é chamado de 'primícias'\nEm 1 Coríntios 15, Paulo chama Cristo ressuscitado de primícias dos que dormem.\nA palavra vem da ideia dos primeiros frutos de uma colheita. Os primeiros frutos não eram a colheita inteira.\nEram o começo dela.\nA imagem de Paulo\nA ressurreição de Jesus não é um acontecimento isolado. Ela é o início daquilo que Deus fará\ntambém com seu povo.\nCristo ressuscitou primeiro. Os que pertencem a Cristo também ressuscitarão.\nCRISTO RESSUSCITOU - E ISSO MUDA NOSSO FUTURO\nA esperança cristã não termina em: “Minha alma vai continuar existindo de alguma maneira.”\n1 Coríntios 15 fala de ressurreição. Romanos 8 também apresenta a criação aguardando libertação.\nA esperança bíblica aponta para vitória sobre a morte, ressurreição, transformação e restauração.\nA salvação de Deus não significa simplesmente abandonar para sempre sua criação. A história que começou\nem Gênesis caminha para restauração.\n7. Como será o corpo ressuscitado?\n1 Coríntios 15 trata dessa pergunta. Paulo usa a imagem de uma semente.\nExiste continuidade: é a mesma pessoa que ressuscita. Mas existe também transformação.\nEle fala de corrupção para incorrupção, desonra para glória e fraqueza para poder.\nPonto seguro\nA ressurreição cristã não significa simplesmente voltar ao corpo atual exatamente como ele é,\nsujeito outra vez ao envelhecimento, corrupção e morte. Deus promete transformação.\n8. E o 'corpo espiritual' de 1 Coríntios 15?\nEssa expressão pode causar confusão. Algumas pessoas entendem “espiritual” como “sem corpo, invisível,\nimaterial”.\nMas isso seria estranho dentro de um capítulo inteiro sobre ressurreição do corpo.\nPaulo contrasta diferentes condições da existência humana e fala de um corpo transformado para a\nrealidade da ressurreição.\nExistem discussões teológicas sobre todos os detalhes dessa expressão.\nO essencial\nNão devemos transformar “corpo espiritual” em “não existe mais corpo”. Paulo continua\nfalando de ressurreição e transformação corporal.\n9. A ressurreição não muda apenas nosso futuro - muda nosso presente\nRomanos 6 faz uma conexão muito bonita.\nPaulo relaciona a morte de Cristo com nossa ruptura com o domínio do pecado e a ressurreição de Cristo\ncom uma nova maneira de viver.\nA vida cristã não é apenas: “Espere para ressuscitar um dia.”\nHoje\nA ressurreição já começa a produzir consequências agora. Quem pertence a Cristo é chamado\na viver em novidade de vida.\nO QUE SIGNIFICA 'NOVIDADE DE VIDA'?\nNão significa que um cristão nunca mais peca. Também não significa que todos os problemas desaparecem.\nSignifica que o pecado já não deve ser tratado como nosso senhor. A direção da vida começa a mudar.\n• Onde antes havia ódio, podemos aprender perdão.\n• Onde havia mentira, somos chamados à verdade.\n• Onde havia escravidão, buscamos liberdade.\n• Onde havia uma vida voltada apenas para nós mesmos, começamos a viver para Deus.\nUma nova realidade\nA ressurreição não é apenas uma verdade para acreditar. É uma nova realidade para aprender a\nviver."
          },
          {
            "key": "CONECTE",
            "type": "CONNECT",
            "order": 4,
            "sourceHeading": "CONECTE A JORNADA",
            "contentText": "Gênesis 1-2\nDeus cria vida.\nGênesis 3\nO pecado traz morte.\nProfetas\nDeus promete restauração.\nCruz\nJesus entra na morte.\nRessurreição\nJesus vence a morte.\nFuturo\nOs que pertencem a Cristo também ressuscitarão.\nUma linha que começou com a perda da vida em Gênesis agora começa a ser revertida em Cristo.\n10. A ressurreição dá esperança diante da morte\nA Bíblia não trata a morte como algo bonito em si. Paulo chama a morte de inimigo em 1 Coríntios 15.\nO cristão pode sofrer diante da morte. Pode chorar. Pode sentir saudade. Jesus também chorou diante da\nmorte de Lázaro.\nA esperança cristã não exige fingir que perder alguém não dói.\nEsperança cristã\nA morte dói, mas não é a palavra final de Deus.\nEssa esperança não nega as lágrimas. Mas também não deixa as lágrimas sem futuro.\nO QUE APRENDEMOS SOBRE DEUS?\n• É Senhor da vida.\n• É fiel ao seu Filho.\n• Confirma a obra de Cristo.\n• Possui poder sobre a morte.\n• Não abandonou sua criação.\n• Prepara restauração.\n• Oferece esperança além do túmulo.\nVerdade para guardar\nO Deus que ressuscitou Jesus ainda não terminou sua obra.\nO QUE APRENDEMOS SOBRE JESUS?\nJesus não é apenas um Mestre do passado, um mártir admirável ou alguém cuja história terminou há dois\nmil anos.\nO anúncio cristão\nJesus vive.\nPor isso os primeiros cristãos não falavam apenas “Jesus ensinou”. Eles também proclamavam: Jesus é\nSenhor.\nNão seguimos apenas os ensinamentos de alguém que morreu. Seguimos aquele que os apóstolos\nproclamaram como ressuscitado e vivo."
          },
          {
            "key": "APLIQUE",
            "type": "APPLY",
            "order": 5,
            "sourceHeading": "APLIQUE À VIDA",
            "contentText": "1. Não viva como se a morte tivesse a palavra final\nA dor existe. A perda existe. O medo existe. Mas o túmulo de Jesus nos ensina que a morte encontrou\nalguém que ela não conseguiu manter. Nossa esperança está nele.\n2. Não deixe a esperança cristã apenas para o funeral\nA ressurreição também fala sobre a segunda-feira de manhã. Sobre como vivemos, como tratamos pessoas,\ncomo enfrentamos pecado, como recomeçamos e como usamos nosso tempo.\nSe Cristo vive, existe motivo para uma vida nova agora.\n3. Existem histórias que parecem terminadas, mas Deus ainda pode trabalhar\nIsso não significa que todo problema pessoal terminará exatamente da maneira que desejamos.\nA ressurreição não é uma promessa de que toda situação difícil terá imediatamente um final confortável.\nEla nos dá algo maior\nNenhuma circunstância, nem mesmo a morte, consegue impedir o cumprimento final do\npropósito de Deus.\n4. Sua esperança não precisa terminar no túmulo\nTalvez essa seja uma das maiores diferenças que o Evangelho produz.\nO cristão não olha para a morte e diz: “Nada mais existe.”\nEle olha para Cristo ressuscitado e diz\nMinha esperança continua nele."
          },
          {
            "key": "REFLECTION_QUESTIONS",
            "type": "REFLECTION_QUESTIONS",
            "order": 6,
            "sourceHeading": "PARA REFLETIR",
            "contentText": "• O que mudaria na fé cristã se Jesus não tivesse ressuscitado?\n• Tenho pensado na ressurreição apenas como algo que aconteceu com Jesus ou também como promessa\npara o futuro?\n• O que significa viver hoje em “novidade de vida”?\n• Existe alguma área em que ainda vivo como se o pecado fosse meu senhor?\n• Como a ressurreição muda a maneira como encaro a morte?\n• Quando digo “Jesus vive”, essa verdade realmente influencia minha vida?"
          },
          {
            "key": "JOURNAL_PROMPT",
            "type": "JOURNAL_PROMPT",
            "order": 7,
            "sourceHeading": "Registrar no Diário",
            "contentText": "Se eu realmente creio que Cristo venceu a morte, o que precisa mudar na maneira como estou\nvivendo hoje?"
          },
          {
            "key": "PRAYER",
            "type": "PRAYER",
            "order": 8,
            "sourceHeading": "ORE",
            "contentText": "Oração sugerida\nSenhor, obrigado porque a história de Jesus não terminou na cruz nem no túmulo. Tu o\nressuscitaste, e nele nos deste uma esperança que vai além da morte. Quando eu tiver medo,\nlembra-me de que Cristo vive. Quando o pecado tentar dominar minha vida, ensina-me a\ncaminhar em novidade de vida. E quando eu enfrentar perdas e lágrimas, sustenta meu coração\ncom a esperança da ressurreição. Amém."
          },
          {
            "key": "KEEP",
            "type": "KEEP",
            "order": 9,
            "sourceHeading": "PARA GUARDAR",
            "contentText": "1 Coríntios 15:20\nLeia o versículo completo. Observe a palavra primícias.\nCristo ressuscitado é apresentado como o começo de uma colheita maior.\nDepois leia 1 Coríntios 15:54-57 e veja onde Paulo termina sua reflexão: na vitória sobre a morte.\nAdicionar aos Favoritos\nGuarde 1 Coríntios 15:20 e 15:54-57 para revisitar a esperança da ressurreição."
          },
          {
            "key": "CONTINUE_JOURNEY",
            "type": "CONTINUE_JOURNEY",
            "order": 10,
            "sourceHeading": "CONTINUE SUA JORNADA",
            "contentText": "A cruz tratou do pecado. A ressurreição venceu a morte.\nMas surge uma pergunta muito pessoal: Como essa obra de Cristo se torna minha?\nO que significa ser salvo, receber graça, crer, ser justificado e ser reconciliado com Deus?\nPróximo estudo\nEstudo 13 - Graça, fé e salvação\nPergunta central: Como uma pessoa é reconciliada com Deus?\nTextos principais: Efésios 2:1-10 | Romanos 3:21-28 | Romanos 5:1-11 | Tito 3:3-7\nNo próximo estudo precisaremos tratar com cuidado de palavras muito conhecidas - graça, fé, obras,\njustificação e salvação - para que não se tornem apenas termos religiosos sem significado para o coração."
          }
        ],
        "terminalCompletion": null,
        "sourceAppendix": {
          "heading": "REFERÊNCIAS BÍBLICAS UTILIZADAS",
          "contentText": "Textos principais\nLucas 24:1-12\n1 Coríntios 15:1-22\nRomanos 6:4-11\nConexões\nJoão 20:19-29\nAtos 2:22-36\nRomanos 8:11, 18-25\n1 Coríntios 15:35-58\n1 Pedro 1:3-5\nNOTA EDITORIAL\nAlguns cuidados foram mantidos neste estudo:\n• A ressurreição foi apresentada como acontecimento real porque é assim que os Evangelhos e a pregação\napostólica a apresentam.\n• Não reduzimos ressurreição à simples sobrevivência da alma.\n• Também não afirmamos detalhes sobre o corpo futuro além do que os textos permitem afirmar com\nsegurança.\n• A expressão “corpo espiritual” de 1 Coríntios 15 não foi tratada como “ausência de corpo”, evitando uma\nconclusão que contraria o próprio tema do capítulo.\n• A esperança futura da ressurreição foi mantida ligada à vida cristã no presente, conforme Romanos 6.\nSTATUS EDITORIAL\nTrilha\nO Plano Eterno de Deus\nEstudo\n12/18 - A ressurreição: por que ela muda tudo?\nVersão\nRascunho 1 para revisão\nSituação\nDRAFT - aguardando revisão bíblica e editorial"
        },
        "normalization": {
          "removedForbiddenControlCharCount": 0,
          "removedPageHeaderLineCount": 40
        },
        "canonicalSource": {
          "lineCount": 275,
          "sha256": "84069455BB115944F7D920676BB8EC8339B2D0D75DA9A5429F7BE58F941FA7FA",
          "preambleLines": [
            "TRILHA 1 | O PLANO ETERNO DE DEUS",
            "12 - A ressurreição: por que ela muda tudo?"
          ]
        },
        "continuity": {
          "expectedNextStudyNumber": 13,
          "detectedNextStudyNumber": 13,
          "nextStudyId": "track-01-study-13",
          "terminal": false,
          "evidenceKind": "EXPLICIT_NUMBER",
          "valid": true
        },
        "quality": {
          "forbiddenControlCharCount": 0,
          "pageHeaderLeakCount": 0,
          "questionSemanticLeakCount": 0,
          "objectiveSemanticLeakCount": 0,
          "continueAppendixLeakCount": 0,
          "profileMarkerSetMatch": true,
          "structuredSectionCountMatch": true,
          "nextStudyIdValid": true,
          "terminalCompletionValid": null
        }
      },
    },
    {
      approvedCandidateSha256: "BCAC8F15AE5D7295B5E22210E01CB7C104967A8D157E8A223E5C5C2713A15BDC",
      payload: {
        "schema": "P17-P2-A10-R2-R1-R1_TRACK1_BATCH_SIMULATION_CANDIDATE_V1",
        "readinessOnly": true,
        "runtimePayload": false,
        "batch": {
          "id": "B01_TRACK_01",
          "sequence": 1,
          "trackNumber": 1,
          "expectedTrackStudyCount": 18,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "source": {
          "relativePath": "trilha_01\\Biblia_Jornada_Estudo_13_Graca_Fe_E_Salvacao.pdf",
          "bytes": 961083,
          "sha256": "A44376B3F485603EEEDE0A09F9AD3D2B5C91A441051EFCB900597CBF465BFCC0",
          "pageCount": 11,
          "extractedCharacterCount": 16655,
          "expectedExtractedCharacterCount": 16655,
          "extractedTextSha256": "EA4596C6F367D4DF1542F42C3FD07A3CA0CEB6D707879E6B92A4F7C7B92EB82B",
          "a5NormalizedTextSha256": "BF22DFB1DBFA86F64F873E86320F5AE0D8748C9FF6758E9F8941FF3E807B60D9"
        },
        "study": {
          "id": "track-01-study-13",
          "trackId": "track-01",
          "number": 13,
          "slug": "graca-fe-e-salvacao",
          "questionCentral": "Como uma pessoa é reconciliada com Deus e recebe a salvação que Cristo realizou?",
          "primaryTexts": "Efésios 2:1-10 | Romanos 3:21-28 | Romanos 5:1-11 | Tito 3:3-7",
          "complementaryReadings": "Marcos 1:14-15 | João 3:16-18 | Atos 16:29-31 | Gálatas 2:16 | Tiago 2:14-26",
          "estimatedTime": "12-15 minutos",
          "objective": "Queremos compreender cinco verdades: • A salvação começa na iniciativa e na graça de Deus. • Ninguém consegue conquistar aceitação diante de Deus por desempenho religioso. • A salvação é recebida pela fé em Cristo. • A fé verdadeira não é apenas concordar com algumas informações sobre Jesus. • Boas obras não compram a salvação, mas passam a fazer parte da vida transformada de quem foi alcançado pela graça. Guarde esta verdade Não somos salvos porque conseguimos chegar até Deus. Somos salvos porque Deus veio ao nosso encontro em Cristo.",
          "openingTakeaway": "",
          "editorialStatus": "DRAFT",
          "published": false,
          "runtimeEligible": false,
          "nextStudyId": "track-01-study-14",
          "terminal": false,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "sourceDeclaredProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "expectedProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkerCount": 12,
        "structuredSectionCount": 10,
        "sections": [
          {
            "key": "LEIA",
            "type": "READ",
            "order": 1,
            "sourceHeading": "LEIA",
            "contentText": "Comece por Efésios 2:1-10. Observe cuidadosamente a mudança que acontece no texto.\nPaulo começa descrevendo uma condição de morte espiritual. Depois aparece uma expressão maravilhosa:\n“Mas Deus...”\nÉ Deus quem age.\nDepois leia Romanos 3:21-28, Romanos 5:1-11 e Tito 3:3-7.\nProcure estas palavras\ngraça, fé, justificação, salvação, obras, paz, misericórdia."
          },
          {
            "key": "OBSERVE",
            "type": "OBSERVE",
            "order": 2,
            "sourceHeading": "OBSERVE",
            "contentText": "• Em Efésios 2, quem toma a iniciativa da salvação?\n• A salvação é apresentada como pagamento ou como dom?\n• Por que Paulo exclui a possibilidade de orgulho?\n• Em Romanos 3, alguém consegue se justificar diante de Deus simplesmente cumprindo obras da Lei?\n• Em Romanos 5, qual é o resultado da justificação pela fé?\n• Tito 3 diz que Deus nos salvou por causa das nossas obras de justiça ou por sua misericórdia?\n• Efésios 2 rejeita boas obras ou apenas rejeita as obras como fundamento da salvação?\n• Depois de dizer que não somos salvos pelas obras, o que Efésios 2:10 diz sobre elas?"
          },
          {
            "key": "ENTENDA",
            "type": "UNDERSTAND",
            "order": 3,
            "sourceHeading": "ENTENDA",
            "contentText": "1. A salvação começa com um problema que não conseguimos resolver sozinhos\nEfésios 2 não descreve a humanidade simplesmente como “pessoas boas que precisam melhorar um\npouco”. Paulo usa uma expressão muito mais séria: mortos em delitos e pecados.\nIsso não significa que uma pessoa sem Cristo seja incapaz de fazer qualquer coisa socialmente boa. Pessoas\npodem amar seus filhos, ajudar alguém e praticar atos generosos.\nO ponto de Paulo é outro: existe um problema profundo na relação do ser humano com Deus.\nO pecado não é apenas uma coleção de comportamentos ruins. Ele revela uma humanidade afastada\ndaquele que é a fonte da vida.\nPor isso precisamos de mais\nNão precisamos apenas de educação melhor, mais força de vontade ou mais religião.\nPrecisamos de salvação.\n2. Então aparecem duas palavras maravilhosas: “Mas Deus”\nEfésios 2 muda completamente de direção.\nDepois de descrever a condição humana, Paulo não diz: “Mas vocês se esforçaram bastante e finalmente\nconseguiram sair disso.”\nEle diz: “Mas Deus...”\nDeus é rico em misericórdia. Deus ama. Deus dá vida. Deus salva.\nCentro do Evangelho\nO Evangelho começa muito mais com aquilo que Deus fez do que com aquilo que nós fazemos.\nUMA PALAVRA IMPORTANTE: GRAÇA\nTalvez você já tenha ouvido: “Graça é favor imerecido.” Essa definição é útil.\nMas podemos sentir um pouco mais o peso dessa palavra.\nGraça significa que Deus nos oferece aquilo que não poderíamos colocar como dívida em sua conta.\nNão podemos dizer: “Fui tão bom que Deus agora é obrigado a me salvar.”\nGraça destrói essa ideia. Salvação não é salário. Não é troféu. Não é pagamento. É dom.\nImagem para guardar\nA graça nos coloca diante de Deus com as mãos vazias - e justamente por isso prontas para\nreceber.\n3. Então o que é fé?\nSe a salvação é pela graça, Efésios diz que ela é recebida mediante a fé.\nMas fé também pode ser mal compreendida.\nFé bíblica não é apenas acreditar que Deus existe. Tiago lembra que até os demônios reconhecem essa\nrealidade.\nTambém não é pensamento positivo: “Se eu acreditar muito, qualquer coisa que eu desejar vai acontecer.”\nA fé do Evangelho possui um centro: Cristo.\nÉ confiar nele. É descansar naquilo que Ele fez. É receber sua palavra como verdadeira. É colocar nele nossa\nesperança de reconciliação com Deus.\nEm linguagem simples\nFé é parar de confiar em mim mesmo como meu próprio salvador e colocar minha confiança\nem Cristo.\nFÉ É MAIS QUE SABER SOBRE JESUS\nÉ possível saber muitas coisas sobre Jesus sem realmente confiar nele.\nUma pessoa pode saber que Jesus nasceu em Belém, que foi crucificado, que os cristãos dizem que\nressuscitou e ainda assim permanecer distante.\nUma imagem\nExiste diferença entre dizer “Eu sei que existe uma ponte” e confiar nessa ponte o suficiente\npara atravessá-la.\nA fé cristã envolve confiança. Não é uma fé perfeita. Não é nunca ter perguntas. É colocar nossa vida nas\nmãos daquele em quem cremos.\n4. E o arrependimento?\nJesus anunciava: arrependam-se e creiam no Evangelho.\nArrependimento e fé aparecem muito próximos no Novo Testamento.\nArrependimento não significa apenas sentir culpa. Podemos sentir tristeza por causa das consequências e\nainda desejar continuar no mesmo caminho.\nArrepender-se envolve uma mudança de direção. É reconhecer: “Esse caminho está errado. Preciso\nvoltar-me para Deus.”\nFé e arrependimento\nFé olha para Cristo. Arrependimento deixa de abraçar o caminho que nos afastava dele.\nNão nos arrependemos para comprar o amor de Deus. Arrependemo-nos porque respondemos ao Deus\nque nos chama de volta.\nOUTRA PALAVRA IMPORTANTE: JUSTIFICAÇÃO\nRomanos usa muito essa linguagem. “Justificação” pode soar como uma palavra de tribunal. E realmente\nexiste nela uma dimensão de declaração.\nDefinição simples\nJustificar é Deus receber como justo aquele que crê em Cristo, não porque essa pessoa nunca\ntenha pecado, mas por causa da obra de Cristo.\nIsso muda profundamente nossa relação com Deus.\nRomanos 5 começa dizendo que, justificados pela fé, temos paz com Deus.\nO Evangelho não oferece apenas uma chance de tentarmos melhorar. Oferece reconciliação. Aquele que\nestava distante pode ser recebido.\n5. Então boas obras não importam?\nImportam. Muito. Mas precisamos colocá-las no lugar correto.\nEfésios 2 diz que somos salvos pela graça mediante a fé, não por obras. Pouco depois, porém, afirma que\nfomos criados em Cristo Jesus para boas obras.\nA ordem importa\nNão é: boas obras → merecimento → salvação\nÉ: graça → fé → salvação → nova vida → boas obras\nBoas obras não são a raiz da salvação. São fruto de uma vida alcançada pela graça.\n6. Paulo e Tiago estão brigando?\nEssa pergunta aparece com frequência.\nPaulo diz que somos justificados pela fé, sem as obras da Lei. Tiago diz que a fé sem obras está morta.\nParece contradição?\nQuando observamos o contexto, percebemos que eles enfrentam problemas diferentes.\nPaulo enfrenta\nA ideia de que podemos conquistar nossa justificação diante de Deus através de nossas obras.\nTiago enfrenta\nA ideia de que podemos dizer que temos fé mesmo que essa fé nunca produza qualquer\nmudança.\nResumo\nPaulo rejeita obras como fundamento da salvação. Tiago rejeita uma fé que nunca produz\nfruto.\n7. A salvação não deixa espaço para orgulho espiritual\nSe somos salvos pela graça, ninguém pode olhar para outra pessoa e pensar: “Deus me recebeu porque sou\nmelhor que você.”\nA graça destrói esse orgulho.\nO religioso precisa de graça. O irreligioso precisa de graça. O rico precisa de graça. O pobre precisa de\ngraça. Quem possui muitos anos de igreja precisa de graça. Quem acabou de ouvir o Evangelho precisa de\ngraça.\nTodos chegam pelo mesmo caminho\nCristo.\n8. Então basta dizer uma frase?\nÀs vezes o Evangelho é reduzido a: “Repita estas palavras e está tudo resolvido.”\nUma oração pode, sim, expressar fé e arrependimento sinceros. Mas a Bíblia não apresenta salvação como\numa fórmula mágica pronunciada corretamente.\nO centro não está na perfeição das palavras. Está em Cristo.\nUma pessoa pode fazer uma oração muito bonita sem entregar o coração. Outra pode quase não conseguir\nencontrar palavras e clamar sinceramente a Deus.\nO centro\nNão é a fórmula que salva. Cristo salva. A fé o recebe."
          },
          {
            "key": "CONECTE",
            "type": "CONNECT",
            "order": 4,
            "sourceHeading": "CONECTE A JORNADA",
            "contentText": "Pecado\nNos afastou de Deus.\nPromessas\nDeus anunciou sua redenção.\nCristo\nVeio no cumprimento da história.\nCruz\nMorreu por nossos pecados.\nRessurreição\nVenceu a morte.\nGraça\nDeus oferece a salvação.\nFé\nRecebemos e confiamos em Cristo.\nNova vida\nComeçamos uma caminhada transformada.\nO Evangelho não termina: “Jesus morreu e ressuscitou.” Ele também nos chama: “Creia.”\n9. Salvação é mais do que escapar de uma condenação\nQuando ouvimos “salvação”, às vezes pensamos apenas: “não ir para o inferno”.\nA salvação bíblica é maior.\n• perdão;\n• justificação;\n• reconciliação;\n• nova vida;\n• adoção;\n• esperança;\n• transformação;\n• futuro com Deus.\nÉ ser trazido de volta para aquele para quem fomos criados.\nO maior presente\nNo fim, o maior presente da salvação não é apenas receber algo de Deus. É ter Deus\nnovamente como nosso Deus.\nPARE UM MOMENTO AQUI\nTalvez você tenha passado muito tempo tentando provar para Deus que merece ser amado.\nTalvez pense: “Quando eu melhorar bastante, volto para Deus.”\nO Evangelho não diz: “Arrume tudo sozinho e depois venha.”\nO convite\nVenha a Cristo.\nEle é quem salva.\nIsso não significa que Deus nos deixa como estamos. A graça que perdoa também começa a transformar.\nMas transformação vem depois do encontro com a graça, não como ingresso para entrar nela.\n10. A graça não é licença para continuar amando o pecado\nSe a salvação não depende de obras, alguém poderia perguntar: “Então posso viver como quiser?”\nPaulo enfrenta exatamente esse raciocínio em Romanos. Sua resposta é clara: não.\nGraça não é autorização para permanecer voluntariamente debaixo do domínio do pecado.\nQuem foi unido a Cristo é chamado a uma nova vida.\nA ordem novamente\nNão obedecemos para comprar salvação. Obedecemos porque fomos alcançados por ela.\nA graça que nos recebe também começa a nos ensinar a viver.\nO QUE APRENDEMOS SOBRE DEUS?\n• Toma a iniciativa da salvação.\n• É misericordioso.\n• Oferece graça.\n• Recebe pecadores.\n• Justifica mediante Cristo.\n• Reconcilia.\n• Não vende sua salvação.\n• Transforma aqueles que alcança.\nVerdade para guardar\nDeus salva porque é gracioso, não porque conseguimos impressioná-lo.\nO QUE APRENDEMOS SOBRE NÓS?\n• Não conseguimos nos salvar.\n• Nossas obras não podem comprar Deus.\n• Precisamos confiar em Cristo.\n• Precisamos nos arrepender.\n• Não temos motivo para orgulho.\n• Uma fé viva começa a produzir transformação.\nA graça faz duas coisas\nHumilha: “Você não conseguiu se salvar.”\nLevanta: “Mas Deus veio salvar você.”"
          },
          {
            "key": "APLIQUE",
            "type": "APPLY",
            "order": 5,
            "sourceHeading": "APLIQUE À VIDA",
            "contentText": "1. Pare de negociar com Deus\nTalvez você pense: “Se eu fizer tudo certinho esta semana, Deus ficará mais disposto a me amar.”\nA graça desmonta essa negociação. Obediência é importante. Mas o amor de Deus não é comprado por\npontuação espiritual.\n2. Não use a graça como desculpa\nO outro extremo também é perigoso: “Já que Deus perdoa, pecado não importa.”\nQuem entende o preço da graça não deseja fazer dela uma desculpa para permanecer longe de Deus.\n3. Confie mais em Cristo do que em seu desempenho\nExistem dias em que você se sente espiritualmente forte. Outros em que percebe claramente suas\nfraquezas.\nSe sua esperança estiver baseada em sua performance, sua segurança mudará todos os dias.\nO Evangelho nos ensina a olhar primeiro para Cristo.\n4. Deixe a gratidão produzir fruto\nBoas obras podem nascer de duas motivações muito diferentes.\nDuas motivações\n“Preciso fazer isso para Deus me aceitar.”\nou\n“Deus me recebeu pela graça. Quero viver para Ele.”\nO Evangelho nos conduz à segunda."
          },
          {
            "key": "REFLECTION_QUESTIONS",
            "type": "REFLECTION_QUESTIONS",
            "order": 6,
            "sourceHeading": "PARA REFLETIR",
            "contentText": "• Tenho tentado merecer aquilo que Deus oferece pela graça?\n• Minha fé é apenas conhecimento sobre Jesus ou confiança nele?\n• O que arrependimento significa na minha vida hoje?\n• Tenho usado boas obras para me sentir superior a outras pessoas?\n• Existe alguma área em que uso a graça como desculpa para não mudar?\n• Quando falho, corro para Cristo ou tento me esconder até “melhorar”?\n• Minha vida apresenta algum fruto da fé que digo possuir?"
          },
          {
            "key": "JOURNAL_PROMPT",
            "type": "JOURNAL_PROMPT",
            "order": 7,
            "sourceHeading": "Registrar no Diário",
            "contentText": "Em que tenho confiado mais para ser aceito por Deus: em Cristo ou no meu próprio\ndesempenho?"
          },
          {
            "key": "PRAYER",
            "type": "PRAYER",
            "order": 8,
            "sourceHeading": "ORE",
            "contentText": "Oração sugerida\nSenhor, obrigado porque tua salvação é maior do que aquilo que eu conseguiria conquistar. Eu\nreconheço que preciso da tua graça. Ensina-me a confiar verdadeiramente em Cristo, a\nabandonar aquilo que me afasta de ti e a viver não tentando comprar teu amor, mas\nrespondendo com gratidão ao amor que já demonstraste. Que minha fé não seja apenas\npalavras, mas produza uma vida cada vez mais entregue a ti. Amém."
          },
          {
            "key": "KEEP",
            "type": "KEEP",
            "order": 9,
            "sourceHeading": "PARA GUARDAR",
            "contentText": "Efésios 2:8-10\nLeia os três versículos juntos. Não pare no versículo 9.\nPerceba o equilíbrio: pela graça; mediante a fé; não pelas obras; e depois: criados para boas obras.\nEssa sequência protege tanto do orgulho religioso quanto de uma fé sem transformação.\nAdicionar aos Favoritos\nGuarde Efésios 2:8-10 para revisitar a relação entre graça, fé, salvação e boas obras."
          },
          {
            "key": "CONTINUE_JOURNEY",
            "type": "CONTINUE_JOURNEY",
            "order": 10,
            "sourceHeading": "CONTINUE SUA JORNADA",
            "contentText": "Uma pessoa foi alcançada pela graça. Creu. Foi reconciliada com Deus. E agora?\nO Evangelho não cria apenas indivíduos isolados que dizem: “Eu e Deus, e ninguém mais importa.”\nJesus começa a formar um povo.\nDepois da ressurreição e ascensão de Cristo, algo marcante acontece em Jerusalém. O Espírito Santo é\nderramado. O Evangelho é anunciado. Pessoas creem. Uma comunidade nasce.\nPróximo estudo\nEstudo 14 - O nascimento da Igreja\nPergunta central: O que começou em Atos e qual é o lugar da Igreja no plano de Deus?\nTextos principais: Atos 1:6-8 | Atos 2:1-47 | Efésios 2:11-22\nNo próximo estudo veremos por que a Igreja é muito mais do que um prédio, um culto semanal ou uma\ninstituição religiosa. Ela é uma comunidade formada em Cristo, habitada pelo Espírito e enviada ao mundo."
          }
        ],
        "terminalCompletion": null,
        "sourceAppendix": {
          "heading": "REFERÊNCIAS BÍBLICAS UTILIZADAS",
          "contentText": "Textos principais\nEfésios 2:1-10\nRomanos 3:21-28\nRomanos 5:1-11\nTito 3:3-7\nConexões\nMarcos 1:14-15\nJoão 3:16-18\nAtos 16:29-31\nGálatas 2:16\nTiago 2:14-26\nNOTA EDITORIAL\nEste estudo procurou manter alguns pontos especialmente claros:\n• A salvação foi apresentada como obra da graça de Deus recebida pela fé, conforme Efésios, Romanos e\nTito.\n• Fé não foi reduzida a mera concordância intelectual.\n• Arrependimento foi apresentado como resposta ao chamado de Deus, e não como pagamento pela\nsalvação.\n• Boas obras não foram colocadas como causa da justificação, mas também não foram descartadas: Efésios\n2:10 mostra que fazem parte da nova vida.\n• Paulo e Tiago foram apresentados em seus contextos próprios, evitando transformá-los artificialmente em\nadversários.\n• Não reduzimos a salvação a uma fórmula verbal ou oração específica, pois o centro da salvação é Cristo e\nnão a repetição perfeita de determinadas palavras.\nSTATUS EDITORIAL\nTrilha\nO Plano Eterno de Deus\nEstudo\n13/18 - Graça, fé e salvação\nVersão\nRascunho 1 para revisão\nSituação\nDRAFT - aguardando revisão bíblica e editorial"
        },
        "normalization": {
          "removedForbiddenControlCharCount": 0,
          "removedPageHeaderLineCount": 44
        },
        "canonicalSource": {
          "lineCount": 317,
          "sha256": "470DCEDF885FDB93C99FE9B4F249016CC9A844D16694DB481B14A06730666D95",
          "preambleLines": [
            "TRILHA 1 | O PLANO ETERNO DE DEUS",
            "13 - Graça, fé e salvação"
          ]
        },
        "continuity": {
          "expectedNextStudyNumber": 14,
          "detectedNextStudyNumber": 14,
          "nextStudyId": "track-01-study-14",
          "terminal": false,
          "evidenceKind": "EXPLICIT_NUMBER",
          "valid": true
        },
        "quality": {
          "forbiddenControlCharCount": 0,
          "pageHeaderLeakCount": 0,
          "questionSemanticLeakCount": 0,
          "objectiveSemanticLeakCount": 0,
          "continueAppendixLeakCount": 0,
          "profileMarkerSetMatch": true,
          "structuredSectionCountMatch": true,
          "nextStudyIdValid": true,
          "terminalCompletionValid": null
        }
      },
    },
    {
      approvedCandidateSha256: "B4C9C6CB48825BDA47C8FE0AE5790AC7026D56F752BD370DEA06C86FBBEA9DE6",
      payload: {
        "schema": "P17-P2-A10-R2-R1-R1_TRACK1_BATCH_SIMULATION_CANDIDATE_V1",
        "readinessOnly": true,
        "runtimePayload": false,
        "batch": {
          "id": "B01_TRACK_01",
          "sequence": 1,
          "trackNumber": 1,
          "expectedTrackStudyCount": 18,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "source": {
          "relativePath": "trilha_01\\Biblia_Jornada_Estudo_14_O_Nascimento_Da_Igreja.pdf",
          "bytes": 979323,
          "sha256": "6921EC318EE6BC15C359E0D59D5AB9A4EF60A4E46744F060F609B6E8A64A78EB",
          "pageCount": 10,
          "extractedCharacterCount": 16100,
          "expectedExtractedCharacterCount": 16100,
          "extractedTextSha256": "7B9BD3829BADB868731D6C7A37167088B3D17F20FB08DBFA1988D0A021757008",
          "a5NormalizedTextSha256": "AC38769DD0956EEACE4AB0053005431DBC4D69029245CC388429672A0C818678"
        },
        "study": {
          "id": "track-01-study-14",
          "trackId": "track-01",
          "number": 14,
          "slug": "o-nascimento-da-igreja",
          "questionCentral": "O que começou em Atos e qual é o lugar da Igreja no plano de Deus?",
          "primaryTexts": "Atos 1:6-8 | Atos 2:1-47 | Efésios 2:11-22",
          "complementaryReadings": "Mateus 16:13-18 | Mateus 28:18-20 | João 14:16-17 | Atos 4:32-35 | 1 Coríntios 12:12-27 | 1 Pedro 2:9-10",
          "estimatedTime": "12-15 minutos",
          "objective": "Queremos compreender cinco verdades: • A Igreja nasce da obra de Cristo e da ação do Espírito Santo. • A Igreja não é apenas um prédio ou uma reunião. • Ela é formada por pessoas reconciliadas com Deus e umas com as outras. • O Espírito Santo capacita a Igreja para testemunhar de Cristo. • A Igreja existe para viver o Evangelho e levá-lo adiante. Guarde esta verdade A Igreja não é um lugar para onde vamos. É um povo do qual passamos a fazer parte em Cristo.",
          "openingTakeaway": "",
          "editorialStatus": "DRAFT",
          "published": false,
          "runtimeEligible": false,
          "nextStudyId": "track-01-study-15",
          "terminal": false,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "sourceDeclaredProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "expectedProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkerCount": 12,
        "structuredSectionCount": 10,
        "sections": [
          {
            "key": "LEIA",
            "type": "READ",
            "order": 1,
            "sourceHeading": "LEIA",
            "contentText": "Comece por Atos 1:6-8. Jesus está prestes a subir aos céus. Os discípulos perguntam sobre a restauração do\nreino, mas Jesus direciona o olhar deles para uma missão.\nEle diz que receberão poder quando o Espírito Santo vier sobre eles e que serão suas testemunhas.\nDepois leia Atos 2:1-47 e observe a vinda do Espírito Santo, a pregação de Pedro, a resposta das pessoas, o\nbatismo e a vida da comunidade.\nPor fim, leia Efésios 2:11-22 e veja como Paulo descreve pessoas diferentes sendo aproximadas em Cristo."
          },
          {
            "key": "OBSERVE",
            "type": "OBSERVE",
            "order": 2,
            "sourceHeading": "OBSERVE",
            "contentText": "• Em Atos 1, para que os discípulos receberiam poder?\n• Quem capacitaria essa missão?\n• Em Atos 2, o que acontece depois da pregação de Pedro?\n• O que as pessoas fazem depois de crer?\n• Que práticas aparecem em Atos 2:42?\n• A vida da Igreja incluía cuidado concreto uns com os outros?\n• Em Efésios 2, o que Cristo faz com pessoas que antes estavam separadas?\n• Paulo apresenta a Igreja como prédio físico ou como pessoas edificadas juntas?"
          },
          {
            "key": "ENTENDA",
            "type": "UNDERSTAND",
            "order": 3,
            "sourceHeading": "ENTENDA",
            "contentText": "1. A Igreja não começa por iniciativa humana\nAtos não começa com os discípulos criando uma estratégia de crescimento ou planejando abrir uma\ninstituição religiosa.\nJesus havia prometido o Espírito Santo. E é o Espírito quem vem.\nO Pentecostes marca esse momento de forma poderosa: vento, línguas, idiomas, pregação e a conversão de\nmuitas pessoas.\nPonto central\nA Igreja não nasce porque algumas pessoas tiveram uma boa ideia. Nasce porque Cristo\ncumpriu sua promessa e o Espírito foi derramado.\n2. O Espírito Santo não vem apenas para produzir uma experiência marcante\nO Pentecostes é impressionante, mas precisamos olhar além dos sinais.\nJesus já havia dito em Atos 1:8 uma das grandes finalidades da vinda do Espírito: vocês serão minhas\ntestemunhas.\nO Espírito capacita a Igreja para apontar para Cristo.\nA experiência espiritual não termina em nós mesmos. Ela nos conduz para adoração, transformação,\ncomunhão, missão e testemunho.\nDireção do Espírito\nO Espírito não coloca a Igreja no centro. Ele capacita a Igreja para anunciar Jesus.\n3. O que significa ser testemunha de Jesus?\nTestemunhar não é apenas falar: “Eu acredito em Deus.”\nOs apóstolos anunciavam quem Jesus é, sua morte, sua ressurreição, seu senhorio e o chamado ao\narrependimento.\nNós não somos testemunhas oculares da ressurreição como os apóstolos foram. Mas a Igreja continua\nsendo chamada a testemunhar de Cristo com base no Evangelho recebido.\nIsso acontece com palavras e também com a vida.\nCoerência importa\nUma Igreja que anuncia amor mas vive no ódio enfraquece seu testemunho. O Evangelho\nprecisa ser ouvido e também percebido na maneira como vivemos.\n4. A primeira comunidade se dedica a práticas essenciais\nAtos 2:42 apresenta quatro marcas muito importantes: ensino dos apóstolos, comunhão, partir do pão e\norações.\nA comunidade precisava aprender. A fé cristã não seria sustentada apenas por emoções.\nComunhão é mais do que estar no mesmo ambiente. É compartilhar a vida, carregar fardos, celebrar, chorar,\nservir, corrigir, perdoar e receber perdão.\nO partir do pão lembra que a fé também acontece ao redor da mesa, na vida compartilhada.\nE a Igreja nasce orando. Em Atos, frequentemente vemos cristãos buscando a Deus em oração.\nUma Igreja viva\nAprende, convive, reparte e ora.\nPARE UM MOMENTO AQUI\nÉ fácil pensar em Igreja apenas como domingo, templo, culto e programação.\nMas Atos 2 nos mostra algo muito vivo: pessoas que oram juntas, aprendem juntas, comem juntas, cuidam\numas das outras e testemunham de Cristo.\nIgreja é\nRelacionamento, comunhão e vida compartilhada diante de Deus.\n5. A Igreja também aprende a cuidar concretamente das pessoas\nAtos 2 e Atos 4 descrevem uma comunidade marcada por generosidade. Alguns cristãos vendiam bens e\nrepartiam conforme a necessidade.\nPrecisamos evitar dois extremos: ignorar totalmente esse exemplo ou transformar o texto numa regra\nautomática de que todo cristão deve vender tudo o que possui.\nPrincípio claro\nA comunhão cristã não deve ser indiferente à necessidade do irmão.\n6. A Igreja reúne pessoas diferentes\nEfésios 2 trata de um problema muito importante: judeus e gentios carregavam uma história de separação.\nPaulo diz que Cristo aproximou aqueles que estavam longe. Ele derruba a parede de inimizade e cria um\nnovo povo.\nA Igreja não é formada apenas por pessoas naturalmente parecidas. Cristo reúne povos, histórias, culturas,\nclasses, idades e personalidades.\nUnidade em Cristo\nAs diferenças não precisam desaparecer, mas nenhuma delas deve ser maior que aquilo que\nCristo fez.\n7. A Igreja é chamada de corpo\n1 Coríntios 12 compara a Igreja a um corpo. Um corpo possui muitos membros, e nem todos fazem a mesma\ncoisa.\nEssa imagem protege de dois erros: “eu não tenho importância” e “eu sou mais importante que os outros”.\nEquilíbrio\nVocê faz parte do corpo e também precisa dos outros membros.\nIGREJA NÃO É PRÉDIO - MAS O PRÉDIO PODE SERVIR À IGREJA\nQuando dizemos “vou à igreja”, geralmente queremos dizer que vamos ao local onde a comunidade se\nreúne. Isso é compreensível.\nMas biblicamente precisamos lembrar: a Igreja é o povo.\nO prédio pode ser útil, bonito e importante. Mas mesmo sem um prédio, a Igreja continua sendo Igreja.\n8. A Igreja é templo de Deus\nCuriosamente, depois de dizer que Igreja não é simplesmente prédio, o Novo Testamento usa a imagem de\ntemplo para falar das próprias pessoas.\nEfésios 2 diz que os cristãos são edificados juntos para habitação de Deus no Espírito.\nA imagem\nCristo é a pedra fundamental e Deus habita em seu povo pelo Espírito.\n9. Mas a Igreja é perfeita?\nNão. E o próprio livro de Atos deixa isso claro.\nLogo surgem problemas: mentira, conflitos, necessidades mal atendidas, discussões e divergências.\nAs cartas do Novo Testamento também mostram igrejas enfrentando divisões, imoralidade, falsas doutrinas,\norgulho e falta de amor.\nRealidade\nA Igreja pertence a Cristo, mas ainda precisa constantemente de arrependimento, correção e\ncrescimento.\n10. Feridas na Igreja são reais\nAlgumas pessoas ouvem a palavra “Igreja” e lembram de acolhimento, família, fé e crescimento.\nOutras lembram de rejeição, abuso de autoridade, hipocrisia, fofoca, humilhação e feridas profundas.\nNão devemos tratar isso com frases superficiais.\nPessoas podem realmente ferir outras dentro de ambientes religiosos. E quando isso acontece, não\npodemos usar a importância bíblica da Igreja para encobrir pecado.\nImportante\nAbuso não deve ser protegido. Manipulação não deve ser chamada de submissão. Pecado não\nse torna santo porque aconteceu dentro de uma igreja.\nAo mesmo tempo, a falha de pessoas não apaga aquilo que Cristo deseja para sua Igreja.\n11. Jesus é o Senhor da Igreja\nA Igreja não pertence ao pastor, à denominação, ao líder, ao fundador, a uma família ou a quem mais\ncontribui financeiramente.\nEla pertence a Cristo.\nJesus é chamado cabeça da Igreja no Novo Testamento. Toda liderança cristã é liderança debaixo de outra\nautoridade.\nUma frase para lembrar\nPastores cuidam. Líderes servem. Cristo governa.\n12. A Igreja não existe apenas para cuidar de si mesma\nAtos 1:8 estabelece um movimento: Jerusalém → Judeia → Samaria → confins da terra.\nO livro de Atos acompanha justamente essa expansão. O Evangelho começa a atravessar fronteiras.\nIsso não significa que todos precisarão viajar para outros países. Missão começa também perto: na família,\nna cidade, no trabalho, na vizinhança.\nUma Igreja saudável\nCuida de quem está dentro sem esquecer de quem ainda está fora."
          },
          {
            "key": "CONECTE",
            "type": "CONNECT",
            "order": 4,
            "sourceHeading": "CONECTE A JORNADA",
            "contentText": "Cristo morreu\nO pecado foi tratado.\nCristo ressuscitou\nA morte foi vencida.\nGraça e fé\nPessoas são reconciliadas com Deus.\nEspírito Santo\nDeus habita e capacita seu povo.\nIgreja\nOs salvos são reunidos em comunidade.\nMissão\nA comunidade é enviada para testemunhar de Cristo.\nA salvação não termina em nós. Ela começa a nos transformar em um povo que leva o Evangelho adiante.\nO QUE APRENDEMOS SOBRE DEUS?\n• Não salva apenas indivíduos isolados.\n• Forma um povo.\n• Concede seu Espírito.\n• Aproxima pessoas antes separadas.\n• Chama seu povo à santidade.\n• Cria comunhão.\n• Envia a Igreja em missão.\n• Permanece o verdadeiro Senhor da Igreja.\nVerdade para guardar\nDeus não apenas nos chama para si. Ele também nos dá irmãos para caminhar conosco.\nO QUE APRENDEMOS SOBRE NÓS?\n• Precisamos de comunhão.\n• Não fomos feitos para viver a fé completamente sozinhos.\n• Precisamos aprender e também ensinar.\n• Temos algo para oferecer ao corpo.\n• Precisamos dos dons dos outros.\n• Devemos cuidar dos necessitados.\n• Precisamos aprender perdão.\n• Somos chamados a testemunhar de Cristo.\nA vida cristã possui uma dimensão pessoal. Mas nunca foi planejada para ser totalmente individualista."
          },
          {
            "key": "APLIQUE",
            "type": "APPLY",
            "order": 5,
            "sourceHeading": "APLIQUE À VIDA",
            "contentText": "1. Não seja apenas consumidor de Igreja\nÉ possível frequentar uma comunidade pensando apenas: “O que esta Igreja pode me oferecer?”\nMas o corpo de Cristo nos ensina outra pergunta: “Como posso servir?”\nTalvez seu serviço seja escutar, orar, acolher, ensinar, ajudar, visitar, encorajar ou servir onde quase ninguém\nvê.\n2. Não abandone a comunhão com facilidade\nRelacionamentos são difíceis. Igrejas possuem pessoas imperfeitas. Às vezes haverá frustrações.\nIsso não significa que devemos permanecer em ambientes abusivos ou perigosos.\nMas também precisamos vigiar contra uma cultura em que qualquer desconforto se torna motivo para\nabandonar toda comunhão.\n3. Não faça de líderes o centro da sua fé\nRespeitar liderança bíblica é importante. Mas nenhum líder deve ocupar o lugar de Cristo.\nSua fé não pode depender da perfeição de um pastor. Cristo continua sendo Senhor.\n4. Faça da comunhão algo mais profundo que um cumprimento no culto\nPergunte: “Conheço realmente alguém da minha comunidade? Alguém conhece minhas lutas? Tenho\ncarregado o fardo de alguém? Tenho permitido que alguém caminhe comigo?”\nComunhão precisa sair do corredor do templo e entrar na vida.\n5. Lembre-se de quem ainda está fora\nA Igreja não existe apenas para alimentar quem já está dentro.\nExistem pessoas ao nosso redor cansadas, perdidas, feridas, curiosas e distantes de Deus. A Igreja carrega\numa mensagem para elas."
          },
          {
            "key": "REFLECTION_QUESTIONS",
            "type": "REFLECTION_QUESTIONS",
            "order": 6,
            "sourceHeading": "PARA REFLETIR",
            "contentText": "• Quando penso em Igreja, penso primeiro em prédio, culto ou pessoas?\n• Tenho vivido minha fé de maneira muito isolada?\n• Estou apenas recebendo ou também servindo?\n• Tenho transformado algum líder em referência maior do que deveria?\n• Existe alguém da minha comunidade que precisa de cuidado e que eu posso procurar?\n• Tenho contribuído para a unidade ou para divisões?\n• Minha forma de viver ajuda ou atrapalha o testemunho do Evangelho?\n• Como posso participar mais da missão de Cristo onde já estou?"
          },
          {
            "key": "JOURNAL_PROMPT",
            "type": "JOURNAL_PROMPT",
            "order": 7,
            "sourceHeading": "Registrar no Diário",
            "contentText": "Que lugar a Igreja realmente ocupa na minha caminhada com Deus: plateia, obrigação ou\nfamília espiritual na qual também sou chamado a servir?"
          },
          {
            "key": "PRAYER",
            "type": "PRAYER",
            "order": 8,
            "sourceHeading": "ORE",
            "contentText": "Oração sugerida\nSenhor, obrigado porque não nos chamaste para caminhar sozinhos. Obrigado pela tua Igreja,\napesar de todas as nossas imperfeições. Ensina-me a amar teus irmãos, servir com humildade,\nperdoar quando for necessário e também agir com verdade quando houver pecado. Guarda\nmeu coração de colocar pessoas no lugar que pertence somente a Cristo. Enche tua Igreja com\nteu Espírito e faz de nós uma comunidade que viva e anuncie o Evangelho com sinceridade.\nAmém."
          },
          {
            "key": "KEEP",
            "type": "KEEP",
            "order": 9,
            "sourceHeading": "PARA GUARDAR",
            "contentText": "Atos 2:42\nLeia o versículo completo e observe as quatro marcas: ensino, comunhão, partir do pão e orações.\nDepois leia Atos 2:46-47 e perceba como essa vida compartilhada alcançava também quem observava a\ncomunidade.\nAdicionar aos Favoritos\nGuarde Atos 2:42 e Atos 2:46-47 para revisitar as marcas da vida comunitária."
          },
          {
            "key": "CONTINUE_JOURNEY",
            "type": "CONTINUE_JOURNEY",
            "order": 10,
            "sourceHeading": "CONTINUE SUA JORNADA",
            "contentText": "A Igreja nasceu. O Espírito foi derramado. O Evangelho começou a ser anunciado.\nMas Jesus havia dito algo maior: “até os confins da terra”.\nAtos começa em Jerusalém, mas não fica em Jerusalém. O Evangelho atravessa culturas, fronteiras,\npreconceitos e distâncias.\nA promessa feita a Abraão começa a aparecer novamente com muita força: as nações.\nPróximo estudo\nEstudo 15 - O Evangelho para todas as nações\nPergunta central: Qual é a missão do povo de Deus e por que o Evangelho precisa atravessar\nfronteiras?\nTextos principais: Mateus 28:18-20 | Atos 1:8 | Atos 10:1-48 | Atos 13:46-49\nNo próximo estudo veremos que missão não é apenas uma atividade para alguns cristãos especiais. Ela faz\nparte da identidade de uma Igreja que recebeu uma mensagem boa demais para guardar somente para si."
          }
        ],
        "terminalCompletion": null,
        "sourceAppendix": {
          "heading": "REFERÊNCIAS BÍBLICAS UTILIZADAS",
          "contentText": "Textos principais\nAtos 1:6-8\nAtos 2:1-47\nEfésios 2:11-22\nConexões\nMateus 16:13-18\nMateus 28:18-20\nJoão 14:16-17\nAtos 4:32-35\n1 Coríntios 12:12-27\n1 Pedro 2:9-10\nNOTA EDITORIAL\n• O Pentecostes foi apresentado como acontecimento central na formação e capacitação da Igreja, sem\ntransformar cada detalhe de Atos 2 em fórmula obrigatória para toda experiência cristã posterior.\n• A generosidade de Atos 2 e 4 foi tratada como forte princípio de comunhão e cuidado, sem afirmar que o\ntexto estabelece obrigatoriamente a venda universal de todos os bens.\n• A Igreja foi definida prioritariamente como povo de Deus em Cristo, não como prédio ou instituição.\n• A importância da Igreja não foi usada para encobrir abuso espiritual, manipulação ou pecado de liderança.\n• Liderança cristã foi mantida debaixo da autoridade de Cristo.\n• A diversidade e unidade da Igreja foram apresentadas a partir de Efésios 2 e 1 Coríntios 12.\n• A missão da Igreja foi conectada diretamente à promessa de Jesus em Atos 1:8.\nSTATUS EDITORIAL\nTrilha\nO Plano Eterno de Deus\nEstudo\n14/18 - O nascimento da Igreja\nVersão\nRascunho 1 para revisão\nSituação\nDRAFT - aguardando revisão bíblica e editorial"
        },
        "normalization": {
          "removedForbiddenControlCharCount": 0,
          "removedPageHeaderLineCount": 40
        },
        "canonicalSource": {
          "lineCount": 283,
          "sha256": "CA96AD3EC8471856E2F0C0577BAF505797C6E1FA3D21A6B1E25F45BB9E0B5372",
          "preambleLines": [
            "TRILHA 1 | O PLANO ETERNO DE DEUS",
            "14 - O nascimento da Igreja"
          ]
        },
        "continuity": {
          "expectedNextStudyNumber": 15,
          "detectedNextStudyNumber": 15,
          "nextStudyId": "track-01-study-15",
          "terminal": false,
          "evidenceKind": "EXPLICIT_NUMBER",
          "valid": true
        },
        "quality": {
          "forbiddenControlCharCount": 0,
          "pageHeaderLeakCount": 0,
          "questionSemanticLeakCount": 0,
          "objectiveSemanticLeakCount": 0,
          "continueAppendixLeakCount": 0,
          "profileMarkerSetMatch": true,
          "structuredSectionCountMatch": true,
          "nextStudyIdValid": true,
          "terminalCompletionValid": null
        }
      },
    },
    {
      approvedCandidateSha256: "E79AFA4FDD88A825102F70727B5BF62AC61CF90B77C0B61EA919E16B979EA645",
      payload: {
        "schema": "P17-P2-A10-R2-R1-R1_TRACK1_BATCH_SIMULATION_CANDIDATE_V1",
        "readinessOnly": true,
        "runtimePayload": false,
        "batch": {
          "id": "B01_TRACK_01",
          "sequence": 1,
          "trackNumber": 1,
          "expectedTrackStudyCount": 18,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "source": {
          "relativePath": "trilha_01\\Biblia_Jornada_Estudo_15_O_Evangelho_Para_Todas_As_Nacoes.pdf",
          "bytes": 958615,
          "sha256": "A9B238DD219D31B7A6586D80CCB0C8653F8BC9F0D0E4B9DE7B3B8455E38F20FA",
          "pageCount": 10,
          "extractedCharacterCount": 15821,
          "expectedExtractedCharacterCount": 15821,
          "extractedTextSha256": "C50646335148D789974789178CC81A24EC25DDE62B28F048410C0BD9FF783F9B",
          "a5NormalizedTextSha256": "649DDDB231AE259EBD794CE31BADBE4116646B2CE4322526698B7DAEE407CA1A"
        },
        "study": {
          "id": "track-01-study-15",
          "trackId": "track-01",
          "number": 15,
          "slug": "o-evangelho-para-todas-as-nacoes",
          "questionCentral": "Qual é a missão do povo de Deus e por que o Evangelho precisa atravessar fronteiras?",
          "primaryTexts": "Mateus 28:18-20 | Atos 1:8 | Atos 10:1-48 | Atos 13:46-49",
          "complementaryReadings": "Gênesis 12:1-3 | Isaías 49:5-6 | Lucas 24:46-49 | Romanos 10:9-15 | Apocalipse 7:9-10",
          "estimatedTime": "12-15 minutos",
          "objective": "Queremos compreender que: • Jesus envia seus discípulos para fazer discípulos entre todas as nações. • A missão começa na autoridade de Cristo, não na capacidade humana. • O Espírito Santo capacita a Igreja para testemunhar. • O Evangelho atravessa barreiras culturais, sociais e étnicas. • Missão não significa apenas viajar para longe. • Quem recebe o Evangelho também passa a carregar o Evangelho. Guarde esta verdade O Evangelho é pessoal, mas nunca foi particular. A boa notícia que chegou até nós foi feita para continuar seguindo adiante.",
          "openingTakeaway": "",
          "editorialStatus": "DRAFT",
          "published": false,
          "runtimeEligible": false,
          "nextStudyId": "track-01-study-16",
          "terminal": false,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "sourceDeclaredProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "expectedProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkerCount": 12,
        "structuredSectionCount": 10,
        "sections": [
          {
            "key": "LEIA",
            "type": "READ",
            "order": 1,
            "sourceHeading": "LEIA",
            "contentText": "Comece por Mateus 28:18-20. Jesus já ressuscitou.\nObserve que Ele começa falando não sobre os discípulos, mas sobre si mesmo: “Toda autoridade me foi\ndada.” Depois vem a missão.\nLeia também Atos 1:8 e perceba o movimento: Jerusalém → Judeia → Samaria → confins da terra.\nDepois leia Atos 10. É um capítulo maior, mas vale a pena. Preste atenção especialmente em Pedro e\nCornélio.\nPor fim, leia Atos 13:46-49 e observe novamente como a mensagem se volta para além das fronteiras de\nIsrael."
          },
          {
            "key": "OBSERVE",
            "type": "OBSERVE",
            "order": 2,
            "sourceHeading": "OBSERVE",
            "contentText": "• Com que autoridade Jesus envia seus discípulos?\n• O mandamento é apenas conseguir decisões momentâneas ou fazer discípulos?\n• O que faz parte desse discipulado em Mateus 28?\n• Quem capacita os discípulos em Atos 1:8?\n• Por que Pedro inicialmente tinha dificuldade em entrar na casa de Cornélio?\n• O que Deus precisa ensinar a Pedro?\n• O Espírito Santo também é recebido pelos gentios?\n• O que isso revela sobre quem pode ser alcançado pelo Evangelho?\n• Qual promessa antiga começa a reaparecer nessa expansão para as nações?"
          },
          {
            "key": "ENTENDA",
            "type": "UNDERSTAND",
            "order": 3,
            "sourceHeading": "ENTENDA",
            "contentText": "1. A missão começa com Jesus, não conosco\nÀs vezes ouvimos a palavra “missão” e imediatamente pensamos: “Será que sou capaz?”\nMas Mateus 28 começa em outro lugar. Jesus declara: Toda autoridade me foi dada no céu e na terra.\nDepois Ele envia.\nA missão cristã não existe porque alguns seguidores de Jesus são muito corajosos. Ela existe porque Cristo é\nSenhor.\nA segurança da missão\nNão está primeiro na força de quem vai, mas na autoridade de quem envia.\n2. Jesus não disse apenas “consigam convertidos”\nO mandamento de Mateus 28 é fazer discípulos. Isso é maior do que conseguir uma resposta emocional em\ndeterminado momento.\nJesus fala de ir, fazer discípulos, batizar e ensinar a obedecer ao que Ele ordenou.\nO Evangelho chama pessoas para Cristo, e seguir Cristo inicia uma caminhada.\nUma frase simples\nEvangelização abre a porta. Discipulado ensina a caminhar pelo caminho.\n3. “Todas as nações” não aparece por acaso\nLembra de Abraão? Em Gênesis 12, Deus prometeu que nele seriam benditas todas as famílias da terra.\nAgora Jesus envia seus discípulos para fazer discípulos de todas as nações.\nIsrael teve papel central na história da redenção. O Messias veio dessa história. Mas o propósito de Deus\nsempre apontou para algo que alcançaria muito além de uma única fronteira.\nA promessa continua\nA bênção prometida a Abraão começa a alcançar povos por meio do Evangelho de Cristo.\n4. Atos 1:8 mostra uma missão em movimento\nJesus diz: Jerusalém, Judeia, Samaria e confins da terra. Isso é praticamente um mapa do livro de Atos.\nO Evangelho começa em Jerusalém e depois avança. Cruza regiões, chega a pessoas diferentes, enfrenta\npreconceitos e entra em novas culturas.\nA Igreja não foi chamada para permanecer fechada em um único lugar.\nMAS PRESTE ATENÇÃO\n“Confins da terra” não significa que o lugar perto de você deixou de importar.\nMissão possui dois movimentos ao mesmo tempo: perto e longe.\nHá pessoas que Deus chama para atravessar oceanos. Outras testemunharão de Cristo na própria cidade, na\nfamília, na escola, no trabalho, no campo, no comércio ou na vizinhança.\nPergunta prática\nVocê pode não ser chamado para atravessar o mundo, mas todo cristão vive cercado por\nalguém que precisa conhecer o Evangelho.\n5. Atos 10 mostra que Deus também precisa quebrar barreiras dentro da própria Igreja\nAtos 10 é um capítulo precioso. Cornélio era gentio. Pedro era judeu. Existiam barreiras culturais e religiosas\nprofundas entre os dois mundos.\nDeus começa a trabalhar nos dois lados. Cornélio recebe orientação. Pedro recebe uma visão.\nE Deus precisa ensinar algo muito sério a Pedro: não trate como impuro aquilo que Deus está alcançando.\nPedro entra na casa de Cornélio e anuncia Jesus. Enquanto fala, o Espírito Santo vem sobre os gentios.\nO que Deus mostra\nO Evangelho também é para eles.\n6. Deus não exige que alguém se torne uma cópia cultural de nós para conhecer Jesus\nO Evangelho atravessa culturas. Mas isso não significa que todas as pessoas precisam assumir nosso jeito de\nfalar, nossa roupa, nossos costumes locais, nossa música ou nossas preferências antes de serem recebidas\npor Cristo.\nExiste diferença entre o que o Evangelho exige e o que nossa cultura religiosa prefere.\nÀs vezes misturamos as duas coisas e começamos a exigir que pessoas se pareçam conosco antes de\naprenderem a parecer com Cristo.\nCentro da missão\nMissão não é reproduzir nossa cultura em outras pessoas. É apresentar Cristo e ensinar sua\nPalavra.\n7. Pedro também precisou ser transformado pela missão\nExiste algo muito bonito em Atos 10. Cornélio precisava ouvir o Evangelho, mas Pedro também precisava\naprender.\nA missão transformou os dois lados.\nQuando convivemos com pessoas diferentes, percebemos preconceitos que nem sabíamos que\ncarregávamos. Descobrimos que Deus trabalha em lugares que não esperávamos.\nUma lição humilde\nÀs vezes pensamos que missão é apenas levar algo a alguém. Mas Deus também usa a missão\npara trabalhar em quem vai.\n8. O Espírito Santo confirma que os gentios também pertencem\nQuando o Espírito Santo é derramado sobre os gentios em Atos 10, Pedro percebe a importância do que\nestá acontecendo.\nEle pergunta, em essência: se Deus os recebeu, quem somos nós para impedir?\nIsso teria enormes consequências para a Igreja. A comunidade cristã começaria a aprender a viver com\npessoas de origens muito diferentes.\nA porta já estava aberta\nNão foi Pedro quem decidiu abrir a porta. Deus já estava abrindo.\n9. Atos 13 retoma a esperança dos profetas\nQuando Paulo e Barnabé anunciam o Evangelho, eles retomam Isaías 49.\nAli aparece a ideia de luz para as nações e salvação chegando até os confins da terra.\nUma só história\nAbraão: bênção para as famílias da terra.\nProfetas: luz para as nações.\nJesus: discípulos entre todas as nações.\nAtos: o Evangelho atravessa fronteiras.\n10. Missão não é conquista religiosa\nA missão cristã não é autorização para violência, coerção, manipulação, imposição pela força, desprezo\ncultural ou exploração de povos.\nJesus envia discípulos para anunciar, ensinar e fazer discípulos.\nA fé cristã não pode ser produzida por espada, ameaça ou pressão.\nImportante\nO Evangelho chama. Ele não precisa ser imposto pela violência.\n11. Missão também precisa de humildade\nQuando falamos sobre evangelização, podemos cair num tom de superioridade: “Nós somos os bons e\nvamos ajudar aqueles que não sabem nada.”\nMas o Evangelho destrói essa postura. No estudo sobre graça aprendemos que também fomos alcançados\npela misericórdia.\nNão levamos o Evangelho porque somos superiores. Levamos porque fomos alcançados.\nUma frase para lembrar\nQuem anuncia graça precisa anunciar com graça.\n12. E se eu não souber responder todas as perguntas?\nMuita gente deixa de falar sobre Jesus por medo: “E se me perguntarem algo que eu não sei?”\nVocê não precisa saber tudo. Nem os discípulos sabiam tudo.\nÉ melhor responder: “Eu não sei, mas posso estudar” do que inventar uma resposta.\nVocê pode começar com aquilo que conhece: quem Jesus é, o que Ele fez e o que Ele tem feito em sua vida."
          },
          {
            "key": "CONECTE",
            "type": "CONNECT",
            "order": 4,
            "sourceHeading": "CONECTE A JORNADA",
            "contentText": "Gênesis 12\nBênção para todas as famílias da terra.\nProfetas\nAs nações também aparecem na esperança futura.\nJesus\n“Façam discípulos de todas as nações.”\nEspírito Santo\nA Igreja recebe poder para testemunhar.\nAtos\nO Evangelho atravessa fronteiras.\nIgreja hoje\nA missão continua.\nApocalipse\nUma multidão de toda tribo, povo, língua e nação diante de Deus.\nA história começou com uma promessa e caminha para povos reunidos diante de Deus.\nO QUE APRENDEMOS SOBRE DEUS?\n• Ama além das nossas fronteiras.\n• Mantém sua promessa às nações.\n• Envia seu povo.\n• Concede o Espírito para a missão.\n• Quebra barreiras.\n• Recebe pessoas de diferentes origens.\n• Conduz o Evangelho para lugares inesperados.\nVerdade para guardar\nDeus ama pessoas que ainda não conhecemos, em lugares onde talvez nunca tenhamos\nestado.\nO QUE APRENDEMOS SOBRE NÓS?\n• Também fomos alcançados pelo Evangelho.\n• Não somos donos da graça.\n• Carregamos preconceitos que precisam ser confrontados.\n• Somos chamados a testemunhar.\n• Precisamos aprender com pessoas diferentes.\n• Não precisamos saber tudo para começar.\n• Devemos anunciar Cristo com humildade e amor.\nO Evangelho chegou até nós porque alguém não o guardou somente para si. Agora ele passa pelas nossas\nmãos."
          },
          {
            "key": "APLIQUE",
            "type": "APPLY",
            "order": 5,
            "sourceHeading": "APLIQUE À VIDA",
            "contentText": "1. Comece pelas pessoas que já estão perto\nTalvez você não saiba por onde começar. Olhe ao redor.\nExiste alguém na sua família, no trabalho, na escola ou na vizinhança que pode precisar de esperança?\nOre por essa pessoa. Aproxime-se. Escute. Sirva. E quando houver oportunidade, fale de Cristo.\n2. Não transforme pessoas em projetos\nEvangelizar não é olhar para alguém apenas como “uma pessoa que preciso converter”.\nEla é uma pessoa, com história, dores, perguntas, família e medos.\nEscute antes de falar. Ame mesmo quando ela não responde como você gostaria.\n3. Examine seus próprios preconceitos\nPedro precisou aprender. Nós também.\nExiste algum tipo de pessoa que, no fundo, você considera “difícil demais”, “longe demais” ou “não combina\ncom nossa igreja”?\nTalvez Deus precise trabalhar em nosso coração antes de nos usar para alcançar alguém.\n4. Apoie quem vai onde você não pode ir\nNem todos serão missionários transculturais. Mas toda Igreja pode participar da missão.\nPodemos orar, contribuir, enviar, acolher, cuidar e apoiar quem está no campo.\n5. Viva de modo que sua mensagem não seja contradita pela sua vida\nNão precisamos ser perfeitos para testemunhar. Mas precisamos de sinceridade.\nQuando erramos, reconhecemos. Quando pecamos, nos arrependemos. Quando ferimos, pedimos perdão.\nÀs vezes um testemunho humilde fala mais alto do que uma aparência de perfeição."
          },
          {
            "key": "REFLECTION_QUESTIONS",
            "type": "REFLECTION_QUESTIONS",
            "order": 6,
            "sourceHeading": "PARA REFLETIR",
            "contentText": "• Quem trouxe o Evangelho até mim?\n• Tenho enxergado missão como responsabilidade apenas de pastores e missionários?\n• Existe alguém perto de mim por quem preciso começar a orar?\n• Carrego algum preconceito que pode dificultar meu amor por certas pessoas?\n• Tenho tentado apresentar Cristo ou apenas minhas preferências religiosas?\n• Minha vida confirma ou contradiz aquilo que digo crer?\n• Como posso participar concretamente da missão da Igreja?\n• Estou disposto a ser usado por Deus também entre pessoas muito diferentes de mim?"
          },
          {
            "key": "JOURNAL_PROMPT",
            "type": "JOURNAL_PROMPT",
            "order": 7,
            "sourceHeading": "Registrar no Diário",
            "contentText": "Quem Deus colocou perto de mim que talvez eu ainda não esteja enxergando como alguém\nque precisa ser amado, ouvido e alcançado pelo Evangelho?"
          },
          {
            "key": "PRAYER",
            "type": "PRAYER",
            "order": 8,
            "sourceHeading": "ORE",
            "contentText": "Oração sugerida\nSenhor, obrigado porque o Evangelho atravessou gerações, lugares e pessoas até chegar a\nmim. Não permita que eu receba tua graça e a guarde apenas para mim. Dá-me amor por quem\nainda não te conhece, coragem para falar quando houver oportunidade e humildade para ouvir.\nLivra-me dos preconceitos que fecham portas e ensina-me a apresentar Cristo, não a mim\nmesmo. Usa tua Igreja para levar tua luz perto e longe, até que muitos conheçam a esperança\nque há em Jesus. Amém."
          },
          {
            "key": "KEEP",
            "type": "KEEP",
            "order": 9,
            "sourceHeading": "PARA GUARDAR",
            "contentText": "Atos 1:8\nLeia o versículo completo. Observe três coisas: poder, Espírito Santo e testemunhas.\nDepois perceba a expansão: Jerusalém → Judeia → Samaria → confins da terra.\nEsse pequeno versículo funciona quase como um mapa para todo o livro de Atos.\nAdicionar aos Favoritos\nGuarde Atos 1:8 para revisitar o chamado da Igreja ao testemunho."
          },
          {
            "key": "CONTINUE_JOURNEY",
            "type": "CONTINUE_JOURNEY",
            "order": 10,
            "sourceHeading": "CONTINUE SUA JORNADA",
            "contentText": "O Evangelho está avançando. Pessoas estão sendo alcançadas. Igrejas estão surgindo.\nMas a história ainda não terminou. Jesus ressuscitou, subiu aos céus e deixou uma promessa: Ele voltará.\nA Igreja vive entre dois momentos: Cristo veio e Cristo virá novamente.\nPróximo estudo\nEstudo 16 - A volta de Cristo\nPergunta central: Qual é a esperança cristã sobre a volta de Jesus e como essa esperança deve\nmudar nossa maneira de viver hoje?\nTextos principais: João 14:1-3 | Atos 1:9-11 | 1 Tessalonicenses 4:13-18 | Mateus 24:36-44\nNo próximo estudo entraremos em um tema que desperta muita curiosidade e também muita confusão.\nRegra editorial para o próximo tema\nDar atenção ao que a Bíblia afirma com clareza, sem transformar especulações sobre datas,\ncronologias e sinais em certeza bíblica."
          }
        ],
        "terminalCompletion": null,
        "sourceAppendix": {
          "heading": "REFERÊNCIAS BÍBLICAS UTILIZADAS",
          "contentText": "Textos principais\nMateus 28:18-20\nAtos 1:8\nAtos 10:1-48\nAtos 13:46-49\nConexões\nGênesis 12:1-3\nIsaías 49:5-6\nLucas 24:46-49\nRomanos 10:9-15\nApocalipse 7:9-10\nNOTA EDITORIAL\n• A missão às nações foi conectada à promessa feita a Abraão e ao desenvolvimento bíblico posterior.\n• “Todas as nações” não foi usado para apagar o papel histórico de Israel na narrativa bíblica.\n• Atos 10 foi apresentado como momento decisivo na inclusão dos gentios, conforme o próprio relato.\n• Missão cristã foi diferenciada de coerção religiosa, dominação cultural e violência.\n• Distinguimos o Evangelho de preferências culturais ou tradições locais.\n• Evangelização foi ligada ao discipulado, não apenas a uma decisão momentânea.\n• A responsabilidade missionária foi apresentada tanto perto quanto longe, sem afirmar que todos recebem\no mesmo chamado geográfico.\nSTATUS EDITORIAL\nTrilha\nO Plano Eterno de Deus\nEstudo\n15/18 - O Evangelho para todas as nações\nVersão\nRascunho 1 para revisão\nSituação\nDRAFT - aguardando revisão bíblica e editorial"
        },
        "normalization": {
          "removedForbiddenControlCharCount": 0,
          "removedPageHeaderLineCount": 40
        },
        "canonicalSource": {
          "lineCount": 275,
          "sha256": "E307A88A8265C772CD614716DCDE89F13BC21504EE3332040ED756F67518131B",
          "preambleLines": [
            "TRILHA 1 | O PLANO ETERNO DE DEUS",
            "15 - O Evangelho para todas as nações"
          ]
        },
        "continuity": {
          "expectedNextStudyNumber": 16,
          "detectedNextStudyNumber": 16,
          "nextStudyId": "track-01-study-16",
          "terminal": false,
          "evidenceKind": "EXPLICIT_NUMBER",
          "valid": true
        },
        "quality": {
          "forbiddenControlCharCount": 0,
          "pageHeaderLeakCount": 0,
          "questionSemanticLeakCount": 0,
          "objectiveSemanticLeakCount": 0,
          "continueAppendixLeakCount": 0,
          "profileMarkerSetMatch": true,
          "structuredSectionCountMatch": true,
          "nextStudyIdValid": true,
          "terminalCompletionValid": null
        }
      },
    },
    {
      approvedCandidateSha256: "51770DDE6E571FE1C224E2350071F5681775C9FB991E9346F233C64FBA8BDB08",
      payload: {
        "schema": "P17-P2-A10-R2-R1-R1_TRACK1_BATCH_SIMULATION_CANDIDATE_V1",
        "readinessOnly": true,
        "runtimePayload": false,
        "batch": {
          "id": "B01_TRACK_01",
          "sequence": 1,
          "trackNumber": 1,
          "expectedTrackStudyCount": 18,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "source": {
          "relativePath": "trilha_01\\Biblia_Jornada_Estudo_16_A_Volta_De_Cristo (1).pdf",
          "bytes": 962103,
          "sha256": "753D296523CBF0ED74F40756AB387A8C6028F5A473456D44D4C145858E438AAD",
          "pageCount": 11,
          "extractedCharacterCount": 18560,
          "expectedExtractedCharacterCount": 18560,
          "extractedTextSha256": "7A9982E066551F5C3BD5853D4414172BB0FC2D87903F0ADB72996A7EC9D810CC",
          "a5NormalizedTextSha256": "F5FE58CD538E918CAB4E752BB6894C0304F45D9AF554E656B7C2E6AEDA1D38C0"
        },
        "study": {
          "id": "track-01-study-16",
          "trackId": "track-01",
          "number": 16,
          "slug": "a-volta-de-cristo",
          "questionCentral": "O que a Bíblia realmente ensina sobre a volta de Jesus e como essa esperança deve mudar nossa maneira de viver hoje?",
          "primaryTexts": "João 14:1-3 | Atos 1:9-11 | 1 Tessalonicenses 4:13-18 | Mateus 24:36-44",
          "complementaryReadings": "1 Coríntios 15:50-58 | Filipenses 3:20-21 | 2 Pedro 3:8-14 | Tito 2:11-14 | Apocalipse 22:12-20",
          "estimatedTime": "15-18 minutos",
          "objective": "Queremos compreender que: • A volta de Cristo é uma promessa clara do Novo Testamento. • Jesus voltará pessoalmente, e sua vinda não é apresentada apenas como uma ideia simbólica. • Ninguém recebeu autorização bíblica para marcar a data de sua volta. • Os cristãos que morreram em Cristo não serão esquecidos. • A esperança futura deve transformar a maneira como vivemos hoje. • Existem questões de cronologia sobre as quais cristãos interpretam os textos de formas diferentes. • Nossa segurança deve estar em Cristo que vem, e não em nossa capacidade de decifrar todos os detalhes do futuro. Guarde esta verdade A esperança cristã não é saber exatamente quando tudo acontecerá. É saber quem virá.",
          "openingTakeaway": "",
          "editorialStatus": "DRAFT",
          "published": false,
          "runtimeEligible": false,
          "nextStudyId": "track-01-study-17",
          "terminal": false,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "sourceDeclaredProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "expectedProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkerCount": 12,
        "structuredSectionCount": 10,
        "sections": [
          {
            "key": "LEIA",
            "type": "READ",
            "order": 1,
            "sourceHeading": "LEIA",
            "contentText": "Comece por João 14:1-3. Jesus está falando com discípulos que em breve enfrentarão medo, confusão e\nsofrimento.\nObserve como Ele começa: “Não se perturbe o coração de vocês.” A promessa da volta aparece dentro de\numa palavra de consolo.\nDepois leia Atos 1:9-11. Jesus sobe aos céus diante dos discípulos e eles recebem a promessa de que esse\nmesmo Jesus voltará.\nLeia também 1 Tessalonicenses 4:13-18. Veja por que Paulo escreve esse texto: a igreja estava preocupada\ncom irmãos que haviam morrido.\nPor fim, leia Mateus 24:36-44. Observe a ênfase de Jesus: ninguém sabe o dia nem a hora."
          },
          {
            "key": "OBSERVE",
            "type": "OBSERVE",
            "order": 2,
            "sourceHeading": "OBSERVE",
            "contentText": "• Em João 14, por que Jesus fala de sua volta?\n• Em Atos 1, quem os anjos dizem que voltará?\n• A volta de Jesus é apresentada apenas como uma mudança interior dos discípulos?\n• Em 1 Tessalonicenses 4, qual preocupação Paulo está respondendo?\n• O que acontecerá com os que morreram em Cristo?\n• Que esperança Paulo oferece aos que ainda estiverem vivos?\n• Em Mateus 24, Jesus revela uma data?\n• Qual deve ser a atitude dos discípulos diante da incerteza do momento?\n• A doutrina da volta de Cristo produz apenas curiosidade ou também uma maneira diferente de viver?"
          },
          {
            "key": "ENTENDA",
            "type": "UNDERSTAND",
            "order": 3,
            "sourceHeading": "ENTENDA",
            "contentText": "1. Jesus prometeu voltar\nAntes da cruz, Jesus prepara os discípulos para sua partida. Eles ainda não compreendiam tudo o que estava\nprestes a acontecer.\nJesus morreria, ressuscitaria e voltaria ao Pai. Mas sua ausência não seria definitiva.\nEm João 14, Ele promete voltar. Depois da ressurreição, Atos 1 reforça essa esperança.\nA fé cristã olha em duas direções\nPara trás: Cristo veio, morreu e ressuscitou.\nPara frente: Cristo virá novamente.\nA Igreja vive entre essas duas grandes afirmações: Ele veio. Ele virá.\n2. A esperança está ligada a uma pessoa\nÀs vezes os estudos sobre o fim dos tempos ficam tão cheios de datas, guerras, números, mapas, governos,\npersonagens e teorias que Jesus quase desaparece.\nMas o centro da esperança cristã não é descobrir quem estava certo no debate profético.\nO centro é\nCristo voltará.\nNós esperamos alguém. Paulo fala sobre estar com o Senhor. Jesus fala sobre receber seus discípulos para\nestarem com Ele.\nO melhor do futuro cristão não é apenas um mundo melhor. É estar plenamente com Cristo.\n3. A volta de Jesus não é apresentada apenas como símbolo\nAtos 1 é especialmente importante. Os discípulos veem Jesus partir e recebem a promessa de que Ele\nvoltará.\nO Novo Testamento não apresenta a segunda vinda simplesmente como “Jesus continua vivo nos valores\nque ensinou” ou apenas como uma experiência interior.\nA presença espiritual de Cristo com seu povo é uma verdade importante. Mas a promessa futura vai além\ndisso.\nPonto seguro\nO Novo Testamento aguarda a vinda de Cristo como um acontecimento futuro.\nPARE UM MOMENTO AQUI\nTalvez você já tenha ouvido tantas mensagens sobre o fim que a volta de Jesus passou a produzir apenas\nmedo.\nMas veja como Jesus apresenta a esperança em João 14: “Não se perturbe o coração de vocês.”\nO tom da promessa\nA volta de Cristo não foi anunciada primeiro para assustar os discípulos, mas para sustentá-los.\n4. E os cristãos que morreram antes da volta de Jesus?\nEssa era uma preocupação real em Tessalônica. Alguns cristãos haviam morrido e talvez outros\nperguntassem: “Eles perderão aquilo que Cristo fará quando voltar?”\nPaulo responde: não. Os mortos em Cristo não foram esquecidos.\nEm 1 Tessalonicenses 4, Paulo ensina que eles ressuscitarão.\nConexão com o estudo anterior\nA morte não exclui ninguém que pertence a Cristo da promessa futura.\n5. O que significa “seremos arrebatados”?\nEm 1 Tessalonicenses 4, Paulo afirma que os crentes serão arrebatados para encontrar o Senhor.\nA palavra traduzida dessa forma transmite a ideia de ser tomado ou levado. É daí que vem a linguagem cristã\nsobre o arrebatamento.\nO texto afirma claramente que haverá um encontro do povo de Cristo com o Senhor. Isso podemos ensinar\ncom segurança.\nMas existe uma pergunta posterior: em que momento exatamente isso acontece em relação a outros\nacontecimentos do fim?\nUMA DISTINÇÃO IMPORTANTE\nCristãos que creem na autoridade das Escrituras possuem diferentes entendimentos sobre a relação entre\nvolta de Cristo, arrebatamento, tribulação, milênio, ressurreições e juízo.\nAlguns entendem o arrebatamento como um acontecimento anterior a um período final de tribulação.\nOutros entendem que o encontro de 1 Tessalonicenses 4 ocorre ligado à própria manifestação pública de\nCristo ao final desse período.\nExistem ainda outras formas de organizar esses textos.\nO que o texto deixa muito claro\nCristo virá, os mortos em Cristo ressuscitarão, os que pertencem a Ele serão reunidos com Ele\ne estarão para sempre com o Senhor.\nE observe como Paulo termina: consolem uns aos outros com estas palavras. O objetivo do texto é consolo,\nnão disputa.\n6. Então os sinais não importam?\nImportam. Jesus e os apóstolos falam sobre acontecimentos relacionados ao futuro.\nMateus 24, Marcos 13, Lucas 21, 2 Tessalonicenses e Apocalipse possuem textos que merecem estudo\ncuidadoso.\nMas existe uma diferença entre observar aquilo que a Bíblia realmente diz e transformar cada notícia do\njornal em cumprimento definitivo de alguma profecia.\nAo longo da história, muitas previsões muito confiantes falharam.\nUm cuidado necessário\nA Bíblia merece algo melhor do que nossa ansiedade transformada em interpretação.\n7. Jesus foi muito claro sobre marcar datas\nMateus 24:36 registra Jesus dizendo que ninguém conhece o dia nem a hora.\nEm Atos 1, quando os discípulos perguntam sobre tempos, Jesus novamente os direciona para aquilo que\nlhes cabe fazer.\nIsso deveria produzir humildade.\nRegra simples\nQuando alguém anuncia que descobriu a data da volta de Jesus, temos boa razão bíblica para\nnão seguir essa afirmação.\n8. Se não sabemos a data, então o que devemos fazer?\nJesus não diz: “Vocês não sabem a data, então não precisam pensar no assunto.” Ele diz: vigiem.\nMas vigilância bíblica não significa passar o dia inteiro procurando sinais assustadores na internet.\nVigilância significa viver preparado, como um servo que sabe que seu senhor voltará e deseja ser\nencontrado cumprindo sua responsabilidade.\nUma pergunta melhor\nEm vez de apenas perguntar “Será que Jesus volta esta semana?”, pergunte também: “Se Ele\nvoltasse, como me encontraria vivendo?”\nVIGIAR É VIVER FIELMENTE\n• Permanecer em Cristo.\n• Buscar santidade.\n• Amar pessoas.\n• Servir.\n• Perdoar.\n• Anunciar o Evangelho.\n• Cumprir nossa responsabilidade.\n• Não abandonar a fé.\n• Manter o coração desperto.\nPreparação bíblica\nPreparar-se para a volta de Cristo não é abandonar a vida. É viver a vida debaixo do senhorio\nde Cristo.\n9. A volta de Jesus não é desculpa para abandonar responsabilidades\nIsso aconteceu muito cedo na história cristã. Em 2 Tessalonicenses, Paulo precisa corrigir pessoas que\nestavam vivendo de maneira desordenada.\nA esperança futura nunca deveria produzir irresponsabilidade.\nNão precisamos parar de trabalhar, abandonar estudos, desprezar planejamento, ignorar família ou viver\nolhando para o céu sem cumprir nossas responsabilidades.\nResultado saudável\nA esperança cristã deve nos tornar mais fiéis, não menos.\n10. A volta de Cristo chama à santidade\n2 Pedro 3 relaciona a esperança futura com uma pergunta muito prática: Que tipo de pessoas devemos ser?\nEsse é um ótimo teste para qualquer ensino sobre profecia.\nSe depois de estudar o fim dos tempos ficamos apenas mais curiosos, assustados, agressivos ou obcecados,\nmas não mais santos, amorosos, fiéis e esperançosos, provavelmente perdemos parte do propósito espiritual\ndesses textos.\nProfecia também forma caráter\nA profecia bíblica não serve apenas para informar o futuro. Ela também forma o caráter no\npresente.\n11. A volta de Cristo consola quem sofre\nImagine cristãos perseguidos, pessoas enterrando irmãos, comunidades enfrentando injustiça e gente\ncansada de ver o mal aparentemente vencer.\nPara elas, dizer “Jesus voltará” não era uma curiosidade religiosa. Era esperança.\nEssa esperança anuncia\nO mal não governará para sempre. A injustiça não terá a palavra final. A morte não ficará com\naqueles que pertencem a Cristo. Jesus será plenamente reconhecido como Senhor.\n12. Devemos ter medo da volta de Jesus?\nA Bíblia fala seriamente sobre juízo. Por isso não devemos transformar a volta de Cristo numa ideia\nsentimental e vazia.\nMas para aqueles que pertencem a Cristo, o Novo Testamento também usa linguagem cheia de esperança.\nTito fala da bendita esperança. Paulo manda os tessalonicenses consolarem uns aos outros. João encerra o\nApocalipse com uma oração simples: Vem, Senhor Jesus.\nUMA ESPIRITUALIDADE DE ESPERA\nEsperar Cristo não significa viver paralisado.\nÉ parecido com alguém que ama uma pessoa e sabe que ela está chegando. A casa continua funcionando, o\ntrabalho continua e a vida continua, mas existe uma expectativa no coração.\nO cristão planta, trabalha, ama, constrói, serve, chora, celebra e evangeliza.\nMas sabe\nEsta história ainda não chegou ao último capítulo.\n13. “E se Jesus não voltar durante a minha vida?”\nEssa possibilidade não enfraquece a promessa. Muitas gerações de cristãos morreram esperando Cristo.\nA expectativa cristã nunca deveria depender da afirmação: “Tenho certeza de que será na minha geração.”\nEla depende de algo maior\nTenho certeza de que Ele virá.\nSe morrermos antes, continuamos pertencendo a Cristo. Como vimos em 1 Tessalonicenses 4, os mortos em\nCristo não são esquecidos."
          },
          {
            "key": "CONECTE",
            "type": "CONNECT",
            "order": 4,
            "sourceHeading": "CONECTE A JORNADA",
            "contentText": "Criação\nDeus cria tudo bom.\nQueda\nO pecado e a morte entram.\nPromessas\nDeus anuncia redenção.\nCristo\nO Messias vem.\nCruz\nO pecado é tratado.\nRessurreição\nA morte é vencida.\nIgreja\nUm povo é formado.\nMissão\nO Evangelho vai às nações.\nVolta de Cristo\nO Rei retorna.\nA Bíblia não está caminhando para um futuro sem direção. Ela caminha para o cumprimento do propósito de\nDeus.\nO QUE APRENDEMOS SOBRE DEUS?\n• Mantém suas promessas.\n• Governa a história.\n• Não abandonou este mundo.\n• Não permitirá que o mal continue para sempre.\n• Ressuscitará os que pertencem a Cristo.\n• Levará sua obra ao cumprimento.\n• Chama seu povo a viver em esperança.\nVerdade para aquietar o coração\nO futuro não está nas mãos do caos. Está nas mãos de Deus.\nO QUE APRENDEMOS SOBRE JESUS?\n• Veio.\n• Morreu.\n• Ressuscitou.\n• Foi exaltado.\n• Reina.\n• E voltará.\nO Jesus que esperamos é o mesmo Jesus que conhecemos no Evangelho: aquele que tocou os esquecidos,\nperdoou pecadores, confrontou a hipocrisia, entregou a própria vida e venceu a morte.\nNossa esperança\nNão está em um desconhecido chegando. Está naquele que já demonstrou seu amor na cruz."
          },
          {
            "key": "APLIQUE",
            "type": "APPLY",
            "order": 5,
            "sourceHeading": "APLIQUE À VIDA",
            "contentText": "1. Não viva dominado pelo medo do futuro\nGuerras, crises, doenças e notícias assustadoras existem. Devemos ser responsáveis e atentos.\nMas o cristão não precisa interpretar cada manhã como se Deus tivesse perdido o controle durante a noite.\nCristo continua sendo Senhor.\n2. Pare de procurar datas e comece a cultivar fidelidade\nSaber que Cristo volta deveria produzir menos especulação e mais obediência.\nTalvez a pergunta principal não seja\n“Quando?”\nMas: “Como estou vivendo enquanto espero?”\n3. Não adie sua vida com Deus\nÀs vezes alguém pensa: “Quando perceber que Jesus está realmente perto de voltar, eu me conserto.”\nIsso não é vigilância. É cálculo.\nO Evangelho chama: hoje. Hoje é dia de buscar Deus, reconciliar, perdoar e obedecer.\n4. Não perca a esperança quando o mal parece vencer\nHá momentos em que o mundo parece profundamente quebrado.\nA volta de Cristo nos lembra\nA fotografia atual não é o final da história. Deus ainda não terminou.\n5. Console quem sofre\nPaulo não entrega 1 Tessalonicenses 4 para os cristãos vencerem um debate profético. Ele diz: consolem-se.\nQuando alguém perde uma pessoa que morreu em Cristo, não precisamos fingir que não dói. Podemos\nchorar, mas choramos com esperança."
          },
          {
            "key": "REFLECTION_QUESTIONS",
            "type": "REFLECTION_QUESTIONS",
            "order": 6,
            "sourceHeading": "PARA REFLETIR",
            "contentText": "• A volta de Jesus produz em mim mais medo ou esperança?\n• Tenho me preocupado mais em descobrir datas do que em viver fielmente?\n• Se Cristo viesse hoje, existe algo que eu gostaria de ter resolvido diante de Deus?\n• Minha visão do futuro me ajuda a perseverar?\n• Tenho deixado notícias e especulações governarem minha paz?\n• A esperança da ressurreição muda a forma como enfrento a morte?\n• O que significa vigiar na minha vida prática?\n• Posso sinceramente orar: “Vem, Senhor Jesus”?"
          },
          {
            "key": "JOURNAL_PROMPT",
            "type": "JOURNAL_PROMPT",
            "order": 7,
            "sourceHeading": "Registrar no Diário",
            "contentText": "Se eu realmente creio que Cristo voltará, que área da minha vida precisa ser vivida com mais\nfidelidade hoje?"
          },
          {
            "key": "PRAYER",
            "type": "PRAYER",
            "order": 8,
            "sourceHeading": "ORE",
            "contentText": "Oração sugerida\nSenhor Jesus, obrigado porque tua história conosco não terminou. Tu vieste, morreste,\nressuscitaste e prometeste voltar. Guarda meu coração do medo, da curiosidade vazia e das\nespeculações que me afastam do que realmente importa. Ensina-me a esperar por ti vivendo\ncom fidelidade, santidade, amor e esperança. Consola-me diante da morte, fortalece-me diante\ndo sofrimento e faz nascer em mim o desejo sincero de poder dizer: vem, Senhor Jesus. Amém."
          },
          {
            "key": "KEEP",
            "type": "KEEP",
            "order": 9,
            "sourceHeading": "PARA GUARDAR",
            "contentText": "1 Tessalonicenses 4:16-18\nLeia os versículos completos.\nObserve a sequência: o Senhor virá; os mortos em Cristo ressuscitarão; o povo de Cristo será reunido com\nEle; estaremos para sempre com o Senhor.\nAgora observe o último mandamento: consolem uns aos outros. Isso revela o espírito em que esse texto foi\nescrito.\nAdicionar aos Favoritos\nGuarde 1 Tessalonicenses 4:16-18 para revisitar a esperança da volta de Cristo."
          },
          {
            "key": "CONTINUE_JOURNEY",
            "type": "CONTINUE_JOURNEY",
            "order": 10,
            "sourceHeading": "CONTINUE SUA JORNADA",
            "contentText": "Cristo voltará. Mas sua volta também levanta outra questão.\nSe Deus é justo, se o mal não continuará para sempre e se cada história humana importa, então: o que\nacontecerá com o pecado, a injustiça e o mal no final?\nA Bíblia fala sobre juízo. Esse assunto pode provocar medo e também muitos mal-entendidos, mas não\npodemos removê-lo da mensagem bíblica.\nPróximo estudo\nEstudo 17 - Juízo e restauração\nPergunta central: Como Deus tratará definitivamente o pecado, a injustiça e o mal?\nTextos principais: Mateus 25:31-46 | Atos 17:30-31 | Romanos 2:5-11 | Apocalipse 20:11-15\nNo próximo estudo trataremos com cuidado de juízo, responsabilidade, justiça de Deus, destino final do mal\ne da esperança de que aquilo que hoje parece injusto não permanecerá assim para sempre."
          }
        ],
        "terminalCompletion": null,
        "sourceAppendix": {
          "heading": "REFERÊNCIAS BÍBLICAS UTILIZADAS",
          "contentText": "Textos principais\nJoão 14:1-3\nAtos 1:9-11\n1 Tessalonicenses 4:13-18\nMateus 24:36-44\nConexões\n1 Coríntios 15:50-58\nFilipenses 3:20-21\n2 Pedro 3:8-14\nTito 2:11-14\nApocalipse 22:12-20\nNOTA EDITORIAL\n• A volta pessoal e futura de Cristo foi apresentada como ensino claro do Novo Testamento.\n• A ressurreição dos mortos em Cristo e a reunião dos crentes com o Senhor foram afirmadas diretamente a\npartir de 1 Tessalonicenses 4.\n• O arrebatamento foi explicado a partir do próprio texto, sem transformar uma cronologia específica sobre\nsua relação com a tribulação em verdade explicitamente demonstrada naquele trecho.\n• Não foram estabelecidas datas para a volta de Cristo.\n• Sinais bíblicos não foram ligados automaticamente a acontecimentos contemporâneos específicos.\n• Diferentes interpretações sobre tribulação, milênio e ordem dos acontecimentos foram reconhecidas sem\ntransformar este estudo introdutório em disputa entre sistemas escatológicos.\n• A ênfase principal foi mantida onde o Novo Testamento frequentemente a coloca: esperança, consolo,\nvigilância, santidade e fidelidade.\nSTATUS EDITORIAL\nTrilha\nO Plano Eterno de Deus\nEstudo\n16/18 - A volta de Cristo: a esperança que nos mantém despertos\nVersão\nRascunho 1 para revisão\nSituação\nDRAFT - aguardando revisão bíblica e editorial"
        },
        "normalization": {
          "removedForbiddenControlCharCount": 0,
          "removedPageHeaderLineCount": 44
        },
        "canonicalSource": {
          "lineCount": 336,
          "sha256": "753032B7DD6AA554194307251847FE31C9E14582226E0D70A00FD7114AA473AE",
          "preambleLines": [
            "TRILHA 1 | O PLANO ETERNO DE DEUS",
            "16 - A volta de Cristo: a esperança que nos",
            "mantém despertos"
          ]
        },
        "continuity": {
          "expectedNextStudyNumber": 17,
          "detectedNextStudyNumber": 17,
          "nextStudyId": "track-01-study-17",
          "terminal": false,
          "evidenceKind": "EXPLICIT_NUMBER",
          "valid": true
        },
        "quality": {
          "forbiddenControlCharCount": 0,
          "pageHeaderLeakCount": 0,
          "questionSemanticLeakCount": 0,
          "objectiveSemanticLeakCount": 0,
          "continueAppendixLeakCount": 0,
          "profileMarkerSetMatch": true,
          "structuredSectionCountMatch": true,
          "nextStudyIdValid": true,
          "terminalCompletionValid": null
        }
      },
    },
    {
      approvedCandidateSha256: "012105B5CC17E2693BC79F69BAF6676DAB2D1B884F5B197394A1A9506B5B2BCA",
      payload: {
        "schema": "P17-P2-A10-R2-R1-R1_TRACK1_BATCH_SIMULATION_CANDIDATE_V1",
        "readinessOnly": true,
        "runtimePayload": false,
        "batch": {
          "id": "B01_TRACK_01",
          "sequence": 1,
          "trackNumber": 1,
          "expectedTrackStudyCount": 18,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "source": {
          "relativePath": "trilha_01\\Biblia_Jornada_Estudo_17_Juizo_E_Restauracao.pdf",
          "bytes": 963830,
          "sha256": "1A40E6602805B88F1075985A3F269CEA3B1BC6D0D4C287DABDA2D05DFB789360",
          "pageCount": 12,
          "extractedCharacterCount": 19114,
          "expectedExtractedCharacterCount": 19114,
          "extractedTextSha256": "49DBBB66C42521CEE2CBD9FC4FEBA2732943E5A421AFA2AFCCF65A029DB4DFA1",
          "a5NormalizedTextSha256": "87164E73B8D0095D38F14F30BF1A612B379E7A82D4AAD504F092618043C490E0"
        },
        "study": {
          "id": "track-01-study-17",
          "trackId": "track-01",
          "number": 17,
          "slug": "juizo-e-restauracao",
          "questionCentral": "Como Deus tratará definitivamente o pecado, a injustiça e o mal?",
          "primaryTexts": "Mateus 25:31-46 | Atos 17:30-31 | Romanos 2:5-11 | Apocalipse 20:11-15",
          "complementaryReadings": "João 5:24-29 | Romanos 8:18-23 | 2 Pedro 3:9-13 | Apocalipse 21:1-5",
          "estimatedTime": "15-18 minutos",
          "objective": "Queremos compreender que: • Deus julgará o mundo com justiça. • Ninguém ficará escondido ou acima de sua justiça. • O juízo final revela que nossas escolhas possuem peso real. • A salvação continua sendo pela graça de Deus em Cristo, e não por merecimento humano. • As obras aparecem no juízo como expressão real daquilo que uma vida se tornou. • A Bíblia fala seriamente sobre condenação. • O juízo de Deus também significa o fim definitivo do domínio do mal. • A esperança cristã não termina no julgamento, mas avança para a restauração da criação. Guarde esta verdade O Deus que perdoa o pecador também é o Deus que promete que o pecado não governará para sempre.",
          "openingTakeaway": "",
          "editorialStatus": "DRAFT",
          "published": false,
          "runtimeEligible": false,
          "nextStudyId": "track-01-study-18",
          "terminal": false,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "sourceDeclaredProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "expectedProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "CONECTE",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "profileMarkerCount": 12,
        "structuredSectionCount": 10,
        "sections": [
          {
            "key": "LEIA",
            "type": "READ",
            "order": 1,
            "sourceHeading": "LEIA",
            "contentText": "Comece por Atos 17:30-31. Observe três elementos: arrependimento, juízo e Jesus ressuscitado.\nDepois leia Romanos 2:5-11 e perceba a insistência de Paulo na justiça e imparcialidade de Deus.\nLeia então Mateus 25:31-46. Jesus fala do Filho do Homem vindo em glória e de uma separação final.\nPor fim, leia Apocalipse 20:11-15. A linguagem é solene: um grande trono, livros abertos, mortos diante de\nDeus, juízo.\nDepois disso, leia também Apocalipse 21:1-5. Isso é importante, porque a história bíblica não termina\napenas com juízo.\nEla continua\nDeus faz novas todas as coisas."
          },
          {
            "key": "OBSERVE",
            "type": "OBSERVE",
            "order": 2,
            "sourceHeading": "OBSERVE",
            "contentText": "• Quem é apresentado como juiz?\n• O juízo é descrito como arbitrário ou justo?\n• Alguma pessoa fica fora da responsabilidade diante de Deus?\n• Por que as obras aparecem nos textos sobre juízo?\n• Em Mateus 25, como o tratamento dado às pessoas revela algo sobre aqueles que estão diante de Cristo?\n• Em Apocalipse 20, o que significam os “livros” dentro da cena?\n• O Livro da Vida também aparece?\n• O que acontece com a morte no final?\n• Depois do juízo de Apocalipse 20, o que aparece em Apocalipse 21?\n• A história termina em destruição ou em uma nova criação?"
          },
          {
            "key": "ENTENDA",
            "type": "UNDERSTAND",
            "order": 3,
            "sourceHeading": "ENTENDA",
            "contentText": "1. O juízo significa que Deus leva o mal a sério\nÀs vezes pensamos que falar sobre juízo faz Deus parecer menos amoroso. Mas existe outro lado.\nImagine vítimas de violência, pessoas traficadas, crianças abusadas, povos massacrados e injustiças nunca\nreconhecidas.\nDizer que Deus é justo significa dizer: essas coisas importam para Ele.\nDeus não chama o mal de bem, não trata o sofrimento como insignificante e não esquece as vítimas.\nO juízo declara\nO mal não terá a palavra final.\n2. Deus julgará com justiça\nAtos 17 diz que Deus estabeleceu um dia em que julgará o mundo com justiça. Romanos 2 também insiste\nque Deus não age com favoritismo.\nNos tribunais humanos existem erros, corrupção, falta de provas, influência, dinheiro, poder e preconceito.\nO julgamento de Deus não sofre dessas limitações. Ele conhece perfeitamente o ato, a intenção, o contexto,\no coração e aquilo que ninguém mais viu.\nPor isso\nDeus não precisa descobrir a verdade. Ele já a conhece.\nPARE UM MOMENTO AQUI\nTalvez alguém tenha feito algo contra você e nunca tenha reconhecido. Talvez ninguém tenha acreditado\nem sua dor.\nA promessa do juízo de Deus não nos dá autorização para buscar vingança. Ela faz algo diferente.\nEla nos permite dizer\nEu não preciso carregar nas minhas mãos o tribunal final. Deus é juiz.\n3. Todos comparecem diante de Deus\nApocalipse 20 apresenta grandes e pequenos diante do trono.\nA imagem comunica algo claro: ninguém é importante demais para escapar e ninguém é desconhecido\ndemais para ser esquecido.\nReis, pobres, famosos, anônimos, religiosos e irreligiosos vivem diante de Deus.\nDiante dele\nA aparência pode enganar seres humanos. Não engana aquele que conhece o coração.\n4. Por que as obras aparecem no juízo?\nNo estudo sobre graça aprendemos que não somos salvos pelas nossas obras. Então por que Romanos 2,\nMateus 25 e Apocalipse 20 falam sobre aquilo que as pessoas fizeram?\nPrecisamos manter duas verdades juntas: a salvação é pela graça, recebida mediante a fé, e nossa vida revela\naquilo em que realmente confiamos e a quem pertencemos.\nAs obras não compram Cristo, mas uma fé viva começa a produzir fruto.\nResumo\nAs obras não funcionam como preço pago pela salvação, mas possuem valor real como\nexpressão da vida diante de Deus.\n5. Mateus 25 e “fizestes a um destes”\nMateus 25 apresenta o Rei separando pessoas como um pastor separa ovelhas e cabritos.\nO texto fala de fome, sede, estrangeiro, nudez, doença e prisão.\nJesus identifica-se de maneira impressionante com os necessitados.\nHá discussões sobre quem exatamente são os “menores irmãos” de Jesus nesse texto. Alguns intérpretes\nentendem de forma mais específica como discípulos ou mensageiros de Jesus; outros enxergam uma\naplicação mais ampla aos necessitados.\nMas uma verdade permanece\nA relação com Cristo não pode ser totalmente separada da maneira como tratamos pessoas.\n6. O juízo não significa que Deus será surpreendido ao abrir os livros\nApocalipse usa uma cena poderosa: livros são abertos. Isso não significa que Deus esqueceu o que\naconteceu e precisa consultar arquivos para descobrir.\nÉ linguagem de julgamento. Comunica registro, responsabilidade, verdade e prestação de contas.\nTambém aparece o Livro da Vida.\nComo estamos lendo Apocalipse, um livro cheio de linguagem simbólica, não devemos transformar cada\ndetalhe da cena em descrição física obrigatória de como será o tribunal celestial.\nA verdade transmitida\nNinguém ficará sem resposta diante de Deus.\n7. E aqueles que pertencem a Cristo?\nEssa pergunta pode gerar muito medo.\nJesus diz em João 5 que quem ouve sua palavra e crê naquele que o enviou tem vida eterna e passou da\nmorte para a vida.\nRomanos 8 começa afirmando que não há condenação para os que estão em Cristo Jesus.\nIsso não contradiz os textos de juízo.\nAs duas verdades\nDeus julgará; e há segurança em Cristo.\nA esperança do cristão não está em dizer “meu histórico é perfeito”, mas em dizer: minha esperança está em\nCristo.\n8. Isso significa que o cristão pode viver de qualquer maneira?\nNão. Essa seria novamente uma distorção da graça.\nA segurança em Cristo nunca aparece no Novo Testamento como licença para uma vida entregue\ndeliberadamente ao pecado.\nJesus salva e transforma. A vida cristã possui arrependimento, luta, quedas, recomeços e crescimento.\nGraça verdadeira\nOferece segurança, mas também nos chama a caminhar com Cristo.\n9. A Bíblia fala realmente de condenação\nPrecisamos falar disso sem exagerar e sem apagar o texto.\nMateus 25 coloca lado a lado vida eterna e punição eterna. Apocalipse 20 fala da segunda morte e do lago\nde fogo.\nEsses são textos sérios. A Bíblia não apresenta o juízo final como simples advertência vazia.\nPonto seguro\nExiste uma realidade final de condenação.\nUMA DISTINÇÃO IMPORTANTE SOBRE A PUNIÇÃO FINAL\nCristãos possuem diferentes interpretações sobre alguns detalhes da condição final dos ímpios.\nExistem tradições cristãs que entendem as passagens como ensinando sofrimento consciente contínuo.\nOutras defendem que o juízo culminará na destruição definitiva dos ímpios, posição muitas vezes chamada\nde imortalidade condicional.\nEssas discussões tentam relacionar diferentes textos bíblicos.\nO que não devemos diluir\nO juízo é real, a condenação é séria e o mal não terá participação eterna na nova criação de\nDeus.\n10. Deus tem prazer na condenação?\nA Bíblia frequentemente mostra Deus chamando pessoas ao arrependimento. Atos 17 anuncia o juízo e,\njustamente por isso, chama todos ao arrependimento.\n2 Pedro 3 fala da paciência de Deus.\nO juízo bíblico não aparece como um Deus cruel esperando ansiosamente uma oportunidade de destruir\npessoas.\nAo mesmo tempo, sua paciência não significa que o mal será ignorado para sempre.\nO chamado\nVoltem-se para Deus enquanto há tempo.\n11. O Evangelho faz ainda mais sentido quando levamos o juízo a sério\nSe não existe problema real, se o pecado não importa e se não existe justiça, então a cruz se torna difícil de\ncompreender.\nMas quando percebemos a santidade de Deus, a gravidade do pecado e a realidade do juízo, entendemos\nmelhor a profundidade da graça.\nO Evangelho não diz\n“Não existe juízo.”\nEle anuncia: “Em Cristo existe salvação.”\n12. O juízo também é o fim do domínio do mal\nNo Apocalipse, o juízo não trata apenas de indivíduos. Ele também está ligado ao fim definitivo da morte, do\nmal, da rebelião e daquilo que destrói a criação de Deus.\nApocalipse 20 diz que até mesmo a morte é lançada no lago de fogo.\nUma imagem poderosa\nDeus não apenas salva pessoas do mal. Ele promete acabar com o domínio do mal.\n13. Depois do juízo vem Apocalipse 21\nEsse detalhe é precioso.\nApocalipse 20: juízo.\nApocalipse 21: novo céu e nova terra.\nDeus habitando com seu povo. Lágrimas enxugadas. Morte não existe mais. Luto, choro e dor chegam ao\nfim.\nO juízo não é o último objetivo\nEle abre caminho para a restauração.\nO JUÍZO É UMA MÁ NOTÍCIA OU UMA BOA NOTÍCIA?\nDepende de onde olhamos.\n• Para o mal que deseja continuar para sempre: é notícia terrível.\n• Para quem foi esmagado pela injustiça: é esperança.\n• Para quem insiste em viver sem Deus: é advertência.\n• Para quem está em Cristo: é lembrança de que a história caminha para justiça e restauração.\nTalvez possamos dizer assim\nA justiça de Deus é assustadora quando queremos preservar o mal, mas profundamente\nconsoladora quando desejamos que o mal finalmente termine.\n14. E as pessoas que nunca ouviram o Evangelho?\nEssa é uma pergunta difícil e legítima.\nA Bíblia afirma com clareza que Deus é justo, não age com parcialidade, Cristo ocupa o centro da salvação e\ntodos são responsáveis diante de Deus.\nRomanos 1 e 2 tratam de responsabilidade humana e consciência.\nMas a Bíblia não nos oferece informações suficientes para construirmos uma tabela completa descrevendo\nexatamente como Deus julgará cada situação individual que desconhecemos.\nDuas certezas humildes\nDeus nunca cometerá uma injustiça.\nE por isso o Evangelho precisa ser anunciado.\n15. O juízo deveria produzir humildade, não arrogância\nUma pessoa que crê na graça não deveria falar sobre o juízo como se dissesse: “Ainda bem que eu sou\nmelhor que os outros.”\nNão somos salvos porque somos melhores. Somos alcançados pela misericórdia.\nO juízo deveria produzir gratidão, reverência, urgência, compaixão e humildade.\nQuem conhece a graça\nNão comemora a possibilidade de alguém se perder. Ora, ama, testemunha e convida."
          },
          {
            "key": "CONECTE",
            "type": "CONNECT",
            "order": 4,
            "sourceHeading": "CONECTE A JORNADA",
            "contentText": "Criação\nTudo é muito bom.\nQueda\nO pecado entra.\nHistória humana\nO mal produz sofrimento.\nCruz\nCristo enfrenta o pecado.\nRessurreição\nCristo vence a morte.\nEvangelho\nDeus chama pecadores à reconciliação.\nVolta de Cristo\nO Rei retorna.\nJuízo\nO mal recebe resposta definitiva.\nRestauração\nDeus fará novas todas as coisas.\nEstamos muito perto do final da primeira trilha. A Bíblia começou com uma criação boa e terminará com\ncriação restaurada.\nO QUE APRENDEMOS SOBRE DEUS?\n• É santo.\n• É justo.\n• Conhece perfeitamente a verdade.\n• Não é parcial.\n• Leva o sofrimento a sério.\n• Chama ao arrependimento.\n• Oferece salvação em Cristo.\n• Julgará o mal.\n• Acabará com o domínio da morte.\n• Restaurará sua criação.\nVerdade para guardar\nNenhuma injustiça ficará para sempre escondida de Deus.\nO QUE APRENDEMOS SOBRE NÓS?\n• Somos responsáveis diante de Deus.\n• Não conseguimos nos esconder atrás de aparência religiosa.\n• Precisamos da graça.\n• Nossas escolhas possuem importância.\n• Somos chamados ao arrependimento.\n• Devemos tratar pessoas com misericórdia.\n• Não temos motivo para orgulho espiritual.\n• Precisamos viver conscientes de que nossa história possui eternidade diante de Deus."
          },
          {
            "key": "APLIQUE",
            "type": "APPLY",
            "order": 5,
            "sourceHeading": "APLIQUE À VIDA",
            "contentText": "1. Não carregue nas próprias mãos o juízo final\nSe alguém feriu você, buscar justiça pode ser correto e necessário. Denunciar crimes pode ser necessário.\nProteger vítimas é necessário.\nPerdoar não significa impedir a justiça humana adequada.\nMas existe uma vingança final que não pertence a nós. Podemos entregar isso a Deus.\n2. Pare de tratar pecado como algo sem consequência\nGraça não torna o pecado pequeno. Ela mostra como Deus é grande em misericórdia.\nSe existe algo que precisa de arrependimento, não adie.\n3. Não julgue pessoas com prazer\nExiste uma diferença entre discernir certo e errado e sentir prazer em condenar.\nJesus chorou. Paulo carregava dor por aqueles que estavam longe de Cristo. O Evangelho deve produzir\ncompaixão.\n4. Viva com consciência de que suas escolhas importam\nAquilo que fazemos com dinheiro, poder, palavras, pessoas vulneráveis e quando ninguém está olhando\npossui importância diante de Deus.\nNão porque estamos comprando salvação, mas porque nossa vida pertence a Ele.\n5. Confie na justiça de Deus quando a justiça humana falhar\nTalvez não vejamos todas as injustiças sendo corrigidas nesta vida. Isso dói.\nMas o cristão pode continuar dizendo\nDeus ainda não terminou a história."
          },
          {
            "key": "REFLECTION_QUESTIONS",
            "type": "REFLECTION_QUESTIONS",
            "order": 6,
            "sourceHeading": "PARA REFLETIR",
            "contentText": "• Quando ouço falar em juízo, penso em justiça ou apenas em medo?\n• Existe alguma injustiça que ainda tento carregar sozinho?\n• Tenho usado a graça como desculpa para algum pecado?\n• Minha maneira de tratar pessoas combina com aquilo que digo crer?\n• Tenho prazer em imaginar Deus julgando pessoas das quais não gosto?\n• O juízo de Deus aumenta em mim a gratidão pela cruz?\n• Existe algo de que preciso me arrepender hoje?\n• Minha esperança está realmente em Cristo?"
          },
          {
            "key": "JOURNAL_PROMPT",
            "type": "JOURNAL_PROMPT",
            "order": 7,
            "sourceHeading": "Registrar no Diário",
            "contentText": "Existe alguma área da minha vida que eu gostaria que permanecesse escondida de Deus? O\nque aconteceria se eu a colocasse diante dele hoje com sinceridade?"
          },
          {
            "key": "PRAYER",
            "type": "PRAYER",
            "order": 8,
            "sourceHeading": "ORE",
            "contentText": "Oração sugerida\nSenhor, tu és santo e justo, e nada está escondido diante de ti. Obrigado porque tua justiça\nsignifica que o mal não vencerá para sempre e porque tua graça me chama para perto em\nCristo. Examina meu coração, mostra aquilo de que preciso me arrepender e livra-me da\narrogância de olhar para os outros como se eu não precisasse de misericórdia. Dá consolo a\nquem sofreu injustiça e ensina-me a confiar que tu julgarás com perfeição. Que a realidade do\njuízo me faça amar mais a graça, buscar mais a santidade e desejar que mais pessoas conheçam\na salvação que há em Jesus. Amém."
          },
          {
            "key": "KEEP",
            "type": "KEEP",
            "order": 9,
            "sourceHeading": "PARA GUARDAR",
            "contentText": "Atos 17:30-31\nLeia os dois versículos juntos.\nObserve a sequência: Deus chama ao arrependimento; estabeleceu um dia de juízo; julgará com justiça; e\naponta para aquele que ressuscitou dentre os mortos.\nMais uma vez, Jesus está no centro.\nAdicionar aos Favoritos\nGuarde Atos 17:30-31 para revisitar o chamado ao arrependimento e a certeza da justiça de\nDeus."
          },
          {
            "key": "CONTINUE_JOURNEY",
            "type": "CONTINUE_JOURNEY",
            "order": 10,
            "sourceHeading": "CONTINUE SUA JORNADA",
            "contentText": "Chegamos ao limite da velha história. O pecado foi julgado. O mal não continuará. A morte não governará\npara sempre.\nMas o que vem depois?\nO último estudo desta trilha não termina com pessoas flutuando para sempre longe da criação.\nA Bíblia nos leva a uma visão magnífica: novo céu e nova terra.\nDeus com seu povo. Criação restaurada. Morte vencida. Lágrimas enxugadas.\nE uma frase resume a esperança\nEis que faço novas todas as coisas.\nPróximo e último estudo da Trilha 1\nEstudo 18 - Novos céus e nova terra\nPergunta central: Como termina a história bíblica e qual é a esperança final do povo de Deus?\nTextos principais: Apocalipse 21:1-22:5 | Romanos 8:18-25 | 2 Pedro 3:10-13"
          }
        ],
        "terminalCompletion": null,
        "sourceAppendix": {
          "heading": "REFERÊNCIAS BÍBLICAS UTILIZADAS",
          "contentText": "Textos principais\nMateus 25:31-46\nAtos 17:30-31\nRomanos 2:5-11\nApocalipse 20:11-15\nConexões\nJoão 5:24-29\nRomanos 8:18-23\n2 Pedro 3:9-13\nApocalipse 21:1-5\nNOTA EDITORIAL\n• O juízo final foi apresentado como realidade bíblica, não apenas metáfora moral.\n• A justiça de Deus foi mantida ao lado de sua misericórdia e do chamado ao arrependimento.\n• A salvação não foi transformada em recompensa por boas obras.\n• As obras foram apresentadas como moralmente significativas e como expressão da vida diante de Deus,\nsem substituir a graça de Cristo como fundamento da salvação.\n• Mateus 25 foi tratado com cuidado quanto à identidade dos “menores irmãos”, reconhecendo a existência\nde interpretações diferentes.\n• As imagens de Apocalipse 20 foram tratadas respeitando o caráter simbólico/apocalíptico do livro, sem\nnegar a realidade do juízo que comunicam.\n• A realidade da condenação final foi afirmada.\n• Não foi apresentada como certeza uma única explicação sobre todos os detalhes da natureza da punição\nfinal onde existem debates interpretativos entre cristãos.\n• A segurança cristã foi mantida em Cristo, sem transformar graça em licença para uma vida deliberadamente\ndistante dele.\n• Perguntas sobre pessoas que não ouviram o Evangelho foram tratadas com humildade, afirmando aquilo\nque a Bíblia deixa seguro: Deus é perfeitamente justo e o Evangelho deve ser anunciado.\n• O juízo foi conectado à restauração, mostrando que Apocalipse não termina no capítulo 20.\nSTATUS EDITORIAL\nTrilha\nO Plano Eterno de Deus\nEstudo\n17/18 - Juízo e restauração: Deus não deixará o mal sem resposta\nVersão\nRascunho 1 para revisão\nSituação\nDRAFT - aguardando revisão bíblica e editorial"
        },
        "normalization": {
          "removedForbiddenControlCharCount": 0,
          "removedPageHeaderLineCount": 48
        },
        "canonicalSource": {
          "lineCount": 348,
          "sha256": "A5DE19A2F47C129344D3BCC70317D06D344C36DF270CC0E43276C9590D3B123A",
          "preambleLines": [
            "TRILHA 1 | O PLANO ETERNO DE DEUS",
            "17 - Juízo e restauração: Deus não deixará o mal",
            "sem resposta"
          ]
        },
        "continuity": {
          "expectedNextStudyNumber": 18,
          "detectedNextStudyNumber": 18,
          "nextStudyId": "track-01-study-18",
          "terminal": false,
          "evidenceKind": "EXPLICIT_FINAL_STUDY_LABEL_PLUS_EXPLICIT_STUDY_NUMBER",
          "valid": true
        },
        "quality": {
          "forbiddenControlCharCount": 0,
          "pageHeaderLeakCount": 0,
          "questionSemanticLeakCount": 0,
          "objectiveSemanticLeakCount": 0,
          "continueAppendixLeakCount": 0,
          "profileMarkerSetMatch": true,
          "structuredSectionCountMatch": true,
          "nextStudyIdValid": true,
          "terminalCompletionValid": null
        }
      },
    },
    {
      approvedCandidateSha256: "EEA052CE12C9229A4A0F9F67B827501F8CABA9FAAD37E027A23B0CE5C8B91980",
      payload: {
        "schema": "P17-P2-A10-R2-R1-R1_TRACK1_BATCH_SIMULATION_CANDIDATE_V1",
        "readinessOnly": true,
        "runtimePayload": false,
        "batch": {
          "id": "B01_TRACK_01",
          "sequence": 1,
          "trackNumber": 1,
          "expectedTrackStudyCount": 18,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "source": {
          "relativePath": "trilha_01\\Biblia_Jornada_Estudo_18_Novos_Ceus_E_Nova_Terra.pdf",
          "bytes": 990497,
          "sha256": "409F3AEB850C8C0450DF3DFDA85C5633D1C30F010F55D59EE9BA100378A94921",
          "pageCount": 15,
          "extractedCharacterCount": 22492,
          "expectedExtractedCharacterCount": 22492,
          "extractedTextSha256": "9119DB4A0F7F7CE29252E3646AB55D07902D1331F5CB9F42138C2C5E76EB97C2",
          "a5NormalizedTextSha256": "6BC3612358ACB41DB48CB0B1F4FDD42183D72F7E9D2CDAE10D9C809FD421E485"
        },
        "study": {
          "id": "track-01-study-18",
          "trackId": "track-01",
          "number": 18,
          "slug": "novos-ceus-e-nova-terra",
          "questionCentral": "Como termina a história bíblica e qual é a esperança final do povo de Deus?",
          "primaryTexts": "Apocalipse 21:1-22:5 | Romanos 8:18-25 | 2 Pedro 3:10-13",
          "complementaryReadings": "Isaías 65:17-25 | 1 Coríntios 15:50-58 | Filipenses 3:20-21 | Apocalipse 7:9-17",
          "estimatedTime": "15-18 minutos",
          "objective": "Queremos compreender que: • A esperança final cristã envolve novos céus e nova terra. • Deus não abandona o propósito para o qual criou a humanidade. • A ressurreição faz parte dessa esperança. • A criação também aguarda libertação. • Morte, luto, choro e dor não terão lugar na nova criação. • Deus habitará plenamente com seu povo. • A Bíblia termina recuperando temas que apareceram no início de Gênesis. • A esperança futura não nos torna indiferentes ao presente - ela nos ensina a viver hoje à luz daquilo que Deus fará. Guarde esta verdade O plano de Deus não termina tirando seu povo de uma história perdida. Termina vencendo o mal e fazendo novas todas as coisas.",
          "openingTakeaway": "",
          "editorialStatus": "DRAFT",
          "published": false,
          "runtimeEligible": false,
          "nextStudyId": null,
          "terminal": true,
          "technicalProfile": "TRACK_1_ORIGINAL_V1"
        },
        "sourceDeclaredProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP",
          "CONTINUE_JOURNEY"
        ],
        "expectedProfileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP"
        ],
        "profileMarkers": [
          "PERGUNTA_CENTRAL",
          "OBJETIVO",
          "LEIA",
          "OBSERVE",
          "ENTENDA",
          "APLIQUE",
          "REFLECTION_QUESTIONS",
          "JOURNAL_PROMPT",
          "PRAYER",
          "KEEP"
        ],
        "profileMarkerCount": 10,
        "structuredSectionCount": 8,
        "sections": [
          {
            "key": "LEIA",
            "type": "READ",
            "order": 1,
            "sourceHeading": "LEIA",
            "contentText": "Comece por Apocalipse 21:1-8. Leia sem pressa.\nPerceba as expressões: novo céu, nova terra, Deus com os homens, lágrimas, morte, dor e todas as coisas\nnovas.\nDepois continue em Apocalipse 21:9-22:5. Observe a Nova Jerusalém, a presença de Deus, o Cordeiro, o rio\nda vida, a árvore da vida, o fim da maldição e os servos de Deus diante dele.\nDepois leia Romanos 8:18-25 e pergunte: a criação será simplesmente esquecida ou está aguardando\nlibertação?\nPor fim, leia 2 Pedro 3:10-13 e observe a expectativa de novos céus e nova terra, nos quais habita justiça."
          },
          {
            "key": "OBSERVE",
            "type": "OBSERVE",
            "order": 2,
            "sourceHeading": "OBSERVE",
            "contentText": "• Quem faz novas todas as coisas?\n• Onde Deus passa a habitar com seu povo?\n• O que deixa de existir?\n• O que acontece com a morte?\n• Que elementos de Gênesis reaparecem em Apocalipse 22?\n• Por que a árvore da vida é significativa?\n• Existe ainda maldição?\n• Romanos 8 fala apenas de seres humanos ou também da criação?\n• Que característica marca a nova criação em 2 Pedro 3?\n• A Bíblia termina com distância entre Deus e a humanidade ou com comunhão?"
          },
          {
            "key": "ENTENDA",
            "type": "UNDERSTAND",
            "order": 3,
            "sourceHeading": "ENTENDA",
            "contentText": "1. A história termina com uma nova criação\nApocalipse 21 começa com novo céu e nova terra. Isso se conecta com profecias do Antigo Testamento,\nespecialmente Isaías.\nA Bíblia começou com “No princípio, criou Deus os céus e a terra”. Perto de seu final encontramos\nnovamente céu e terra.\nA história bíblica possui uma direção: Deus criou, o pecado corrompeu, Cristo redime e Deus conduz sua\ncriação para restauração.\nUma grande moldura\nA Bíblia começa com criação e termina com nova criação.\n2. Isso significa que Deus simplesmente jogará fora tudo o que criou?\nAqui precisamos ter cuidado. Existem discussões sobre a relação exata entre a criação presente e os novos\ncéus e nova terra.\n2 Pedro 3 usa linguagem muito forte de fogo, dissolução e juízo. Ao mesmo tempo, Romanos 8 fala da\nprópria criação sendo libertada da escravidão da corrupção.\nA ressurreição também nos ajuda a pensar: o corpo ressuscitado é transformado, mas a pessoa não deixa de\nser quem é para que outra pessoa completamente desconectada apareça.\nPor isso muitos cristãos entendem a nova criação em termos de renovação e transformação profunda, e não\nsimplesmente como Deus desistindo de tudo o que fez para começar algo sem qualquer continuidade.\nO que podemos afirmar com segurança\nDeus não perdeu sua criação para o pecado.\nPARE UM MOMENTO AQUI\nPense nisso.\nTudo aquilo que hoje conhecemos como quebrado - o corpo que envelhece, a terra que geme, a vida que\ntermina, a beleza misturada com sofrimento e a alegria interrompida por despedidas - não representa o\nestado final das coisas.\nEsperança\nNós ainda não vimos a criação do jeito que Deus promete que ela será.\n3. A esperança cristã não é simplesmente “virar espírito e morar nas nuvens”\nEssa imagem é muito comum: uma pessoa morre, ganha asas, senta numa nuvem e toca uma harpa para\nsempre.\nMas essa não é a imagem que o Novo Testamento apresenta como esperança final.\nA Bíblia fala de ressurreição, corpos transformados, nova criação, novo céu e nova terra e Deus habitando\ncom seu povo.\nIsso não significa negar tudo o que a Bíblia diz sobre estar com Cristo após a morte. Esse é outro assunto e\nmerece tratamento próprio.\nFoco deste estudo\nA esperança final é ressurreição e vida na criação restaurada por Deus.\n4. “Eis que faço novas todas as coisas”\nObserve a frase de Apocalipse 21.\nDeus não diz apenas: “Estou preparando um lugar novo.” Ele declara: “Faço novas todas as coisas.”\nA redenção de Deus é maior do que simplesmente retirar indivíduos de um mundo condenado.\nEle está conduzindo a história para uma restauração que alcança aquilo que o pecado feriu.\n5. Romanos 8 mostra uma criação gemendo\nPaulo descreve a criação como se estivesse em dores. Ela foi sujeita à corrupção, mas espera libertação.\nIsso nos ajuda a enxergar que a redenção bíblica possui uma dimensão muito ampla.\nO pecado afetou nossa relação com Deus, conosco, com outras pessoas e com a criação.\nA restauração também é ampla\nDeus não está salvando apenas almas isoladas. Ele está conduzindo sua criação para libertação.\n6. A grande esperança: Deus com seu povo\nTalvez este seja o centro de Apocalipse 21.\nPodemos ficar impressionados com ouro, pedras preciosas, portas, medidas, rios e árvores. Mas o coração\nda visão é maior que a arquitetura.\nO centro da visão\nO tabernáculo de Deus está com os homens.\nDesde o início da Bíblia, a presença de Deus é um tema central.\nNo Éden, Deus e humanidade. Depois do pecado, ruptura. Mais tarde, tabernáculo e templo. Depois, Jesus,\nEmanuel - Deus conosco. Depois, o Espírito habitando no povo de Deus.\nFinalmente, Deus habitando plenamente com seu povo.\nA PRESENÇA DE DEUS ATRAVESSA A BÍBLIA\nÉden\nDeus e a humanidade.\nQueda\nRuptura e expulsão.\nTabernáculo\nDeus habita no meio de Israel.\nTemplo\nA presença de Deus ocupa lugar central na vida do povo.\nJesus\nEmanuel - Deus conosco.\nIgreja\nDeus habita em seu povo pelo Espírito.\nNova criação\nDeus habita plenamente com a humanidade redimida.\nNo final, aquilo que o pecado rompeu é restaurado.\n7. Por que não existe templo na Nova Jerusalém?\nApocalipse 21 faz uma declaração surpreendente: João não vê templo na cidade.\nIsso seria espantoso para alguém acostumado com a importância do templo na história bíblica.\nMas o próprio texto explica: Deus e o Cordeiro são seu templo.\nA razão\nNão existe mais necessidade de um espaço separado que represente a presença divina, porque\na presença de Deus enche a realidade do seu povo.\n8. “Não haverá mais morte”\nTalvez poucas frases consigam carregar tanta esperança.\nApocalipse 21 diz que não haverá mais morte.\nNenhum último suspiro. Nenhuma notícia de falecimento. Nenhum cemitério. Nenhuma despedida\ndefinitiva. Nenhum corpo perdendo forças.\nA morte, que entrou na história e atravessou todas as gerações, finalmente terá terminado.\nO último inimigo\nNo estudo da ressurreição vimos Paulo chamar a morte de último inimigo. Aqui vemos a\nrealidade depois de sua derrota.\n9. Deus enxugará as lágrimas\nApocalipse não trata nossa dor como algo pequeno.\nEle não diz que nunca tivemos motivos para chorar. Houve perdas verdadeiras, feridas verdadeiras e\nsofrimento verdadeiro.\nMas existe uma promessa\nDeus enxugará dos olhos toda lágrima.\nA esperança cristã não ridiculariza a dor presente. Ela afirma: a dor não será eterna.\n10. “Não haverá mais luto, nem pranto, nem dor”\nEssas palavras ganham peso quando lembramos de toda a história humana: hospitais, guerras, violência,\ndoenças, abuso, fome, perseguição, solidão e famílias quebradas.\nApocalipse não promete apenas que aprenderemos a suportar isso para sempre.\nPromete algo maior\nEssas coisas pertencem à antiga ordem que está passando.\n11. A árvore da vida está de volta\nEm Gênesis encontramos a árvore da vida. Depois da queda, o acesso é interrompido.\nAgora vá para Apocalipse 22. A árvore da vida aparece novamente.\nA Bíblia começou com uma árvore da vida num jardim e termina com a árvore da vida na cidade de Deus.\nMas a história não simplesmente volta ao Éden. Entre Gênesis e Apocalipse existe a cruz, o Cordeiro, a\nredenção e um povo de todas as nações.\nO final\nÉ restauração, mas também consumação.\n12. “Nunca mais haverá maldição”\nApocalipse 22 também declara: não haverá mais maldição.\nLembre-se de Gênesis 3. O pecado trouxe consequências para a humanidade, os relacionamentos, o\ntrabalho e a criação.\nUm grande arco bíblico\nGênesis 3: maldição.\nApocalipse 22: nenhuma maldição.\nEntre os dois: Cristo.\n13. E o “mar não existia mais”?\nApocalipse 21:1 afirma que o mar já não existia. Esse detalhe possui diferentes interpretações.\nNa Bíblia e no mundo antigo, o mar frequentemente aparece associado a caos, ameaça, perigo e forças\nhostis. No próprio Apocalipse, a besta surge do mar.\nPor isso muitos intérpretes entendem essa imagem principalmente como sinal de que aquilo que ameaça,\nsepara e se opõe à ordem de Deus desapareceu. Outros entendem a referência de maneira mais literal.\nCuidado editorial\nNão precisamos construir uma doutrina sobre a geografia da nova criação a partir dessa única\nfrase. O centro da visão é o fim do caos e do mal.\n14. E a Nova Jerusalém?\nApocalipse apresenta uma cidade magnífica descendo do céu. Ela também é chamada de Noiva do Cordeiro.\nIsso já nos alerta para o uso de linguagem simbólica.\nA cidade e o povo de Deus aparecem profundamente relacionados na visão. Suas medidas, pedras, portas e\nfundamentos carregam significado.\nMais importante que a planta arquitetônica\nDeus está com seu povo em uma realidade santa, segura, gloriosa e plenamente restaurada.\n15. Haverá povos, atividade e vida\nÀs vezes imaginamos eternidade como uma existência parada, sem nada acontecendo.\nMas Apocalipse 21 e 22 possui linguagem de cidade, nações, reis, serviço e reino.\nOs servos de Deus o servirão e reinarão.\nNão sabemos todos os detalhes de como será a vida na nova criação. A Bíblia não satisfaz toda a nossa\ncuriosidade.\nO quadro geral\nA eternidade com Deus não será uma versão infinitamente longa do nosso cansaço atual. Será\nvida plena diante dele.\n16. Veremos o rosto de Deus\nApocalipse 22:4 contém uma frase pequena e imensa: “Verão o seu rosto.”\nDurante a história bíblica, a santidade de Deus torna esse tema cheio de reverência. Agora o povo redimido\nestá diante dele.\nSem esconder-se. Sem fugir. Sem a vergonha de Gênesis 3.\nO contraste\nPrimeira reação humana depois do pecado: esconder-se de Deus.\nFinal da história: o povo vendo o rosto de Deus.\nDO ESCONDERIJO AO ROSTO DE DEUS\nGênesis 3\nO homem se esconde.\nHistória da redenção\nDeus busca, chama, promete e salva.\nCruz\nCristo abre o caminho da reconciliação.\nApocalipse 22\nO povo vê o rosto de Deus.\nTalvez toda a história possa ser sentida assim\nDe esconder-se de Deus para habitar eternamente em sua presença.\n17. O que significa “novo”?\nNão precisamos imaginar que “novo” significa simplesmente algo estranho, sem qualquer relação com aquilo\nque Deus já fez.\nA Bíblia apresenta continuidade e transformação: nosso corpo será ressuscitado e transformado; a criação\nserá libertada da corrupção.\nTalvez possamos dizer\nNão é menos criação. É criação finalmente livre daquilo que a destrói.\n18. A esperança futura muda nossa maneira de viver hoje\n2 Pedro 3 faz exatamente essa conexão. Depois de falar do futuro, pergunta que tipo de pessoas\ndeveríamos ser.\nA nova criação não deveria nos tornar indiferentes à criação presente.\nA esperança futura nos chama a santidade, justiça, perseverança e fidelidade.\nUma consequência prática\nQuem espera um mundo onde habita justiça deve aprender a amar a justiça agora.\n19. Cuidar da criação também faz sentido\nA Bíblia não transforma a criação em Deus. Nós adoramos o Criador, não a criação.\nMas justamente porque ela pertence a Deus, tratá-la com irresponsabilidade não combina com nossa fé.\nA criação geme e Deus não a despreza. Ela aguarda libertação.\nIsso não significa que conseguiremos construir a nova criação com nossas próprias mãos. A nova criação é\nobra de Deus.\nMas enquanto esperamos, podemos viver como bons administradores daquilo que pertence a Ele.\n20. Nossa esperança não é fugir da vida, mas esperar sua plenitude\nO Evangelho não nos ensina a desprezar corpo, terra, trabalho, relacionamentos, beleza e criação.\nEssas coisas foram feridas pelo pecado, mas não eram más quando Deus as criou.\nA esperança cristã não é\n“Finalmente ficarei livre de tudo que Deus criou.”\nÉ: “Finalmente veremos aquilo que Deus criou livre da corrupção.”\nTODA A TRILHA EM UMA ÚNICA JORNADA\n01 - Criação\nDeus cria.\n02 - Queda\nO pecado entra.\n03 - Primeira esperança\nDeus não abandona.\n04 - Abraão\nBênção para as nações.\n05 - Êxodo\nDeus liberta.\n06 - Lei\nDeus revela sua santidade.\n07 - Sacrifícios\nO pecado precisa ser tratado.\n08 - Davi\nUm Rei é prometido.\n09 - Profetas\nA esperança cresce.\n10 - Jesus\nAs promessas convergem em Cristo.\n11 - Cruz\nCristo morre pelos pecadores.\n12 - Ressurreição\nA morte começa a perder seu domínio.\n13 - Graça e fé\nPecadores são reconciliados com Deus.\n14 - Igreja\nDeus forma um povo.\n15 - Missão\nO Evangelho alcança as nações.\n16 - Volta de Cristo\nO Rei retornará.\n17 - Juízo\nO mal não permanecerá.\n18 - Nova criação\nDeus faz novas todas as coisas.\nEssa é a grande história que começamos a enxergar.\nO QUE APRENDEMOS SOBRE DEUS?\nDepois de dezoito estudos, talvez possamos olhar para trás e dizer que Deus é Criador, santo, justo,\nmisericordioso, fiel, Redentor e Rei.\nEle não abandonou aquilo que criou. Não desistiu quando a humanidade caiu. Não perdeu o controle\nquando reis falharam. Não esqueceu suas promessas.\nEntrou na história em Cristo, enfrentou o pecado, venceu a morte e promete concluir aquilo que começou.\nUma grande conclusão\nA Bíblia não conta a história de um Deus tentando salvar um plano que deu errado. Conta a\nhistória de um Deus fiel conduzindo seu propósito até o fim.\nO QUE APRENDEMOS SOBRE NÓS?\nFomos criados para Deus. O pecado nos afastou. Não conseguimos nos salvar. Precisamos de graça.\nSomos chamados a crer, arrepender-nos, seguir Cristo, viver em comunidade, amar, servir, testemunhar e\nesperar.\nNossa história não precisa terminar onde o pecado nos encontrou.\nEm Cristo\nExiste reconciliação. E para os que pertencem a Ele existe uma esperança que atravessa até a\nmorte."
          },
          {
            "key": "APLIQUE",
            "type": "APPLY",
            "order": 4,
            "sourceHeading": "APLIQUE À VIDA",
            "contentText": "1. Não deixe o sofrimento presente definir o final da história\nExistem capítulos muito difíceis. Talvez você esteja vivendo um deles.\nMas capítulo não é livro inteiro.\nA esperança cristã\nNão diz que sua dor é pequena. Diz que ela não é definitiva.\n2. Valorize a presença de Deus acima de todas as outras promessas\nÉ possível sonhar com céu apenas como um lugar sem problemas.\nMas a maior promessa de Apocalipse é: Deus estará com seu povo.\nA eternidade é maravilhosa porque Ele está lá.\n3. Comece a viver hoje como cidadão do mundo que Deus prometeu\nSe o futuro é marcado por justiça, santidade, comunhão, adoração e vida, então essas coisas já devem\ncomeçar a moldar nossa caminhada.\nNão perfeitamente. Mas verdadeiramente.\n4. Não transforme a esperança futura em fuga do presente\nAinda existem pessoas para amar, feridos para cuidar, Evangelho para anunciar, injustiças para enfrentar,\nfamília para servir e trabalho para fazer.\nEnquanto esperamos novos céus e nova terra, permanecemos fiéis na terra onde Deus nos colocou hoje.\n5. Quando tudo parecer perdido, lembre-se do último capítulo\nEssa talvez seja uma das maiores bênçãos de conhecer o final bíblico.\nNós sabemos que a morte não vence, Satanás não vence, o pecado não vence, a injustiça não vence e a dor\nnão vence.\nNo final\nDeus vence. E seu povo estará com Ele."
          },
          {
            "key": "REFLECTION_QUESTIONS",
            "type": "REFLECTION_QUESTIONS",
            "order": 5,
            "sourceHeading": "PARA REFLETIR",
            "contentText": "• Como eu imaginava a esperança cristã antes deste estudo?\n• Tenho pensado na eternidade apenas como “ir para o céu” ou compreendo melhor a esperança da\nressurreição e nova criação?\n• Qual aspecto de Apocalipse 21-22 mais toca meu coração?\n• Existe alguma dor presente que preciso enxergar à luz da promessa de restauração?\n• O que significa para mim saber que Deus habitará com seu povo?\n• Minha esperança futura está produzindo fidelidade hoje?\n• Existe algo nesta criação que passei a valorizar mais ao perceber que ela pertence a Deus?\n• Depois desta trilha, como minha visão da história bíblica mudou?"
          },
          {
            "key": "JOURNAL_PROMPT",
            "type": "JOURNAL_PROMPT",
            "order": 6,
            "sourceHeading": "Registrar no Diário",
            "contentText": "Depois de percorrer esta Jornada, qual verdade sobre Deus mais transformou a maneira como\nenxergo minha própria história?"
          },
          {
            "key": "PRAYER",
            "type": "PRAYER",
            "order": 7,
            "sourceHeading": "ORE",
            "contentText": "Oração sugerida\nSenhor, chegamos ao final desta Jornada olhando para aquilo que tu prometeste fazer.\nObrigado porque o pecado não terá a última palavra, a morte não vencerá e nenhuma lágrima\nserá eterna. Obrigado porque em Cristo abriste o caminho de volta para tua presença.\nEnquanto espero o dia em que farás novas todas as coisas, ensina-me a viver com esperança,\nsantidade, amor e fidelidade. Quando eu sofrer, lembra-me do final da história. Quando eu me\nafastar, chama-me novamente para perto. E que o maior desejo do meu coração não seja\napenas receber tuas bênçãos, mas estar contigo para sempre. Amém."
          },
          {
            "key": "KEEP",
            "type": "KEEP",
            "order": 8,
            "sourceHeading": "PARA GUARDAR",
            "contentText": "Apocalipse 21:3-5\nLeia esses versículos lentamente.\nObserve: Deus habita com seu povo. Ele enxuga as lágrimas. A morte acaba. A dor acaba. Ele faz novas\ntodas as coisas.\nDepois leia Apocalipse 22:3-4.\nO contraste final\nGênesis: maldição e humanidade escondendo-se de Deus.\nApocalipse: nenhuma maldição e o povo vendo o rosto de Deus.\nAdicionar aos Favoritos\nGuarde Apocalipse 21:3-5 e Apocalipse 22:3-4 como síntese da esperança final."
          }
        ],
        "terminalCompletion": {
          "sourceHeading": "TRILHA 1 CONCLUÍDA",
          "contentText": "O PLANO ETERNO DE DEUS\nForam 18 estudos atravessando a Bíblia de Gênesis a Apocalipse.\nO objetivo nunca foi conhecer cada detalhe da Escritura de uma só vez. Foi construir um mapa para\nenxergar como criação, queda, promessa, redenção, Cristo, Igreja, missão, juízo e nova criação fazem parte\nde uma mesma grande história.\nNo centro dessa história\nJesus Cristo.\nMarco da Jornada\nTRILHA 1 COMPLETA - 18/18 ESTUDOS\nConcluir esta trilha não significa terminar os estudos. Agora podemos aprofundar aquilo que acabamos de\nconhecer.\nA próxima trilha será:\nTRILHA 2 - CONHECENDO DEUS\nDepois de acompanhar aquilo que Deus fez ao longo da história, vamos fazer uma pergunta ainda mais\nfundamental: Quem é esse Deus?\nPRÓXIMA TRILHA\nNa Trilha 2 estudaremos temas como quem Deus é, santidade, amor, justiça, misericórdia, fidelidade,\nsoberania, presença, como Deus se revela e o que significa realmente conhecê-lo.\nPorque conhecer a história de Deus é importante\nMas a Jornada nos chama para algo ainda mais profundo: conhecer o próprio Deus da história.",
          "trackCompleted": 1,
          "completedStudyCount": 18,
          "nextTrackId": "track-02",
          "nextTrackTitle": "Conhecendo Deus"
        },
        "sourceAppendix": {
          "heading": "REFERÊNCIAS BÍBLICAS UTILIZADAS",
          "contentText": "Textos principais\nApocalipse 21:1-22:5\nRomanos 8:18-25\n2 Pedro 3:10-13\nConexões\nIsaías 65:17-25\n1 Coríntios 15:50-58\nFilipenses 3:20-21\nApocalipse 7:9-17\nNOTA EDITORIAL\n• A esperança cristã final foi apresentada em termos de ressurreição e nova criação, conforme o conjunto dos\ntextos utilizados.\n• Não negamos a discussão bíblica sobre o estado entre a morte e a ressurreição; apenas distinguimos esse\nassunto da esperança final tratada aqui.\n• A relação entre a criação presente e os novos céus e nova terra foi apresentada com cautela, reconhecendo\ntanto a linguagem de juízo de 2 Pedro 3 quanto a linguagem de libertação de Romanos 8.\n• Não afirmamos que cada detalhe simbólico da Nova Jerusalém corresponda necessariamente a uma\nestrutura arquitetônica literal.\n• A expressão “o mar já não existe” foi tratada reconhecendo diferentes leituras e o forte simbolismo do mar\ndentro de Apocalipse.\n• A árvore da vida, ausência de maldição e presença de Deus foram conectadas a Gênesis porque essa\nconexão é construída pelo próprio vocabulário e estrutura final da narrativa bíblica.\n• A nova criação não foi apresentada como resultado do progresso humano, mas como obra definitiva de\nDeus.\n• A esperança futura foi ligada à fidelidade presente, conforme 2 Pedro 3 e o restante do Novo Testamento.\nSTATUS EDITORIAL\nTrilha\nO Plano Eterno de Deus\nEstudo\n18/18 - Novos céus e nova terra: quando Deus fizer novas todas as coisas\nVersão\nRascunho 1 para revisão"
        },
        "normalization": {
          "removedForbiddenControlCharCount": 0,
          "removedPageHeaderLineCount": 60
        },
        "canonicalSource": {
          "lineCount": 414,
          "sha256": "0696C6D94DE061B8C4CB8E646354AEA9C7DAF50116E6625640A1B58B88C706FB",
          "preambleLines": [
            "TRILHA 1 | O PLANO ETERNO DE DEUS",
            "18 - Novos céus e nova terra: quando Deus fizer",
            "novas todas as coisas"
          ]
        },
        "continuity": {
          "expectedNextStudyNumber": null,
          "detectedNextStudyNumber": null,
          "nextStudyId": null,
          "terminal": true,
          "evidenceKind": "TRACK_COMPLETION_TO_NEXT_TRACK",
          "valid": true
        },
        "quality": {
          "forbiddenControlCharCount": 0,
          "pageHeaderLeakCount": 0,
          "questionSemanticLeakCount": 0,
          "objectiveSemanticLeakCount": 0,
          "continueAppendixLeakCount": 0,
          "profileMarkerSetMatch": true,
          "structuredSectionCountMatch": true,
          "nextStudyIdValid": true,
          "terminalCompletionValid": true
        }
      },
    }
  ] as readonly Track01DraftCandidateSource[],
} as const;

export const track01DraftStudies = TRACK_01_DRAFT_BATCH_INTEGRATION.candidates;
export type Track01DraftBatchIntegration = typeof TRACK_01_DRAFT_BATCH_INTEGRATION;
