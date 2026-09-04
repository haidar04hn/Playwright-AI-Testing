const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test.describe('Demoblaze - Checkout', () => {
  test('Complete order and verify confirmation', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await home.openProductByName('Samsung galaxy s6');

    const product = new ProductPage(page);
    await product.addProductToCart();

    const cart = new CartPage(page);
    await cart.open();
    await cart.openPlaceOrder();

    const checkout = new CheckoutPage(page);
    const data = { name: 'QA Buyer', country: 'USA', city: 'NY', card: '4111111111111111', month: '12', year: '2026' };
    await checkout.fillAndPurchase(data);
    await checkout.expectConfirmationText(/Thank you|Thank you for your purchase/i);
  });
});
