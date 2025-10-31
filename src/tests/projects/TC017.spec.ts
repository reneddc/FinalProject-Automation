import { mergeTests } from "@playwright/test";
import { expect } from "../../fixtures/ProjectsPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as projectsPageTest } from "../../fixtures/ProjectsPageFixture";

const test = mergeTests(loggedInTest, projectsPageTest);

test("TC017: Verify project search shows the matching project", async ({
  projectsPage,
}) => {
  await projectsPage.goTo();
  await projectsPage.waitForProjectsList();
  await projectsPage.searchProjectByName("Demo project");
  await projectsPage.verifyProjectIsVisible("Demo project");
});


