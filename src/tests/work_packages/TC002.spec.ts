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

test("TC002: Verify work package creation as Task with valid values", async ({headerComponent, lateralMenuComponent, workPackagesPage, newPackagePopUpComponent, searchResultsPage}) => {
  const timeWaiter = 5000;
  const taskName = "Task from TC002";
  const imagePath = "zyro-image.png";
  await lateralMenuComponent.waitForMenu(timeWaiter);
  await lateralMenuComponent.clickWorkPackagesOption();
  await workPackagesPage.clickAddWorkPackageButton(timeWaiter);
  await workPackagesPage.waitForPackageTypesContainer(timeWaiter);
  await workPackagesPage.clickTaskTypeOption();
  await newPackagePopUpComponent.waitForFormContainer(timeWaiter);
  await newPackagePopUpComponent.fillTaskNameInput(taskName);
  await newPackagePopUpComponent.clickSelectProjectInput();
  await newPackagePopUpComponent.waitForProjectsContainer(timeWaiter);
  await newPackagePopUpComponent.selectProjectOption();
  await newPackagePopUpComponent.clickPriorityDropDown();
  await newPackagePopUpComponent.waitForPriorityContainer(timeWaiter);
  await newPackagePopUpComponent.clickNormalPriorityOption();
  await newPackagePopUpComponent.setAttachmentFile(imagePath);//This is a particular step
  await newPackagePopUpComponent.waitForPopUpClosed(30000);
  await newPackagePopUpComponent.clickSaveButton();
  await newPackagePopUpComponent.clickClosePopUpButton();
  await headerComponent.fillSearchInput(taskName);
  await searchResultsPage.waitForSearchResultsTable(10000);
  const isTaskCreatedInTable = await searchResultsPage.isTaskCreatedInTable(taskName);
  expect(isTaskCreatedInTable).toBeTruthy();
});