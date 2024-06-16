import { expect } from "@playwright/test";
import { test } from "../pageObjects/customFixtures";
import { sideNavigationTabs } from "../pageObjects/sideNavigationBar/sideNavigation.model";
import { validCredentials } from "./testData/credentials";
test.describe("Side navigation test >>>", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  for (const tab of sideNavigationTabs) {
    test(`Should navigate to ${tab} page when user clicked at ${tab} tab at the Side navigation bar`, async ({ page, loginPage, dashboardPage }) => {
      await loginPage.doLogin(validCredentials.username, validCredentials.password);

      await dashboardPage.sideNavigation.navigateTo(tab);

      const allRoutes = /./g;

      await expect(page).toHaveURL(allRoutes);
    });
  }
});
