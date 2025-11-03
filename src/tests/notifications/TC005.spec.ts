import { mergeTests } from "@playwright/test";
import { expect } from "../../fixtures/LogInPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as notificationPage } from "../../fixtures/NotificationsPageFixture";

const test = mergeTests(loggedInTest, notificationPage);

test.describe("Project Phase Notifications Tests", () => {
  test.afterEach(async ({ notificationPage }) => {
    console.log("Ejecutando afterEach: Revertir fase del proyecto.");
    await notificationPage.goTo();
    await notificationPage.clickNotificationButton();
    await notificationPage.clickAllButton();
    await notificationPage.clickFirstNotification();
    await notificationPage.waitForEditForm();
    await notificationPage.revertPhaseToInitializing();
    console.log("Fase revertida a Initializing.");
  });

  test("TC005: Verify that project phase in a notification can be updated successfully", async ({
    notificationPage,
  }) => {
    await notificationPage.goTo();
    await notificationPage.clickNotificationButton();
    await notificationPage.clickAllButton();
    await notificationPage.clickFirstNotification();
    await notificationPage.waitForEditForm();
    await notificationPage.selectPhase("Planning");
    const newPhase = await notificationPage.getProjectPhaseText();
    expect(newPhase).toEqual("Planning");
  });
});
