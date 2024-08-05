import { BasePage } from "../base.page";
import { routes } from "../../tests/routes";

export class MyInfoPage extends BasePage {
  protected pagePath = routes.myInfo;

  private saveButton = this.page.getByRole("button", { name: "Save" });
  private employeeImage = this.page.locator("//img[@class='employee-image'][contains(@src, 'pim/viewPhoto')]");
  private defaultEmployeeImage = this.page.locator("//img[@class='employee-image'][contains(@src, 'default-photo')]");

  public async uploadImage(imagePath?: string): Promise<void> {
    await this.defaultEmployeeImage.setInputFiles(imagePath ?? "C:/Autotests/orange_hrm_demo/images/spider-man.png");
    await this.saveButton.click();
  }
}
