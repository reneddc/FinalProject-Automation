import { test as base } from './LoginPageFixture';
import * as dotenv from 'dotenv';

dotenv.config();

export const test = base.extend({
});

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goTo();
  await loginPage.fillUsername(process.env.USER_EMAIL || '');
  await loginPage.fillPassword(process.env.USER_PASSWORD || '');
  await loginPage.clickLoginButton();
});

export { expect } from '@playwright/test';