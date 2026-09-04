const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginLink = page.getByRole('link', { name: 'Log in' });
    this.loginModal = page.locator('#logInModal');
    this.username = page.locator('#loginusername');
    this.password = page.locator('#loginpassword');
    this.loginButton = this.loginModal.getByRole('button', { name: 'Log in' });
    this.logoutLink = page.locator('#logout2');
    this.welcomeText = page.locator('#nameofuser');
  }

  async openLogin() {
    await this.loginLink.click();
    await expect(this.loginModal).toBeVisible();
  }

  async login(username, password) {
    await this.openLogin();
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async logout() {
    await this.logoutLink.click();
    await expect(this.loginLink).toBeVisible();
  }
}

module.exports = { LoginPage };
