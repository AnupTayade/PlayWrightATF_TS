import { expect, Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  async expectProduct(name: string): Promise<void> {
    const product = this.page.getByRole('listitem').filter({ hasText: name });
    await expect(
      product,
      `Product "${name}" is not available in the cart`
    ).toBeVisible();
  }

  async removeProduct(name: string): Promise<void> {
    const product = this.page.getByRole('listitem').filter({ hasText: name });
    await expect(product, `Product "${name}" is not available in the cart`).toBeVisible();
    await product.getByRole('button').nth(1).click();
    await expect(product).toHaveCount(0);
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.getByRole('button', { name: /checkout/i }).click();
  }

  async getProductPrice(name: string): Promise<number> {
    const product = this.page.getByRole('listitem').filter({ hasText: name });
    await expect(product, `Product "${name}" is not available in the cart`).toBeVisible();

    const priceText = await product.getByText(/^\$\s*[\d,.]+$/).textContent();
    if (priceText === null) {
      throw new Error(`Price for product "${name}" could not be retrieved`);
    }
    console.log(`Price text for product "${name}": ${priceText}`);
    return Number.parseFloat(priceText.replace(/[^0-9.]/g, ''));
  }
}
