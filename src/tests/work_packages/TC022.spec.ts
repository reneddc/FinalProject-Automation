import { mergeTests } from "@playwright/test";
import { test as workPackagesTest, expect } from "../../fixtures/WorkPackagesPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as lateralMenuTest } from "../../fixtures/LateralMenuComponentFixture";
import { test as newPackagePopUpTest } from "../../fixtures/NewPackagePopUpComponentFixture";
import { test as headerTest } from "../../fixtures/HeaderComponentFixture";
import { test as searchResultsTest } from "../../fixtures/SearchResultsPageFixture copy";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, lateralMenuTest, workPackagesTest, newPackagePopUpTest, headerTest, searchResultsTest);

dotenv.config();

test("TC022: Verify failed work package creation with empty values", async ({headerComponent, lateralMenuComponent, workPackagesPage, newPackagePopUpComponent, searchResultsPage}) => {
  const timeWaiter = 5000;
  const taskName = "Task from TC002";
  await lateralMenuComponent.waitForMenu(timeWaiter);
  await lateralMenuComponent.clickWorkPackagesOption();
  await workPackagesPage.clickAddWorkPackageButton(timeWaiter);
  await workPackagesPage.waitForPackageTypesContainer(timeWaiter);
  await workPackagesPage.clickTaskTypeOption();
  await newPackagePopUpComponent.waitForFormContainer(timeWaiter);
  await newPackagePopUpComponent.clickSaveButton();
  const errorMessageToaster = await workPackagesPage.getErrorMessageToaster(timeWaiter);
  expect(errorMessageToaster).toContainText("Subject can't be blank.");
  expect(errorMessageToaster).toContainText("Project can't be blank.");
});