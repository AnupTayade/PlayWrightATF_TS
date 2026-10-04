import { expect, Page } from '@playwright/test';
import { config } from '../core/config';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto(config.baseUrl);
  }

  async login(email = config.userEmail, password = config.userPassword): Promise<void> {
    await this.page.locator('#userEmail').fill(email);
    await this.page.locator('#userPassword').fill(password);
    await this.page.locator('#login').click();
    await expect(this.page).toHaveURL(/client/);
  }
}
