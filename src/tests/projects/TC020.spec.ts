import { test, expect } from "@playwright/test";

test("TC020: Verify unauthenticated access to a project URL redirects to login", async ({
  page,
}) => {
  const slug = `no-such-project-${Date.now()}`;
  await page.goto(`/projects/${slug}`);
  expect(page.url()).toContain("/login");
  const usernameInput = page.getByRole("textbox", { name: /username/i }).first();
  await expect(usernameInput).toBeVisible();
});


