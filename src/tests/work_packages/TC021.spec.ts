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

test("TC021: Verify work package creation with valid values from PACKAGE table", async ({headerComponent, lateralMenuComponent, workPackagesPage, newPackagePopUpComponent, searchResultsPage}) => {
  const timeWaiter = 5000;
  const taskName = "Task from TC002";
  const imagePath = "zyro-image.png";
  await lateralMenuComponent.waitForMenu(timeWaiter);
  await lateralMenuComponent.clickWorkPackagesOption();
  await workPackagesPage.clickCreateNewWorkPackageButton();
  await workPackagesPage.waitForNewRowInTable(timeWaiter);
  await workPackagesPage.fillTaskNameInputFromTable(taskName);
  await workPackagesPage.clickSelectProjectFromTable();
  await workPackagesPage.waitForProjectsContainerFromTable(timeWaiter);
  await workPackagesPage.selectProjectOptionFromTable();
  await headerComponent.fillSearchInput(taskName);
  await searchResultsPage.waitForSearchResultsTable(10000);
  const isTaskCreatedInTable = await searchResultsPage.isTaskCreatedInTable(taskName);
  expect(isTaskCreatedInTable).toBeTruthy();
});