import { mergeTests } from "@playwright/test";
import { expect } from "../../fixtures/LogInPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as notificationPage } from "../../fixtures/NotificationsPageFixture";

const test = mergeTests(loggedInTest, notificationPage);

test("TC009: Verify that a notification can be downloaded as a PDF", async ({
  notificationPage,
  page,
}) => {
  await notificationPage.goTo();
  await notificationPage.clickNotificationButton();
  await notificationPage.clickAllButton();
  await notificationPage.clickFirstNotification();
  await notificationPage.clickMoreButton();
  await notificationPage.clickGeneratePDF();
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    notificationPage.clickConfirmationButton(),
  ]);
  const fileName = await download.suggestedFilename();
  expect(fileName.toLowerCase()).toContain(".pdf");
  console.log(`PDF downloaded correctly: ${fileName}`);
});
