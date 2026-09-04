const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { ProductPage } = require('../pages/ProductPage');

test.describe('Demoblaze - Browsing', () => {
  test('Open categories and a product', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await home.assertHomeUi();

    await home.openCategory('Phones');
    // open a known product
    await home.openProductByName('Samsung galaxy s6');

    const product = new ProductPage(page);
    await product.assertProductVisible('Samsung galaxy s6', /\$360/);
  });
});
