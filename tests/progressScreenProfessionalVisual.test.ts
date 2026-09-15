import { createHash } from "crypto";
import { readFileSync } from "fs";
import { resolve } from "path";

const progressScreenPath = resolve(
  __dirname,
  "../src/screens/ProgressScreen.tsx",
);

const heroPath = resolve(
  __dirname,
  "../assets/module-heroes/progress-hero.png",
);

const source = readFileSync(
  progressScreenPath,
  "utf8",
)
  .replace(/\r\n/g, "\n")
  .replace(/\r/g, "\n");

describe("ProgressScreen professional visual contract", () => {
  test("usa o hero oficial da tela de progresso", () => {
    expect(source).toContain(
      "ImageBackground",
    );
    expect(source).toContain(
      'testID="progress-hero"',
    );
    expect(source).toContain(
      'source={require("../../assets/module-heroes/progress-hero.png")}',
    );
    expect(source).toContain(
      'resizeMode="cover"',
    );
    expect(source).toContain(
      "style={styles.hero}",
    );
    expect(source).toContain(
      "imageStyle={styles.heroImage}",
    );
    expect(source).toContain(
      "styles.heroTextPanel",
    );
  });

  test("preserva título, subtítulo e planStatusText no painel de contraste", () => {
    expect(source).toContain(
      '<Text style={styles.heroTitle}>Progresso</Text>',
    );
    expect(source).toContain(
      '<Text style={styles.heroSubtitle}>Acompanhe sua constância e evolução na leitura.</Text>',
    );
    expect(source).toContain(
      '<Text style={styles.heroHint}>{planStatusText}</Text>',
    );
    expect(source).toContain(
      'backgroundColor: "rgba(255, 255, 255, 0.86)"',
    );
    expect(source).toContain(
      "color: colors.primary",
    );
    expect(source).toContain(
      "color: colors.muted",
    );
  });

  test("hero não aplica blur, tint ou opacity na imagem", () => {
    const heroBlockMatch = source.match(
      /<ImageBackground[\s\S]*?testID="progress-hero"[\s\S]*?<\/ImageBackground>/,
    );
    expect(heroBlockMatch).not.toBeNull();
    const heroBlock = heroBlockMatch![0];
    expect(heroBlock).not.toContain("blurRadius");
    expect(heroBlock).not.toContain("tintColor");

    const heroImageStyleMatch = source.match(
      /heroImage:\s*{([\s\S]*?)\n  },/,
    );
    expect(heroImageStyleMatch).not.toBeNull();
    const heroImageStyle = heroImageStyleMatch![1];
    expect(heroImageStyle).not.toContain("opacity");
    expect(heroImageStyle).not.toContain("tintColor");
  });

  test("asset copiado é byte a byte o hero_progresso aprovado", () => {
    const bytes = readFileSync(heroPath);
    const sha256 = createHash("sha256")
      .update(bytes)
      .digest("hex")
      .toUpperCase();

    expect(bytes.length).toBe(2226801);
    expect(sha256).toBe(
      "2EE45160EEF47EAF77D1150CC721335DC7357A64F67EA8952F08D4D2106394C5",
    );
  });
});