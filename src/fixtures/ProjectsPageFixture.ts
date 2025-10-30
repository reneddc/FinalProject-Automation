import { test as base } from '@playwright/test';
import { ProjectsPage } from '../pages/ProjectsPage';
import { LoginPage } from '../pages/LoginPage';

type ProjectsFixtures = {
  projectsPage: ProjectsPage;
  authenticatedPage: void;
};

export const test = base.extend<ProjectsFixtures>({
  authenticatedPage: async ({ page }, use) => {
    // Login before each test
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillUsername(process.env.USER_EMAIL!);
    await loginPage.fillPassword(process.env.USER_PASSWORD!);
    await loginPage.clickLoginButton();
    await page.waitForLoadState('networkidle');
    await use();
  },

  projectsPage: async ({ page, authenticatedPage }, use) => {
    const projectsPage = new ProjectsPage(page);
    await use(projectsPage);
  },
});

export { expect } from '@playwright/test';

