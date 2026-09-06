import { readFileSync } from "fs";
import { resolve } from "path";

const HOME_SOURCE_PATH = resolve(
  process.cwd(),
  "src",
  "screens",
  "HomeScreen.tsx",
);

function readHomeSource(): string {
  return readFileSync(HOME_SOURCE_PATH, "utf8").replace(/\r\n?/g, "\n");
}

describe("HomeScreen daily verse 720 local-reader bridge", () => {
  const source = readHomeSource();

  it("uses the 720-day runtime instead of the legacy embedded verse picker", () => {
    expect(source).toContain(
      'loadDailyContent720ForDate',
    );
    expect(source).toContain(
      'type ResolvedDailyContent720',
    );
    expect(source).toContain(
      'useState<ResolvedDailyContent720 | null>(null)',
    );
    expect(source).toContain(
      'loadDailyContent720ForDate(\n        isoToLocalNoon(today),\n      )',
    );
    expect(source).not.toContain(
      'pickVerseForToday',
    );
    expect(source).not.toContain(
      'VERSES_OF_DAY',
    );
    expect(source).not.toContain(
      'type VerseItem',
    );
  });

  it("renders the resolved local SQLite text and paired reference", () => {
    expect(source).toContain(
      'verseOfDay.content.verse.theme',
    );
    expect(source).toContain(
      '“{verseOfDay.verseText}”',
    );
    expect(source).toContain(
      '{verseOfDay.content.verse.reference}',
    );
  });

  it("builds the local reader route from the canonical structured reference", () => {
    expect(source).toContain(
      'getJourneyBibleReaderRouteForReference({',
    );
    expect(source).toContain(
      'reference: verseOfDay.content.bibleReference',
    );
    expect(source).toContain(
      'versionId: verseOfDay.versionId',
    );
    expect(source).toContain(
      'passageIndex: 0',
    );
    expect(source).toContain(
      'navigation.navigate("JourneyBibleReader", route.routeParams)',
    );
  });

  it("exposes one primary open action and closes the modal before navigation", () => {
    expect(source).toContain(
      'onPress={openVerseOfDayInBible}',
    );
    expect(source).toContain(
      '>Abrir na Bíblia</Text>',
    );

    const handlerStart = source.indexOf(
      'function openVerseOfDayInBible()',
    );
    const navigateIndex = source.indexOf(
      'navigation.navigate("JourneyBibleReader", route.routeParams)',
      handlerStart,
    );
    const closeIndex = source.lastIndexOf(
      'setShowVerseModal(false);',
      navigateIndex,
    );

    expect(handlerStart).toBeGreaterThanOrEqual(0);
    expect(closeIndex).toBeGreaterThan(handlerStart);
    expect(navigateIndex).toBeGreaterThan(closeIndex);
  });

  it("fails closed in Home when daily verse loading cannot resolve locally", () => {
    expect(source).toContain(
      'console.log("Erro ao carregar versículo do dia", err);',
    );
    expect(source).toContain(
      'setVerseOfDay(null);',
    );
    expect(source).toContain(
      'setShowVerseModal(false);',
    );
  });
});
