import { test as base } from "@playwright/test";
import { ProjectsPage } from "../pages/ProjectsPage";

export const test = base.extend<{ projectsPage: ProjectsPage }>({
  projectsPage: async ({ page }, use) => {
    const projectsPage = new ProjectsPage(page);
    await use(projectsPage);
  },
});

export { expect } from "@playwright/test";

