import { readFileSync } from "fs";
import { join } from "path";

const root = process.cwd();
const manifestSource = readFileSync(
  join(root, "src", "studies", "presentation", "studyAssetManifest.ts"),
  "utf8",
);
const catalogSource = readFileSync(
  join(
    root,
    "src",
    "studies",
    "presentation",
    "studyTrackPresentationCatalog.ts",
  ),
  "utf8",
);
const runtimeSource = readFileSync(
  join(root, "src", "studies", "runtime", "studyRuntimeCatalog.ts"),
  "utf8",
);

describe("Studies governed visual presentation infrastructure", () => {
  it("uses a complete static asset manifest with six tracks and twenty-five semantic icons", () => {
    const staticRequires =
      manifestSource.match(/require\("[^"]+\.png"\)/g) ?? [];

    expect(staticRequires).toHaveLength(43);

    for (let track = 1; track <= 6; track += 1) {
      const id = `track-0${track}`;
      expect(manifestSource).toContain(`"${id}": {`);
      expect(manifestSource).toContain(
        `cards/${id}.png`,
      );
      expect(manifestSource).toContain(
        `library/${id}.png`,
      );
      expect(manifestSource).toContain(
        `heroes/${id}.png`,
      );
    }

    expect(manifestSource).not.toMatch(/require\(`|require\([^"'\s]/);
    expect(manifestSource).not.toContain("tela_trilhas");
    expect(manifestSource).not.toContain("tela_estudos_trilha");
    expect(manifestSource).not.toContain("tela_estudo_aberto");
  });

  it("defines exactly the six public track identities without study availability data", () => {
    const ids =
      catalogSource.match(/trackId: "track-0[1-6]"/g) ?? [];

    expect(ids).toHaveLength(6);
    expect(new Set(ids).size).toBe(6);

    expect(catalogSource).toContain('title: "O Plano Eterno de Deus"');
    expect(catalogSource).toContain('title: "Conhecendo Deus"');
    expect(catalogSource).toContain('title: "Conhecendo Jesus Cristo"');
    expect(catalogSource).toContain('title: "Nova Vida em Cristo"');
    expect(catalogSource).toContain('title: "Estudos Colaborativos"');
    expect(catalogSource).toContain('title: "Vida à Luz da Palavra"');

    expect(catalogSource).not.toMatch(/studyCount|totalStudies|publishedCount/);
    expect(catalogSource).not.toMatch(/track-0[1-6]-study-/);
  });

  it("keeps presentation metadata separate from editorial and runtime study eligibility", () => {
    const combined = `${manifestSource}\n${catalogSource}`;

    expect(combined).not.toContain("../content/");
    expect(combined).not.toContain("DraftBatch");
    expect(combined).not.toContain("track05Study01Draft");
    expect(combined).not.toContain("Michael Batista da Silva");
    expect(combined).not.toContain("editorialStatus");
    expect(combined).not.toContain("runtimeEligible");
    expect(combined).not.toContain("published:");
    expect(combined).not.toContain("DRAFT");
    expect(combined).not.toMatch(/placeholder/i);

    expect(catalogSource).not.toContain("../runtime/");
    expect(runtimeSource).toContain("export const studyRuntimeCatalog");
  });

  it("keeps Track 5 variable and Track 6 presentation-only", () => {
    expect(catalogSource).toContain('trackId: "track-05"');
    expect(catalogSource).toContain('nature: "Colaborativo / acervo vivo"');
    expect(catalogSource).not.toMatch(/track-05-study-/);
    expect(catalogSource).not.toMatch(/\b5 estudos\b/i);

    expect(catalogSource).toContain('trackId: "track-06"');
    expect(catalogSource).toContain('title: "Vida à Luz da Palavra"');
    expect(catalogSource).not.toMatch(/track-06-study-/);
  });
});
