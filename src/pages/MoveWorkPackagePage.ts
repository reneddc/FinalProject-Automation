import { Page } from "@playwright/test";
import { moveWorkPackageLocators } from "../locators/MoveWorkPackageLocators";

export class MoveWorkPackagePage {
  constructor(public page: Page) {}

  async waitForMoveForm(timeWaiter:number) {
    await this.page.locator(moveWorkPackageLocators.moveForm).waitFor({ state: "visible", timeout: timeWaiter });
  }

  async clickSelectProjectDropDown(){
    await this.page.locator(moveWorkPackageLocators.projectDropdown).click();
  }

  async selectScrumProject(){
    await this.page.locator(moveWorkPackageLocators.scrumProjectOption, { hasText: 'Scrum project' }).click();
  }

  async clickMoveAndFollowButton(){
    await this.page.getByRole('button', { name: moveWorkPackageLocators.moveAndFollowButton}).click();
  }

  async getActivityWorkPackage(timeWaiter:number){
    const activityWorkPackage = this.page.locator(moveWorkPackageLocators.activitySection);
    await activityWorkPackage.waitFor({ state: "visible", timeout: timeWaiter });
    return activityWorkPackage;
  }
}
