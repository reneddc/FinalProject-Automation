import { Page } from '@playwright/test';
import { ProjectsLocators } from '../locators/ProjectsLocators';

export class ProjectsPage {
  constructor(private page: Page) {}

  // Navigation methods
  async gotoProjectsList() {
    await this.page.goto('https://automationassuresoft2025ad.openproject.com/projects');
  }

  async gotoNewProject() {
    await this.page.goto('https://automationassuresoft2025ad.openproject.com/projects/new');
  }

  async gotoProjectDetails(projectIdentifier: string) {
    await this.page.goto(`https://automationassuresoft2025ad.openproject.com/projects/${projectIdentifier}`);
  }

  async gotoProjectSettings(projectIdentifier: string) {
    await this.page.goto(`https://automationassuresoft2025ad.openproject.com/projects/${projectIdentifier}/settings/general`);
  }

  // Create Project methods
  async fillProjectName(name: string) {
    await this.page.locator(ProjectsLocators.projectNameInput).first().fill(name);
  }

  async fillProjectDescription(description: string) {
    await this.page.locator(ProjectsLocators.projectDescriptionInput).first().fill(description);
  }

  async clickCreateButton() {
    await this.page.locator(ProjectsLocators.createButton).click();
  }

  async clickUpdateDetailsButton() {
    await this.page.locator(ProjectsLocators.updateDetailsButton).click();
  }

  async clickCancelButton() {
    await this.page.locator(ProjectsLocators.cancelButton).click();
  }

  // View/Verify methods
  async searchProject(projectName: string) {
    await this.page.locator(ProjectsLocators.searchInput).fill(projectName);
  }

  async clickProjectLink(projectName: string) {
    await this.page.locator(ProjectsLocators.projectLink(projectName)).first().click();
  }

  async getProjectHeading() {
    return this.page.locator(ProjectsLocators.projectHeading).first().textContent();
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async isProjectInList(projectName: string) {
    return this.page.locator(ProjectsLocators.projectLink(projectName)).isVisible();
  }

  async getErrorMessage() {
    const errorLocator = this.page.locator(ProjectsLocators.errorMessage).first();
    await errorLocator.waitFor({ state: 'visible', timeout: 5000 });
    return errorLocator.textContent();
  }

  async getSuccessMessage() {
    const successLocator = this.page.locator(ProjectsLocators.successMessage).first();
    await successLocator.waitFor({ state: 'visible', timeout: 5000 });
    return successLocator.textContent();
  }

  async waitForProjectsPage() {
    await this.page.waitForURL('**/projects**', { timeout: 10000 });
  }

  // Helper method to create a project
  async createProject(projectName: string, description?: string) {
    await this.gotoNewProject();
    await this.fillProjectName(projectName);
    if (description) {
      await this.fillProjectDescription(description);
    }
    await this.clickCreateButton();
    await this.page.waitForLoadState('networkidle');
  }

  // Helper method to get project name from settings page
  async getProjectNameFromSettings() {
    return this.page.locator(ProjectsLocators.projectNameInput).first().inputValue();
  }
}

