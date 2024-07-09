import { Locator, Page } from "@playwright/test";

export class SystemUsers {
  public readonly form: Locator;

  public constructor(private readonly page: Page) {
    this.form = this.page.locator("form .oxd-form");
  }

  public async fillUsername(username: string): Promise<void> {
    await this.form.locator(".oxd-input").last().fill(username);
  }

  public async fillEmployeeName(employeeName: string): Promise<void> {
    await this.form.getByPlaceholder("Type for hints...").fill(employeeName);
  }

  public async selectRole(role: string): Promise<void> {
    // await this.form.locator("i").first().click();
    await this.page.locator("form i").first().click();
    await this.page.getByRole("option", { name: role }).click();
    // await this.form.locator(".oxd-select-option").getByText(role).click();
  }

  public async selectStatus(status: string): Promise<void> {
    await this.form.locator(".oxd-select-text--after").last().click();
    await this.form.locator(".oxd-select-option").getByText(status).click();
  }

  public buttonController() {
    return {
      showHideSystemUsersTable: this.page.locator(".oxd-table-filter-header-options > div:nth-child(3)"),
      reset: this.page.getByRole("button", { name: " Reset " }),
      search: this.page.getByRole("button", { name: " Search " }),
    };
  }
}
