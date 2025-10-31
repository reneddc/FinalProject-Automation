import { test as base } from "@playwright/test";
import { WorkPackagesPage } from "../pages/WorkPackagesPage";

export const test = base.extend<{ workPackagesPage: WorkPackagesPage }>({
  workPackagesPage: async ({ page }, use) => {
    const workPackagesPage = new WorkPackagesPage(page);
    await use(workPackagesPage);
  },
});

export { expect } from "@playwright/test";
