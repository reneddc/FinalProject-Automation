export const LoginLocators = {
  usernameInput: '#username',
  passwordInput: '#password',
  loginButton: '#login-form input[type="submit"]',
  forgotPasswordLink: 'a[href="/account/lost_password"]',
  errorMessage: 'main p:has-text("Invalid user or password")',
  // Success indicators
  homeLink: 'a[href="/"]',
  userMenu: '.op-app-header--user-menu',
};