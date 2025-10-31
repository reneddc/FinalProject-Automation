import { mergeTests } from "@playwright/test";
import { expect } from "../../fixtures/ProjectsPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as projectsPageTest } from "../../fixtures/ProjectsPageFixture";

const test = mergeTests(loggedInTest, projectsPageTest);

test("TC018: Verify back navigation returns to projects list", async ({
  projectsPage,
  page,
}) => {
  await projectsPage.goTo();
  await projectsPage.waitForProjectsList();
  await projectsPage.clickProject("Demo project");
  await projectsPage.verifyProjectPageLoaded("Demo project");
  await page.goBack();
  await projectsPage.waitForProjectsList();
  await projectsPage.verifyProjectIsVisible("Demo project");
});


