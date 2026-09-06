import { createHash } from "crypto";
import { readFileSync } from "fs";
import { resolve } from "path";

const readingScreenPath = resolve(
  __dirname,
  "../src/screens/ReadingScreen.tsx",
);

const heroPath = resolve(
  __dirname,
  "../assets/module-heroes/reading-hero.png",
);

const source = readFileSync(
  readingScreenPath,
  "utf8",
)
  .replace(/\r\n/g, "\n")
  .replace(/\r/g, "\n");

describe("ReadingScreen professional visual contract", () => {
  test("usa o hero oficial da tela de leitura", () => {
    expect(source).toContain(
      'ImageBackground',
    );
    expect(source).toContain(
      'testID="reading-hero"',
    );
    expect(source).toContain(
      'source={require("../../assets/module-heroes/reading-hero.png")}',
    );
    expect(source).toContain(
      "styles.heroOverlay",
    );
    expect(source).toContain(
      "styles.heroEyebrow",
    );
  });

  test("hero oficial preserva identidade visual do Jornada", () => {
    expect(source).toContain(
      "color: colors.secondary",
    );
    expect(source).toContain(
      "color: colors.textInverse",
    );
    expect(source).toContain(
      'backgroundColor: "rgba(13,43,69,0.46)"',
    );
    expect(source).toContain(
      "borderRadius: 24",
    );
  });

  test("remove metadados técnicos da experiência de produção", () => {
    expect(source).not.toContain(
      "PLAN_START_DATE_KEY",
    );
    expect(source).not.toContain(
      "Plano atemporal • início:",
    );
    expect(source).not.toContain(
      "(chave planStartDate)",
    );
    expect(source).not.toContain(
      "styles.debug",
    );
  });

  test("cards seguem superfícies, bordas e hierarquia do design system", () => {
    expect(source).toContain(
      "backgroundColor: colors.surface",
    );
    expect(source).toContain(
      "borderColor: colors.border",
    );
    expect(source).toContain(
      "backgroundColor: colors.surfaceAlt",
    );
    expect(source).toContain(
      "backgroundColor: colors.surfaceHighlight",
    );
    expect(source).toContain(
      "styles.cardAccent",
    );
    expect(source).toContain(
      "styles.cardSpiritual",
    );
    expect(source).toContain(
      "styles.cardWarm",
    );
  });

  test("seções têm título, subtítulo e ícone com tratamento consistente", () => {
    expect(source).toContain(
      "styles.sectionIconBadge",
    );
    expect(source).toContain(
      "styles.sectionSubtitle",
    );
    expect(source).toContain(
      'title="Oração inicial"',
    );
    expect(source).toContain(
      'title="Reflexão guiada"',
    );
    expect(source).toContain(
      'title="Gratidão"',
    );
  });

  test("gratidão mantém uma ação principal e remoção secundária", () => {
    expect(source).toContain(
      '<PrimaryButton title="Salvar gratidão"',
    );
    expect(source).toContain(
      "styles.removeGratitudeBtn",
    );
    expect(source).toContain(
      "Remover gratidão salva",
    );
  });

  test("asset copiado é byte a byte o hero_leitura aprovado", () => {
    const bytes = readFileSync(heroPath);
    const sha256 = createHash("sha256")
      .update(bytes)
      .digest("hex")
      .toUpperCase();

    expect(bytes.length).toBe(2163676);
    expect(sha256).toBe(
      "E60499688C266FBE796295880D5370D540B11B5CC28C1F329EA253698C603951",
    );
  });

  test("fluxos já aprovados continuam presentes na composição visual", () => {
    expect(source).toContain(
      'title="Abrir na Bíblia"',
    );
    expect(source).toContain(
      "Toda a experiência deste dia acontece aqui no Jornada, sem abrir sites externos.",
    );
    expect(source).toContain(
      "if (showWebView && !isSunday && !isNatal)",
    );
  });
});
