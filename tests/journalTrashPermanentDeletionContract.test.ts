const fs = jest.requireActual<{
  readFileSync(path: string, encoding: "utf8"): string;
}>("fs");

function readSource(path: string): string {
  return fs.readFileSync(path, "utf8");
}

function between(
  source: string,
  start: string,
  end: string,
): string {
  const startIndex = source.indexOf(start);
  const endIndex = source.indexOf(end, startIndex + start.length);

  if (startIndex < 0 || endIndex < 0) {
    throw new Error("TEST_SOURCE_ANCHOR_NOT_FOUND");
  }

  return source.slice(startIndex, endIndex);
}

describe("F16 Journal trash permanent deletion contracts", () => {
  const repositoryContract = readSource(
    "src/data/personal/journal/journalRepository.ts",
  );
  const sqliteRepository = readSource(
    "src/data/personal/journal/sqliteJournalRepository.ts",
  );
  const service = readSource(
    "src/services/journal/journalService.ts",
  );
  const detail = readSource(
    "src/screens/JournalEntryDetailScreen.tsx",
  );
  const journal = readSource(
    "src/screens/JournalScreen.tsx",
  );

  it("keeps bulk hard delete restricted to TRASHED rows in the repository", () => {
    expect(repositoryContract).toContain(
      "removeAllTrashed?(): Promise<number>;",
    );

    const bulkDelete = between(
      sqliteRepository,
      "async removeAllTrashed(): Promise<number>",
      "async remove(",
    );

    expect(bulkDelete).toContain(
      "DELETE FROM personal_journal_entries",
    );
    expect(bulkDelete).toContain(
      "WHERE status = 'TRASHED'",
    );
    expect(bulkDelete).not.toContain(
      "DELETE FROM personal_journal_tags",
    );
  });

  it("fails closed before individual permanent deletion of ACTIVE or DRAFT entries", () => {
    const permanentDelete = between(
      service,
      "async deletePermanently(",
      "async emptyTrash()",
    );

    expect(permanentDelete).toContain(
      'existing.status !== "TRASHED"',
    );
    expect(permanentDelete).toContain(
      "PERSONAL_JOURNAL_PERMANENT_DELETE_TARGET_INVALID",
    );
    expect(permanentDelete).toContain(
      "await this.repository.remove(id);",
    );
  });

  it("delegates empty trash only to the restricted repository capability", () => {
    const emptyTrash = between(
      service,
      "async emptyTrash(): Promise<number>",
      "async remove(",
    );

    expect(emptyTrash).toContain(
      "this.repository.removeAllTrashed",
    );
    expect(emptyTrash).toContain(
      "PERSONAL_JOURNAL_EMPTY_TRASH_UNSUPPORTED",
    );
  });

  it("preserves restore and requires irreversible confirmation for one entry", () => {
    expect(detail).toContain(
      'accessibilityLabel="Restaurar registro do diário"',
    );
    expect(detail).toContain(
      'accessibilityLabel="Excluir registro permanentemente"',
    );

    const confirmation = between(
      detail,
      "const requestPermanentDelete",
      "const isBusy",
    );

    expect(confirmation).toContain(
      '"Excluir permanentemente?"',
    );
    expect(confirmation).toContain(
      '"Esta ação não pode ser desfeita. O registro será removido definitivamente."',
    );
    expect(confirmation).toContain(
      'text: "Cancelar"',
    );
    expect(confirmation).toContain(
      'style: "destructive"',
    );
  });

  it("keeps the detail usable after a permanent-delete failure", () => {
    const deletion = between(
      detail,
      "const deleteEntryPermanently",
      "const requestPermanentDelete",
    );

    expect(deletion).toContain("catch");
    expect(deletion).toContain(
      "Não foi possível excluir este registro permanentemente agora. Tente novamente.",
    );
    expect(deletion).toContain("setDeleteBusy(false)");
  });

  it("shows empty trash only for a non-empty trash view and confirms destructive scope", () => {
    expect(journal).toContain(
      'viewMode === "trash" && entries.length > 0',
    );
    expect(journal).toContain(
      'accessibilityLabel="Esvaziar lixeira do diário"',
    );

    const confirmation = between(
      journal,
      "const requestEmptyTrash",
      "const applySearchFilters",
    );

    expect(confirmation).toContain(
      '"Esvaziar lixeira?"',
    );
    expect(confirmation).toContain(
      '"Todos os registros na lixeira serão excluídos permanentemente. Esta ação não pode ser desfeita."',
    );
    expect(confirmation).toContain(
      'text: "Cancelar"',
    );
    expect(confirmation).toContain(
      'style: "destructive"',
    );
  });

  it("keeps Gratitude calculations restricted to ACTIVE Journal entries", () => {
    expect(service).toContain(
      'entry.status === "ACTIVE"',
    );
    expect(service).toContain(
      'entry.category === "GRATITUDE"',
    );
  });
});
