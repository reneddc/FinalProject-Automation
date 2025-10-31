import { mergeTests } from "@playwright/test";
import { expect } from "../../fixtures/LogInPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as notificationPage } from "../../fixtures/NotificationsPageFixture";

const test = mergeTests(loggedInTest, notificationPage);

test("TC004: Verify that priority in a notification can be updated successfully", async ({
  notificationPage,
}) => {
  await notificationPage.goTo();
  await notificationPage.clickNotificationButton();
  await notificationPage.waitForNotificationContainer();
  await notificationPage.clickAllButton();
  await notificationPage.clickFirstNotification();
  await notificationPage.waitForEditForm();

  // Cambiar la prioridad (ejemplo: "High")
  await notificationPage.selectPriority("High");
  await notificationPage.messageSuccess();

  // Verificar el mensaje de éxito o que la prioridad se haya actualizado
  const successMsg = await notificationPage.getSuccessWorkMessage();
  expect(successMsg).toContain("updated"); // Ajusta según el mensaje real del sistema
});
