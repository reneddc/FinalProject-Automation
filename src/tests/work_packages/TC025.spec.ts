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

test("TC025: Verify work package PDF download", async ({headerComponent, lateralMenuComponent, workPackagesPage, newPackageFormPage: newPackagePopUpComponent, searchResultsPage, moveWorkPackagesPage}) => {
  const timeWaiter = 5000;
  const taskName = "Task from TC002";
  const imagePath = "zyro-image.png";
  await lateralMenuComponent.waitForMenu(timeWaiter);
  await lateralMenuComponent.clickWorkPackagesOption();
  await workPackagesPage.clickCreateWorkPackageButton(timeWaiter);
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
  await newPackagePopUpComponent.waitForFileUploadedToasterClosed(30000);
  await newPackagePopUpComponent.clickSaveButton();
  await newPackagePopUpComponent.clickCloseFormButton();
  await headerComponent.fillSearchInput(taskName);
  await searchResultsPage.waitForSearchResultsTable(10000);
  const isTaskCreatedInTable = await searchResultsPage.isTaskCreatedInTable(taskName);
  expect(isTaskCreatedInTable).toBeTruthy();
  await searchResultsPage.clickfirstRowThreePoints();
  await searchResultsPage.clickGeneratePDFOption(timeWaiter);
  await searchResultsPage.waitForGeneratePDFModal(timeWaiter);
  const [download] = await Promise.all([
    workPackagesPage.page.waitForEvent('download'),
    searchResultsPage.clickDownloadPDFButton()
  ]);
  const fileName = download.suggestedFilename();
  await download.saveAs(`./downloads/${fileName}`);
  expect(fileName).toContain(taskName);
});