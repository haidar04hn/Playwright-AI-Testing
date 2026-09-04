const { expect } = require('@playwright/test');

class HomePage {
  constructor(page) {
    this.page = page;
    this.title = page.getByRole('heading', { name: 'PRODUCT STORE' });
    this.homeLink = page.getByRole('link', { name: 'PRODUCT STORE' });
    this.cartLink = page.getByRole('link', { name: 'Cart' });
    this.loginLink = page.getByRole('link', { name: 'Log in' });
    this.signUpLink = page.getByRole('link', { name: 'Sign up' });

    this.categories = {
      Phones: page.getByRole('link', { name: 'Phones' }),
      Laptops: page.getByRole('link', { name: 'Laptops' }),
      Monitors: page.getByRole('link', { name: 'Monitors' }),
    };

    this.productCards = page.locator('.card');
  }

  async open() {
    await this.page.goto('https://www.demoblaze.com/index.html', { waitUntil: 'domcontentloaded' });
    await expect(this.title).toBeVisible();
  }

  async openCategory(name) {
    const cat = this.categories[name];
    if (!cat) throw new Error(`Unknown category ${name}`);
    await cat.click();
  }

  async openProductByName(name) {
    await this.page.getByRole('link', { name }).first().click();
  }

  async assertHomeUi() {
    await expect(this.homeLink).toBeVisible();
    await expect(this.cartLink).toBeVisible();
    await expect(this.loginLink).toBeVisible();
    await expect(this.signUpLink).toBeVisible();
    await expect(this.productCards.first()).toBeVisible();
  }
}

module.exports = { HomePage };
