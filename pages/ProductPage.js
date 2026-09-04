const { expect } = require('@playwright/test');

class ProductPage {
  constructor(page) {
    this.page = page;
    this.productTitle = page.getByRole('heading', { level: 2 });
    this.priceHeading = page.getByRole('heading', { level: 3 });
    this.addToCart = page.getByRole('link', { name: 'Add to cart' });
  }

  async assertProductVisible(name, priceRegex) {
    await expect(this.productTitle).toHaveText(name);
    if (priceRegex) await expect(this.priceHeading).toHaveText(priceRegex);
    await expect(this.addToCart).toBeVisible();
  }

  async addProductToCart() {
    await this.addToCart.click();
    const dialog = await this.page.waitForEvent('dialog', { timeout: 5000 });
    await dialog.accept();
  }
}

module.exports = { ProductPage };
