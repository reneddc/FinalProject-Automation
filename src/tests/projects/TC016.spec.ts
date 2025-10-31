import { mergeTests } from "@playwright/test";
import { expect } from "../../fixtures/ProjectsPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as projectsPageTest } from "../../fixtures/ProjectsPageFixture";

const test = mergeTests(loggedInTest, projectsPageTest);

test("TC016: Verify that clicking on a project navigates to the project page", async ({
  projectsPage,
  page,
}) => {
  await projectsPage.goTo();
  await projectsPage.waitForProjectsList();
  await projectsPage.clickProject("Demo project");
  await projectsPage.verifyProjectPageLoaded("Demo project");
  expect(page.url()).toContain("/projects/");
});

