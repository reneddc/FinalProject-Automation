import { test as base } from '@playwright/test';
import { MeetingsPage } from '../pages/MeetingsPage';

export const test = base.extend<{ meetingsPage: MeetingsPage }>({
  meetingsPage: async ({ page }, use) => {
    const meetingsPage = new MeetingsPage(page);
    await use(meetingsPage);
  },
});

export { expect } from '@playwright/test';
