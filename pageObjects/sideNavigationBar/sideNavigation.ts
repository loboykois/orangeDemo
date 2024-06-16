import { Page } from "@playwright/test";

export class SideNavigation {
  public constructor(protected readonly page: Page) {}

  public async navigateTo(tab: string): Promise<void> {
    await this.page.locator(".oxd-sidepanel-body ul li a").getByText(tab).click();

    // await this.page.getByAltText(tab).click();
  }
}
