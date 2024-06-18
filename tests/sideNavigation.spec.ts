import { expect } from "@playwright/test";
import { test } from "../pageObjects/customFixtures";
import { sideNavigationTabs } from "../pageObjects/sideNavigationBar/sideNavigation.model";
import { validCredentials } from "./testData/credentials";
import { routes } from "./testData/routes";

test.describe.configure({ mode: "serial" });
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

  test("Should navigate to Base page when user clicked on Logo at Side navigation bar", async ({ page, dashboardPage }) => {
    await dashboardPage.sideNavigation.navigateToBasePage();

    await expect(page).toHaveURL(routes.basePage);
  });

  test("Should hide/show Side navigation bar when menu button was clicked", async ({ page, dashboardPage }) => {
    const banner = page.locator(".oxd-brand-banner img");
    const bannerWight = await banner.evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue("width");
    });

    await dashboardPage.sideNavigation.hideSideNavigation();
    await expect(page.locator(".oxd-brand")).toHaveClass("oxd-brand toggled");

    expect(bannerWight).toBe("182px");

    await dashboardPage.sideNavigation.showSideNavigation();
    await expect(page.locator(".oxd-brand")).not.toHaveClass("toggled");

    expect(bannerWight).toBe("50px");
  });
});
