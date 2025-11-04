import { Page } from "@playwright/test";
import { workPackagesLocators } from "../locators/WorkPackagesLocators"
import { time } from "console";

export class WorkPackagesPage {
  constructor(public page: Page) {}

  async clickCreateWorkPackageButton(timeWaiter:number) {
    const createButton = this.page.locator(workPackagesLocators.createButton);
    await createButton.waitFor({ state: "visible", timeout: timeWaiter });
    createButton.click();
  }

  async waitForPackageTypesContainer(timeWaiter:number) {
    const typesContainer = this.page.locator(workPackagesLocators.packageTypesContainer);
    await typesContainer.waitFor({ state: "visible", timeout: timeWaiter });
  }

  async clickTaskTypeOption() {
    this.page.getByRole('menuitem', { name: workPackagesLocators.taskTypeOption, exact: true }).click();
  }

  async getErrorMessageToaster(timeWaiter:number) {
    const errorMessageToaster = this.page.locator(workPackagesLocators.errorMessageToaster);
    await errorMessageToaster.waitFor({ state: "visible", timeout: timeWaiter });
    return errorMessageToaster;
  }

  async clickCreateNewWorkPackageButton(){
    await this.page.locator(`button:has-text("${workPackagesLocators.createNewWorkPackageButton}")`).click();
  }

  async waitForNewRowInTable(timeWaiter:number){
    await this.page.locator(workPackagesLocators.newRowInTable).waitFor({ state: "visible", timeout: timeWaiter });
  }

  async fillTaskNameInputFromTable(name:string){
    await this.page.locator(workPackagesLocators.taskNameInputFromTable).fill(name);
  }

  async clickSelectPackageTypeFromTable(){
    await this.page.locator(workPackagesLocators.packageTypeInputFromTable).click();
  }

  async waitForPackageTypesContainerFromTable(timeWaiter:number){
    await this.page.locator(workPackagesLocators.packageTypesContainerFromTable).waitFor({ state: "visible", timeout: timeWaiter });
  }

  async clickTaskTypeOptionFromTable(){
    await this.page.locator(workPackagesLocators.taskTypeOptionFromTable).click();
  }

  async clickSelectProjectFromTable(){
    await this.page.locator(workPackagesLocators.projectInputFromTable).click();
  }

  async waitForProjectsContainerFromTable(timeWaiter:number){
    await this.page.getByRole('listbox', { name: workPackagesLocators.projectContainerFromTable }).waitFor({ state: "visible", timeout: timeWaiter });
  }

  async selectProjectOptionFromTable(){
    await this.page.getByText(workPackagesLocators.workPackageModuleProjectOption).click();
  }

  async waitForWorkPackagesTable(timeWaiter:number){
    await this.page.locator(workPackagesLocators.workPackagesToolbar).waitFor({ state: "visible", timeout: timeWaiter });
  }

  async  clickFilterButton(){
    await this.page.locator(workPackagesLocators.filterButton).click();
  }

  async fillWorkPackagesFilterByTaskName(taskName:string, timeWaiter:number){
    const filterInput = this.page.locator(workPackagesLocators.filterByTextInput);
    await filterInput.waitFor({ state: "visible", timeout: timeWaiter });
    await filterInput.fill(taskName);
    await this.page.waitForTimeout(5000);
  }

  async getWorkPackageCreatedRow(timeWaiter:number):Promise<any>{
    const firstRowInTable = this.page.locator(workPackagesLocators.firstRowInTable);
    await firstRowInTable.waitFor({ state: "visible", timeout: timeWaiter });
    return firstRowInTable;
  }

  async clickfirstRowThreePoints(){
    await this.page.locator(workPackagesLocators.firstRowThreePoints).click();
  }

  async clickMoveToProjectOption(timeWaiter:number){
    const moveToAnotherProjectOption = this.page.locator(workPackagesLocators.moveToAnotherProjectOption);
    await moveToAnotherProjectOption.waitFor({ state: "visible", timeout: timeWaiter});
    moveToAnotherProjectOption.click();
  }

  async clickDeleteOption(timeWaiter:number){
    const deleteOption = this.page.locator(workPackagesLocators.deletePackageOption);
    await deleteOption.waitFor({ state: "visible", timeout: timeWaiter});
    deleteOption.click();
  }

   async waitForDeleteModal(timeWaiter:number){
      const deleteModal = this.page.locator(workPackagesLocators.deleteModal);
      await deleteModal.waitFor({ state: "visible", timeout: timeWaiter });
    }
  
    async clickDeleteConfirmButton(){
      this.page.locator('button', { hasText: workPackagesLocators.deleteConfirmButton }).click();
    }
  
    async clickGeneratePDFOption(timeWaiter:number){
      const generatePDFOption = this.page.locator(workPackagesLocators.generatePDFOption);
      await generatePDFOption.waitFor({ state: "visible", timeout: timeWaiter});
      generatePDFOption.click();
    }
  
    async waitForGeneratePDFModal(timeWaiter:number){
      const generatePDFModal = this.page.locator(workPackagesLocators.generatePDFModal);
      await generatePDFModal.waitFor({ state: "visible", timeout: timeWaiter });
    }
  
    async clickDownloadPDFButton(){
      await this.page.locator('button', { hasText: workPackagesLocators.downloadPDFButton }).click();
    }

    async getSuccessUpdateToaster(timeWaiter:number):Promise<any> {
      const succesfulUpdateToaster = this.page.locator(workPackagesLocators.successUpdateToaster);
      await succesfulUpdateToaster.waitFor({ state: "visible", timeout: timeWaiter });
      return succesfulUpdateToaster;
    }

    async getSuccessDeleteToaster(timeWaiter:number):Promise<any> {
      const succesfulDeleteToaster = this.page.locator(workPackagesLocators.successDeleteToaster);
      await succesfulDeleteToaster.waitFor({ state: "visible", timeout: timeWaiter });
      return succesfulDeleteToaster;
    }
}
