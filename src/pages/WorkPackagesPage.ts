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

}
