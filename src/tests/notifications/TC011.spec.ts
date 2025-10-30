import { expect, test } from "../../fixtures/NotificationsPageFixture";

test("TC011: Verify that a notification can set a reminder", async ({
  notificationPage,
}) => {
  await notificationPage.goTo();
  await notificationPage.clickNotificationButton();
  await notificationPage.waitForNotificationContainer(2000);
  await notificationPage.clickAllButton();
  await notificationPage.clickFirstNotification();
  await notificationPage.clickMoreButton();
  await notificationPage.clickSetReminderButton();
  await notificationPage.selectReminderTomorrow();
  await notificationPage.clickConfirmationButton();
});
