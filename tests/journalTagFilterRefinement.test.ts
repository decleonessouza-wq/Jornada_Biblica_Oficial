import fs from "fs";

import { JournalService } from "../src/services/journal/journalService";

type TestTag = Readonly<{
  id: string;
  name: string;
  normalizedName: string;
}>;

function makeTag(id: string, name: string): TestTag {
  return {
    id,
    name,
    normalizedName: name.toLocaleLowerCase("pt-BR"),
  };
}

function makeEntry(
  status: "ACTIVE" | "DRAFT" | "TRASHED",
  tags: readonly TestTag[],
) {
  return {
    status,
    tags,
  };
}

describe("F16 TAG1 - journal tag visibility refinement", () => {
  it("lists only tags referenced by non-trashed entries and makes a restored tag visible again", async () => {
    const activeTag = makeTag("tag-active", "Ativa");
    const trashedTag = makeTag("tag-trashed", "Lixeira");
    const draftTag = makeTag("tag-draft", "Rascunho");

    const listTags = jest.fn().mockResolvedValue([
      activeTag,
      trashedTag,
      draftTag,
    ]);
    const list = jest
      .fn()
      .mockResolvedValueOnce([
        makeEntry("ACTIVE", [activeTag]),
        makeEntry("TRASHED", [trashedTag]),
        makeEntry("DRAFT", [draftTag]),
      ])
      .mockResolvedValueOnce([
        makeEntry("ACTIVE", [activeTag]),
        makeEntry("ACTIVE", [trashedTag]),
        makeEntry("DRAFT", [draftTag]),
      ]);

    const service = new JournalService(
      { listTags, list } as never,
      {} as never,
      {} as never,
      {} as never,
    );

    await expect(service.listTags()).resolves.toEqual([
      activeTag,
      draftTag,
    ]);

    await expect(service.listTags()).resolves.toEqual([
      activeTag,
      trashedTag,
      draftTag,
    ]);

    expect(listTags).toHaveBeenCalledTimes(2);
    expect(list).toHaveBeenCalledTimes(2);
  });

  it("does not expose an orphan tag after its only entry no longer exists", async () => {
    const orphanTag = makeTag("tag-orphan", "Órfã");
    const listTags = jest.fn().mockResolvedValue([orphanTag]);
    const list = jest.fn().mockResolvedValue([]);

    const service = new JournalService(
      { listTags, list } as never,
      {} as never,
      {} as never,
      {} as never,
    );

    await expect(service.listTags()).resolves.toEqual([]);
  });

  it("keeps the collapsed tag UI bounded and exposes Ver todas / Mostrar menos", () => {
    const source = fs.readFileSync(
      "src/screens/JournalScreen.tsx",
      "utf8",
    );

    expect(source).toContain(
      "const TAG_FILTER_COLLAPSED_LIMIT = 8;",
    );
    expect(source).toContain(
      "function getVisibleJournalTags(",
    );
    expect(source).toContain(
      "const [showAllTags, setShowAllTags] =",
    );
    expect(source).toContain(
      "getVisibleJournalTags(",
    );
    expect(source).toContain(
      '? "Mostrar menos"',
    );
    expect(source).toContain(
      ': `Ver todas (${availableTags.length})`',
    );
    expect(source).toContain(
      '? "Mostrar menos etiquetas"',
    );
    expect(source).toContain(
      ': "Ver todas as etiquetas"',
    );
  });

  it("keeps a selected tag visible even when it falls outside the collapsed first eight", () => {
    const source = fs.readFileSync(
      "src/screens/JournalScreen.tsx",
      "utf8",
    );

    expect(source).toContain(
      "collapsed.some((tag) => tag.id === selectedTagId)",
    );
    expect(source).toMatch(
      /tags\.find\(\s*\(tag\) => tag\.id === selectedTagId,\s*\)/,
    );
    expect(source).toContain(
      "TAG_FILTER_COLLAPSED_LIMIT - 1",
    );
  });
});
