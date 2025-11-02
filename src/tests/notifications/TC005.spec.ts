import { mergeTests } from "@playwright/test";
import { expect } from "../../fixtures/LogInPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as notificationPage } from "../../fixtures/NotificationsPageFixture";
import { NotificationLocators } from "../../locators/NotificationLocators";

const test = mergeTests(loggedInTest, notificationPage);

test("TC005: Verify that project phase in a notification can be updated successfully", async ({
  notificationPage,
}) => {
  await notificationPage.goTo();
  await notificationPage.clickNotificationButton();
  await notificationPage.waitForNotificationContainer();
  await notificationPage.clickAllButton();
  await notificationPage.clickFirstNotification();
  await notificationPage.waitForEditForm();
  await notificationPage.selectPhase("Development");
});
