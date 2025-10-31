import { Page } from "@playwright/test";
import { ProjectsLocators } from "../locators/ProjectsLocators";

export class ProjectsPage {
  constructor(private page: Page) {}

  async goTo() {
    await this.page.goto("/projects", { waitUntil: "load" });
  }

  async waitForProjectsList(timeout = 5000) {
    const table = this.page.locator(ProjectsLocators.projectsTable);
    await table.waitFor({ state: "visible", timeout });
  }

  async getProjectByName(projectName: string) {
    const table = this.page.locator(ProjectsLocators.projectsTable);
    const projectRow = table.getByText(projectName, { exact: false }).first();
    return projectRow;
  }

  async verifyProjectIsVisible(projectName: string) {
    const project = await this.getProjectByName(projectName);
    await project.waitFor({ state: "visible", timeout: 10000 });
    return project;
  }

  async clickProject(projectName: string) {
    const project = await this.verifyProjectIsVisible(projectName);
    await project.click();
  }

  async verifyProjectPageLoaded(projectName: string) {
    const projectTitle = this.page.getByText(projectName, { exact: false }).first();
    await projectTitle.waitFor({ state: "visible", timeout: 5000 });
  }

  async searchProjectByName(projectName: string) {
    const searchInput = this.page.getByPlaceholder("Search by project name");
    await searchInput.waitFor({ state: "visible", timeout: 5000 });
    await searchInput.fill(projectName);
    await searchInput.press("Enter");
  }

  async clearProjectSearch() {
    const searchInput = this.page.getByPlaceholder("Search by project name");
    await searchInput.waitFor({ state: "visible", timeout: 5000 });
    await searchInput.fill("");
    await searchInput.press("Enter");
  }

  async getProjectsRowCount() {
    const table = this.page.locator(ProjectsLocators.projectsTable);
    const rows = table.locator(ProjectsLocators.projectRow);
    return await rows.count();
  }

  async getMatchingRowsCount(projectName: string) {
    const table = this.page.locator(ProjectsLocators.projectsTable);
    const rows = table
      .locator(ProjectsLocators.projectRow)
      .filter({ hasText: projectName });
    return await rows.count();
  }

  async clickNameHeader() {
    const nameHeader = this.page
      .locator('th, [role="columnheader"]')
      .filter({ hasText: /name/i })
      .first();
    await nameHeader.click();
  }

  async getVisibleProjectNames() {
    const table = this.page.locator(ProjectsLocators.projectsTable);
    const rows = table.locator(ProjectsLocators.projectRow);
    const count = await rows.count();
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      let nameLink = row.locator('td').nth(1).locator('a').first();
      if (await nameLink.count() === 0) {
        nameLink = row.getByRole('link').first();
      }
      const text = (await nameLink.textContent())?.trim() || '';
      if (text) names.push(text);
    }
    return names;
  }

  // --- Creation/navigation helpers for CRUD flows ---
  async gotoNewProject() {
    await this.page.goto('/projects/new', { waitUntil: 'load' });
  }

  async fillProjectName(projectName: string) {
    const nameInput = this.page.getByLabel(/name/i).first();
    await nameInput.waitFor({ state: 'visible', timeout: 5000 });
    await nameInput.fill(projectName);
  }

  async clickCreateButton() {
    const create = this.page.getByRole('button', { name: /^Create$/ });
    await Promise.all([
      this.page.waitForLoadState('networkidle'),
      create.click(),
    ]);
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async gotoProjectsList() {
    await this.page.goto('/projects', { waitUntil: 'load' });
    await this.waitForProjectsList();
  }

  async searchProject(projectName: string) {
    await this.searchProjectByName(projectName);
  }

  async isProjectInList(projectName: string) {
    const row = await this.getProjectByName(projectName);
    try {
      await row.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  // --- Row actions (kebab menu) ---
  async openProjectActions(projectName: string) {
    const row = await this.getProjectByName(projectName);
    // Action menu button (three dots) lives in the last cell as an action-menu button
    const menuButton = row
      .locator('action-menu button, button[id^="primary-menu-"]')
      .first();
    await menuButton.click();
  }

  async clickDeleteInMenu() {
    const deleteItem = this.page.getByRole('menuitem', { name: /^Delete$/ });
    await deleteItem.click();
  }

  async confirmDeletion() {
    const confirm = this.page.getByRole('button', { name: /^Delete$/ });
    await Promise.all([
      this.page.waitForLoadState('networkidle'),
      confirm.click(),
    ]);
  }

  async waitForProjectToDisappear(projectName: string) {
    const row = await this.getProjectByName(projectName);
    await row.waitFor({ state: 'detached', timeout: 10000 });
  }

  async getFirstProjectNameInTable() {
    const table = this.page.locator(ProjectsLocators.projectsTable);
    const firstRow = table.locator(ProjectsLocators.projectRow).first();
    // project name is a link in the name column
    const nameLink = firstRow.getByRole('link').first();
    await nameLink.waitFor({ state: 'visible', timeout: 5000 });
    return (await nameLink.textContent())?.trim() || '';
  }
}

