import { expect, test } from "../../fixtures/ProjectsPageFixture";

test.describe('Projects CRUD - Update', () => {
  test('TC005: Update/Edit project information', async ({ projectsPage, page }) => {
    const timestamp = Date.now();
    const originalName = `Update Test ${timestamp}`;
    const updatedName = `Updated ${timestamp}`;

    // Create a project to update
    await projectsPage.createProject(originalName);
    await page.waitForTimeout(1000);

    // Go to projects list
    await projectsPage.gotoProjectsList();
    await projectsPage.searchProject(originalName);
    await page.waitForTimeout(1000);

    // Click three-dot menu for the project
    const projectRow = page.locator('tr', { hasText: originalName }).first();
    const menuButton = projectRow.locator('button:has-text("Open menu")');
    await menuButton.click();
    await page.waitForTimeout(500);

    // Click Project settings from menu
    const settingsOption = page.locator('menuitem:has-text("Project settings")');
    await settingsOption.click();
    await page.waitForLoadState('networkidle');

    // Update project name
    await projectsPage.fillProjectName(updatedName);
    await projectsPage.clickUpdateDetailsButton();
    await page.waitForTimeout(2000);

    // Verify in projects list
    await projectsPage.gotoProjectsList();
    await projectsPage.searchProject(updatedName);
    await page.waitForTimeout(1000);
    
    const projectVisible = await projectsPage.isProjectInList(updatedName);
    expect(projectVisible).toBe(true);
  });
});

