import { mergeTests } from "@playwright/test";
import { expect } from "../../fixtures/ProjectsPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as projectsPageTest } from "../../fixtures/ProjectsPageFixture";

const test = mergeTests(loggedInTest, projectsPageTest);

test("TC019: Verify searching a non-existent project returns no matches", async ({
  projectsPage,
}) => {
  await projectsPage.goTo();
  await projectsPage.waitForProjectsList();

  const term = `no-such-project-${Date.now()}`;
  await projectsPage.searchProjectByName(term);

  const matches = await projectsPage.getMatchingRowsCount(term);
  expect(matches).toBe(0);
});


