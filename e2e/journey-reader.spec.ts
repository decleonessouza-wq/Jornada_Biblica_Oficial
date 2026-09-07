import { expect, test, type Page } from "@playwright/test";

test.use({
  timezoneId: "America/Sao_Paulo",
});

const FIXED_NOW = new Date("2026-09-08T12:00:00-03:00");

const FORBIDDEN_BIBLE_PROVIDER_HOSTS = new Set([
  "www.biblegateway.com",
  "www.google.com",
  "www.bibliaonline.com.br",
]);

function captureForbiddenBibleProviderRequests(page: Page): string[] {
  const forbiddenRequests: string[] = [];

  page.on("request", (request) => {
    try {
      const url = new URL(request.url());

      if (FORBIDDEN_BIBLE_PROVIDER_HOSTS.has(url.hostname)) {
        forbiddenRequests.push(request.url());
      }
    } catch {
      // Ignore non-URL browser internals.
    }
  });

  return forbiddenRequests;
}

async function completeOnboarding(page: Page): Promise<void> {
  await page.clock.setFixedTime(FIXED_NOW);
  await page.goto("/");

  const nameInput = page.getByPlaceholder("Ex: João Silva");
  await expect(nameInput).toBeVisible();
  await nameInput.fill("Teste E2E");

  await page
    .getByText("Começar Jornada ➝", {
      exact: true,
    })
    .click();

  await expect(
    page.getByText("Bem-vindo, Teste E2E.", {
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

async function waitForDailyVerseModal(page: Page): Promise<void> {
  await expect(
    page.getByText("📖 Versículo do Dia", {
      exact: true,
    }),
  ).toBeVisible({
    timeout: 30_000,
  });
}

async function expectLocalReaderReady(page: Page): Promise<void> {
  await expect(page.getByTestId("bible-reader-screen")).toBeVisible({
    timeout: 30_000,
  });

  await expect(page.getByTestId("bible-reader-header")).toBeVisible();

  await expect(
    page.getByText("SEM INTERNET", {
      exact: true,
    }),
  ).toBeVisible();

  expect(new URL(page.url()).origin).toBe(
    "http://127.0.0.1:4173",
  );
}

test("Home abre o versículo diário no leitor bíblico local e retorna", async ({
  page,
}) => {
  const forbiddenRequests =
    captureForbiddenBibleProviderRequests(page);

  await completeOnboarding(page);
  await waitForDailyVerseModal(page);

  await page
    .getByText("Abrir na Bíblia", {
      exact: true,
    })
    .click();

  await expectLocalReaderReady(page);

  await page
    .getByRole("button", {
      name: "Voltar para a seleção bíblica",
    })
    .click();

  await expect(page.getByTestId("main-tab-home")).toBeVisible();
  await expect(page.getByTestId("bible-reader-screen")).toBeHidden();

  expect(forbiddenRequests).toEqual([]);
});

test("Plano abre a leitura do dia e segue até o leitor bíblico local", async ({
  page,
}) => {
  const forbiddenRequests =
    captureForbiddenBibleProviderRequests(page);

  await completeOnboarding(page);
  await waitForDailyVerseModal(page);

  await page
    .getByText("Fechar", {
      exact: true,
    })
    .click();

  await page.getByTestId("main-tab-plan").click();

  await expect(page.getByTestId("plan-hero")).toBeVisible();

  await page.getByTestId("plan-current-journey-cta").click();

  await expect(page.getByTestId("reading-hero")).toBeVisible({
    timeout: 15_000,
  });

  await expect(
    page.getByText("📖 Abrir na Bíblia", {
      exact: true,
    }),
  ).toBeVisible();

  await page
    .getByText("📖 Abrir na Bíblia", {
      exact: true,
    })
    .click();

  await expectLocalReaderReady(page);

  await page
    .getByRole("button", {
      name: "Voltar para a seleção bíblica",
    })
    .click();

  await expect(page.getByTestId("reading-hero")).toBeVisible();
  await expect(page.getByTestId("bible-reader-screen")).toBeHidden();

  expect(forbiddenRequests).toEqual([]);
});
