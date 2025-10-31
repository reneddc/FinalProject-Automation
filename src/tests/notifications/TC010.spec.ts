import { mergeTests } from "@playwright/test";
import { expect } from "../../fixtures/LogInPageFixture";
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

  // Abre la pestaña de actividad
  await notificationPage.clickActivity();

  // Agrega un comentario
  await notificationPage.clickTextFieldComment();
  const comment = "Automated comment from Playwright test";
  await notificationPage.fillTextComment(comment);
  await notificationPage.summitComment();

  // Espera que aparezca el comentario o toast de confirmación
  await notificationPage.waitToastPriority(); // reutilizamos método de espera
  const message = await notificationPage.getSuccessWorkMessage();
  expect(message).toContain("comment"); // ajusta con el mensaje real que muestra el sistema
});
