import { readFileSync } from "fs";
import { resolve } from "path";

const readingScreenPath = resolve(
  __dirname,
  "../src/screens/ReadingScreen.tsx",
);

const source = readFileSync(
  readingScreenPath,
  "utf8",
)
  .replace(/\r\n/g, "\n")
  .replace(/\r/g, "\n");

function getFunctionSource(
  functionName: string,
  nextMarker: string,
): string {
  const start = source.indexOf(
    `function ${functionName}`,
  );
  const end = source.indexOf(
    nextMarker,
    start,
  );

  if (start < 0 || end < 0 || end <= start) {
    throw new Error(
      `READING_SCREEN_FUNCTION_NOT_FOUND:${functionName}`,
    );
  }

  return source.slice(start, end);
}

describe("ReadingScreen special-day local experience contract", () => {
  test("usa a política civil explícita e a projeção atemporal especial", () => {
    expect(source).toContain(
      'from "../domain/plan/planSpecialDayPolicy"',
    );
    expect(source).toContain(
      'from "../domain/plan/planCivilSchedule"',
    );
    expect(source).toContain(
      "resolvePlanCivilDayPolicy",
    );
    expect(source).toContain(
      "projectPlanCivilDate",
    );
    expect(source).not.toContain(
      "function workdayIndexSinceStart",
    );
  });

  test("não fabrica busca externa para domingo ou Natal", () => {
    const buildReadingUrl = getFunctionSource(
      "buildReadingUrl",
      "/* ==========================\n   EXPERIÊNCIA ESPIRITUAL",
    );

    expect(buildReadingUrl).not.toContain(
      "isSunday",
    );
    expect(buildReadingUrl).not.toMatch(
      /natal/i,
    );
    expect(source).not.toContain(
      "meditação e oração bíblica",
    );
    expect(source).not.toContain(
      "Evangelhos nascimento de Jesus",
    );
  });

  test("resolve domingo e Natal pela política, sem consumir leitura", () => {
    const resolvePlanForDate = getFunctionSource(
      "resolvePlanForDate",
      "/* ==========================\n   UI HELPERS",
    );

    expect(resolvePlanForDate).toContain(
      "projectPlanCivilDate",
    );
    expect(resolvePlanForDate).toContain(
      "!projection.policy.consumesReadingUnit",
    );
    expect(resolvePlanForDate).toContain(
      "projection.policy.displayReference",
    );
    expect(resolvePlanForDate).toContain(
      "projection.readingUnitIndex",
    );
  });

  test("Natal tem precedência visual e espiritual quando também é domingo", () => {
    const spiritual = getFunctionSource(
      "getSpiritualContent",
      "/* ==========================\n   ✅ PLANO ATEMPORAL",
    );

    expect(
      spiritual.indexOf("if (isNatal)"),
    ).toBeGreaterThanOrEqual(0);
    expect(
      spiritual.indexOf("if (isSunday)"),
    ).toBeGreaterThanOrEqual(0);
    expect(
      spiritual.indexOf("if (isNatal)"),
    ).toBeLessThan(
      spiritual.indexOf("if (isSunday)"),
    );

    const christmasPill =
      source.indexOf(
        'isNatal ? (\n                <Pill label="Natal"',
      );
    const sundayPill =
      source.indexOf(
        'isSunday ? (\n                <Pill label="Domingo livre"',
      );

    expect(christmasPill).toBeGreaterThanOrEqual(0);
    expect(sundayPill).toBeGreaterThan(christmasPill);
  });

  test("dia especial não exibe ação externa nem botão de conclusão", () => {
    expect(source).toContain(
      "civilDayPolicy.canMarkRead",
    );
    expect(source).toContain(
      "isSunday || isNatal ? (",
    );
    expect(source).toContain(
      "Toda a experiência deste dia acontece aqui no Jornada, sem abrir sites externos.",
    );
    expect(source).toContain(
      "!isSunday &&\n              !isNatal &&\n              !usesLocalBibleReader",
    );
    expect(source).toContain(
      "!isSunday && !isNatal && !usesLocalBibleReader",
    );
  });

  test("WebView e navegador falham fechados para dias especiais", () => {
    const openInBrowser = getFunctionSource(
      "openInBrowser",
      "function openAccordingToMode",
    );
    const openAccordingToMode = getFunctionSource(
      "openAccordingToMode",
      "const versionLabel",
    );

    expect(openInBrowser).toContain(
      "if (isSunday || isNatal) return;",
    );
    expect(openAccordingToMode).toContain(
      "if (isSunday || isNatal) return;",
    );
    expect(source).toContain(
      "if (showWebView && !isSunday && !isNatal)",
    );
  });

  test("URL externa só é calculada para leitura não especial", () => {
    expect(source).toContain(
      'if (usesLocalBibleReader || isSunday || isNatal) return "";',
    );
    expect(source).toContain(
      "buildReadingUrl(selectedReferenceForUrl, version)",
    );
  });

  test("preserva o leitor local como caminho normal da Jornada", () => {
    expect(source).toContain(
      'navigation.navigate(\n        "JourneyBibleReader"',
    );
    expect(source).toContain(
      'title="Abrir na Bíblia"',
    );
    expect(source).toContain(
      "usesLocalBibleReader",
    );
  });
});
