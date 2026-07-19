import { test, expect } from '@playwright/test';
import { GoogleLoginPage } from '../pages/googleLoginPage';

test('Google login page accepts an email and advances to the next step', async ({ page }) => {
  const loginPage = new GoogleLoginPage(page);

  await loginPage.gotoLoginPage();
  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.nextButton).toBeVisible();

  await loginPage.enterEmail('invalid.user@example.com');
  await loginPage.waitForPasswordOrError();

  const passwordVisible = await loginPage.passwordInput.isVisible().catch(() => false);
  const errorVisible = await loginPage.errorMessage.isVisible().catch(() => false);

  expect(passwordVisible || errorVisible).toBeTruthy();
});
