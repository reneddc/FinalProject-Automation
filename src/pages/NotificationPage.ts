import { Page } from "@playwright/test";
import { NotificationLocators } from "../locators/NotificationLocators";

export class NotificationPage {
  constructor(private page: Page) {}

  async goTo() {
    await this.page.goto("/notifications");
  }

  async clickNotificationButton() {
    await this.page.locator(NotificationLocators.notificationButton).click();
  }

  async waitForNotificationContainer(timeout: 2000) {
    const container = this.page.locator(NotificationLocators.allContainer);
    container.waitFor({ state: "visible", timeout });
  }

  async clickAllButton() {
    this.waitForNotificationContainer(2000);
    await this.page.locator(NotificationLocators.allButton).click();
  }

  async clickFirstNotification() {
    await this.page.locator(NotificationLocators.firsAlltNotification).click();
  }

  async clickMoreButton() {
    await this.page.locator(NotificationLocators.moreButton).click();
  }

  async clickGeneratePDF() {
    await this.page.locator(NotificationLocators.optionGeneratePDF).click();
  }

  async clickConfirmationButton() {
    await this.page.locator(NotificationLocators.confirmationButton).click();
  }
}
