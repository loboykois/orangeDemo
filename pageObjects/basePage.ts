import { Page } from "@playwright/test";
import { SideNavigation } from "./sideNavigationBar/sideNavigation";

export abstract class BasePage {
  protected abstract get path(): string;
  public readonly sideNavigation: SideNavigation;

  protected constructor(protected readonly page: Page) {
    this.sideNavigation = new SideNavigation(page);
  }

  public async navigate(): Promise<void> {
    await this.page.goto(this.path);
  }
}
