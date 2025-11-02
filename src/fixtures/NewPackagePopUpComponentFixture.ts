import { test as base } from "@playwright/test";
import { NewPackagePopUpComponent } from "../components/pages/NewPackagePopUpComponent";

export const test = base.extend<{ newPackagePopUpComponent: NewPackagePopUpComponent }>({
  newPackagePopUpComponent: async ({ page }, use) => {
    const newPackagePopUpComponent = new NewPackagePopUpComponent(page);
    await use(newPackagePopUpComponent);
  },
});

export { expect } from "@playwright/test";
