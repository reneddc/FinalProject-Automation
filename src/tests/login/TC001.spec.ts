import { expect, test } from "../../fixtures/LogInPageFixture";

test("TC001: Verify login with invalid account", async ({
  logInPage: logInPage,
}) => {
  await logInPage.goTo();
  await logInPage.fillUsername("non-existentusername");
  await logInPage.fillPassword("somepassword");
  await logInPage.clickLoginButton();
  const actualErrorMessage = await logInPage.getErrorMessage();
  expect(actualErrorMessage).toContainText(
    "Invalid user or password or the account is blocked due to multiple failed login attempts. If so, it will be unblocked automatically in a short time."
  );
});
