import { Locator } from "@playwright/test";

export interface ButtonController {
  showHideSystemUsersTable: Locator;
  reset: Locator;
  search: Locator;
}
