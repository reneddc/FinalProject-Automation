import { expect, mergeTests } from "@playwright/test";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as notificationPage } from "../../fixtures/NotificationsPageFixture";

const test = mergeTests(loggedInTest, notificationPage);

test("TC011: Verify that a notification can set a reminder", async ({
  notificationPage,
  page,
}) => {
  const expectedText = "successfully";
  await notificationPage.goTo();
  await notificationPage.clickNotificationButton();
  await notificationPage.clickAllButton();
  await notificationPage.clickFirstNotification();
  await notificationPage.clickSetReminderButton();
  await notificationPage.clickConfirmReminder();
  const successMessageLocator = notificationPage.getSuccessReminderLocator();
  await expect(successMessageLocator).toBeVisible();
  await expect(successMessageLocator).toContainText(expectedText, {
    ignoreCase: true,
  });
});
