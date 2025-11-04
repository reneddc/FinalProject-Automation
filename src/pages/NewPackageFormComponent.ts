import { Page } from "@playwright/test";
import { newPackageFormLocators } from "../locators/NewPackageFormLocators";

export class NewPackageFormPage {
  constructor(public page: Page) {}

  async waitForFormContainer(timeWaiter: number) {
    await this.page.locator(newPackageFormLocators.formContainer).waitFor({ state: "visible", timeout: timeWaiter });
  }

  async fillTaskNameInput(taskName: string) {
    await this.page.locator(newPackageFormLocators.taskNameInput).fill(taskName);
  }

  async clickSelectProjectInput(){
    await this.page.getByRole('combobox', { name: newPackageFormLocators.selectProjectInput, exact: true}).click();
  }

  async waitForProjectsContainer(timeWaiter: number){
    await this.page.locator(newPackageFormLocators.projectsContainer).waitFor({ state: "visible", timeout: timeWaiter });
  }

  async selectProjectOption(){
    await this.page.getByText(newPackageFormLocators.workPackageModuleProjectOption).click();
  }

  async clickPriorityDropDown(){
    await this.page.locator(newPackageFormLocators.priorityInput).click();
  }

  async waitForPriorityContainer(timeWaiter: number){
    await this.page.locator(newPackageFormLocators.priorityContainer).waitFor({ state: "visible", timeout: timeWaiter });
  }

  async getPriorityContainer() {
    return this.page.locator(newPackageFormLocators.priorityContainer);
  }

  async clickNormalPriorityOption(){
    const priorityContainer = await this.getPriorityContainer();
    await priorityContainer.getByText(newPackageFormLocators.normalProrityOption,{ exact: true }).click();
  }

  async setAttachmentFile(imagePath:string){
    await this.page.locator(newPackageFormLocators.attachmentFileInput).setInputFiles(imagePath);
  }

  async waitForAttachmentLoadedContainer(timeWaiter:number){
    await this.page.locator(newPackageFormLocators.attachementLoadedContainer, { hasText: 'zyro-image.png' }).waitFor({ state: "visible", timeout: timeWaiter });
  }

  async clickSaveButton(){
    await this.page.locator(newPackageFormLocators.saveButton).click();
  }

  async clickCloseFormButton(){
    await this.page.locator(newPackageFormLocators.closeFormButton).click();
  }

  async waitForFileUploadedToasterClosed(timeWaiter:number){
    await this.page.locator(newPackageFormLocators.fileUploadedStatusToaster).waitFor({ state: "detached", timeout: timeWaiter });
  }

  async waitForTaskCreted(timeWaiter:number){
    await this.page.locator(newPackageFormLocators.saveButton).waitFor({ state: "detached", timeout: timeWaiter });
  }
}
