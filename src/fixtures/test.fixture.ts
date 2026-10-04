import { test as base, APIRequestContext } from '@playwright/test';
import { ApiClient } from '../core/api-client';
import { CartPage } from '../pages/cart.page';
import { DashboardPage } from '../pages/dashboard.page';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { config } from '../core/config';

export type FrameworkFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  cartPage: CartPage;
  paymentPage: PaymentPage;
  apiClient: ApiClient;
};

export const test = base.extend<FrameworkFixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  dashboardPage: async ({ page }, use) => use(new DashboardPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  paymentPage: async ({ page }, use) => use(new PaymentPage(page)),
  apiClient: async ({ playwright }, use) => {
    const request: APIRequestContext = await playwright.request.newContext({ baseURL: config.apiBaseUrl });
    await use(new ApiClient(request));
    await request.dispose();
  }
});

export { expect } from '@playwright/test';
