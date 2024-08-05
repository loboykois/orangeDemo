import { test } from "../fixtures/index";
import { loggedAsAdmin } from "../fixtures/index";
import { expect } from "@playwright/test";
import { testUser } from "../tests/data/credentials";

test.use({ storageState: { cookies: [], origins: [] } });

test("Should be visible logo & profile avatar when user has successfully logged", async ({ page, signInPage }) => {
  await signInPage.open();
  await signInPage.signIn(testUser);

  await expect(page.locator(".oxd-brand-banner")).toBeVisible();
  await expect(page.locator(".oxd-userdropdown-img")).toBeVisible();
});

loggedAsAdmin.use({ storageState: { cookies: [], origins: [] } });

loggedAsAdmin("Custom extended fixture sample", async ({ page, myInfoPage }) => {
  await myInfoPage.open();

  await expect(page.locator(".oxd-brand-banner")).toBeVisible();
  await expect(page.locator(".oxd-userdropdown-img")).toBeVisible();
});
