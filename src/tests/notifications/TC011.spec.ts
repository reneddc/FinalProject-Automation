import { expect, mergeTests } from "@playwright/test";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as notificationPage } from "../../fixtures/NotificationsPageFixture";

const test = mergeTests(loggedInTest, notificationPage);
test.describe("Reminder Creation and Cleanup (TC011)", () => {
  const reminder_option = "Tomorrow";

  test.afterEach(
    "Clean up reminder set by TC011",
    async ({ notificationPage }) => {
      await notificationPage.goTo();
      await notificationPage.clickNotificationButton();
      await notificationPage.clickAllButton();
      await notificationPage.clickFirstNotification();
      await notificationPage.clickSetReminderButton();
      await notificationPage.clickRemoveReminderButton();
      const successMessageLocator =
        await notificationPage.getSuccessReminderLocator();
      await expect(successMessageLocator).toBeVisible();
      await expect(successMessageLocator).toContainText(
        "deleted successfully",
        {
          ignoreCase: true,
        }
      );
    }
  );

  test("TC011: Verify that a notification can set a reminder", async ({
    notificationPage,
  }) => {
    const expectedText = "successfully";
    const reminder_option = "Tomorrow";
    await notificationPage.goTo();
    await notificationPage.clickNotificationButton();
    await notificationPage.clickAllButton();
    await notificationPage.clickFirstNotification();
    await notificationPage.clickSetReminderButton();
    await notificationPage.selectSimpleReminder(reminder_option);
    await notificationPage.clickConfirmReminder();
    const successMessageLocator =
      await notificationPage.getSuccessReminderLocator();
    await expect(successMessageLocator).toBeVisible();
    await expect(successMessageLocator).toContainText(expectedText, {
      ignoreCase: true,
    });
  });
});
