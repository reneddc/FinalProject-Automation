import { mergeTests } from "@playwright/test";
import { expect } from "../../fixtures/LoginPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as notificationPage } from "../../fixtures/NotificationsPageFixture";

const test = mergeTests(loggedInTest, notificationPage);

test("TC009: Verify that a notification can be downloaded as a PDF", async ({
  notificationPage,
}) => {
  await notificationPage.goTo();
  await notificationPage.clickNotificationButton();
  await notificationPage.waitForNotificationContainer(2000);
  await notificationPage.clickAllButton();
  await notificationPage.clickFirstNotification();
  await notificationPage.clickMoreButton();
  await notificationPage.generatePDF();
  const download = await notificationPage.clickConfirmationButton();
});
