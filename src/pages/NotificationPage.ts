import { Page } from "@playwright/test";
import { NotificationLocators } from "../locators/NotificationLocators";

export class NotificationPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("//notifications");
  }

  async clickNotificationButton() {
    await this.page.locator(NotificationLocators.notificationButton).click();
  }
  async waitForNotificationContainer(timeout: 2000) {
    const container = this.page.locator(NotificationLocators.allContainer);
    container.waitFor({ state: "visible", timeout });
  }
}
