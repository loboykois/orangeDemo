import { routes } from "../../tests/routes";
import { BasePage } from "../base.page";

export class SignInPage extends BasePage {
  protected pagePath = routes.signIn;

  private usernameInput = this.page.getByPlaceholder("Username");
  private passwordInput = this.page.getByPlaceholder("Password");
  private loginButton = this.page.getByRole("button", { name: "Login" });

  async signIn(user: { username: string; password: string }) {
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.loginButton.click();
  }
}
