import { expect, Page } from '@playwright/test';

export class DashboardPage {
  constructor(private readonly page: Page) {}

  product(name: string) {
    return this.page.locator('.card').filter({ hasText: name });
  }

  async addProductToCart(name: string): Promise<void> {
    const product = this.product(name);
    await expect(product, `Product "${name}" is not available in the catalog`).toBeVisible();
    await product.getByRole('button', { name: /add to cart/i }).click();
  }

  async openCart(): Promise<void> {
    await this.page.locator('button[routerlink="/dashboard/cart"]').click();
  }
}
