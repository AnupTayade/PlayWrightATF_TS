import path from 'node:path';
import { test, expect } from '@playwright/test';
import { readCsv, validateHeaders } from '../../src/utils/csv';

test('product CSV is read into product data', async () => {
  const rows = await readCsv(path.join(process.cwd(), 'test-data', 'products.csv'));
  validateHeaders(rows, ['name', 'category']);
  expect(rows).toContainEqual({ name: 'ZARA COAT 3', category: ' fashion' });
});
