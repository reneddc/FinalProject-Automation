import { expect, test } from "../../fixtures/NotificationsPageFixture";

test("TC009: Verify that a notification can be downloaded as a PDF", async ({
  notificationPage,
}) => {
  await notificationPage.goto();
  await notificationPage.clickNotificationButton();
  await notificationPage.waitForNotificationContainer(2000);
  await notificationPage.clickAllButton();
  await notificationPage.clickFirstNotification();
  await notificationPage.clickMoreButton();
  await notificationPage.generatePDF();
  const download = await notificationPage.clickConfirmationButton();
});
