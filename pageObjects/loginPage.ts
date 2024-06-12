import { Locator, Page } from "@playwright/test";
import { routes } from "../tests/testData/routes";
import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
  protected get path(): string {
    return routes.authentication;
  }

  constructor(protected readonly page: Page) {
    super(page);
    this.page = page;
  }

  public async navigate(): Promise<void> {
    await this.page.goto(this.path);
  }

  public async enterUsername(username: string): Promise<void> {
    await this.page.getByPlaceholder("Username").fill(username);
  }

  public async enterPassword(password: string): Promise<void> {
    await this.page.getByPlaceholder("Password").fill(password);
  }

  public async getAlertBlock(): Promise<Locator> {
    return this.page.getByRole("alert");
  }

  public async login(): Promise<void> {
    await this.page.getByRole("button", { name: "Login" }).click();
  }
}
