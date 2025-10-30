import { expect, test } from "../../fixtures/LoginPageFixture";

test.describe('Login - Positive Test Cases', () => {
  test('TC002: Verify successful login with valid credentials', async ({ loginPage, page }) => {
    // Navigate to login page
    await loginPage.goto();

    // Get credentials from environment variables
    const username = process.env.USER_EMAIL;
    const password = process.env.USER_PASSWORD;

    // Verify credentials are available
    expect(username).toBeDefined();
    expect(password).toBeDefined();

    console.log('Using credentials:', { username, password: '***' });

    // Fill login form with valid credentials
    await loginPage.fillUsername(username!);
    await loginPage.fillPassword(password!);

    // Click login button
    await loginPage.clickLoginButton();

    // Wait a bit for the page to respond
    await page.waitForTimeout(5000);

    // Check current URL and page state
    const currentUrl = await loginPage.getCurrentUrl();
    console.log('Current URL after login:', currentUrl);

    // Check if there's an error message
    const errorVisible = await page.locator('#errorExplanation, .flash.error, [class*="error"]').isVisible().catch(() => false);
    if (errorVisible) {
      const errorText = await page.locator('#errorExplanation, .flash.error, [class*="error"]').first().textContent();
      console.log('Error message found:', errorText);
    }

    // Wait for either success (URL change) or error message
    try {
      await page.waitForURL(url => !url.pathname.includes('/login'), { timeout: 10000 });
    } catch (error) {
      console.log('Navigation did not occur, checking for error messages...');
    }

    // Verify successful login by checking URL has changed
    const finalUrl = await loginPage.getCurrentUrl();
    console.log('Final URL after login:', finalUrl);
    expect(finalUrl).not.toContain('/login');
    
    // Additional verification: Check we're on the home page or projects page
    expect(finalUrl).toContain('automationassuresoft2025ad.openproject.com');
    
    // Verify page title or header is visible indicating successful login
    const pageTitle = await page.title();
    console.log('Page title:', pageTitle);
    expect(pageTitle).not.toContain('Sign in');
  });
});

