import { mergeTests } from "@playwright/test";
import { expect } from "../../fixtures/LogInPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as meetingsPage } from "../../fixtures/MeetingsPageFixture";

const test = mergeTests(loggedInTest, meetingsPage);

test("TC008 Verify cancel button works correctly in one-time meeting creation", async ({
  meetingsPage,
}) => {
  await meetingsPage.goTo();
  await (await meetingsPage.getAddMeetingButton()).click();
  await (await meetingsPage.getOneTimeButton()).click();
  await meetingsPage.selectProjectByIndex("Demo project");
  await meetingsPage.fillTitle("Meeting Title Cancel");
  await (await meetingsPage.getCancelMeetingButton()).click();
  await meetingsPage.page.waitForLoadState("networkidle");
  await meetingsPage.page.reload({ waitUntil: "load" });
  expect(
    await meetingsPage.getMeetingCreated("Meeting Title Cancel")
  ).not.toBeVisible();
});
