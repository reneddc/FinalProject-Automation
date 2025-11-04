import { mergeTests } from "@playwright/test";
import { test as workPackagesTest, expect } from "../../fixtures/WorkPackagesPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as lateralMenuTest } from "../../fixtures/LateralMenuComponentFixture";
import { test as newPackagePopUpTest } from "../../fixtures/NewPackageFormPageFixture";
import { test as headerTest } from "../../fixtures/HeaderComponentFixture";
import { test as searchResultsTest } from "../../fixtures/SearchResultsPageFixture copy";
import { test as moveWorkPackagesTest } from "../../fixtures/MoveWorkPackagePageFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, lateralMenuTest, workPackagesTest, newPackagePopUpTest, headerTest, searchResultsTest, moveWorkPackagesTest);

dotenv.config();

test("TC023: Verify work package move to other project", async ({headerComponent, lateralMenuComponent, workPackagesPage, newPackageFormPage, searchResultsPage, moveWorkPackagesPage}) => {
  const timeWaiter = 5000;
  const timeStamp = Date.now();
  const taskName = `TC023: ${timeStamp}`;
  await lateralMenuComponent.waitForMenu(timeWaiter);
  await lateralMenuComponent.clickWorkPackagesOption();
  await workPackagesPage.clickCreateWorkPackageButton(timeWaiter);
  await workPackagesPage.waitForPackageTypesContainer(timeWaiter);
  await workPackagesPage.clickTaskTypeOption();
  await newPackageFormPage.waitForFormContainer(timeWaiter);
  await newPackageFormPage.fillTaskNameInput(taskName);
  await newPackageFormPage.clickSelectProjectInput();
  await newPackageFormPage.waitForProjectsContainer(timeWaiter);
  await newPackageFormPage.selectProjectOption();
  await newPackageFormPage.clickPriorityDropDown();
  await newPackageFormPage.waitForPriorityContainer(timeWaiter);
  await newPackageFormPage.clickNormalPriorityOption();
  await newPackageFormPage.clickSaveButton();
  await newPackageFormPage.waitForTaskCreted(timeWaiter);
  await newPackageFormPage.clickCloseFormButton();
  await workPackagesPage.waitForWorkPackagesTable(timeWaiter);
  await workPackagesPage.clickFilterButton();
  await workPackagesPage.fillWorkPackagesFilterByTaskName(taskName, timeWaiter);
  const packageCreated = await workPackagesPage.getWorkPackageCreatedRow(timeWaiter);
  await expect(packageCreated).toContainText(taskName);
  await workPackagesPage.clickfirstRowThreePoints();
  await workPackagesPage.clickMoveToProjectOption(timeWaiter);
  await moveWorkPackagesPage.waitForMoveForm(timeWaiter);
  await moveWorkPackagesPage.clickSelectProjectDropDown();
  await moveWorkPackagesPage.selectScrumProject();
  await moveWorkPackagesPage.clickMoveAndFollowButton();
  const toaster = await moveWorkPackagesPage.getSuccesfullUpdateToaster(timeWaiter);
  expect(toaster).toContainText("Successful update");
  /*const activityWorkPackage = await moveWorkPackagesPage.getActivityWorkPackage(timeWaiter);
  expect(activityWorkPackage).toContainText("Project changed from");
  expect(activityWorkPackage).toContainText("Package Module Project");
  expect(activityWorkPackage).toContainText("Scrum project");*/
});