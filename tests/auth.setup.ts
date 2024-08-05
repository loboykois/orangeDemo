import { test as setup, expect } from "@playwright/test";
import { testUser } from "./data/credentials";
import { routes } from "./routes";

const authFile = "./.auth/admin.json";

setup("authenticate", async ({ page }) => {
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  await page.getByPlaceholder("Username").fill(testUser.username);
  await page.getByPlaceholder("Password").fill(testUser.password);
  await page.getByRole("button", { name: "Login" }).click();

  await expect.soft(page).toHaveURL(routes.dashboard);
  await expect.soft(page.locator(".oxd-userdropdown-img")).toBeVisible();

  await expect(page.locator(".oxd-userdropdown-img")).toBeVisible();

  await page.context().storageState({ path: authFile });
});
