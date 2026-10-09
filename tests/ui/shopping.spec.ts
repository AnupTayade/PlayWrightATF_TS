import { test } from '../../src/fixtures/test.fixture';

test.describe.configure({ mode: 'serial' });

test('customer can remove an available product from the cart', async ({ loginPage, dashboardPage, cartPage }) => {
  await loginPage.open();
  await loginPage.login();
  await dashboardPage.addProductToCart('ZARA COAT 3');
  await dashboardPage.openCart();
  await cartPage.removeProduct('ZARA COAT 3');
});

test('customer can add a product and reach payment', async ({ loginPage, dashboardPage, cartPage, paymentPage }) => {
  await loginPage.open();
  await loginPage.login();
  await dashboardPage.addProductToCart('ZARA COAT 3');
  await dashboardPage.openCart();
  await cartPage.expectProduct('ZARA COAT 3');
  await cartPage.proceedToCheckout();
  await paymentPage.enterCountry('India');
});

test('User can add multiple products to the cart and remove one', async ({ loginPage, dashboardPage, cartPage }) => {
  await loginPage.open();
  await loginPage.login();
  await dashboardPage.addProductToCart('ZARA COAT 3');
  await dashboardPage.addProductToCart('ADIDAS ORIGINAL');
  await dashboardPage.addProductToCart('IPHONE 13 PRO');
  await dashboardPage.openCart();
  await cartPage.removeProduct('ZARA COAT 3');
});
