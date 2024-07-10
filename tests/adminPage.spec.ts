import { expect } from "@playwright/test";
import { test } from "../pageObjects/customFixtures";
import { validCredentials } from "./testData/credentials";

test.describe("System users table filter tests", () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await loginPage.navigate();
    await page.waitForTimeout(500);
    await loginPage.doLogin(validCredentials.username, validCredentials.password);
    await page.waitForTimeout(1000);
  });
  test("Should display users list with role Admin in Records when Admin option is selected", async ({ page, adminPage }) => {
    await adminPage.navigate();
    const buttonController = adminPage.systemUsers.buttonController();

    await adminPage.systemUsers.selectRole("Admin");
    await buttonController.search.click();

    await page.waitForTimeout(500);
    const userRole = await page.locator(".oxd-table-cell").nth(2).all();

    expect(userRole.length).toBeGreaterThanOrEqual(1);
  });

  test("Should display users list with role ESS in Records when ESS option is selected", async ({ page, adminPage }) => {
    await adminPage.navigate();
    const buttonController = adminPage.systemUsers.buttonController();

    await adminPage.systemUsers.selectRole("ESS");
    await buttonController.search.click();

    await page.waitForTimeout(500);
    const userRole = await page.locator(".oxd-table-cell").nth(2).all();

    expect(userRole.length).toBeGreaterThanOrEqual(1);
  });

  test("Should display a match in the list when the user enters a value in the employee name field", async ({ page, adminPage }) => {
    await adminPage.navigate();

    await adminPage.systemUsers.fillEmployeeName("J");

    await page.waitForTimeout(1500);

    // TODO: filter array of locators and find matches
    // const dropdownOptions = await page.getByRole("option").all();

    await expect(page.locator("span").getByText("James Butler")).toBeVisible();
  });
});
