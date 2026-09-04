const { test, expect } = require('@playwright/test');
const { DemoBlazePage } = require('../pages/DemoblazePage');
const { validUsers, invalidUsers, blankLoginUsers, invalidSignUpUsers, blankSignUpUsers } = require('../test-data/demoblaze.data');

test.describe('Demoblaze - Authentication and UI regression', () => {
  test.beforeEach(async ({ page }) => {
    const demo = new DemoBlazePage(page);
    await demo.openHome();
  });

  test('UI: homepage renders core navigation and category elements', async ({ page }) => {
    const demo = new DemoBlazePage(page);
    await demo.assertHomeUiVisible();
  });

  for (const user of validUsers) {
    test(`positive: login with valid credentials for ${user.username}`, async ({ page }) => {
      const demo = new DemoBlazePage(page);
      await demo.login(user.username, user.password);
      await expect(demo.welcomeText).toHaveText(`Welcome ${user.username}`);
      await expect(demo.logoutLink).toBeVisible();
    });
  }

  for (const [index, user] of invalidUsers.entries()) {
    test(`negative: login rejects invalid input case ${index + 1} (${user.username || 'blank username'})`, async ({ page }) => {
      const demo = new DemoBlazePage(page);
      await demo.login(user.username, user.password);
      await demo.assertAlertMessage(user.expected);
    });
  }

  test('positive: user can log out after successful login', async ({ page }) => {
    const demo = new DemoBlazePage(page);
    await demo.login('Haidarali', 'Test@123');
    await expect(demo.welcomeText).toHaveText('Welcome Haidarali');

    await demo.logout();
    await expect(demo.loginLink).toBeVisible();
    await expect(demo.logoutLink).toBeHidden();
  });

  test('positive: a new user can sign up with unique credentials', async ({ page }) => {
    const demo = new DemoBlazePage(page);
    const uniqueUser = `qa${Date.now()}`;

    await demo.signUp(uniqueUser, 'StrongPass1!');
    await demo.assertAlertMessage(/sign up successful|successful/i);

    await demo.login(uniqueUser, 'StrongPass1!');
    await expect(demo.welcomeText).toHaveText(`Welcome ${uniqueUser}`);
  });

  for (const [index, user] of blankLoginUsers.entries()) {
    test(`boundary: blank login values case ${index + 1} keep the modal open and do not sign in`, async ({ page }) => {
      const demo = new DemoBlazePage(page);
      await demo.login(user.username, user.password);
      await expect(demo.loginModal).toBeVisible();
      await expect(demo.welcomeText).toHaveText('');
      await expect(demo.logoutLink).toBeHidden();
    });
  }

  test('negative: sign up rejects a duplicate account', async ({ page }) => {
    const demo = new DemoBlazePage(page);
    await demo.signUp('Haidarali', 'Test@123');
    await demo.assertAlertMessage(/already exist|already/i);
  });

  for (const [index, user] of blankSignUpUsers.entries()) {
    test(`validation: blank sign-up values case ${index + 1} keep the modal open`, async ({ page }) => {
      const demo = new DemoBlazePage(page);
      await demo.signUp(user.username, user.password);
      await expect(demo.signUpModal).toBeVisible();
    });
  }

  test('UI: Contact modal is accessible and can be opened', async ({ page }) => {
    const demo = new DemoBlazePage(page);
    await demo.contactLink.click();
    await expect(demo.contactModal).toBeVisible();
    await expect(demo.contactModal.locator('button').filter({ hasText: 'Close' }).first()).toBeVisible();
    await expect(demo.contactModal.getByRole('button', { name: 'Send message' })).toBeVisible();
  });

  test('accessibility: keyboard navigation reaches the login form fields', async ({ page }) => {
    const demo = new DemoBlazePage(page);
    await demo.loginLink.focus();
    await page.keyboard.press('Enter');

    await expect(demo.loginModal).toBeVisible();
    await demo.loginUsername.focus();
    await expect(demo.loginUsername).toBeFocused();

    await demo.loginUsername.fill('Haidarali');
    await page.keyboard.press('Tab');
    await expect(demo.loginPassword).toBeFocused();
    await demo.loginPassword.fill('Test@123');
  });

});
