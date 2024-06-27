import { expect } from "@playwright/test";
import { test } from "../pageObjects/customFixtures";
import { sideNavigationTabs } from "../pageObjects/sideNavigationBar/sideNavigation.model";
import { validCredentials } from "./testData/credentials";
import { routes } from "./testData/routes";

test.describe.configure({ mode: "serial" });

test.describe("Side navigation test >>>", () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await loginPage.navigate();
    await page.waitForTimeout(500);
    await loginPage.doLogin(validCredentials.username, validCredentials.password);
    await page.waitForTimeout(1000);
  });

  for (const tab of sideNavigationTabs) {
    test(`Should navigate to ${tab.tabName} page when user clicked at ${tab.tabName} tab at the Side navigation bar`, async ({ page, dashboardPage }) => {
      await dashboardPage.sideNavigation.navigateTo(tab.tabName);
      await page.waitForURL(`${tab.tabRoute}`);
      await expect(page).toHaveURL(`${tab.tabRoute}`);
    });
  }

  test("Should navigate to Base page when user clicked on Logo at Side navigation bar", async ({ page, dashboardPage }) => {
    await dashboardPage.sideNavigation.navigateToBasePage();

    await expect(page).toHaveURL(routes.basePage);
  });

  test("Should hide/show Side navigation bar when menu button was clicked", async ({ page, dashboardPage }) => {
    await dashboardPage.sideNavigation.hideSideNavigation();
    await expect(page.locator(".oxd-brand-banner")).toHaveClass("oxd-brand-banner toggled");
    await expect(page.locator(".oxd-brand-logo")).toHaveCSS("display", "block");

    await dashboardPage.sideNavigation.showSideNavigation();
    await expect(page.locator(".oxd-brand-banner")).not.toHaveClass("oxd-brand-banner toggled");
    await expect(page.locator(".oxd-brand-logo")).toHaveCSS("display", "none");
  });

  test.describe("Search tests", () => {
    test("Should display items at Side navigation bar when match is found", async ({ page, dashboardPage }) => {
      await dashboardPage.sideNavigation.search("Performance");

      expect(await page.locator(".oxd-sidepanel-body > ul li").all()).toHaveLength(1);
    });

    test("Should display empty Side navigation bar when match is't found", async ({ page, dashboardPage }) => {
      await dashboardPage.sideNavigation.search("no results");

      expect(await page.locator(".oxd-sidepanel-body > ul li").all()).toHaveLength(0);
    });

    test("Should display all matched items at Side navigation bar when multiple matches are found", async ({ page, dashboardPage }) => {
      await dashboardPage.sideNavigation.search("im");

      expect(await page.locator(".oxd-sidepanel-body > ul li").all()).toHaveLength(3);
    });
  });
});
