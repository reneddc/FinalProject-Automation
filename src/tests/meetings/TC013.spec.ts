import { mergeTests } from "@playwright/test";
import { expect } from "../../fixtures/LogInPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as meetingsPage } from "../../fixtures/MeetingsPageFixture";

const test = mergeTests(loggedInTest, meetingsPage);

test("TC013 Verify error messages are displayed when one-time empty fields are submitted", async ({
  meetingsPage,
}) => {
  await meetingsPage.goTo();
  await (await meetingsPage.getAddMeetingButton()).click();
  await (await meetingsPage.getOneTimeButton()).click();
  await meetingsPage.page.waitForLoadState("networkidle");
  await (await meetingsPage.getCreateOneTimeMeetingButton()).click();
  await (await meetingsPage.getProjectErrorMessage()).waitFor();
  await (await meetingsPage.getTitleErrorMessage()).waitFor();
  expect(await meetingsPage.getProjectErrorMessage()).toBeVisible();
  expect(await meetingsPage.getTitleErrorMessage()).toBeVisible();
});
