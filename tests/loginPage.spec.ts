import { expect } from "@playwright/test";
import { test } from "../pageObjects/customFixtures";
import { invalidCredentials, validCredentials } from "./testData/credentials";
import { routes } from "./testData/routes";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Login tests >>>", () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await loginPage.navigate();
    await page.waitForTimeout(500);
  });

  test("should redirect to dashboard page when user entered correct credentials", async ({ page, loginPage }) => {
    await loginPage.enterUsername(validCredentials.username);
    await loginPage.enterPassword(validCredentials.password);
    await loginPage.login();
    await expect(page).toHaveURL(routes.dashboard);
  });

  test("should display alert block with error message when user entered incorrect credentials", async ({ loginPage }) => {
    await loginPage.enterUsername(invalidCredentials.username);
    await loginPage.enterPassword(invalidCredentials.password);
    await loginPage.login();

    const errorMessage = await loginPage.getAlertBlock();

    await expect(errorMessage).toContainText("Invalid credentials");
  });
});
