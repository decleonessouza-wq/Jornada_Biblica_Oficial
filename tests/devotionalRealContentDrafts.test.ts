import {
  isDevotionalRuntimeEligible,
  type DevotionalContentPackage,
} from "../src/devotionals/content/devotionalContentPackage";
import { validateDevotionalContentPackage } from "../src/devotionals/content/devotionalContentValidator";
import { devotionalJesusCordeiroDraft } from "../src/devotionals/content/devotionalJesusCordeiroDraft";
import { devotionalPaisAdolescentesDraft } from "../src/devotionals/content/devotionalPaisAdolescentesDraft";
import { devotionalSamaritanaDraft } from "../src/devotionals/content/devotionalSamaritanaDraft";
import { devotionalReleaseManifest } from "../src/devotionals/release/devotionalReleaseManifest";
import { devotionalRuntimeCatalog } from "../src/devotionals/runtime/devotionalRuntimeCatalog";
import { resolveDevotionalBibleReference } from "../src/devotionals/runtime/devotionalBibleReferenceResolver";

const PACKAGES: readonly DevotionalContentPackage[] = [
  devotionalSamaritanaDraft,
  devotionalJesusCordeiroDraft,
  devotionalPaisAdolescentesDraft,
];

describe("real devotional content activation", () => {
  it("validates all three real draft packages against the canonical validator", () => {
    for (const draft of PACKAGES) {
      expect(() => validateDevotionalContentPackage(draft)).not.toThrow();
    }
  });

  it("keeps every approved package fully governed and runtime-eligible", () => {
    for (const draft of PACKAGES) {
      expect(draft.governance).toEqual({
        editorialStatus: "PUBLISHED",
        contentReview: "APPROVED",
        theologicalReview: "APPROVED",
        publicDisplayAuthorization: "AUTHORIZED",
        publicationAuthorization: "AUTHORIZED",
      });
      expect(draft.author.publicDisplayAuthorization).toBe("AUTHORIZED");
      expect(isDevotionalRuntimeEligible(draft)).toBe(true);
    }
  });

  it("preserves the approved editorial classification without converting any devotional into Study", () => {
    expect(devotionalSamaritanaDraft).toMatchObject({
      contentType: "DEVOTIONAL",
      format: "REFLECTION",
      placement: "TRACK_05",
      source: {
        sourceKind: "COLLABORATIVE",
      },
    });

    expect(devotionalJesusCordeiroDraft).toMatchObject({
      contentType: "DEVOTIONAL",
      format: "OPEN_LETTER",
      placement: "TRACK_05",
      source: {
        sourceKind: "AUTHORIAL",
      },
    });

    expect(devotionalPaisAdolescentesDraft).toMatchObject({
      contentType: "DEVOTIONAL",
      format: "OPEN_LETTER",
      placement: "TRACK_05",
      source: {
        sourceKind: "COLLABORATIVE",
      },
    });

    for (const draft of PACKAGES) {
      expect(draft).not.toHaveProperty("studyId");
      expect(draft).not.toHaveProperty("trackId");
      expect(draft).not.toHaveProperty("sections");
    }
  });

  it("preserves exact source filenames and SHA256 provenance", () => {
    expect(devotionalSamaritanaDraft.source).toMatchObject({
      sourceFileName: "EFEITO MULHER SAMARITANA DEVOCIONAL_adriel.pdf",
      sourceSha256:
        "3A1595B7E15D0EECC7C29F1C889E7D656E0614AD13845D07DC2BB6A71536D5F3",
    });
    expect(devotionalJesusCordeiroDraft.source).toMatchObject({
      sourceFileName: "Carta Aberta _Jesus o Cordeiro de Deus.pdf",
      sourceSha256:
        "3889CB8EAF991A5DC9F7DDC0D501FC21801CEE129A6A8441D11C368D20E668A4",
    });
    expect(devotionalPaisAdolescentesDraft.source).toMatchObject({
      sourceFileName: "CARTA ABERTA A PAIS DE ADOLESCENTES.pdf",
      sourceSha256:
        "BCBE888BA2A12D0B3FE7BDACAEACB1DD8106B5D6FBFB3529C7F22221CB13D1E7",
    });
  });

  it("preserves observed author identities with public display authorization", () => {
    expect(devotionalSamaritanaDraft.author.canonicalName).toBe("Adriel Jackson Batista de Oliveira");
    expect(devotionalJesusCordeiroDraft.author.canonicalName).toBe(
      "Decleones Andrade",
    );
    expect(devotionalPaisAdolescentesDraft.author.canonicalName).toBe(
      "Adriel Jackson Batista de Oliveira",
    );

    for (const draft of PACKAGES) {
      expect(draft.author.publicDisplayAuthorization).toBe("AUTHORIZED");
    }
  });

  it("uses unique devotional ids and unique block ids", () => {
    const ids = PACKAGES.map((draft) => draft.id);
    expect(new Set(ids).size).toBe(ids.length);

    const blockIds = PACKAGES.flatMap((draft) =>
      draft.blocks.map((block) => block.id),
    );
    expect(new Set(blockIds).size).toBe(blockIds.length);
  });

  it("resolves every structured Bible reference through the devotional resolver", () => {
    for (const draft of PACKAGES) {
      for (const reference of draft.bibleReferences) {
        const result = resolveDevotionalBibleReference(reference);
        expect(result.ok).toBe(true);
      }
    }
  });

  it("retains the Samaritana interpretive caution as an explicit editorial note", () => {
    const openingBlock = devotionalSamaritanaDraft.blocks.find(
      (block) => block.id === "samaritana-b02",
    );

    expect(openingBlock?.kind).toBe("PARAGRAPH");
    if (openingBlock?.kind === "PARAGRAPH") {
      expect(openingBlock.text).toContain(
        "o autor propõe uma leitura devocional de intencionalidade",
      );
      expect(openingBlock.text).not.toContain(
        "não tratou aquele encontro como acidental",
      );
    }

    expect(
      devotionalSamaritanaDraft.blocks.some(
        (block) =>
          block.kind === "CALLOUT" &&
          block.role === "EDITORIAL_NOTE" &&
          block.text.includes("leitura devocional") &&
          block.text.includes("revisão editorial e teológica final"),
      ),
    ).toBe(true);

    expect(
      devotionalSamaritanaDraft.source.curatorNotes.some((note) =>
        note.includes("não foi convertido em Study"),
      ),
    ).toBe(true);
  });

  it("retains the Pais de Adolescentes interpretive claims as review debt instead of silently canonicalizing them", () => {
    expect(
      devotionalPaisAdolescentesDraft.blocks.some(
        (block) =>
          block.kind === "CALLOUT" &&
          block.role === "EDITORIAL_NOTE" &&
          block.text.includes("idade dos filhos") &&
          block.text.includes("azeite"),
      ),
    ).toBe(true);

    expect(
      devotionalPaisAdolescentesDraft.source.curatorNotes.some((note) =>
        note.includes("foram revisadas"),
      ),
    ).toBe(true);
  });

  it("keeps the two letters as OPEN_LETTER and preserves source-supported biblical anchors", () => {
    expect(devotionalJesusCordeiroDraft.format).toBe("OPEN_LETTER");
    expect(devotionalPaisAdolescentesDraft.format).toBe("OPEN_LETTER");

    expect(
      devotionalJesusCordeiroDraft.bibleReferences.map(
        (reference) => `${reference.bookId}:${reference.startChapter}`,
      ),
    ).toEqual(
      expect.arrayContaining([
        "EXO:12",
        "ISA:6",
        "ISA:53",
        "JHN:1",
        "PSA:24",
        "REV:5",
        "REV:7",
        "REV:21",
      ]),
    );

    expect(devotionalPaisAdolescentesDraft.bibleReferences).toContainEqual({
      bookId: "2KI",
      startChapter: 4,
      startVerse: null,
      endChapter: null,
      endVerse: null,
    });
  });

  it("publishes exactly the three approved packages into release and runtime", () => {
    const expectedIds = PACKAGES.map((draft) => draft.id);

    expect(
      devotionalReleaseManifest.map(
        ({ contentPackage }) => contentPackage.id,
      ),
    ).toEqual(expectedIds);

    expect(
      devotionalRuntimeCatalog.devotionals.map(
        ({ content }) => content.id,
      ),
    ).toEqual(expectedIds);
  });
  it("locks approved public author profiles and devotional hero assets", () => {
    expect(devotionalSamaritanaDraft.author.publicProfile).toEqual({
      displayName: "Adriel Jackson Batista de Oliveira",
      role: "Evangelista",
      formation: "Pedagogo · Professor de EBD · Teólogo",
      cityState: "Rondonópolis/MT",
    });
    expect(devotionalSamaritanaDraft.heroImage).toBe(
      "assets/devotionals/heroes/devotional-samaritana.png",
    );

    expect(devotionalPaisAdolescentesDraft.author.publicProfile).toEqual({
      displayName: "Adriel Jackson Batista de Oliveira",
      role: "Evangelista",
      formation: "Pedagogo · Professor de EBD · Teólogo",
      cityState: "Rondonópolis/MT",
    });
    expect(devotionalPaisAdolescentesDraft.heroImage).toBe(
      "assets/devotionals/heroes/devotional-pais-adolescentes.png",
    );

    expect(devotionalJesusCordeiroDraft.author.publicProfile).toEqual({
      displayName: "Decleones Andrade",
      role: "Músico",
      formation: null,
      cityState: "Rondonópolis/MT",
    });
    expect(devotionalJesusCordeiroDraft.heroImage).toBe(
      "assets/devotionals/heroes/devotional-jesus-cordeiro.png",
    );
  });
});
