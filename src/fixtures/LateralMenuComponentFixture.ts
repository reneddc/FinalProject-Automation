import { test as base } from "@playwright/test";
import { LateralMenuComponent } from "../components/pages/LateralMenuComponent";

export const test = base.extend<{ lateralMenuComponent: LateralMenuComponent }>({
  lateralMenuComponent: async ({ page }, use) => {
    const lateralMenuComponent = new LateralMenuComponent(page);
    await use(lateralMenuComponent);
  },
});

export { expect } from "@playwright/test";
