import { Page } from "@playwright/test";

export abstract class BasePage {
  protected abstract pagePath: string;

  constructor(protected page: Page) {}

  public async open(path?: string) {
    await this.page.goto(path ?? this.pagePath);
  }
}
