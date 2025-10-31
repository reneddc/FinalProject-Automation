import { Page } from "@playwright/test";
import { HeaderLocators } from "../locators/HeaderLocators copy";

export class HeaderComponent {
  constructor(public page: Page) {}

  async fillSearchInput(taskName: string) {
    const searchInput = this.page.getByRole('combobox', { name: HeaderLocators.searchInput });
    await searchInput.fill(taskName);
    const searchOptionsContainer = this.page.locator(HeaderLocators.searchOptionsContainer, { hasText: taskName })
    await searchOptionsContainer.waitFor({ state: "visible", timeout: 5000 });
    searchInput.press('Enter');
  }
}
