import { Page } from "@playwright/test";
import { NotificationLocators } from "../locators/NotificationLocators";
import { NOTFOUND, TIMEOUT } from "dns";
import { time } from "console";

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
    container.waitFor({ state: "visible", timeout: 2000 });
  }

  async clickAllButton() {
    this.waitForNotificationContainer();
    await this.page.locator(NotificationLocators.allButton).click();
  }

  async clickFirstNotification() {
    await this.page.locator(NotificationLocators.firsAlltNotification).click();
  }

  async waitForEditForm() {
    const edit = await this.page.locator(NotificationLocators.editForm);
    edit.waitFor({ state: "visible", timeout: 4000 });
  }

  async clickMoreButton() {
    this.waitForEditForm();
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
    this.waitForEditForm();
    await this.page.locator(NotificationLocators.setReminderButton).click();
  }

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

  async clickActivity() {
    this.waitForEditForm();
    await this.page.locator(NotificationLocators.activityOption).click();
  }

  async clickTextFieldComment() {
    this.waitForEditForm();
    await this.page.locator(NotificationLocators.commentEmptyField).click();
  }

  async waitForTextBoxComment() {
    const comment = await this.page.locator(NotificationLocators.commentInput);
    comment.waitFor({ state: "visible", timeout: 2000 });
  }

  async fillTextComment(comment: string) {
    this.waitForTextBoxComment();
    await this.page.locator(NotificationLocators.commentInput).fill(comment);
  }

  async summitComment() {
    await this.page.locator(NotificationLocators.summitComment).click();
  }

  async clickDropDownTag() {
    this.waitForEditForm();
    await this.page.locator(NotificationLocators.dropDownTags).click();
  }

  async selectOnHoldTag() {
    await this.page.locator(NotificationLocators.optionOnHold).selectOption;
  }

  async getTagText() {
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
    toast.waitFor({ state: "visible", timeout: 2000 });
  }

  async messageSuccess() {
    this.waitToastPriority();
    await this.page.locator(NotificationLocators.succesPriorityMessage).click();
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
    const option = this.page.locator(type);
    await option.click();
  }

  async fillTitle(title: string) {
    this.waitForEditForm();
    await this.page.locator(NotificationLocators.titleNotification).fill(title);
  }

  async clickWork() {
    await this.waitForEditForm();
    await this.page.locator(NotificationLocators.estimateWork).click();
  }

  async waitForEstimateForm() {
    const modal = await this.page.locator(
      NotificationLocators.estimateWorkModal
    );
    await modal.waitFor({ state: "visible", timeout: 2000 });
  }

  async fillWork(work: string) {
    await this.waitForEstimateForm();
    await this.page.locator(NotificationLocators.workInput).fill(work);
  }

  async clickSummitWork() {
    await this.page.locator(NotificationLocators.saveWork).click();
  }

  async waitForWorkToast() {
    const toast = this.page.locator(
      NotificationLocators.modalSuccessfullPriority
    );
    await toast.waitFor({ state: "visible", timeout: 2000 });
    return toast;
  }

  async getSuccessWorkMessage() {
    const message = this.page.locator(
      NotificationLocators.succesPriorityMessage
    );
    return await message.innerText();
  }
}
