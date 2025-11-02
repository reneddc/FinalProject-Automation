import { mergeTests } from "@playwright/test";
import { expect } from "../../fixtures/LogInPageFixture";
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
  expect(successMesage).toBeTruthy();
  expect(successMesage.length).toBeGreaterThan(0);
  
  // Verify success message contains expected text
  const hasSuccessIndication = 
    successMesage.toLowerCase().includes("reminder") || 
    successMesage.toLowerCase().includes("created") ||
    successMesage.toLowerCase().includes("success") ||
    successMesage.toLowerCase().includes("set");
  expect(hasSuccessIndication).toBeTruthy();
});
