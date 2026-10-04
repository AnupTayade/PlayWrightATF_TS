import { expect, Page } from '@playwright/test';

export class PaymentPage {
  constructor(private readonly page: Page) {}

  async enterCountry(country: string): Promise<void> {
    const countryInput = this.page.locator('input[placeholder*="Select Country"], input[placeholder*="Country"]').first();
    await countryInput.pressSequentially(country.slice(0, 3), { delay: 100 });
    const countryOption = this.page.getByText(country, { exact: true });
    await countryOption.click();
    await expect(countryInput).toHaveValue(country);
  }

  async placeOrder(): Promise<void> {
    await this.page.locator('.action__submit, button:has-text("Place Order")').first().click();
    await expect(this.page).toHaveURL(/\/dashboard\/thanks/);
    await expect(this.page.getByRole('heading', { name: 'Thankyou for the order.' })).toBeVisible();
  }
}
