const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Demoblaze - Login / Logout', () => {
  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
  });

  test('Login with Haidarali / Test@123', async ({ page }) => {
    const login = new LoginPage(page);
    await login.login('Haidarali', 'Test@123');
    const welcome = page.locator('#nameofuser');
    await expect(welcome).toHaveText('Welcome Haidarali');
    await expect(login.logoutLink).toBeVisible();
  });

  test('Logout', async ({ page }) => {
    const login = new LoginPage(page);
    await login.login('Haidarali', 'Test@123');
    await login.logout();
    await expect(login.loginLink).toBeVisible();
  });
});
