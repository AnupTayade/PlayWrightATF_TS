import path from 'node:path';
import { test } from '../../src/fixtures/test.fixture';
import { readCsv } from '../../src/utils/csv';

test('customer can place an order for a product from CSV', async ({ page, loginPage, dashboardPage, cartPage, paymentPage }, testInfo) => {
  const products = await readCsv(path.join(process.cwd(), 'test-data', 'products.csv'));
  const productName = products[0]?.name;

  if (typeof productName !== 'string' || !productName.trim()) {
    throw new Error('No product name found in test-data/products.csv');
  }

  const product = productName.trim();

  await loginPage.open();
  await loginPage.login();
  await dashboardPage.addProductToCart(product);
  await dashboardPage.openCart();
  await cartPage.expectProduct(product);
  await cartPage.proceedToCheckout();
  await paymentPage.enterCountry('India');
  await paymentPage.placeOrder();
  await testInfo.attach('order-confirmation-screen', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png'
  });
});