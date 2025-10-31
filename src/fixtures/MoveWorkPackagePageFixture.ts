import { test as base } from "@playwright/test";
import { MoveWorkPackagePage } from "../pages/MoveWorkPackagePage";

export const test = base.extend<{ moveWorkPackagesPage: MoveWorkPackagePage }>({
  moveWorkPackagesPage: async ({ page }, use) => {
    const moveWorkPackagesPage = new MoveWorkPackagePage(page);
    await use(moveWorkPackagesPage);
  },
});

export { expect } from "@playwright/test";
