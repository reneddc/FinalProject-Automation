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

  // Actualiza la fase del proyecto (por ejemplo: “Development”)
  await notificationPage.selectPhase("Development");

  // Verifica el mensaje de éxito
  const message = await notificationPage.getSuccessWorkMessage();
  expect(message).toContain("updated"); // ajusta si el texto del toast cambia
});
