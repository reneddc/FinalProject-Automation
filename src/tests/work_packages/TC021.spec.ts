import { mergeTests } from "@playwright/test";
import { test as workPackagesTest, expect } from "../../fixtures/WorkPackagesPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as lateralMenuTest } from "../../fixtures/LateralMenuComponentFixture";
import { test as newPackageFormTest } from "../../fixtures/NewPackageFormPageFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, lateralMenuTest, workPackagesTest, newPackageFormTest);

dotenv.config();

test("TC021: Verify work package creation with valid values from PACKAGE table", async ({lateralMenuComponent, workPackagesPage}) => {
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