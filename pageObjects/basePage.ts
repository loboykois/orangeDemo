import { Page } from "@playwright/test";

export abstract class BasePage {
  protected abstract get path(): string;

  protected constructor(protected readonly page: Page) {}

  public async navigate(): Promise<void> {
    await this.page.goto(this.path);
  }
}
