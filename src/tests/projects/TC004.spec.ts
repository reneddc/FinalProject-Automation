import { expect, test } from "../../fixtures/ProjectsPageFixture";

test.describe('Projects CRUD - Read', () => {
  test('TC004: Read/View project details', async ({ projectsPage, page }) => {
    const projectIdentifier = 'demo-project';

    // Navigate to project details
    await projectsPage.gotoProjectDetails(projectIdentifier);
    await page.waitForLoadState('networkidle');

    // Verify we're on the correct project page
    const currentUrl = await projectsPage.getCurrentUrl();
    expect(currentUrl).toContain(`/projects/${projectIdentifier}`);

    // Verify project page is displayed
    const pageTitle = await page.title();
    expect(pageTitle).toContain('Demo project');

    // Navigate to settings and verify project information
    await projectsPage.gotoProjectSettings(projectIdentifier);
    await page.waitForLoadState('networkidle');

    const projectName = await projectsPage.getProjectNameFromSettings();
    expect(projectName).toBe('Demo project');
  });
});

