import { mergeTests } from "@playwright/test";
import { test as workPackagesTest, expect } from "../../fixtures/WorkPackagesPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as lateralMenuTest } from "../../fixtures/LateralMenuComponentFixture";
import { test as newPackagePopUpTest } from "../../fixtures/NewPackageFormPageFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, lateralMenuTest, workPackagesTest, newPackagePopUpTest);

dotenv.config();

test("TC025: Verify work package PDF download", async ({lateralMenuComponent, workPackagesPage, newPackageFormPage}) => {
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
  await workPackagesPage.clickGeneratePDFOption(timeWaiter);
  await workPackagesPage.waitForGeneratePDFModal(timeWaiter);
  const [download] = await Promise.all([
    workPackagesPage.page.waitForEvent('download'),
    workPackagesPage.clickDownloadPDFButton()
  ]);
  const fileName = download.suggestedFilename();
  await download.saveAs(`./downloads/${fileName}`);
  expect(fileName).toContain(timeStamp.toString());
});