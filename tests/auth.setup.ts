import { test as setup, expect } from "@playwright/test";
import { validCredentials } from "./testData/credentials";
import { routes } from "./testData/routes";

const authFile = "./.auth/admin.json";

setup("authenticate", async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  await page.getByPlaceholder("Username").fill(validCredentials.username);
  await page.getByPlaceholder("Password").fill(validCredentials.password);
  await page.getByRole("button", { name: "Login" }).click();

  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL(routes.dashboard);

  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.locator(".oxd-userdropdown-img")).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
