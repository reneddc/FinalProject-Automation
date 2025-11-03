import { expect, mergeTests } from "@playwright/test";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as notificationPage } from "../../fixtures/NotificationsPageFixture";

const test = mergeTests(loggedInTest, notificationPage);

test.describe("Tag Update and Cleanup (TC003)", () => {
  test.afterEach(
    "Reset tag to initial state (New)",
    async ({ notificationPage }) => {
      await notificationPage.goTo();
      await notificationPage.clickNotificationButton();
      await notificationPage.clickAllButton();
      await notificationPage.clickFirstNotification();
      await notificationPage.selectResetTag();
      const resetTag = await notificationPage.getTagText();
      await expect(resetTag).toContain("New");
    }
  );

  test("TC003: Verify that a tag in a notification can be updated successfully", async ({
    notificationPage,
  }) => {
    const newTag = "On hold";
    await notificationPage.goTo();
    await notificationPage.clickNotificationButton();
    await notificationPage.clickAllButton();
    await notificationPage.clickFirstNotification();
    await notificationPage.clickDropDownTag();
    await notificationPage.selectOnHoldTag();
    const tagName = await notificationPage.getTagText();
    await expect(tagName).toContain(newTag);
    await expect(tagName).not.toHaveLength(0);
  });
});
