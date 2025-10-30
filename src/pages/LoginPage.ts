import { Page } from '@playwright/test';
import { LoginLocators } from '../locators/LoginLocators';

export class LoginPage {
  constructor(private page: Page) {}

  async goTo() {
    await this.page.goto('/login');
  }

  async fillUsername(username: string) {
    await this.page.locator(LoginLocators.usernameInput).fill(username);
  }

  async fillPassword(password: string) {
    await this.page.locator(LoginLocators.passwordInput).fill(password);
  }

  async clickLoginButton() {
    await this.page.locator(LoginLocators.loginButton).click();
  }

  async getErrorMessage() {
    return this.page.locator(LoginLocators.errorMessage);
  }

}
