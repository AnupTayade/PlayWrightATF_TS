import { test, expect } from '../../src/fixtures/test.fixture';

test('API client can reach the automation host', async ({ apiClient }) => {
  const response = await apiClient.getText('/');
  expect(response).toContain('<!doctype html>');
});
