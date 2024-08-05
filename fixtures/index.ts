import { test as base } from "@playwright/test";
import { SignInPage } from "../pageObjects/pages/signIn.page";
import { MyInfoPage } from "../pageObjects/pages/myInfo.page";

type CustomFixtures = {
  signInPage: SignInPage;
  myInfoPage: MyInfoPage;
};

type RoleAdmin = {
  roleAdmin: {
    username: string;
    password: string;
  };
};

export const test = base.extend<CustomFixtures>({
  signInPage: async ({ page }, use) => await use(new SignInPage(page)),
  myInfoPage: async ({ page }, use) => await use(new MyInfoPage(page)),
});

export const loggedAsAdmin = test.extend<RoleAdmin>({
  roleAdmin: [
    {
      username: "Admin",
      password: "admin123",
    },
    {
      option: true,
    },
  ],

  myInfoPage: async ({ signInPage, myInfoPage, roleAdmin }, use) => {
    await signInPage.open();
    await signInPage.signIn(roleAdmin);

    await use(myInfoPage);
  },
});
