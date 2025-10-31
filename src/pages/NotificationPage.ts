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

  async waitForConfirmationButton() {
    const confirmation = await this.page.locator(
      NotificationLocators.confirmationButton
    );
    confirmation.waitFor({ state: "visible", timeout: 3000 });
  }
  async clickConfirmationButton() {
    this.waitForConfirmationButton();
    await this.page.locator(NotificationLocators.confirmationButton).click();
  }

  async clickSetReminderButton() {
    await this.page.locator(NotificationLocators.setReminderButton).click();
  }

  // async waitForDropDown() {
  //   const dropdown = await this.page.locator(
  //     NotificationLocators.dropDownReminder
  //   );
  //   dropdown.waitFor({ state: "visible", timeout: 5000 });
  // }
  // async selectReminderTomorrow() {
  //   this.waitForDropDown();
  //   await this.page.locator(NotificationLocators.optionReminderTomorrow)
  //     .selectOption;
  // }

  async waitForReminderSuccess() {
    const banner = await this.page.locator(
      NotificationLocators.successMesageReminderContainer
    );
    banner.waitFor({ state: "visible", timeout: 300 });
  }

  async getSuccessReminderMessage() {
    this.waitForReminderSuccess();
    return await this.page
      .locator(NotificationLocators.successMessage)
      .innerText();
  }

  async waitForModalReminderCreation() {
    const modal = await this.page.locator(
      NotificationLocators.modalSetReminderContainer
    );
    modal.waitFor({ state: "visible", timeout: 2000 });
  }

  async clickConfirmReminder() {
    this.waitForModalReminderCreation();
    await this.page.locator(NotificationLocators.createReminderButton).click();
  }
}
