import { expect, test } from "../../fixtures/ProjectsPageFixture";

test.describe('Projects CRUD - Delete', () => {
  test('TC006: Delete a project', async ({ projectsPage, page }) => {
    // Go directly to projects list
    await projectsPage.gotoProjectsList();
    await page.waitForLoadState('networkidle');

    // Find a test project to delete (look for one that contains "Test" in the name)
    const projectLink = page.locator('table a').filter({ hasText: /Test Project|Delete Test|Update Test/ }).first();
    const projectName = await projectLink.textContent();
    
    console.log(`Deleting project: ${projectName}`);

    // Click the three-dot menu button in the same row as this project
    const projectRow = page.locator('tr').filter({ has: projectLink });
    const menuButton = projectRow.locator('button:has-text("Open menu")');
    await menuButton.click();
    await page.waitForTimeout(500);

    // Click Delete option from the menu
    const deleteOption = page.locator('menuitem:has-text("Delete")');
    await deleteOption.click();
    await page.waitForTimeout(1000);

    // Check the confirmation checkbox
    const confirmCheckbox = page.locator('input[type="checkbox"]');
    await confirmCheckbox.check();

    // Click "Delete permanently" button
    const deletePermanentlyButton = page.locator('button:has-text("Delete permanently")');
    await deletePermanentlyButton.click();
    await page.waitForTimeout(2000);

    // Verify project is deleted
    await page.waitForLoadState('networkidle');
    const stillExists = await page.locator(`a:has-text("${projectName}")`).count();
    expect(stillExists).toBe(0);
  });
});

