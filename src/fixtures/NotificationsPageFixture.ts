import { test as base } from "@playwright/test";
import { NotificationPage } from "../pages/NotificationPage";

export const test = base.extend<{ notificationPage: NotificationPage }>({
  notificationPage: async ({ page }, use) => {
    const notificationPage = new NotificationPage(page);
    await use(notificationPage);
  },
});

export { expect } from "@playwright/test";
