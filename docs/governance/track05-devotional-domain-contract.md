# Jornada Bíblica — Contrato de Domínio dos Devocionais da Trilha 5

## 1. Status e escopo

- Fase: `P17-P17C-A2-A3-A18-A14-A1-T5`
- Natureza: contrato oficial de arquitetura
- Domínio: Devocionais da Trilha 5
- Implementação de source autorizada nesta etapa: **não**
- Alteração de banco/migrations autorizada nesta etapa: **não**
- Runtime/release/UI autorizados nesta etapa: **não**
- Alteração de conteúdos autorais ou curadorias: **não**
- Publicação: **não autorizada**
- Staging/commit/push: **não autorizados**

Este documento congela a arquitetura aprovada para permitir implementação posterior controlada. Ele não integra conteúdo, não publica Devocionais e não altera o domínio atual de Estudos.

## 2. Decisão arquitetural central

Os **Devocionais** constituem um domínio próprio, paralelo ao domínio `Study`.

A Trilha 5 continua sendo o local editorial em que Estudos e Devocionais convivem para o usuário, porém isso não transforma um Devocional em Study.

Regras invariantes:

1. `StudyContentPackage` continua exclusivo de conteúdos classificados como **Estudo**.
2. Um Devocional possui `DevotionalId` próprio.
3. Nenhum Devocional deve receber `StudyId` apenas para reutilizar infraestrutura de Study.
4. Nenhum progresso devocional deve ser persistido em `personal_study_progress`.
5. Nenhuma navegação devocional deve depender da rota `StudyDetail`.
6. Nenhum Diário originado de Devocional deve ser gravado como `sourceType: "STUDY"`.
7. Favoritos podem reutilizar a infraestrutura genérica de favoritos, mas precisam de um target explícito `devotional`.
8. Release e runtime de Devocionais devem permanecer separados dos equivalentes de Study.
9. Integrações comuns devem ocorrer por contratos/adaptadores explícitos, sem apagar as fronteiras entre os domínios.

## 3. Relação com a Trilha 5

A apresentação conceitual da Trilha 5 passa a ser:

```text
TRILHA 5
├── ESTUDOS
│   └── StudyContentPackage
└── DEVOCIONAIS
    └── DevotionalContentPackage
        ├── OPEN_LETTER
        └── REFLECTION
```

Nesta fase, essa hierarquia é **arquitetural**. Ela não autoriza alteração do título público da Trilha 5, da tela, dos cards ou da navegação existente.

O vínculo do Devocional com a Trilha 5 será representado no domínio devocional sem reutilizar o branded type `StudyTrackId`. A implementação deverá usar uma colocação editorial própria e explícita, inicialmente restrita à Trilha 5.

## 4. Identidade de domínio

Contrato alvo:

```ts
declare const devotionalIdBrand: unique symbol;
declare const devotionalBlockIdBrand: unique symbol;

export type DevotionalId = string & {
  readonly [devotionalIdBrand]: "DevotionalId";
};

export type DevotionalBlockId = string & {
  readonly [devotionalBlockIdBrand]: "DevotionalBlockId";
};

export type DevotionalContentType = "DEVOTIONAL";

export type DevotionalFormat =
  | "OPEN_LETTER"
  | "REFLECTION";

export type DevotionalTrackPlacement = "TRACK_05";
```

### 4.1 Formatos iniciais

`OPEN_LETTER`
: Carta aberta de caráter pastoral, evangelístico, formativo, exortativo ou reflexivo. Preserva o fluxo natural de uma carta e não exige as seções pedagógicas de um Study.

`REFLECTION`
: Reflexão/devocional de estrutura livre, normalmente mais curta e meditativa, podendo incluir aplicação, perguntas e oração quando isso for coerente com o material.

Novos formatos não devem ser adicionados silenciosamente. Qualquer novo valor em `DevotionalFormat` exige decisão de governança e validação contra conteúdo real.

## 5. Pacote de conteúdo

Contrato alvo:

```ts
export type DevotionalContentPackage = Readonly<{
  id: DevotionalId;

  contentType: "DEVOTIONAL";
  format: DevotionalFormat;
  placement: DevotionalTrackPlacement;

  title: string;
  subtitle: string | null;
  summary: string | null;
  audience: string | null;

  author: DevotionalAuthorIdentity;

  heroImage: string | null;

  blocks: readonly DevotionalBlock[];
  bibleReferences: readonly DevotionalBibleReference[];

  reflectionPrompt: string | null;

  governance: DevotionalGovernance;
  source: DevotionalSourceMetadata;
}>;
```

### 5.1 Regras

- `title`, `author`, `blocks`, `governance` e `source` são estruturais.
- `subtitle`, `summary`, `audience`, `heroImage` e `reflectionPrompt` são opcionais por natureza editorial.
- Campo opcional não deve ser preenchido com texto inventado apenas para completar o modelo.
- A ordem dos blocos deve preservar o fluxo editorial aprovado.
- A adaptação Jornada não pode transformar uma Carta Aberta em Estudo.
- A curadoria pode estruturar a leitura, mas não pode atribuir ao autor ideias que não estejam no material original.
- Inclusões editoriais devem ser identificáveis como intervenção editorial quando necessário.

## 6. Modelo flexível por blocos

Contrato inicial:

```ts
export type DevotionalBlock =
  | DevotionalHeadingBlock
  | DevotionalParagraphBlock
  | DevotionalBibleReferenceBlock
  | DevotionalScriptureQuoteBlock
  | DevotionalListBlock
  | DevotionalCalloutBlock
  | DevotionalReflectionQuestionBlock
  | DevotionalPrayerBlock
  | DevotionalActionBlock;
```

Tipos iniciais:

```ts
export type DevotionalHeadingBlock = Readonly<{
  id: DevotionalBlockId;
  kind: "HEADING";
  level: 2 | 3;
  text: string;
}>;

export type DevotionalParagraphBlock = Readonly<{
  id: DevotionalBlockId;
  kind: "PARAGRAPH";
  text: string;
}>;

export type DevotionalBibleReferenceBlock = Readonly<{
  id: DevotionalBlockId;
  kind: "BIBLE_REFERENCE";
  reference: DevotionalBibleReference;
}>;

export type DevotionalScriptureQuoteBlock = Readonly<{
  id: DevotionalBlockId;
  kind: "SCRIPTURE_QUOTE";
  reference: DevotionalBibleReference;
  sourceText: string | null;
}>;

export type DevotionalListBlock = Readonly<{
  id: DevotionalBlockId;
  kind: "LIST";
  style: "BULLET" | "NUMBERED";
  items: readonly string[];
}>;

export type DevotionalCalloutBlock = Readonly<{
  id: DevotionalBlockId;
  kind: "CALLOUT";
  role: "AUTHOR_EMPHASIS" | "EDITORIAL_NOTE";
  text: string;
}>;

export type DevotionalReflectionQuestionBlock = Readonly<{
  id: DevotionalBlockId;
  kind: "REFLECTION_QUESTION";
  prompt: string;
}>;

export type DevotionalPrayerBlock = Readonly<{
  id: DevotionalBlockId;
  kind: "PRAYER";
  text: string;
}>;

export type DevotionalActionBlock = Readonly<{
  id: DevotionalBlockId;
  kind: "ACTION";
  text: string;
}>;
```

### 6.1 Regra de flexibilidade

Nenhum formato deve ser obrigado a possuir todos os tipos de bloco.

Exemplos:

- uma Carta Aberta pode conter predominantemente `PARAGRAPH`, `HEADING` e referências;
- uma Reflexão pode terminar com `REFLECTION_QUESTION`, `PRAYER` ou `ACTION`;
- oração só existe quando fizer sentido no material aprovado;
- pergunta reflexiva não é obrigatória;
- aplicação não é obrigatória;
- nota editorial jamais deve ser apresentada como texto do autor.

## 7. Referências bíblicas

Contrato alvo:

```ts
export type DevotionalBibleReference = Readonly<{
  bookId: string;
  startChapter: number;
  startVerse: number | null;
  endChapter: number | null;
  endVerse: number | null;
}>;
```

Diretrizes:

1. A referência estruturada deve ser a fonte canônica para integração com o leitor bíblico.
2. O domínio Devocional pode possuir resolver próprio e reutilizar contratos comuns de Bíblia, mas não deve depender de um resolver específico de Study.
3. Texto bíblico exibido pelo app deve respeitar a estratégia de versão bíblica e licenciamento já adotada pelo projeto.
4. `sourceText` em `SCRIPTURE_QUOTE` existe apenas para preservar, quando necessário, texto presente no material-fonte; sua exibição pública depende da revisão editorial/licenciamento aplicável.
5. Citações e interpretações não devem ser corrigidas silenciosamente durante intake.

## 8. Autoria

A identidade interna do autor e a autorização de exposição pública são conceitos diferentes.

Contrato alvo:

```ts
export type DevotionalPublicDisplayAuthorization =
  | "UNRESOLVED"
  | "AUTHORIZED"
  | "DENIED";

export type DevotionalPublicAuthorProfile = Readonly<{
  displayName: string;
  role: string | null;
  formation: string | null;
  cityState: string | null;
}>;

export type DevotionalAuthorIdentity = Readonly<{
  canonicalName: string;

  publicProfile: DevotionalPublicAuthorProfile;

  publicDisplayAuthorization: DevotionalPublicDisplayAuthorization;
}>;
```

Regras:

- `canonicalName` identifica internamente o autor.
- `publicProfile` representa o perfil pretendido para exibição.
- `publicDisplayAuthorization` é gate independente.
- Resolver a identidade interna não autoriza publicação do nome.
- `UNRESOLVED` não pode ser interpretado como autorização implícita.
- Dados ausentes não devem ser inventados.

## 9. Governança e elegibilidade de publicação

Contrato alvo:

```ts
export type DevotionalReviewState =
  | "PENDING"
  | "APPROVED";

export type DevotionalPublicationAuthorization =
  | "PENDING"
  | "AUTHORIZED";

export type DevotionalEditorialStatus =
  | "DRAFT"
  | "PUBLISHED";

export type DevotionalGovernance = Readonly<{
  editorialStatus: DevotionalEditorialStatus;

  contentReview: DevotionalReviewState;
  theologicalReview: DevotionalReviewState;

  publicDisplayAuthorization: DevotionalPublicDisplayAuthorization;
  publicationAuthorization: DevotionalPublicationAuthorization;
}>;
```

`runtimeEligible` deve ser **derivado**, não usado para esconder gates ausentes.

Regra de elegibilidade:

```text
editorialStatus == PUBLISHED
AND contentReview == APPROVED
AND theologicalReview == APPROVED
AND publicDisplayAuthorization == AUTHORIZED
AND publicationAuthorization == AUTHORIZED
=> runtimeEligible
```

Qualquer condição diferente implica `runtimeEligible = false`.

Esta regra não publica conteúdo por si mesma. Ela apenas define o contrato que uma futura implementação deve obedecer.

## 10. Proveniência e metadados de fonte

Contrato alvo:

```ts
export type DevotionalSourceKind =
  | "AUTHORIAL"
  | "COLLABORATIVE";

export type DevotionalSourceMetadata = Readonly<{
  sourceKind: DevotionalSourceKind;

  originalTitle: string;
  receivedAs: string | null;

  sourceFileName: string | null;
  sourceSha256: string | null;

  curatorNotes: readonly string[];
}>;
```

Diretrizes:

- `receivedAs` preserva como o material foi apresentado originalmente, por exemplo "devocional" ou "carta aberta".
- `sourceSha256` é usado quando houver arquivo-fonte formal relockado.
- `curatorNotes` é interno e não deve aparecer automaticamente ao leitor.
- A proveniência deve permitir distinguir texto original, adaptação editorial e observação de curadoria.

## 11. Progresso próprio

O progresso de Study atualmente é específico de `StudyId`/`StudySectionId`. Devocionais terão contrato próprio.

Contrato alvo:

```ts
export type DevotionalProgressState =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED";

export type DevotionalProgress = Readonly<{
  devotionalId: DevotionalId;

  state: DevotionalProgressState;

  lastBlockId: DevotionalBlockId | null;
  readingProgress: number;

  startedAt: PersonalUtcTimestamp | null;
  lastOpenedAt: PersonalUtcTimestamp | null;
  completedAt: PersonalUtcTimestamp | null;
}>;
```

Regras:

- `readingProgress` permanece entre 0 e 100.
- o progresso não será gravado em `personal_study_progress`;
- implementação posterior deve possuir repository/service próprios ou um adapter genérico cuja persistência continue distinguindo os tipos de conteúdo;
- `StudyProgressService` não deve receber `DevotionalId`;
- a tela geral de Progresso poderá futuramente agregar ambos os domínios no nível de apresentação.

Nenhuma tabela ou migration é criada por esta decisão.

## 12. Favoritos

A infraestrutura atual de Favoritos já trabalha com targets discriminados e persistência por `target_kind` + `target_key`.

Extensão futura aprovada conceitualmente:

```ts
export type DevotionalFavoriteTarget = Readonly<{
  kind: "devotional";
  devotionalId: DevotionalId;
}>;
```

A união `FavoriteTarget` poderá futuramente incluir `DevotionalFavoriteTarget`.

Requisitos para a implementação futura:

- atualizar `FAVORITE_TARGET_KINDS`;
- atualizar codec de target key;
- atualizar validação/repository;
- atualizar UI de Favoritos;
- manter compatibilidade com targets existentes;
- preservar contexto de origem quando uma referência bíblica for favoritada a partir de um Devocional.

A infraestrutura genérica pode ser reutilizada; não deve ser criado um sistema paralelo de Favoritos sem necessidade.

## 13. Diário

Devocionais terão origem própria no Diário.

Contrato futuro:

```ts
export type DevotionalJournalSourceContext = Readonly<{
  sourceType: "DEVOTIONAL";
  devotionalId: string;
  sourceTitleSnapshot: string;
}>;
```

O fluxo futuro deve possuir operação própria equivalente a:

```ts
createDevotionalDraft(input)
```

Regras:

- não usar `createStudyDraft` para Devocionais;
- não gravar `sourceType: "STUDY"` para uma reflexão originada de Devocional;
- adicionar `DEVOTIONAL` a `JournalSourceType` somente na fase autorizada;
- atualizar schema/migration SQLite quando necessário, porque o source type persistido é validado pelo domínio e pelo banco;
- manter referências bíblicas e snapshots coerentes com o comportamento atual do Diário;
- manter a postura de privacidade local já definida para o Diário.

Nenhuma alteração de Diário ou banco ocorre nesta fase.

## 14. Navegação

Devocionais terão rota própria.

Contrato alvo:

```ts
DevotionalDetail: Readonly<{
  devotionalId: string;
  returnToFavorites?: boolean;
}>;
```

Regras:

- a rota deve transportar somente o identificador e estado mínimo de navegação;
- o conteúdo deve ser resolvido pelo catálogo/runtime apropriado;
- não transportar o objeto completo do Devocional nos params;
- não reutilizar `StudyDetail`;
- a rota poderá viver no navigator da área de Estudos/Trilha 5 no nível de apresentação, sem transformar seu parâmetro em `StudyId`.

## 15. Release

Devocionais terão release próprio.

Estrutura alvo:

```text
src/devotionals/release/
└── devotionalReleaseManifest.ts
```

Responsabilidades:

- declarar quais Devocionais estão autorizados a participar do runtime;
- rejeitar conteúdo `DRAFT`;
- aplicar os gates de governança;
- não importar automaticamente qualquer conteúdo presente em `content/`;
- não alterar `studyReleaseManifest.ts` para armazenar Devocionais.

## 16. Runtime

Devocionais terão catálogo próprio.

Estrutura alvo:

```text
src/devotionals/runtime/
├── devotionalRuntimeCatalog.ts
└── devotionalBibleReferenceResolver.ts
```

Responsabilidades:

- expor somente itens release/runtime elegíveis;
- localizar por `DevotionalId`;
- preservar formato editorial;
- resolver referências bíblicas por contrato adequado;
- não registrar `DevotionalId` em `studyRuntimeCatalog`;
- permitir adaptação posterior para uma UI comum da Trilha 5 sem mesclar domínios internamente.

## 17. Organização de source futura

Estrutura inicial aprovada para implementação posterior:

```text
src/
├── domain/
│   └── devotionals/
│       ├── devotional.ts
│       └── devotionalProgress.ts
│
└── devotionals/
    ├── content/
    │   ├── devotionalContentPackage.ts
    │   └── devotionalContentValidator.ts
    ├── release/
    │   └── devotionalReleaseManifest.ts
    └── runtime/
        ├── devotionalRuntimeCatalog.ts
        └── devotionalBibleReferenceResolver.ts
```

Arquivos adicionais somente deverão ser criados se a implementação real demonstrar necessidade e estiverem dentro de uma autorização posterior.

## 18. Relação com os três materiais de referência

Os três conteúdos reais utilizados para validar o desenho são:

### 18.1 Efeito Mulher Samaritana

- domínio: `DEVOTIONAL`;
- formato de referência: `REFLECTION`;
- permanece na Trilha 5;
- não é `Study`;
- não está autorizado para runtime/publicação nesta decisão.

### 18.2 Jesus, o Cordeiro de Deus

- domínio: `DEVOTIONAL`;
- formato de referência: `OPEN_LETTER`;
- natureza autoral;
- não possui intake técnico nesta decisão;
- não está autorizado para runtime/publicação nesta decisão.

### 18.3 Carta Aberta a Pais de Adolescentes

- domínio: `DEVOTIONAL`;
- formato de referência: `OPEN_LETTER`;
- natureza colaborativa;
- não possui intake técnico nesta decisão;
- não está autorizado para runtime/publicação nesta decisão.

As classificações acima servem para provar que a arquitetura suporta conteúdos reais distintos. A integração de cada material exige fase própria de curadoria/intake.

## 19. Compatibilidade com o domínio Study

A implementação futura deve preservar integralmente:

- `StudyId`;
- `StudyTrackId`;
- `StudyContentPackage`;
- `StudyProgress`;
- `StudyProgressRepository`;
- `StudyProgressService`;
- `personal_study_progress`;
- `StudyDetail`;
- `studyReleaseManifest`;
- `studyRuntimeCatalog`;
- testes e contratos existentes.

O domínio Devocional não é uma migração do domínio Study.

## 20. Estratégia de integração futura

A ordem recomendada para implementação é:

```text
A14-A2  Fundação de tipos e validator de Devocional
   ↓
A14-A3  Contrato de progresso/persistência
   ↓
A14-A4  Favoritos + codec/origem
   ↓
A14-A5  Diário DEVOTIONAL
   ↓
A14-A6  Release + runtime
   ↓
A14-A7  Navegação e tela
   ↓
A14-A8  Intake controlado de Devocional real
   ↓
A14-A9  Validação física e fechamento
```

Essa ordem é uma direção arquitetural. Cada mutação continua dependendo de autorização explícita e de relock do baseline.

## 21. Gates da futura implementação

Toda implementação Devocional deverá manter:

- fail-closed;
- branch atual explicitamente validada;
- staging zero antes da mutação;
- escopo exato de arquivos;
- candidatos completos antes da escrita;
- rollback byte-exact quando aplicável;
- TypeScript;
- testes dirigidos;
- regressão;
- ESLint;
- `git diff --check`;
- relock final;
- nenhum staging/commit/push sem autorização específica;
- teste físico antes do fechamento final da Fase 17 quando houver alteração de runtime/UI.

## 22. Referências técnicas externas

Este contrato foi confrontado com documentação oficial para confirmar duas escolhas de modelagem:

- TypeScript suporta tagged/discriminated unions com narrowing por propriedade discriminante, base usada para `DevotionalFormat`, `DevotionalBlock` e targets.
- React Navigation recomenda parâmetros tipados e o envio de informação mínima, como IDs, em vez do objeto completo, base usada para `DevotionalDetail`.

Referências consultadas:

- TypeScript Handbook / release notes — Tagged union types:
  `https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html`
- React Navigation — Type checking with TypeScript:
  `https://reactnavigation.org/docs/typescript/`
- React Navigation — Passing parameters to routes:
  `https://reactnavigation.org/docs/params/`

## 23. Estado ao final deste contrato

Ao concluir `P17-P17C-A2-A3-A18-A14-A1-T5`:

- arquitetura Devocional: **definida e registrada**;
- implementação TypeScript: **não realizada**;
- banco/migrations: **não alterados**;
- Favoritos: **não alterados**;
- Diário: **não alterado**;
- navegação/UI: **não alteradas**;
- release/runtime: **não alterados**;
- conteúdos/curadorias: **não alterados**;
- publicação: **não autorizada**;
- staging/commit/push: **não realizados**.

O próximo passo técnico somente poderá iniciar mediante nova autorização explícita.

---

## Adendo de reconciliação — 04/10/2026 — checkpoint A16

Este adendo registra as etapas posteriores comprovadas, preservando integralmente a decisão histórica acima. Os estados de não implementação/publicação do texto original descrevem aquela etapa e não devem ser lidos como o estado atual do app.

- Branch: `feature/fase-17-studies`.
- HEAD: `13d17d6dfa28207a2e906a64c58530a69006246f`.
- Checkpoint comprovado: `A16_TRACK01_TEST_CONTRACT_FIX`, em **78 dirty / 0 staged**.
- Trilha 5 integrada ao app: **9 estudos e 3 devocionais**; catálogo de estudos com 84 itens.
- IDs, conteúdo autoral, curadorias e assets foram preservados nas correções A14-R5/R6 e A16. Os perfis públicos receberam somente os ajustes de identidade/localidade confirmados pelo usuário em A14-R5/R6; A16 preservou esses perfis.
- A16 alterou somente `tests/studyTrack01DraftBatch.test.ts`; source canônico e conteúdo Track01 permaneceram congelados.
- TypeScript e ESLint: exit 0; pertinentes: **121/121, 11 suítes**; regressão completa: **909/909, 97 suítes, exit 0**.
- A única falha histórica Track01 foi resolvida na expectativa do teste, preservando a igualdade exata dos blocos originais e do fallback de parágrafo.
- Os outros 475 arquivos inventariados e o índice Git permaneceram byte a byte iguais; o único novo caminho dirty foi o teste Track01.

### Aceitação e encerramento

Os heroes dos três devocionais foram aprovados visualmente pelo usuário. Os demais fluxos manuais foram aprovados por sua declaração de 03/10/2026, cuja única ressalva foram as localidades dos estudos 03, 04, 05, 07, 08 e 09. A A14-R6 aplicou Rondonópolis/MT nesses seis cards. Em 04/10/2026, o usuário confirmou que todos estão corretos, concluindo a aceitação visual por sua declaração. Aparelho e versão do Android não foram informados.

Esta reconciliação registra a implementação validada e não constitui encerramento formal de F17. A aceitação manual está concluída por declaração; o fechamento depende da reconciliação documental, da auditoria final e do procedimento governado P17-P17. Staging, commit, push e merge continuam sem autorização neste escopo. Não foram realizadas instalações, builds nativos, ADB ou operações diretas no banco/estado do usuário por A16. F18 não foi iniciada.

### Evidência

- Relatório: `P17-P17C-A2-A3-A18-A14-A8-A7-A16-TRACK01-TEST-CONTRACT-FIX.txt`.
- SHA256: `99A44AAF1F88140604B71DA6FC84BFB0BE7D8F17618BAAF699A1448195716DBF`.
- Pasta: `C:\Users\Marcio\Downloads\JB-F17-A16-20261004-140623-09934b5f`.
- Hash do teste validado: `30B422D26D9EACEF16310BE3DE312A5E583A6C188219D0018E48E62FF3A0E92A`.

O inventário do checkpoint A16 foi derivado do checkpoint A14-R6 validado e do único pós-hash A16, com as igualdades confirmadas pelo relatório Windows. Não houve nova execução de testes durante a reconciliação externa dessas evidências.

### Fronteiras de domínio preservadas

Os três materiais estão integrados como Devocionais próprios: Efeito Mulher Samaritana, Jesus, o Cordeiro de Deus e Carta Aberta a Pais de Adolescentes. Seus contratos de conteúdo, progresso, Favoritos, Diário, release/runtime e navegação permanecem distintos dos de Study. Os contratos implementados e suas integrações estão abrangidos pela regressão de 909 testes aprovada na A16; este adendo não altera esses contratos nem sua persistência.

## Reconciliação final A19-R2 / auditoria A20 — 04/10/2026

Este adendo atualiza o checkpoint técnico após a A17; preserva integralmente os registros históricos acima e não constitui encerramento formal de F17.

- Branch: `feature/fase-17-studies`; HEAD: `13d17d6dfa28207a2e906a64c58530a69006246f`.
- Checkpoint real A19-R2: 77 dirty / 0 staged, 45 tracked modificados, 32 untracked e 476 arquivos inventariados. O Plano voltou aos bytes de HEAD; a Trilha 5 continua denominada **Estudos Colaborativos**.
- A19-R2 aprovada no Windows: TypeScript e ESLint com exit 0, regressão completa 910/910 em 97 suítes, testes pertinentes 122/122 em 11 suítes e diff check aprovado. Os 909 casos anteriores foram preservados; um teste protege o convite público da Trilha 4 ao primeiro estudo real de Michael.
- Catálogo atual: 84 estudos publicados em seis trilhas; Trilha 5 com nove estudos e três devocionais. Permanecem as identidades autorais, cidades/UF e o aceite manual dos heroes, leitores e estudos confirmado pelo usuário.
- A19-R2 alterou exclusivamente os três alvos autorizados; os outros 473 arquivos, bytes do índice, conteúdo semântico do índice e refs locais foram preservados. Backup e relock passaram; não houve rollback, instalação, build, banco/estado pessoal ou escrita Git.
- Evidência R2: `P17-P17C-A2-A3-A18-A14-A8-A7-A19-R2-CONTROLLED-CLOSURE-FIXES.txt`; SHA256 `958FCF3B35BC810504255F8013265715F395FA3C62839A74F405AE6334979DB5`.
- O pacote `closure-final.zip` recebido na A20 foi conferido: SHA256 `98CDAEA3A2BFC063F12E5C7593A86003F60AEDE05BD2CBDC0A2BEF419162375C`. O manifesto final tem SHA256 `96D543897DDBEDCAD406F91CD7D9A152CAA01D4A7EDDD8493DB44D29684E7426`; os sidecars, o inventário e as 97 leituras Git com preservação do índice conferem.
- A20 revisou o diff líquido completo contra main local: 130 caminhos tracked e 32 untracked, total 162, incluindo os 15 commits anteriores. São 116 caminhos de texto e 46 PNGs identificados por metadados/hashes. Não foi identificado novo bloqueador de source na revisão; os achados A18-F01/F02 foram resolvidos pela A19-R2. Não houve nova edição ou execução do app nesta auditoria.
- O gate E2E P17-P15 foi recuperado do fechamento de 24/09/2026: três E2E de Estudos e três regressões Playwright aprovados. Relatório `Jornada-Biblica-P17-P15-A1-CLOSURE-20260924-114859.txt`, SHA256 `A205125CBC1991FEF874953B4D2A6CF7A8E297D5C208BF76AEF9515A940B7103`. Os quatro hashes de specs/config permanecem iguais ao inventário atual. Essa prova corresponde ao catálogo anterior de 76 estudos; não representa nova execução E2E dos 84 estudos. As adições posteriores têm validação Jest atual e aceite manual próprio.
- Para o fechamento completo ainda faltam aplicar e confirmar esta reconciliação documental, comprovar as condições remotas e concluir staging, commit, push, PR e merge sob autorizações específicas; depois registrar main limpa e sincronizada, SHA/tree finais e baseline da F18. Main local/cache: `92a6c39b2ee2c6bc3ddb29b77f3b53f33288d5ec`; a atualidade do servidor não foi verificada na A20. Não iniciar F18 antes desse fechamento.

Este adendo não autoriza mutação de source, testes, assets, conteúdo autoral, domínio/runtime/release, banco, dependências ou estado do usuário, nem Expo prebuild, Gradle, EAS, ADB, fetch, staging, commit, push ou merge. A reconciliação documental prevista limita-se aos dois documentos de governança e deve terminar exatamente em 77 dirty / 0 staged, com os outros 474 arquivos preservados.
