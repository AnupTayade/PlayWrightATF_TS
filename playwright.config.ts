import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

const testEnvironment = process.env.TEST_ENV?.toLowerCase();
if (testEnvironment && !['qa', 'stg', 'prod'].includes(testEnvironment)) {
  throw new Error(`Unsupported TEST_ENV "${testEnvironment}". Use qa, stg, or prod.`);
}

if (testEnvironment) {
  const environmentFile = `.env.${testEnvironment}`;
  const environmentConfig = dotenv.config({ path: environmentFile });
  if (environmentConfig.error) {
    throw new Error(`Unable to load ${environmentFile}. Create it from ${environmentFile}.example.`);
  }
}
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'true' }],
    ['allure-playwright', { resultsDir: 'allure-results' }]
  ],
  use: {
    baseURL: process.env.BASE_URL ?? 'https://rahulshettyacademy.com/client/#/auth/login',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    headless: process.env.HEADLESS !== 'false'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ]
});
