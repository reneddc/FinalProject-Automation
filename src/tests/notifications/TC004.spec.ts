import { mergeTests } from "@playwright/test";
import { expect } from "../../fixtures/LogInPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as notificationPage } from "../../fixtures/NotificationsPageFixture";

const test = mergeTests(loggedInTest, notificationPage);

test("TC004: Verify that priority in a notification can be updated successfully", async ({
  notificationPage,
}) => {
  const timeWaiter = 5000;
  await notificationPage.goTo();
  await notificationPage.clickNotificationButton();
  await notificationPage.waitForNotificationContainer();
  await notificationPage.clickAllButton();
  await notificationPage.clickFirstNotification();
  await notificationPage.waitForEditForm();
  await notificationPage.selectPriority("High");
  await notificationPage.messageSuccess();
});
