import { mergeTests } from "@playwright/test";
import { expect } from "../../fixtures/LogInPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as meetingsPage } from "../../fixtures/MeetingsPageFixture";

const test = mergeTests(loggedInTest, meetingsPage);

test("TC007 Verify recurring meeting creation and deletion", async ({
  meetingsPage,
}) => {
  await meetingsPage.goTo();
  await (await meetingsPage.getAddMeetingButton()).click();
  await (await meetingsPage.getRecurringButton()).click();
  await meetingsPage.selectProjectByIndex("Demo project");
  await meetingsPage.fillTitle("Recurring Meeting Title");
  await (await meetingsPage.getCreateRecurringMeetingButton()).click();
  await meetingsPage.goTo();
  await meetingsPage.page.reload({ waitUntil: "load" });
  await (await meetingsPage.getRecurringMeetingCreated("Recurring Meeting Title")).click();
  expect(await meetingsPage.getRecurringMeetingTitle()).toBeVisible();
  await (await meetingsPage.getRecurringMeetingOptionsButton()).click();
  await ((await meetingsPage.getDeleteSeriesButton())).click();
  await (await meetingsPage.getCheckConfirmationButton()).waitFor();
  await (await meetingsPage.getCheckConfirmationButton()).click();
  await (await meetingsPage.getDeletePermanentlyButton()).click();
  await meetingsPage.goTo();
  await meetingsPage.page.reload({ waitUntil: "load" });
  expect (await meetingsPage.getRecurringMeetingCreated("Recurring Meeting Title")).not.toBeVisible();
});
