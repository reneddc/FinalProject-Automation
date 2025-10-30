import { expect, test } from "../../fixtures/LoginPageFixture";

test("TC001: Verify login with invalid account", async ({ loginPage }) => {
  await loginPage.goTo();
  await loginPage.fillUsername("non-existentusername");
  await loginPage.fillPassword("somepassword");
  await loginPage.clickLoginButton();
  expect(await loginPage.getErrorMessage()).toBeVisible();
  expect(await loginPage.getErrorMessage()).toContainText(
    "Invalid user or password or the account is blocked due to multiple failed login attempts. If so, it will be unblocked automatically in a short time."
  );
});
