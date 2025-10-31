import { test as base } from "@playwright/test";
import { SearchResultsPage } from "../pages/SearchResultsPage";

export const test = base.extend<{ searchResultsPage: SearchResultsPage }>({
  searchResultsPage: async ({ page }, use) => {
    const searchResultsPage = new SearchResultsPage(page);
    await use(searchResultsPage);
  },
});

export { expect } from "@playwright/test";
