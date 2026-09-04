const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.table = page.getByRole('table');
    this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
  }

  async open() {
    await this.page.goto('https://www.demoblaze.com/cart.html');
    await expect(this.table).toBeVisible();
  }

  async hasItem(name) {
    // table rows don't expose accessible names for cells reliably, fallback to locator
    try {
      const row = this.page.locator('tr').filter({ hasText: name }).first();
      await row.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch (e) {
      return false;
    }
  }

  async removeItem(name) {
    const row = this.page.locator('tr').filter({ hasText: name }).first();
    // attempt accessible link first, otherwise click anchor text
    const del = row.getByRole('link', { name: 'Delete' }).first();
    if (await del.count() > 0) {
      await del.click();
    } else {
      await row.locator('a').filter({ hasText: 'Delete' }).first().click();
    }
    // wait for row to be removed
    await expect(row).toHaveCount(0, { timeout: 5000 });
  }

  async openPlaceOrder() {
    await this.placeOrderButton.click();
  }
}

module.exports = { CartPage };
