const { expect } = require('@playwright/test');

class DemoBlazePage {
  constructor(page) {
    this.page = page;
    this.loginLink = page.locator('#login2');
    this.usernameInput = page.locator('#loginusername');
    this.passwordInput = page.locator('#loginpassword');
    this.loginButton = page.locator('button[onclick="logIn()"]');
    this.logoutLink = page.locator('#logout2');
    this.welcomeText = page.locator('#nameofuser');
  }

  async open() {
    await this.page.goto('https://www.demoblaze.com/index.html');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async openLoginModal() {
    await this.loginLink.click();
    await this.usernameInput.waitFor({ state: 'visible', timeout: 30000 });
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.welcomeText.waitFor({ state: 'visible', timeout: 30000 });
  }

  async verifyLogoutVisible() {
    await expect(this.logoutLink).toBeVisible();
  }

  async verifyWelcomeText(username) {
    await expect(this.welcomeText).toHaveText(`Welcome ${username}`);
  }

  async logout() {
    await this.logoutLink.click();
    await this.loginLink.waitFor({ state: 'visible', timeout: 30000 });
  }

  async verifyLoginVisible() {
    await expect(this.loginLink).toBeVisible();
  }
}

module.exports = { DemoBlazePage };
