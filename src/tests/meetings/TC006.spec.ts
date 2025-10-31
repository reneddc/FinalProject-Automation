import { mergeTests } from "@playwright/test";
import { expect } from "../../fixtures/LogInPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as meetingsPage } from "../../fixtures/MeetingsPageFixture";

const test = mergeTests(loggedInTest, meetingsPage);

test("TC006 Verify one-time meeting creation and deletion", async ({
  meetingsPage,
}) => {
  await meetingsPage.goTo();
  await (await meetingsPage.getAddMeetingButton()).click();
  await (await meetingsPage.getOneTimeButton()).click();
  await meetingsPage.selectProjectByIndex("Demo project");
  await meetingsPage.fillTitle("Meeting Title");
  await (await meetingsPage.getCreateOneTimeMeetingButton()).click();
  await meetingsPage.goTo();
  await meetingsPage.page.reload({ waitUntil: "load" });
  expect(await meetingsPage.getMeetingCreated("Meeting Title")).toBeVisible();
  await (await meetingsPage.getMeetingCreatedOptions("Meeting Title")).click();
  await (await meetingsPage.getDeleteButton()).click();
  await (await meetingsPage.getDeleteConfirmatioButton()).click();
  await meetingsPage.page.waitForLoadState("networkidle");
  await meetingsPage.page.reload({ waitUntil: "load" });
  expect(
    await meetingsPage.getMeetingCreated("Meeting Title")
  ).not.toBeVisible();
});
