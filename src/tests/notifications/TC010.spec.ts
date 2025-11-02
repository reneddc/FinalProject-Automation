import { mergeTests } from "@playwright/test";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as notificationPage } from "../../fixtures/NotificationsPageFixture";

const test = mergeTests(loggedInTest, notificationPage);

test("TC010: Verify a comment can be posted in the activity of the notification", async ({
  notificationPage,
}) => {
  await notificationPage.goTo();
  await notificationPage.clickNotificationButton();
  await notificationPage.waitForNotificationContainer();
  await notificationPage.clickAllButton();
  await notificationPage.clickFirstNotification();
  await notificationPage.waitForEditForm();
  await notificationPage.clickActivity();
  await notificationPage.clickTextFieldComment();
  const comment = "Automated comment from Playwright test";
  await notificationPage.fillTextComment(comment);
  await notificationPage.summitComment();
});
