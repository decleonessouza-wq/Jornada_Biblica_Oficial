import {
  TRACK_04_DRAFT_BATCH_EDITORIAL_STATUS,
  TRACK_04_DRAFT_BATCH_PROFILE,
  TRACK_04_DRAFT_BATCH_PUBLISHED,
  TRACK_04_DRAFT_BATCH_RUNTIME_ELIGIBLE,
  track04DraftBatchEditorialSources,
  track04DraftBatchPackage,
} from "../src/studies/content/track04DraftBatch";

const expectedCandidateShaByStudy = new Map<number, string>([
  [1, "085A46CAA88C99C36D1772AD0D9B3E8879835DE115DB68E904F89FF742BA7255"],
  [2, "3D0F52134D5FF376538194258870BC2F0196266F0795BA3A39C0CB2100728006"],
  [3, "21670F2ECE8D3551D40FD00D4862BBF0EBEE0B9C1F82418B22FFBFE598CDDE83"],
  [4, "7F531CCECCF8F212A87A1C61DF628F059CB09473B9D7A00EA4C75E4FB4EC8337"],
  [5, "8FE155542E5B4389065625427BEDBFF1B71C9B1B062FE141590FF6B8224BBB93"],
  [6, "B361D0BCFBC5A40647449435D5F5A48B882F916A702287EC4FE4F4106C5F8007"],
  [7, "7966C919E4367384B5A41074058908585744454A875B88491F29BDD00CCD9FAC"],
  [8, "00CBBBB02066291C41FD4BF1942A26F7E9D676A16CD62FEC99FFA63AA30FC368"],
  [9, "396F1B51E4316D177AFE86BAFF46D015DFB656C39C4C10A150ECA0CF0F6855F3"],
  [10, "9AB1A447E0B125C402B53E095D3F545F10C7562AFC16354D267A7D1EBDB2EE95"],
  [11, "BF80942A0B6A4BCA89C80B1AE0A181062ED9AF2ED74A2B4A32D0115AE509DAEF"],
  [12, "F38D9647C66399A028793E0AB06424FEE38A2BD505F10458D73FC4CC2F886217"],
  [13, "30CBBA0007998A72CE09A7777DFAAB72B9F93B3C32B77FA1EB45563E2CB70128"],
  [14, "299B35E1863D40B5A281FF3ADF74281D0AFF95529BE7532B7E872B23F55A1413"],
  [15, "4C2C5F46AEC7F09EAE18BC5A4BC66E15FE6247DF3A96E5E697770904D68EE223"],
  [16, "4B11EA7E404B38BD5C2FFFB6E5C6EE2E33D46F41FD5E6E1704A74911C82F18AE"],
  [17, "AAA46DA0EFBF948AC24E0B410BAD2369D76858BC621AC001F137425164D6C8B2"],
  [18, "82906E0F78B441297AD6B162F9F6CD9949433BC88B4BB41427524778B2B62631"],
]);

const expectedReferenceCountByStudy = new Map<number, number>([
  [1, 9],
  [2, 8],
  [3, 8],
  [4, 8],
  [5, 9],
  [6, 8],
  [7, 8],
  [8, 9],
  [9, 8],
  [10, 8],
  [11, 9],
  [12, 10],
  [13, 8],
  [14, 8],
  [15, 7],
  [16, 8],
  [17, 7],
  [18, 8],
]);

const expectedTitleByStudy = new Map<number, string>([
  [1, "O novo nascimento: quando Deus começa uma vida nova em nós"],
  [2, "Justificação pela fé: aceitos por causa de Cristo"],
  [3, "Santificação: aprendendo a viver como quem pertence a Deus"],
  [4, "Identidade em Cristo: quem somos quando nossa vida pertence a Jesus"],
  [5, "Como vencer a tentação: reconhecer, fugir e permanecer em Cristo"],
  [6, "O fruto do Espírito: quando o caráter de Cristo começa a aparecer em nós"],
  [7, "Perdão: libertar o coração sem chamar o mal de bem"],
  [8, "Oração: falar com Deus sem transformar a fé em fórmula"],
  [9, "Leitura e meditação na Palavra: ouvir Deus com atenção"],
  [10, "Ansiedade e confiança: viver um dia de cada vez diante de Deus"],
  [11, "Sofrimento: fé quando a vida dói"],
  [12, "Contentamento: aprender a viver sem depender de ter sempre mais"],
  [13, "Sabedoria nas decisões: escolher sem exigir um mapa completo"],
  [14, "Relacionamentos: amar com verdade, graça e limites"],
  [15, "O uso das palavras: falar de um jeito que produz vida"],
  [16, "Serviço: grandeza que se ajoelha"],
  [17, "Generosidade: mãos abertas num mundo de medo e acúmulo"],
  [18, "Perseverança: continuar quando a caminhada fica longa"],
]);

const requiredSectionTypes = [
  "GOLDEN_TEXT",
  "PRACTICAL_TRUTH",
  "BIBLE_READING",
  "BEFORE_UNDERSTANDING",
  "READ",
  "OBSERVE",
  "UNDERSTAND",
  "CONNECT",
  "APPLY",
  "JOURNEY_TAKEAWAY",
  "PRACTICE_TODAY",
  "REFLECTION_QUESTIONS",
  "JOURNAL_PROMPT",
  "PRAYER",
  "KEEP",
  "GROUP_MODE",
  "CONTINUE_JOURNEY",
  "REFERENCES",
] as const;

describe("P17-P2-A17 Track 04 controlled DRAFT batch integration", () => {
  it("materializes exactly the eighteen approved B04 studies as standalone DRAFT source", () => {
    expect(TRACK_04_DRAFT_BATCH_PROFILE).toBe("JOURNEY_20_30_V1");
    expect(TRACK_04_DRAFT_BATCH_EDITORIAL_STATUS).toBe("DRAFT");
    expect(TRACK_04_DRAFT_BATCH_PUBLISHED).toBe(false);
    expect(TRACK_04_DRAFT_BATCH_RUNTIME_ELIGIBLE).toBe(false);

    expect(track04DraftBatchPackage.studies).toHaveLength(18);
    expect(track04DraftBatchPackage.studies.map((study) => study.number)).toEqual(
      Array.from({ length: 18 }, (_, index) => index + 1),
    );
    expect(
      track04DraftBatchPackage.studies.every(
        (study) => study.trackId === "track-04" && study.published === false,
      ),
    ).toBe(true);
  });

  it("preserves all approved candidate identities, titles and Bible reference lists", () => {
    expect(track04DraftBatchEditorialSources).toHaveLength(18);

    for (const source of track04DraftBatchEditorialSources) {
      expect(source.editorialStatus).toBe("DRAFT");
      expect(source.published).toBe(false);
      expect(source.runtimeEligible).toBe(false);
      expect(source.technicalProfile).toBe("JOURNEY_20_30_V1");
      expect(source.candidateSha256).toBe(
        expectedCandidateShaByStudy.get(source.studyNumber),
      );
      expect(source.bibleReferences).toHaveLength(
        expectedReferenceCountByStudy.get(source.studyNumber)!,
      );
      expect(new Set(source.bibleReferences).size).toBe(
        source.bibleReferences.length,
      );
      for (const reference of source.bibleReferences) {
        expect(reference).toMatch(/^[1-3]? ?[A-Z]+(?: [A-Z]+)* \d+:\d+(?:-\d+)?$/);
      }
    }

    for (const study of track04DraftBatchPackage.studies) {
      expect(study.title).toBe(expectedTitleByStudy.get(study.number));
    }
  });

  it("preserves unique IDs/slugs and exact Study 01-18 continuity", () => {
    const studies = [...track04DraftBatchPackage.studies].sort(
      (left, right) => left.number - right.number,
    );

    expect(new Set(studies.map((study) => study.id)).size).toBe(18);
    expect(new Set(studies.map((study) => study.slug)).size).toBe(18);

    for (let index = 0; index < 17; index += 1) {
      expect(studies[index]?.nextStudyId).toBe(
        `track-04-study-${String(index + 2).padStart(2, "0")}`,
      );
    }

    expect(studies[17]?.id).toBe("track-04-study-18");
    expect(studies[17]?.nextStudyId).toBeNull();
  });

  it("preserves exactly eighteen approved Jornada sections per study", () => {
    for (const study of track04DraftBatchPackage.studies) {
      const sections = track04DraftBatchPackage.sections.filter(
        (section) => section.studyId === study.id,
      );

      expect(sections).toHaveLength(18);
      expect(new Set(sections.map((section) => section.id)).size).toBe(18);
      expect(
        sections.map((section) => section.order).sort((a, b) => a - b),
      ).toEqual(Array.from({ length: 18 }, (_, index) => index + 1));

      for (const type of requiredSectionTypes) {
        expect(sections.filter((section) => section.type === type)).toHaveLength(1);
      }

      expect(sections.filter((section) => section.type === "PRACTICAL_TRUTH")).toHaveLength(1);
      expect(sections.filter((section) => section.type === "APPLY")).toHaveLength(1);
      expect(sections.filter((section) => String(section.type) === "REFLECT")).toHaveLength(0);
    }
  });

  it("preserves the four REFLITA markers inside APPLY without inventing literal APLIQUE", () => {
    for (const study of track04DraftBatchPackage.studies) {
      const apply = track04DraftBatchPackage.sections.find(
        (section) => section.studyId === study.id && section.type === "APPLY",
      );

      expect(apply).toBeDefined();

      const textualBlocks =
        apply?.blocks.filter(
          (block) => "text" in block && typeof block.text === "string",
        ) ?? [];

      const reflita = textualBlocks.filter(
        (block) => "text" in block && /^REFLITA(?:\s|$)/i.test(block.text),
      );
      const aplique = textualBlocks.filter(
        (block) => "text" in block && /^APLIQUE(?:\s|$)/i.test(block.text),
      );

      expect(reflita).toHaveLength(4);
      expect(aplique).toHaveLength(0);
    }
  });

  it("preserves the closing Verdade Prática inside JOURNEY_TAKEAWAY", () => {
    for (const study of track04DraftBatchPackage.studies) {
      const takeaway = track04DraftBatchPackage.sections.find(
        (section) =>
          section.studyId === study.id &&
          section.type === "JOURNEY_TAKEAWAY",
      );

      expect(takeaway).toBeDefined();
      expect(
        takeaway?.blocks.some(
          (block) =>
            "text" in block &&
            typeof block.text === "string" &&
            /^Verdade Prática$/i.test(block.text),
        ),
      ).toBe(true);
    }
  });
});
