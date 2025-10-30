import { expect, test } from "../../fixtures/ProjectsPageFixture";

test.describe('Projects CRUD - Create', () => {
  test('TC003: Create a new project', async ({ projectsPage, page }) => {
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
    await page.waitForTimeout(1000);
    
    const projectVisible = await projectsPage.isProjectInList(projectName);
    expect(projectVisible).toBe(true);
  });
});

