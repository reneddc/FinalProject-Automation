import { mergeTests } from "@playwright/test";
import { test as workPackagesTest, expect } from "../../fixtures/WorkPackagesPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as lateralMenuTest } from "../../fixtures/LateralMenuComponentFixture";
import { test as newPackagePopUpTest } from "../../fixtures/NewPackageFormPageFixture";
import { test as headerTest } from "../../fixtures/HeaderComponentFixture";
import { test as searchResultsTest } from "../../fixtures/SearchResultsPageFixture copy";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, lateralMenuTest, workPackagesTest, newPackagePopUpTest, headerTest, searchResultsTest);

dotenv.config();

test("TC021: Verify work package creation with valid values from PACKAGE table", async ({headerComponent, lateralMenuComponent, workPackagesPage, newPackageFormPage: newPackagePopUpComponent, searchResultsPage}) => {
  const timeWaiter = 5000;
  const timeStamp = Date.now();
  const taskName = `TC021: ${timeStamp}`;
  await lateralMenuComponent.waitForMenu(timeWaiter);
  await lateralMenuComponent.clickWorkPackagesOption();
  await workPackagesPage.clickCreateNewWorkPackageButton();
  await workPackagesPage.waitForNewRowInTable(timeWaiter);
  await workPackagesPage.fillTaskNameInputFromTable(taskName);
  await workPackagesPage.clickSelectProjectFromTable();
  await workPackagesPage.waitForProjectsContainerFromTable(timeWaiter);
  await workPackagesPage.selectProjectOptionFromTable();
  await workPackagesPage.clickFilterButton();
  await workPackagesPage.fillWorkPackagesFilterByTaskName(taskName, timeWaiter);
  const packageCreated = await workPackagesPage.getWorkPackageCreatedRow(timeWaiter);
  await expect(packageCreated).toHaveCount(1);
  await expect(packageCreated).toContainText(taskName);
});