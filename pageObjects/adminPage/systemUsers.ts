import { Locator, Page } from "@playwright/test";

export class SystemUsers {
  public readonly form: Locator;

  public constructor(private readonly page: Page) {
    this.form = this.page.locator("form");
  }

  public async fillUsername(username: string): Promise<void> {
    await this.form.locator(".oxd-input").last().fill(username);
  }

  public async fillEmployeeName(employeeName: string): Promise<void> {
    await this.form.getByPlaceholder("Type for hints...").click();
    await this.form.getByPlaceholder("Type for hints...").fill(employeeName);
  }

  public async selectRole(role: string): Promise<void> {
    await this.form.locator("i").first().click();
    await this.page.getByRole("option", { name: role }).click();
  }

  public async selectStatus(status: string): Promise<void> {
    await this.form.locator("i").last().click();
    await this.page.getByRole("option", { name: status }).click();
  }

  public buttonController() {
    return {
      showHideSystemUsersTable: this.page.locator(".oxd-table-filter-header-options > div:nth-child(3)"),
      reset: this.page.getByRole("button", { name: " Reset " }),
      search: this.page.getByRole("button", { name: " Search " }),
    };
  }

  public filters() {
    return {
      username: this.form.locator(".oxd-input").last(),
      userRole: this.form.getByText("-- Select --").first(),
      employeeName: this.form.getByPlaceholder("Type for hints..."),
      status: this.form.getByText("-- Select --").nth(1),
    };
  }
}
