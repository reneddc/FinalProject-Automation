import { mergeTests } from "@playwright/test";
import { expect } from "../../fixtures/LoginPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as notificationPage } from "../../fixtures/NotificationsPageFixture";

const test = mergeTests(loggedInTest, notificationPage);

test("TC011: Verify that a notification can set a reminder", async ({
  notificationPage,
  page,
}) => {
  await notificationPage.goTo();
  await notificationPage.clickNotificationButton();
  await notificationPage.clickAllButton();
  await notificationPage.clickFirstNotification();
  await notificationPage.clickSetReminderButton();
  await notificationPage.clickConfirmReminder();
  const successMesage = await notificationPage.getSuccessReminderMessage();
  expect(successMesage).toBe("Reminder updated successfully.");
});
