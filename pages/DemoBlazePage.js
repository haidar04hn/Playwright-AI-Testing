const { expect } = require('@playwright/test');

class DemoBlazePage {
  constructor(page) {
    this.page = page;

    this.homeLink = page.getByRole('link', { name: 'PRODUCT STORE' });
    this.homeNavbarLink = page.getByRole('link', { name: 'Home' });
    this.contactLink = page.getByRole('link', { name: 'Contact' });
    this.aboutLink = page.getByRole('link', { name: 'About us' });
    this.cartLink = page.locator('#cartur');
    this.loginLink = page.locator('#login2');
    this.signUpLink = page.locator('#signin2');
    this.logoutLink = page.locator('#logout2');
    this.welcomeText = page.locator('#nameofuser');

    this.loginModal = page.locator('#logInModal');
    this.signUpModal = page.locator('#signInModal');
    this.contactModal = page.locator('#exampleModal');

    this.loginUsername = page.locator('#loginusername');
    this.loginPassword = page.locator('#loginpassword');
    this.signUpUsername = page.locator('#sign-username');
    this.signUpPassword = page.locator('#sign-password');

    this.categoryPhones = page.getByRole('link', { name: 'Phones' });
    this.categoryLaptops = page.getByRole('link', { name: 'Laptops' });
    this.categoryMonitors = page.getByRole('link', { name: 'Monitors' });
    this.previousButton = page.getByRole('button', { name: 'Previous' });
    this.nextButton = page.getByRole('button', { name: 'Next' });
  }

  async openHome() {
    await this.page.goto('https://www.demoblaze.com/index.html', { waitUntil: 'domcontentloaded' });
    await expect(this.homeLink).toBeVisible();
  }

  async openLoginModal() {
    await this.loginLink.click();
    await expect(this.loginModal).toBeVisible();
    await expect(this.loginUsername).toBeVisible();
  }

  async openSignUpModal() {
    await this.signUpLink.click();
    await expect(this.signUpModal).toBeVisible();
    await expect(this.signUpUsername).toBeVisible();
  }

  async login(username, password) {
    await this.openLoginModal();
    await this.loginUsername.fill(username);
    await this.loginPassword.fill(password);
    await this.loginModal.getByRole('button', { name: 'Log in' }).click();
  }

  async signUp(username, password) {
    await this.openSignUpModal();
    await this.signUpUsername.fill(username);
    await this.signUpPassword.fill(password);
    await this.signUpModal.getByRole('button', { name: 'Sign up' }).click();
  }

  async logout() {
    await this.logoutLink.click();
    await expect(this.loginLink).toBeVisible();
    await expect(this.logoutLink).toBeHidden();
  }

  async openCart() {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/cart\.html/);
  }

  async assertAlertMessage(expectedPattern) {
    const dialog = await this.page.waitForEvent('dialog');
    expect(dialog.message()).toMatch(expectedPattern);
    await dialog.accept();
  }

  async assertHomeUiVisible() {
    await expect(this.homeNavbarLink).toBeVisible();
    await expect(this.contactLink).toBeVisible();
    await expect(this.aboutLink).toBeVisible();
    await expect(this.cartLink).toBeVisible();
    await expect(this.loginLink).toBeVisible();
    await expect(this.signUpLink).toBeVisible();
    await expect(this.categoryPhones).toBeVisible();
    await expect(this.categoryLaptops).toBeVisible();
    await expect(this.categoryMonitors).toBeVisible();
    await expect(this.page.locator('.card-title').first()).toBeVisible();
  }
}

module.exports = { DemoBlazePage };
