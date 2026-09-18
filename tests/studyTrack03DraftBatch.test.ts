import {
  TRACK_03_DRAFT_BATCH_EDITORIAL_STATUS,
  TRACK_03_DRAFT_BATCH_PROFILE,
  TRACK_03_DRAFT_BATCH_PUBLISHED,
  TRACK_03_DRAFT_BATCH_RUNTIME_ELIGIBLE,
  track03DraftBatchEditorialSources,
  track03DraftBatchPackage,
} from "../src/studies/content/track03DraftBatch";

const expectedCandidateShaByStudy = new Map<number, string>([
  [1, "18B6138EDD9161D54080D50848033BE8AF2E213B916535CC53B6F9E670E72BE9"],
  [2, "89DF937A6784F06D204E615D462E2251A1E134100EDC7DFCE88FBA5C08364E74"],
  [3, "03B7C9D6892E11013284D6E529B0EDB65D9DD10EB0A3E5D255DC096BBB09308A"],
  [4, "201B0B76EAA9E4F310DA18C85CF7346D8B0814B3C15483BFAC1DE76745199B4D"],
  [5, "F1B6C6F3433B07FD205C0FA1BCB6A4B31B0AD58B6788F3FED3A85B373E538CF6"],
  [6, "64B3BD56DA1EAEAD7AFE00F5844A9CEEDBE63CC5C1FA2738593C400A44494E8F"],
  [7, "313BBDC7DFE5622FD2C8562B656E88A546C39B93E2928746676E8E5E61680C78"],
  [8, "5B03F2BA5A92A441DCD8660D92A38E9F74BCE47429EC05E309ABD4D3869C8F36"],
  [9, "E0D925B1D0A3FC1A5943C832B63DF82BFDBB964EE9D4529863EE24D0F39A9FE5"],
  [10, "D73BB01526BBFF9863317726DF5CC12C28B1BEDAD8EDB2DD610308D24D143BB8"],
  [11, "E191EF6000489060D650498F1B931F562F0E21315B544D052A33D8FCB827BEEB"],
  [12, "1C7CEDBD06A99080DEA27F3E98830FC6FB94B4890AD4697BBA2F24CE5E705384"],
  [13, "E659C2D1B9EF78B4339182C19F78CE19E21866F3860FE8588C61E81D1A7B994C"],
  [14, "DB20712FA852B6D0A31767CF81BDF82DB53FD09ACEFCAA233B2D3393E85390A7"],
  [15, "2192CDBE9B384E57BD78C3DE626704970CA4F7558F4942D2AE2765B218ADA4C3"],
  [16, "4B9F80283FE4374A22F5F940902C1CF24D1FCFE1330E49187F13AFDDD57C531D"],
  [17, "464D17FEB651216BE78EC9F48F69EA1CF384E2B6A420EDB3EDA492BFC70C30D8"],
  [18, "8FD29C0D12B6CB4A0D1599865122838256DCE9AF06E9785C95BCFA69F9FA94B7"],
  [19, "DE1B8B36EE6FC3EF8124D6C9A58B372618CE31FA78233741F9A038463C27CD57"],
]);

const expectedReferenceCountByStudy = new Map<number, number>([
  [1, 8],
  [2, 8],
  [3, 6],
  [4, 9],
  [5, 8],
  [6, 9],
  [7, 9],
  [8, 8],
  [9, 7],
  [10, 8],
  [11, 7],
  [12, 9],
  [13, 9],
  [14, 10],
  [15, 8],
  [16, 8],
  [17, 9],
  [18, 10],
  [19, 10],
]);

const expectedTitleByStudy = new Map<number, string>([
  [1, "O Verbo: antes de Belém, Ele já era"],
  [2, "Filho de Deus: uma identidade que muda tudo"],
  [3, "Filho do Homem: glória, serviço e sofrimento"],
  [4, "Messias: o Ungido que cumpre a esperança"],
  [5, "O Cordeiro: o Rei que se entrega"],
  [6, "Rei: um Reino que não se parece com os reinos deste mundo"],
  [7, "Senhor: quando Jesus deixa de ser apenas parte da vida"],
  [8, "Sumo Sacerdote: aquele que nos representa diante de Deus"],
  [9, "Encarnação: Deus entrou em nossa história"],
  [10, "Ministério: o Reino de Deus em palavras e ações"],
  [11, "Milagres: sinais que apontam para quem Jesus é"],
  [12, "Ensino: palavras que pedem uma vida diferente"],
  [13, "Cruz: o Rei entrega a própria vida"],
  [14, "Ressurreição: Jesus vive e a história muda"],
  [15, "Ascensão: o Cristo exaltado que continua sua obra"],
  [16, "Intercessão: Jesus continua agindo por nós"],
  [17, "Retorno: o Rei voltará"],
  [18, "Reino: o governo de Cristo até que tudo seja restaurado"],
  [19, "Juízo e restauração: o Rei colocará todas as coisas em ordem"],
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

describe("P17-P2-A15 Track 03 controlled DRAFT batch integration", () => {
  it("materializes exactly the nineteen approved B03 studies as standalone DRAFT source", () => {
    expect(TRACK_03_DRAFT_BATCH_PROFILE).toBe("JOURNEY_20_30_V1");
    expect(TRACK_03_DRAFT_BATCH_EDITORIAL_STATUS).toBe("DRAFT");
    expect(TRACK_03_DRAFT_BATCH_PUBLISHED).toBe(false);
    expect(TRACK_03_DRAFT_BATCH_RUNTIME_ELIGIBLE).toBe(false);

    expect(track03DraftBatchPackage.studies).toHaveLength(19);
    expect(track03DraftBatchPackage.studies.map((study) => study.number)).toEqual(
      Array.from({ length: 19 }, (_, index) => index + 1),
    );
    expect(
      track03DraftBatchPackage.studies.every(
        (study) =>
          study.trackId === "track-03" &&
          study.published === false,
      ),
    ).toBe(true);
  });

  it("preserves all nineteen approved candidate identities, titles and reference lists", () => {
    expect(track03DraftBatchEditorialSources).toHaveLength(19);

    for (const source of track03DraftBatchEditorialSources) {
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

    for (const study of track03DraftBatchPackage.studies) {
      expect(study.title).toBe(expectedTitleByStudy.get(study.number));
    }
  });

  it("preserves unique IDs/slugs and the exact Study 01-19 continuity chain", () => {
    const studies = [...track03DraftBatchPackage.studies].sort(
      (left, right) => left.number - right.number,
    );

    expect(new Set(studies.map((study) => study.id)).size).toBe(19);
    expect(new Set(studies.map((study) => study.slug)).size).toBe(19);

    for (let index = 0; index < 18; index += 1) {
      expect(studies[index]?.nextStudyId).toBe(
        `track-03-study-${String(index + 2).padStart(2, "0")}`,
      );
    }

    expect(studies[18]?.id).toBe("track-03-study-19");
    expect(studies[18]?.nextStudyId).toBeNull();
  });

  it("preserves exactly twenty sections per study with all required Jornada blocks", () => {
    for (const study of track03DraftBatchPackage.studies) {
      const sections = track03DraftBatchPackage.sections.filter(
        (section) => section.studyId === study.id,
      );

      expect(sections).toHaveLength(20);
      expect(new Set(sections.map((section) => section.id)).size).toBe(20);
      expect(
        sections.map((section) => section.order).sort((a, b) => a - b),
      ).toEqual(Array.from({ length: 20 }, (_, index) => index + 1));

      for (const type of requiredSectionTypes) {
        expect(sections.filter((section) => section.type === type)).toHaveLength(1);
      }

      expect(
        sections.filter(
          (section) => section.type === "INTERPRETATION_CAUTION",
        ),
      ).toHaveLength(1);
      expect(
        sections.filter((section) => section.type === "DEEPEN"),
      ).toHaveLength(1);
      expect(
        sections.filter((section) => section.type === "PRACTICAL_TRUTH"),
      ).toHaveLength(1);
    }
  });

  it("preserves the closing practical truth only inside JOURNEY_TAKEAWAY", () => {
    for (const study of track03DraftBatchPackage.studies) {
      const sections = track03DraftBatchPackage.sections.filter(
        (section) => section.studyId === study.id,
      );
      const takeaway = sections.find(
        (section) => section.type === "JOURNEY_TAKEAWAY",
      );

      expect(takeaway).toBeDefined();
      expect(
        takeaway?.blocks.some(
          (block) =>
            "text" in block &&
            typeof block.text === "string" &&
            block.text === "Verdade Prática",
        ),
      ).toBe(true);
    }
  });
});
