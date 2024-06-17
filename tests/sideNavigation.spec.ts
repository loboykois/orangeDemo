import { expect } from "@playwright/test";
import { test } from "../pageObjects/customFixtures";
import { sideNavigationTabs } from "../pageObjects/sideNavigationBar/sideNavigation.model";
import { validCredentials } from "./testData/credentials";
test.describe("Side navigation test >>>", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.doLogin(validCredentials.username, validCredentials.password);
  });

  for (const tab of sideNavigationTabs) {
    test(`Should navigate to ${tab.tabName} page when user clicked at ${tab.tabName} tab at the Side navigation bar`, async ({ page, dashboardPage }) => {
      await dashboardPage.sideNavigation.navigateTo(tab.tabName);

      await expect(page).toHaveURL(`${tab.tabRoute}`);
    });
  }

  test("Should hide Side navigation bar when menu button was clicked", async ({ page, dashboardPage }) => {
    await dashboardPage.sideNavigation.hideSideNavigation();

    await expect(page.locator(".oxd-brand")).toHaveClass("oxd-brand toggled");
  });
  test("Should show Side navigation bar when menu button was clicked", async ({ page, dashboardPage }) => {
    await dashboardPage.sideNavigation.hideSideNavigation();
    await dashboardPage.sideNavigation.showSideNavigation();

    await expect(page.locator(".oxd-brand")).not.toHaveClass("toggled");
  });
});
