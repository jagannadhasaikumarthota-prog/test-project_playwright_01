import { Page, Locator } from '@playwright/test';

export class GoogleLoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly nextButton: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[type="email"]');
    this.nextButton = page.locator('button:has-text("Next")');
    this.passwordInput = page.locator('input[type="password"]');
    this.signInButton = page.locator('button:has-text("Sign in")');
    this.errorMessage = page.locator('div[role="alert"]');
  }

  async gotoLoginPage() {
    await this.page.goto('https://accounts.google.com/', { waitUntil: 'domcontentloaded' });
    await this.emailInput.waitFor({ state: 'visible', timeout: 15_000 });
  }

  async enterEmail(email: string) {
    await this.emailInput.waitFor({ state: 'visible' });
    await this.emailInput.fill(email);
    await this.nextButton.click();
  }

  async enterPassword(password: string) {
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async waitForPasswordOrError() {
    await this.page.waitForSelector('input[type="password"], div[role="alert"]', {
      state: 'visible',
      timeout: 20_000,
    });
  }
}
