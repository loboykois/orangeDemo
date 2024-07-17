import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";
import { routes } from "../../tests/testData/routes";
import { SystemUsers } from "./systemUsers";

export class AdminPage extends BasePage {
  protected get path(): string {
    return routes.admin;
  }
  public readonly systemUsers: SystemUsers;

  public constructor(protected readonly page: Page) {
    super(page);
    this.systemUsers = new SystemUsers(page);
  }

  public async getNoRecordsPopup(): Promise<Locator> {
    return this.page.locator("#oxd-toaster_1");
  }
}
