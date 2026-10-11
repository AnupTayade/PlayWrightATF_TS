import path from 'node:path';
import { test } from '../../src/fixtures/test.fixture';
import { readCsvSync } from '../../src/utils/csv';
import type { DataRow } from '../../src/utils/excel';

const rows = readCsvSync(path.join(process.cwd(), 'test-data', 'products.csv'));

function getRequiredValue(row: DataRow, column: string): string {
  const value = row[column];
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`Missing ${column} value in test-data/products.csv`);
  }

  return value.trim();
}

test.describe('Shopping from CSV', () => {
  for (const row of rows) {
    if (typeof row.Execute !== 'string' || row.Execute.trim().toLowerCase() !== 'yes') {
      continue;
    }
    const executeValue = getRequiredValue(row, 'Execute');
    const testName = getRequiredValue(row, 'TestName');
    const product = getRequiredValue(row, 'name');
    const country = getRequiredValue(row, 'Country');
if (executeValue.toLowerCase() !== 'yes') {
      continue;
    }
    test(testName, async ({ page, loginPage, dashboardPage, cartPage, paymentPage }, testInfo) => {
      await loginPage.open();
      await loginPage.login();
      await dashboardPage.addProductToCart(product);
      await dashboardPage.openCart();
      await cartPage.expectProduct(product);
      await cartPage.proceedToCheckout();
      await paymentPage.expectProduct(product);
      await paymentPage.enterCountry(country);
      await paymentPage.placeOrder();
      await testInfo.attach('order-confirmation-screen', {
        body: await page.screenshot({ fullPage: true }),
        contentType: 'image/png'
      });
    });
  }
});