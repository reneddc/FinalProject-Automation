import { Page } from "@playwright/test";
import { searchResultsLocators } from "../locators/SearchResultsLocators";

export class SearchResultsPage {
  constructor(public page: Page) {}

  async waitForSearchResultsTable(timeWaiter:number) {
    const searchResultsTable = this.page.locator(searchResultsLocators.searchResultsTable);
    await searchResultsTable.waitFor({ state: "visible", timeout: timeWaiter });
  }

  async isTaskCreatedInTable(taskName: string): Promise<boolean> {
    const coincidences = this.page.locator(searchResultsLocators.searchResultsTable).getByText(taskName, { exact: false });
    return await coincidences.count() > 0;
  }

  async clickfirstRowThreePoints(){
    await this.page.locator(searchResultsLocators.firstRowThreePoints).first().click();
  }

  async clickMoveToProjectOption(timeWaiter:number){
    const moveToAnotherProjectOption = this.page.locator(searchResultsLocators.moveToAnotherProjectOption);
    await moveToAnotherProjectOption.waitFor({ state: "visible", timeout: timeWaiter});
    moveToAnotherProjectOption.click();
  }
}
