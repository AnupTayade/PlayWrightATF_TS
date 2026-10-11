import path from 'node:path';
import { test, expect } from '@playwright/test';
import { readCsv, validateHeaders } from '../../src/utils/csv';

//@author Anup
test('product CSV is read into product data', async () => {
  const rows = await readCsv(path.join(process.cwd(), 'test-data', 'products.csv'));
  validateHeaders(rows, ['Execute', 'TestName', 'name', 'category', 'Country', 'Email']);
  expect(rows).toContainEqual({
    Execute: 'Yes',
    TestName: 'customer can place an order for a Shoes',
    name: 'ADIDAS ORIGINAL',
    category: ' fashion',
    Country: 'India',
    Email: 'anup.Test@gmail.com'
  });
});
