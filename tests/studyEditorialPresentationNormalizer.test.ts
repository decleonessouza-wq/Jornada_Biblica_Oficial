import {
  buildStudyDisplayBlocks,
  normalizeDeterministicStudyTextForDisplay,
  shouldMergeDeterministicStudyParagraphsForDisplay,
  splitStudyObjectiveForDisplay,
} from "../src/studies/presentation/studyEditorialPresentationNormalizer";
import { resolveRuntimeStudyBibleLinks } from "../src/studies/runtime/studyBibleReferenceResolver";
import {
  getRuntimeStudySections,
  studyRuntimeCatalog,
} from "../src/studies/runtime/studyRuntimeCatalog";

describe("studyEditorialPresentationNormalizer", () => {
  it("places each explicit objective bullet on its own structured item", () => {
    const objective =
      "Ao final, queremos compreender quatro verdades simples e importantes: • Deus é o Criador de todas as coisas. • A criação não surgiu sem propósito. • O ser humano ocupa um lugar especial. • A Bíblia começa mostrando vida e ordem.";

    expect(splitStudyObjectiveForDisplay(objective)).toEqual({
      intro:
        "Ao final, queremos compreender quatro verdades simples e importantes:",
      items: [
        "Deus é o Criador de todas as coisas.",
        "A criação não surgiu sem propósito.",
        "O ser humano ocupa um lugar especial.",
        "A Bíblia começa mostrando vida e ordem.",
      ],
    });
  });

  it("joins only deterministic soft line wraps inside an unfinished sentence", () => {
    const source =
      "A Bíblia não começa tentando provar a\nexistência de Deus. Ela\ncomeça apresentando Deus como o\nCriador.";

    expect(normalizeDeterministicStudyTextForDisplay(source)).toBe(
      "A Bíblia não começa tentando provar a existência de Deus. Ela começa apresentando Deus como o Criador.",
    );
  });

  it("preserves ambiguous heading, numbering and colon boundaries", () => {
    expect(
      normalizeDeterministicStudyTextForDisplay(
        "Mensagem principal\nO mundo não é apresentado como algo sem direção.",
      ),
    ).toBe(
      "Mensagem principal\nO mundo não é apresentado como algo sem direção.",
    );

    expect(
      normalizeDeterministicStudyTextForDisplay(
        "1. Deus é o ponto de partida de tudo\n“No princípio, Deus...” — Gênesis 1:1",
      ),
    ).toBe(
      "1. Deus é o ponto de partida de tudo\n“No princípio, Deus...” — Gênesis 1:1",
    );

    expect(
      normalizeDeterministicStudyTextForDisplay(
        "Observe:\nO que o texto afirma?",
      ),
    ).toBe("Observe:\nO que o texto afirma?");
  });

  it("merges only deterministic paragraph continuations and preserves ambiguous boundaries", () => {
    expect(
      shouldMergeDeterministicStudyParagraphsForDisplay(
        "A Bíblia não começa tentando provar a",
        "existência de Deus.",
      ),
    ).toBe(true);

    expect(
      shouldMergeDeterministicStudyParagraphsForDisplay(
        "Mensagem principal",
        "O mundo não é apresentado como algo sem direção.",
      ),
    ).toBe(false);

    expect(
      shouldMergeDeterministicStudyParagraphsForDisplay(
        "Observe:",
        "O que o texto afirma?",
      ),
    ).toBe(false);
  });

  it("converts an unequivocal paragraph bullet sequence into a real BULLET_LIST", () => {
    const display = buildStudyDisplayBlocks({
      blocks: [
        {
          type: "PARAGRAPH",
          text: "Observe: • Primeiro ponto. • Segundo ponto.",
        },
      ],
      bibleLinks: [],
      formattingEnabled: true,
    });

    expect(display.map((entry) => entry.block)).toEqual([
      {
        type: "PARAGRAPH",
        text: "Observe:",
      },
      {
        type: "BULLET_LIST",
        items: ["Primeiro ponto.", "Segundo ponto."],
      },
    ]);
  });

  it("normalizes the released 84-study presentation while quarantining Track 6 and preserving V8 link offsets", () => {
    expect(studyRuntimeCatalog.studies).toHaveLength(84);

    let objectiveListStudyCount = 0;
    let changedStudyCount = 0;
    let track06StudyCount = 0;

    for (const entry of studyRuntimeCatalog.studies) {
      const formattingEnabled = entry.content.trackId !== "track-06";
      const objectiveDisplay = splitStudyObjectiveForDisplay(
        entry.content.objective,
        formattingEnabled,
      );

      if (objectiveDisplay.items.length > 0) {
        objectiveListStudyCount += 1;
      }

      const sections = getRuntimeStudySections(entry.content.id);
      const bibleLinks = resolveRuntimeStudyBibleLinks(entry.content.id);
      let studyChanged = false;

      for (const section of sections) {
        const sectionLinks = bibleLinks.filter(
          (link) => link.sectionId === section.id,
        );
        const display = buildStudyDisplayBlocks({
          blocks: section.blocks,
          bibleLinks: sectionLinks,
          formattingEnabled,
        });

        if (!formattingEnabled) {
          expect(display).toHaveLength(section.blocks.length);

          display.forEach((displayBlock, blockIndex) => {
            expect(displayBlock.block).toBe(section.blocks[blockIndex]);
            expect(displayBlock.blockIndex).toBe(blockIndex);
          });
        } else if (
          display.length !== section.blocks.length ||
          display.some((displayBlock, displayIndex) => {
            const sourceBlock = section.blocks[displayIndex];
            return !sourceBlock || displayBlock.block !== sourceBlock;
          })
        ) {
          studyChanged = true;
        }

        for (const displayBlock of display) {
          for (const link of displayBlock.bibleLinks) {
            if (
              displayBlock.block.type === "BULLET_LIST" ||
              displayBlock.block.type === "NUMBERED_LIST"
            ) {
              expect(link.itemIndex).not.toBeNull();
              expect(link.textSource).toBe("TEXT");
              const item =
                link.itemIndex === null
                  ? undefined
                  : displayBlock.block.items[link.itemIndex];
              expect(item).toBeDefined();
              expect(link.sourceStart).toBeGreaterThanOrEqual(0);
              expect(link.sourceEnd).toBeLessThanOrEqual(item?.length ?? 0);
            } else if (link.textSource === "TEXT") {
              expect(link.sourceStart).toBeGreaterThanOrEqual(0);
              expect(link.sourceEnd).toBeLessThanOrEqual(
                displayBlock.block.text.length,
              );
            }
          }
        }
      }

      if (entry.content.trackId === "track-06") {
        track06StudyCount += 1;
      } else if (studyChanged) {
        changedStudyCount += 1;
      }
    }

    expect(objectiveListStudyCount).toBe(18);
    expect(track06StudyCount).toBe(10);
    expect(changedStudyCount).toBeGreaterThan(0);
  });

  it("leaves Track 6 text untouched when formatting is disabled", () => {
    const text = "Linha original\ncontinuação original • marcador original";
    const blocks = [
      {
        type: "PARAGRAPH" as const,
        text,
      },
    ];

    expect(normalizeDeterministicStudyTextForDisplay(text, false)).toBe(text);
    expect(splitStudyObjectiveForDisplay(text, false)).toEqual({
      intro: text,
      items: [],
    });

    const display = buildStudyDisplayBlocks({
      blocks,
      bibleLinks: [],
      formattingEnabled: false,
    });

    expect(display).toHaveLength(1);
    expect(display[0].block).toBe(blocks[0]);
    expect(display[0].blockIndex).toBe(0);
    expect(display[0].bibleLinks).toEqual([]);
  });
});
