import { expect, test, type Page } from "@playwright/test";

test.use({
  timezoneId: "America/Sao_Paulo",
});

const FIXED_NOW = new Date("2026-09-08T12:00:00-03:00");
const STUDY_ID = "track-02-study-01";
const TRACK_ID = "track-02";

async function completeOnboarding(page: Page): Promise<void> {
  await page.clock.setFixedTime(FIXED_NOW);
  await page.goto("/");

  const nameInput = page.getByPlaceholder("Ex: João Silva");
  await expect(nameInput).toBeVisible();
  await nameInput.fill("Teste E2E Estudos");

  await page
    .getByText("Começar Jornada ➝", {
      exact: true,
    })
    .click();

  await expect(
    page.getByText("Bem-vindo, Teste E2E Estudos.", {
      exact: true,
    }),
  ).toBeVisible();

  await page
    .getByText("Continuar ➝", {
      exact: true,
    })
    .click();

  await expect(page.getByTestId("main-tab-home")).toBeVisible();
}

async function closeDailyVerseModal(page: Page): Promise<void> {
  await expect(
    page.getByText("📖 Versículo do Dia", {
      exact: true,
    }),
  ).toBeVisible({
    timeout: 30_000,
  });

  await page
    .getByText("Fechar", {
      exact: true,
    })
    .click();
}

async function openStudiesHome(page: Page): Promise<void> {
  await completeOnboarding(page);
  await closeDailyVerseModal(page);

  await page
    .getByText("Estudos", {
      exact: true,
    })
    .first()
    .click();

  await expect(page.getByTestId("studies-screen")).toBeVisible({
    timeout: 15_000,
  });
}

async function openStudy(page: Page): Promise<void> {
  await openStudiesHome(page);

  const trackCard = page.getByTestId(`study-track-${TRACK_ID}`);
  await expect(trackCard).toBeVisible();
  await trackCard.click();

  await expect(page.getByTestId("study-track-screen")).toBeVisible();

  const studyCard = page.getByTestId(`study-${STUDY_ID}`);
  await expect(studyCard).toBeVisible();
  await studyCard.click();

  await expect(page.getByTestId("study-detail-screen")).toBeVisible({
    timeout: 15_000,
  });
}

async function openSection(
  page: Page,
  sectionLabel: string,
): Promise<void> {
  const toggle = page.getByRole("button", {
    name: `Abrir seção ${sectionLabel}`,
    exact: true,
  });

  await expect(toggle).toBeVisible({
    timeout: 15_000,
  });
  await expect(toggle).toBeEnabled({
    timeout: 15_000,
  });
  await toggle.click();
}

test(
  "Estudos percorre Library -> Track -> Study -> Bible e retorna ao estudo",
  async ({ page }) => {
    await openStudy(page);

    await openSection(page, "Leitura Bíblica");

    const openBibleButton = page.getByTestId(
      "study-open-bible-button",
    );
    await expect(openBibleButton).toBeVisible();
    await expect(openBibleButton).toBeEnabled();
    await openBibleButton.click();

    await expect(page.getByTestId("bible-reader-screen")).toBeVisible({
      timeout: 30_000,
    });

    await page
      .getByRole("button", {
        name: "Voltar para a seleção bíblica",
      })
      .click();

    await expect(page.getByTestId("study-detail-screen")).toBeVisible({
      timeout: 15_000,
    });
  },
);

test(
  "Estudos abre o Diário com contexto, salva e retorna ao mesmo estudo",
  async ({ page }) => {
    await openStudy(page);

    await openSection(page, "Registrar no Diário");

    const openJournalButton = page.getByTestId(
      "study-open-journal-button",
    );
    await expect(openJournalButton).toBeVisible();
    await expect(openJournalButton).toBeEnabled();
    await openJournalButton.click();

    const reflectionInput = page.getByLabel("Reflexão", {
      exact: true,
    });

    await expect(reflectionInput).toBeVisible({
      timeout: 15_000,
    });

    await reflectionInput.fill(
      "Reflexão E2E vinculada ao estudo bíblico.",
    );

    const saveButton = page.getByRole("button", {
      name: "Salvar registro do diário",
      exact: true,
    });

    await expect(saveButton).toBeEnabled({
      timeout: 15_000,
    });
    await saveButton.click();

    await expect(page.getByTestId("study-detail-screen")).toBeVisible({
      timeout: 20_000,
    });
    await expect(
      page.getByTestId("study-open-journal-button"),
    ).toBeVisible();
  },
);

test(
  "Estudos salva STUDY e Para Guardar/BIBLE_REFERENCE e expõe ambos em Favoritos",
  async ({ page }) => {
    await openStudy(page);

    const studyFavoriteButton = page.getByTestId(
      "study-favorite-button",
    );

    await expect(studyFavoriteButton).toBeEnabled({
      timeout: 15_000,
    });
    await expect(studyFavoriteButton).toHaveAccessibleName(
      "Adicionar estudo aos favoritos",
    );

    await studyFavoriteButton.click();

    await expect(studyFavoriteButton).toHaveAccessibleName(
      "Remover estudo dos favoritos",
      {
        timeout: 15_000,
      },
    );

    await openSection(page, "Para guardar");

    const keepFavoriteButton = page.getByTestId(
      "study-keep-favorite-0",
    );

    await expect(keepFavoriteButton).toBeVisible({
      timeout: 15_000,
    });
    await expect(keepFavoriteButton).toBeEnabled({
      timeout: 15_000,
    });
    await expect(keepFavoriteButton).toHaveAccessibleName(
      /^Adicionar .+ aos favoritos$/,
    );

    await keepFavoriteButton.click();

    await expect(keepFavoriteButton).toHaveAccessibleName(
      /^Remover .+ dos favoritos$/,
      {
        timeout: 15_000,
      },
    );

    await page.getByTestId("main-tab-home").click();
    await expect(page.getByTestId("main-tab-home")).toBeVisible();

    const quickActionsButton = page.getByRole("button", {
      name: "Abrir ações rápidas",
      exact: true,
    });
    await expect(quickActionsButton).toBeVisible();
    await quickActionsButton.click();

    const openFavoritesButton = page.getByRole("button", {
      name: "Abrir Favoritos",
      exact: true,
    });
    await expect(openFavoritesButton).toBeVisible();
    await openFavoritesButton.click();

    const studyFavoriteCard = page.getByTestId(
      `favorite-study-${STUDY_ID}`,
    );
    await expect(studyFavoriteCard).toBeVisible({
      timeout: 15_000,
    });

    const bibleReferenceFavorite = page
      .locator('[data-testid^="favorite-bible-reference-"]')
      .first();

    await expect(bibleReferenceFavorite).toBeVisible({
      timeout: 15_000,
    });

    await studyFavoriteCard.click();

    await expect(page.getByTestId("study-detail-screen")).toBeVisible({
      timeout: 15_000,
    });
  },
);
