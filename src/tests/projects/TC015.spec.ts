import { mergeTests } from "@playwright/test";
import { expect } from "../../fixtures/ProjectsPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as projectsPageTest } from "../../fixtures/ProjectsPageFixture";

const test = mergeTests(loggedInTest, projectsPageTest);

test("TC015: Verify that projects list is accessible and displays projects", async ({
  projectsPage,
}) => {
  await projectsPage.goTo();
  await projectsPage.waitForProjectsList();
  await projectsPage.verifyProjectIsVisible("Demo project");
});

