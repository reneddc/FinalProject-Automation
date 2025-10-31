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
}
