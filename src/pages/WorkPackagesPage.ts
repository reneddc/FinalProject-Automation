import { Page } from "@playwright/test";
import { workPackagesLocators } from "../locators/WorkPackagesLocators"

export class WorkPackagesPage {
  constructor(public page: Page) {}

  async clickAddWorkPackageButton(timeWaiter:number) {
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
}
