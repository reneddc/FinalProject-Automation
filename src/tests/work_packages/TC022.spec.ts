import { mergeTests } from "@playwright/test";
import { test as workPackagesTest, expect } from "../../fixtures/WorkPackagesPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as lateralMenuTest } from "../../fixtures/LateralMenuComponentFixture";
import { test as newPackageFormTest } from "../../fixtures/NewPackageFormPageFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, lateralMenuTest, workPackagesTest, newPackageFormTest);

dotenv.config();

test("TC022: Verify failed work package creation with empty values", async ({lateralMenuComponent, workPackagesPage, newPackageFormPage}) => {
  const timeWaiter = 5000;
  await lateralMenuComponent.waitForMenu(timeWaiter);
  await lateralMenuComponent.clickWorkPackagesOption();
  await workPackagesPage.clickCreateWorkPackageButton(timeWaiter);
  await workPackagesPage.waitForPackageTypesContainer(timeWaiter);
  await workPackagesPage.clickTaskTypeOption();
  await newPackageFormPage.waitForFormContainer(timeWaiter);
  await newPackageFormPage.clickSaveButton();
  const errorMessageToaster = await workPackagesPage.getErrorMessageToaster(timeWaiter);
  expect(errorMessageToaster).toContainText("Subject can't be blank.");
  expect(errorMessageToaster).toContainText("Project can't be blank.");
});