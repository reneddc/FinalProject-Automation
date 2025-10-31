import { Page } from "@playwright/test";
import { lateralMenuLocators } from "../locators/LaterlMenuLocators";

export class LateralMenuComponent {
  constructor(public page: Page) {}

  async waitForMenu(timeWaiter: number) {
    await this.page.locator(lateralMenuLocators.menuContainer).waitFor({ state: "visible", timeout: timeWaiter });
  }

  async clickWorkPackagesOption() {
    await this.page.locator(lateralMenuLocators.workPackagesOption).click();
  }

  async clickSearchByNameProjectInput() {
    await this.page.locator(lateralMenuLocators.projectsDropDown).click();
  }

  async waitForProjectsContainer(timeWaiter: number) {
    await this.page.locator(lateralMenuLocators.searchProjectsContainer).waitFor({ state: "visible", timeout: timeWaiter });
  }

  async selectPackageModuleProjectOption() {
    await this.page.getByText(lateralMenuLocators.packageModuleProjectOption).click();
  }
}
