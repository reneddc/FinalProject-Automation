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

  async clickDeleteOption(timeWaiter:number){
    const deleteOption = this.page.locator(searchResultsLocators.deleteOption);
    await deleteOption.waitFor({ state: "visible", timeout: timeWaiter});
    deleteOption.click();
  }

  async waitForDeleteModal(timeWaiter:number){
    const deleteModal = this.page.locator(searchResultsLocators.deleteModal);
    await deleteModal.waitFor({ state: "visible", timeout: timeWaiter });
  }

  async clickDeleteConfirmButton(){
    this.page.locator('button', { hasText: searchResultsLocators.deleteConfirmButton }).click();
  }

  async clickGeneratePDFOption(timeWaiter:number){
    const generatePDFOption = this.page.locator(searchResultsLocators.generatePDFOption);
    await generatePDFOption.waitFor({ state: "visible", timeout: timeWaiter});
    generatePDFOption.click();
  }

  async waitForGeneratePDFModal(timeWaiter:number){
    const generatePDFModal = this.page.locator(searchResultsLocators.generatePDFModal);
    await generatePDFModal.waitFor({ state: "visible", timeout: timeWaiter });
  }

  async clickDownloadPDFButton(){
    await this.page.locator('button', { hasText: searchResultsLocators.downloadPDFButton }).click();
  }
}
