import { mergeTests } from "@playwright/test";
import { expect } from "../../fixtures/ProjectsPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import { test as projectsTest } from "../../fixtures/ProjectsPageFixture";

const test = mergeTests(loggedInTest, projectsTest);

test.describe('Projects - Create', () => {
  test('TC026: Verify creating a new project', async ({ projectsPage, page }) => {
    const projectName = `Test Project ${Date.now()}`;

    // Navigate to new project page and create project
    await projectsPage.gotoNewProject();
    await projectsPage.fillProjectName(projectName);
    await projectsPage.clickCreateButton();
    await page.waitForLoadState('networkidle');

    // Verify project was created - URL should change
    const currentUrl = await projectsPage.getCurrentUrl();
    expect(currentUrl).not.toContain('/projects/new');

    // Verify project appears in list
    await projectsPage.gotoProjectsList();
    await projectsPage.searchProject(projectName);
    const projectVisible = await projectsPage.isProjectInList(projectName);
    expect(projectVisible).toBe(true);
  });
});


