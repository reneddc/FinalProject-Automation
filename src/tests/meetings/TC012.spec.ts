import { mergeTests } from "@playwright/test";
import { expect } from "../../fixtures/LogInPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as meetingsPage } from "../../fixtures/MeetingsPageFixture";

const test = mergeTests(loggedInTest, meetingsPage);

test("TC012 Verify cancel button works correctly in recurring meeting creation", async ({
  meetingsPage,
}) => {
  await meetingsPage.goTo();
  await (await meetingsPage.getAddMeetingButton()).click();
  await (await meetingsPage.getRecurringButton()).click();
  await meetingsPage.selectProjectByIndex("Demo project");
  await meetingsPage.fillTitle("Recurring Meeting Title Cancel");
  await (await meetingsPage.getCancelMeetingButton()).click();
  await meetingsPage.goTo();
  await meetingsPage.page.reload({ waitUntil: "load" });
  expect (await meetingsPage.getRecurringMeetingCreated("Recurring Meeting Title Cancel")).not.toBeVisible();
});
