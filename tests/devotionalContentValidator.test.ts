import type {
  DevotionalBlockId,
  DevotionalId,
} from "../src/domain/devotionals/devotional";
import {
  isDevotionalRuntimeEligible,
  type DevotionalContentPackage,
} from "../src/devotionals/content/devotionalContentPackage";
import {
  DevotionalContentValidationError,
  validateDevotionalContentPackage,
} from "../src/devotionals/content/devotionalContentValidator";

function devotionalId(value: string): DevotionalId {
  return value as DevotionalId;
}

function blockId(value: string): DevotionalBlockId {
  return value as DevotionalBlockId;
}

const johnOneTwentyNine = {
  bookId: "JOHN",
  startChapter: 1,
  startVerse: 29,
  endChapter: 1,
  endVerse: 29,
} as const;

const validOpenLetter: DevotionalContentPackage = {
  id: devotionalId("track-05-devotional-open-letter-01"),
  contentType: "DEVOTIONAL",
  format: "OPEN_LETTER",
  placement: "TRACK_05",
  title: "Carta Aberta de Teste",
  subtitle: null,
  summary: "Uma carta aberta usada apenas para validar o contrato.",
  audience: null,
  author: {
    canonicalName: "Autor de Teste",
    publicProfile: {
      displayName: "Autor de Teste",
      role: null,
      formation: null,
      cityState: null,
    },
    publicDisplayAuthorization: "AUTHORIZED",
  },
  heroImage: null,
  blocks: [
    {
      id: blockId("opening"),
      kind: "HEADING",
      level: 2,
      text: "Uma abertura",
    },
    {
      id: blockId("body"),
      kind: "PARAGRAPH",
      text: "Conteúdo da carta.",
    },
    {
      id: blockId("reference"),
      kind: "BIBLE_REFERENCE",
      reference: johnOneTwentyNine,
    },
  ],
  bibleReferences: [johnOneTwentyNine],
  reflectionPrompt: null,
  governance: {
    editorialStatus: "DRAFT",
    contentReview: "PENDING",
    theologicalReview: "PENDING",
    publicDisplayAuthorization: "AUTHORIZED",
    publicationAuthorization: "PENDING",
  },
  source: {
    sourceKind: "AUTHORIAL",
    originalTitle: "Carta Aberta de Teste",
    receivedAs: "carta aberta",
    sourceFileName: null,
    sourceSha256: null,
    curatorNotes: [],
  },
};

const validReflection: DevotionalContentPackage = {
  ...validOpenLetter,
  id: devotionalId("track-05-devotional-reflection-01"),
  format: "REFLECTION",
  title: "Reflexão de Teste",
  blocks: [
    {
      id: blockId("reflection-body"),
      kind: "PARAGRAPH",
      text: "Uma reflexão breve.",
    },
    {
      id: blockId("reflection-question"),
      kind: "REFLECTION_QUESTION",
      prompt: "O que esta reflexão desperta em você?",
    },
    {
      id: blockId("reflection-prayer"),
      kind: "PRAYER",
      text: "Uma oração coerente com o material.",
    },
  ],
  reflectionPrompt: "O que esta reflexão desperta em você?",
  source: {
    ...validOpenLetter.source,
    originalTitle: "Reflexão de Teste",
    receivedAs: "devocional",
  },
};

describe("devotionalContentValidator", () => {
  test("accepts a valid OPEN_LETTER package", () => {
    expect(validateDevotionalContentPackage(validOpenLetter)).toBe(
      validOpenLetter,
    );
  });

  test("accepts a valid REFLECTION package", () => {
    expect(validateDevotionalContentPackage(validReflection)).toBe(
      validReflection,
    );
  });

  test("derives runtime eligibility only when every governance gate passes", () => {
    expect(isDevotionalRuntimeEligible(validOpenLetter)).toBe(false);

    const eligible: DevotionalContentPackage = {
      ...validOpenLetter,
      governance: {
        editorialStatus: "PUBLISHED",
        contentReview: "APPROVED",
        theologicalReview: "APPROVED",
        publicDisplayAuthorization: "AUTHORIZED",
        publicationAuthorization: "AUTHORIZED",
      },
    };

    expect(isDevotionalRuntimeEligible(eligible)).toBe(true);
  });

  test("rejects a Study discriminator", () => {
    const invalid = {
      ...validOpenLetter,
      contentType: "STUDY",
    };

    expect(() => validateDevotionalContentPackage(invalid)).toThrow(
      DevotionalContentValidationError,
    );
  });

  test("rejects an unsupported devotional format", () => {
    const invalid = {
      ...validOpenLetter,
      format: "SERMON",
    };

    expect(() => validateDevotionalContentPackage(invalid)).toThrow(
      DevotionalContentValidationError,
    );
  });

  test("rejects duplicate block ids", () => {
    const invalid = {
      ...validOpenLetter,
      blocks: [
        validOpenLetter.blocks[0],
        validOpenLetter.blocks[0],
      ],
    };

    expect(() => validateDevotionalContentPackage(invalid)).toThrow(
      DevotionalContentValidationError,
    );
  });

  test("rejects a list block without items", () => {
    const invalid = {
      ...validOpenLetter,
      blocks: [
        {
          id: blockId("empty-list"),
          kind: "LIST",
          style: "BULLET",
          items: [],
        },
      ],
    };

    expect(() => validateDevotionalContentPackage(invalid)).toThrow(
      DevotionalContentValidationError,
    );
  });

  test("rejects divergent author and governance public authorization", () => {
    const invalid = {
      ...validOpenLetter,
      author: {
        ...validOpenLetter.author,
        publicDisplayAuthorization: "DENIED",
      },
    };

    expect(() => validateDevotionalContentPackage(invalid)).toThrow(
      DevotionalContentValidationError,
    );
  });

  test("rejects an invalid source SHA256", () => {
    const invalid = {
      ...validOpenLetter,
      source: {
        ...validOpenLetter.source,
        sourceSha256: "not-a-sha256",
      },
    };

    expect(() => validateDevotionalContentPackage(invalid)).toThrow(
      DevotionalContentValidationError,
    );
  });

  test("rejects unknown package fields fail-closed", () => {
    const invalid = {
      ...validOpenLetter,
      studyId: "must-not-be-accepted",
    };

    expect(() => validateDevotionalContentPackage(invalid)).toThrow(
      DevotionalContentValidationError,
    );
  });

  test("rejects an inverted Bible chapter range", () => {
    const invalid = {
      ...validOpenLetter,
      bibleReferences: [
        {
          ...johnOneTwentyNine,
          startChapter: 4,
          endChapter: 2,
        },
      ],
    };

    expect(() => validateDevotionalContentPackage(invalid)).toThrow(
      DevotionalContentValidationError,
    );
  });
});
