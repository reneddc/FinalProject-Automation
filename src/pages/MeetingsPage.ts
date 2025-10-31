import { Page } from "@playwright/test";
import { MeetingsLocators } from "../locators/MeetingsLocators";

export class MeetingsPage {
  constructor(public page: Page) {}

  async goTo() {
    await this.page.goto("/meetings", { waitUntil: "load" });
  }

  async getAddMeetingButton() {
    return this.page
      .locator(MeetingsLocators.buttons)
      .filter({ hasText: "Meeting" });
  }

  async getOneTimeButton() {
    return this.page.getByRole("menuitem").filter({ hasText: "One-Time" });
  }

  async getRecurringButton() {
    return this.page.getByRole("menuitem").filter({ hasText: "Recurring" });
  }

  async fillTitle(title: string) {
    await this.page.locator(MeetingsLocators.meetingTitleField).fill(title);
  }

  async selectProjectByIndex(projectName: string) {
    await this.page.locator(MeetingsLocators.meetingProjectDropdown).click();
    await this.page.getByRole("option").filter({ hasText: projectName }).click();
  }

  async getCreateOneTimeMeetingButton() {
    return this.page.getByText("Create meeting", { exact: true });
  }

  async getCreateRecurringMeetingButton() {
    return this.page.getByText("Create meeting series", { exact: true });
  }

  async getMeetingCreated(meetingTitle: string) {
    return this.page.locator(MeetingsLocators.meetingTableRow).filter({ hasText: meetingTitle });
  }

  async getMeetingCreatedOptions(meetingTitle: string) {
    return (await this.getMeetingCreated(meetingTitle)).locator(MeetingsLocators.meetingCreatedOptionsButton);
  }

  async getDeleteButton() {
    return this.page.getByText("Delete meeting", { exact: true });  
  }

   async getDeleteConfirmatioButton() {
    return this.page.getByText("Delete", { exact: true });  
  }

  async getRecurringMeetingCreated(recMeetingTitle: string) {
    return this.page.locator(MeetingsLocators.sideMeetingsMenuButtons).filter({ hasText: recMeetingTitle });
  }

  async getRecurringMeetingTitle() {
    return this.page.locator(MeetingsLocators.recurringMeetingTitle);
  }

  async getRecurringMeetingOptionsButton() {
    return this.page.locator(MeetingsLocators.recurringMeetingOptionsButton);
  }

  async getDeleteSeriesButton() {
    return this.page.getByText("Delete meeting series", { exact: true }).nth(1);  
  }

  async getCheckConfirmationButton() {
    return this.page.locator(MeetingsLocators.checkDeleteConfirmationButton);
  }

  async getDeletePermanentlyButton() {
    return this.page.getByText("Delete permanently", { exact: true });  
  }

  async getCancelMeetingButton() {
    return this.page.getByText("Cancel", { exact: true });
  }

  async getTitleErrorMessage() {
    return this.page.locator(MeetingsLocators.errorMessage).filter({ hasText: "Title can't be blank." });
  }

  async getProjectErrorMessage() {
    return this.page.locator(MeetingsLocators.errorMessage).filter({ hasText: "Project can't be blank." });
  }
}


