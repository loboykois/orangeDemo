import { Page } from "@playwright/test";

export class SideNavigation {
  public constructor(protected readonly page: Page) {}

  public async navigateTo(tab: string): Promise<void> {
    await this.page.locator(".oxd-sidepanel-body ul li a").getByText(tab).click();
  }

  public async showSideNavigation(): Promise<void> {
    await this.page.locator(".bi-chevron-right").click();
  }

  public async hideSideNavigation(): Promise<void> {
    await this.page.locator(".bi-chevron-left").click();
  }
}
