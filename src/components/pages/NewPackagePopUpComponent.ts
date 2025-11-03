import { Page } from "@playwright/test";
import { newPackagePopUpLocators } from "../locators/NewPackagePopUpLocators";

export class NewPackagePopUpComponent {
  constructor(public page: Page) {}

  async waitForFormContainer(timeWaiter: number) {
    await this.page.locator(newPackagePopUpLocators.formContainer).waitFor({ state: "visible", timeout: timeWaiter });
  }

  async fillTaskNameInput(name: string) {
    await this.page.locator(newPackagePopUpLocators.taskNameInput).fill(name);
  }

  async clickSelectProjectInput(){
    await this.page.getByRole('combobox', { name: newPackagePopUpLocators.selectProjectInput, exact: true}).click();
  }

  async waitForProjectsContainer(timeWaiter: number){
    await this.page.locator(newPackagePopUpLocators.projectsContainer).waitFor({ state: "visible", timeout: timeWaiter });
  }

  async selectProjectOption(){
    await this.page.getByText(newPackagePopUpLocators.workPackageModuleProjectOption).click();
  }

  async clickPriorityDropDown(){
    await this.page.locator(newPackagePopUpLocators.priorityInput).click();
  }

  async waitForPriorityContainer(timeWaiter: number){
    await this.page.locator(newPackagePopUpLocators.priorityContainer).waitFor({ state: "visible", timeout: timeWaiter });
  }

  async getPriorityContainer() {
    return this.page.locator(newPackagePopUpLocators.priorityContainer);
  }

  async clickNormalPriorityOption(){
    const priorityContainer = await this.getPriorityContainer();
    await priorityContainer.getByText(newPackagePopUpLocators.normalProrityOption,{ exact: true }).click();
  }

  async setAttachmentFile(imagePath:string){
    await this.page.locator(newPackagePopUpLocators.attachmentFileInput).setInputFiles(imagePath);
  }

  async waitForAttachmentLoadedContainer(timeWaiter:number){
    await this.page.locator(newPackagePopUpLocators.attachementLoadedContainer, { hasText: 'zyro-image.png' }).waitFor({ state: "visible", timeout: timeWaiter });
  }

  async clickSaveButton(){
    await this.page.locator(newPackagePopUpLocators.saveButton).click();
  }

  async clickClosePopUpButton(){
    await this.page.locator(newPackagePopUpLocators.closePopUpButton).click();
  }

  async waitForPopUpClosed(timeWaiter:number){
    await this.page.locator(newPackagePopUpLocators.fileUploadedStatusToaster).waitFor({ state: "detached", timeout: timeWaiter });
  }
}
