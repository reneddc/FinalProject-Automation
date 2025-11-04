import { test as base } from "@playwright/test";
import { NewPackageFormPage } from "../pages/NewPackageFormComponent";

export const test = base.extend<{ newPackageFormPage: NewPackageFormPage }>({
  newPackageFormPage: async ({ page }, use) => {
    const newPackageFormPage = new NewPackageFormPage(page);
    await use(newPackageFormPage);
  },
});

export { expect } from "@playwright/test";
