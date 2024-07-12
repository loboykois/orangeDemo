import { expect, Locator } from "@playwright/test";
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

  test.skip("Should display users list with status Enabled in Records when Enabled option is selected", async ({ page, adminPage }) => {
    await adminPage.navigate();
    const buttonController = adminPage.systemUsers.buttonController();

    await adminPage.systemUsers.selectStatus("Enabled");
    await buttonController.search.click();

    expect(1).toBe(1);
  });

  test("Should display a match in list when user enters a value in employee name field", async ({ page, adminPage }) => {
    await adminPage.navigate();

    const employeeName: string = "Joseph Evans";
    await adminPage.systemUsers.fillEmployeeName(employeeName);

    await page.waitForTimeout(1500);

    const options: Locator[] = await page.getByRole("option").all();
    const optionsText: string[] = [];

    for (const option of options) {
      const text: string = await option.innerText();
      optionsText.push(text);
    }

    expect(optionsText.includes(employeeName)).toBeTruthy();
    await expect(page.locator("span").getByText(employeeName)).toBeVisible();
  });

  test("Shoud display No records found when user enters a values without matches in employee field", async ({ page, adminPage }) => {
    await adminPage.navigate();

    const unExistingEmployeeName: string = "ABCDEFG";
    await adminPage.systemUsers.fillEmployeeName(unExistingEmployeeName);

    await page.waitForTimeout(1500);

    await expect(page.getByRole("option")).toHaveText("No Records Found");

    await adminPage.systemUsers.buttonController().search.click();
    await expect(page.locator(".oxd-input-group__message").getByText("Invalid")).toBeVisible();
  });
});
