import { Page } from "@playwright/test";
import { NotificationLocators } from "../locators/NotificationLocators";

export class NotificationPage {
  constructor(public page: Page) {}

  async goTo() {
    await this.page.goto("/notifications");
  }

  async clickNotificationButton() {
    await this.page.locator(NotificationLocators.notificationButton).click();
  }

  async waitForNotificationContainer() {
    const container = await this.page.locator(
      NotificationLocators.allContainer
    );
    await container.waitFor({ state: "visible", timeout: 5000 });
  }

  async clickAllButton() {
    await this.waitForNotificationContainer();
    await this.page.locator(NotificationLocators.allButton).click();
  }

  async clickFirstNotification() {
    await this.page.locator(NotificationLocators.firsAlltNotification).click();
  }

  async waitForEditForm() {
    const edit = this.page.locator(NotificationLocators.editForm);
    await edit.waitFor({ state: "visible", timeout: 10000 });
  }

  async clickMoreButton() {
    await this.waitForEditForm();
    await this.page.locator(NotificationLocators.moreButton).click();
  }

  async clickGeneratePDF() {
    await this.page.locator(NotificationLocators.optionGeneratePDF).click();
  }

  async waitForConfirmationButton() {
    const confirmation = await this.page.locator(
      NotificationLocators.confirmationButton
    );
    await confirmation.waitFor({ state: "visible", timeout: 5000 });
  }

  async clickConfirmationButton() {
    await this.waitForConfirmationButton();
    await this.page.locator(NotificationLocators.confirmationButton).click();
  }

  async clickSetReminderButton() {
    await this.waitForEditForm();
    await this.page.locator(NotificationLocators.setReminderButton).click();
  }

  async waitForReminderSuccess() {
    const banner = await this.page.locator(
      NotificationLocators.successMesageReminderContainer
    );
    await banner.waitFor({ state: "visible", timeout: 5000 });
  }

  async getSuccessReminderMessage() {
    await this.waitForReminderSuccess();
    return await this.page
      .locator(NotificationLocators.successMessage)
      .first()
      .innerText();
  }

  async waitForModalReminderCreation() {
    const modal = await this.page.locator(
      NotificationLocators.modalSetReminderContainer
    );
    await modal.waitFor({ state: "visible", timeout: 5000 });
  }

  async clickConfirmReminder() {
    await this.waitForModalReminderCreation();
    await this.page.locator(NotificationLocators.createReminderButton).click();
  }

  async clickActivity() {
    await this.waitForEditForm();
    await this.page.locator(NotificationLocators.activityOption).click();
  }

  async clickTextFieldComment() {
    await this.waitForEditForm();
    await this.page.locator(NotificationLocators.commentEmptyField).click();
  }

  async waitForTextBoxComment() {
    const comment = this.page.locator(NotificationLocators.commentInput);
    await comment.waitFor({ state: "visible", timeout: 5000 });
  }

  async fillTextComment(comment: string) {
    await this.waitForTextBoxComment();
    await this.page.locator(NotificationLocators.commentInput).fill(comment);
  }

  async summitComment() {
    await this.page.locator(NotificationLocators.summitComment).click();
  }

  async clickDropDownTag() {
    await this.waitForEditForm();
    await this.page.locator(NotificationLocators.dropDownTags).click();
  }

  async selectOnHoldTag() {
    await this.page.locator(NotificationLocators.optionOnHold).click();
  }

  async selectOriginalTag() {
    const tagName = await this.page.locator(NotificationLocators.dropDownTags)
      .innerText;
    await this.page
      .locator(NotificationLocators.dropDownTags)
      .selectOption(`text=${tagName}`);
  }

  async getTagText() {
    const waiter = await this.page.locator(NotificationLocators.dropDownTags);
    await waiter.waitFor({ state: "visible", timeout: 5000 });
    return await this.page.locator(NotificationLocators.textTag).innerText();
  }

  async clickDropDownPriority() {
    await this.waitForEditForm();
    const element = this.page.locator(NotificationLocators.priorityDropDown);
    await element.scrollIntoViewIfNeeded(); // asegura visibilidad
    await element.click();
  }

  async selectPriority(type: string) {
    await this.clickDropDownPriority();
    const option = this.page.locator(`text=${type}`);
    await option.click();
  }

  async waitToastPriority() {
    const toast = await this.page.locator(
      NotificationLocators.modalSuccessfullPriority
    );
    await toast.waitFor({ state: "visible", timeout: 5000 });
  }

  async messageSuccess() {
    await this.waitToastPriority();
    // Just wait for success message, don't click it
  }

  async clickPhaseDropDown() {
    await this.waitForEditForm();
    const element = this.page.locator(
      NotificationLocators.projectPhaseDropDown
    );
    await element.click();
  }

  async selectPhase(type: string) {
    await this.clickPhaseDropDown();
    // Wait a bit for dropdown to open
    await this.page.waitForTimeout(500);
    const option = this.page.locator(`text=${type}`);
    await option.waitFor({ state: "visible", timeout: 3000 });
    await option.click();
  }
}
