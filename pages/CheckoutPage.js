const { expect } = require('@playwright/test');

class CheckoutPage {
  constructor(page) {
    this.page = page;
    // use specific ids inside the modal to avoid ambiguous labels
    this.name = page.locator('#name');
    this.country = page.locator('#country');
    this.city = page.locator('#city');
    this.creditCard = page.locator('#card');
    this.month = page.locator('#month');
    this.year = page.locator('#year');
    this.purchaseButton = page.getByRole('button', { name: 'Purchase' });
  }

  async fillAndPurchase(data) {
    await this.name.fill(data.name);
    await this.country.fill(data.country);
    await this.city.fill(data.city);
    await this.creditCard.fill(data.card);
    await this.month.fill(String(data.month));
    await this.year.fill(String(data.year));
    await this.purchaseButton.click();
  }

  async expectConfirmationText(regex) {
    const dialog = this.page.locator('.sweet-alert');
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText(regex);
  }
}

module.exports = { CheckoutPage };
