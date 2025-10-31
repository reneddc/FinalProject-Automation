import { mergeTests } from "@playwright/test";
import { expect } from "../../fixtures/LogInPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as notificationPage } from "../../fixtures/NotificationsPageFixture";

const test = mergeTests(loggedInTest, notificationPage);

test("TC003: Verify that a tag in a notification can be updated successfully", async ({
  notificationPage,
  page,
}) => {
  await notificationPage.goTo();
  await notificationPage.clickNotificationButton();
  await notificationPage.clickAllButton();
  await notificationPage.clickFirstNotification();
  await notificationPage.clickDropDownTag();
  await notificationPage.selectOnHoldTag();
  const tagName = await notificationPage.getTagText();
  expect(tagName).toBe("On hold");
});
