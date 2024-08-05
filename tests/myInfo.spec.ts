import { test } from "../fixtures/index";
import { expect } from "@playwright/test";

test("Should be visible logo & employee avatar when user has successfully logged", async ({ page, myInfoPage }) => {
  await myInfoPage.open();

  await expect(page.locator(".oxd-brand-banner")).toBeVisible();
  await expect(page.locator(".employee-image")).toBeVisible();
});

// test("Should display Success message when user saves new employee image", async ({ page, myInfoPage }) => {
//   await myInfoPage.open();
//   await myInfoPage.uploadImage();

//   await expect(page.locator("#oxd-toaster_1")).toBeVisible();
//   await expect(page.locator(".oxd-brand-banner")).toBeVisible();
//   await expect(page.locator(".employee-image")).toBeVisible();
// });
