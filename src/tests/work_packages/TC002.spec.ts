import { mergeTests } from "@playwright/test";
import { test as workPackagesTest, expect } from "../../fixtures/WorkPackagesPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as lateralMenuTest } from "../../fixtures/LateralMenuComponentFixture";
import { test as newPackageFormTest } from "../../fixtures/NewPackageFormPageFixture";
import { test as headerTest } from "../../fixtures/HeaderComponentFixture";
import { test as searchResultsTest } from "../../fixtures/SearchResultsPageFixture copy";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, lateralMenuTest, workPackagesTest, newPackageFormTest, headerTest, searchResultsTest);

dotenv.config();

test("TC002: Verify work package creation as Task with valid values", async ({headerComponent, lateralMenuComponent, workPackagesPage, newPackageFormPage, searchResultsPage}) => {
  const timeWaiter = 5000;
  const timeStamp = Date.now();
  const taskName = `TC002: ${timeStamp}`;
  const imagePath = "zyro-image.png";
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
  await newPackageFormPage.setAttachmentFile(imagePath);//This is a particular step
  await newPackageFormPage.waitForFileUploadedToasterClosed(30000);
  await newPackageFormPage.clickSaveButton();
  await newPackageFormPage.waitForTaskCreted(timeWaiter);
  await newPackageFormPage.clickCloseFormButton();
  await workPackagesPage.waitForWorkPackagesTable(timeWaiter);
  await workPackagesPage.clickFilterButton();
  await workPackagesPage.fillWorkPackagesFilterByTaskName(taskName, timeWaiter);
  const packageCreated = await workPackagesPage.getWorkPackageCreatedRow(timeWaiter);
  await expect(packageCreated).toHaveCount(1);
  await expect(packageCreated).toContainText(taskName);
});