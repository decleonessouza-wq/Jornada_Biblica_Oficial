import { expect, test } from "@playwright/test";

test("renders the welcome onboarding shell", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByText("B\u00edblia Jornada", {
      exact: true,
    }),
  ).toBeVisible();

  await expect(
    page.getByText("Bem-vindo", {
      exact: true,
    }),
  ).toBeVisible();

  const nameInput =
    page.getByPlaceholder(
      "Ex: Jo\u00e3o Silva",
    );

  await expect(
    nameInput,
  ).toBeVisible();

  await expect(
    page.getByText(
      "Digite pelo menos 2 letras para continuar.",
      {
        exact: true,
      },
    ),
  ).toBeVisible();

  await nameInput.fill("Teste E2E");

  await expect(
    nameInput,
  ).toHaveValue("Teste E2E");

  await expect(
    page.getByText(
      "Digite pelo menos 2 letras para continuar.",
      {
        exact: true,
      },
    ),
  ).toBeHidden();

  await expect(
    page.getByText(
      "Come\u00e7ar Jornada \u279d",
      {
        exact: true,
      },
    ),
  ).toBeVisible();
});
