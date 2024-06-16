import { Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { routes } from "../tests/testData/routes";

export class DashboardPage extends BasePage {
  protected get path(): string {
    return routes.dashboard;
  }

  public constructor(protected readonly page: Page) {
    super(page);
  }
}
