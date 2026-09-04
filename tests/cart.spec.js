const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');

test.describe('Demoblaze - Cart operations', () => {
  test('Add product to cart and verify', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await home.openProductByName('Samsung galaxy s6');

    const product = new ProductPage(page);
    await product.assertProductVisible('Samsung galaxy s6', /\$360/);
    await product.addProductToCart();

    const cart = new CartPage(page);
    await cart.open();
    const has = await cart.hasItem('Samsung galaxy s6');
    await expect(has).toBeTruthy();
  });

  test('Remove product from cart', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await home.openProductByName('Samsung galaxy s6');

    const product = new ProductPage(page);
    await product.addProductToCart();

    const cart = new CartPage(page);
    await cart.open();
    await cart.removeItem('Samsung galaxy s6');
    // small wait for deletion
    await page.waitForTimeout(500);
    const has = await cart.hasItem('Samsung galaxy s6');
    await expect(has).toBeFalsy();
  });
});
