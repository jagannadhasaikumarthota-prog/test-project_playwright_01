import { test, expect } from '@playwright/test';
import { GoogleLoginPage } from '../pages/googleLoginPage';

test('Google login flow reaches the next authentication step or shows an error', async ({ page }) => {
  const loginPage = new GoogleLoginPage(page);

  await loginPage.gotoLoginPage();
  await expect(loginPage.emailInput).toBeVisible();

  await loginPage.enterEmail('invalid.user@example.com');
  await loginPage.waitForPasswordOrError();

  const passwordVisible = await loginPage.passwordInput.isVisible().catch(() => false);
  const errorVisible = await loginPage.errorMessage.isVisible().catch(() => false);

  expect(passwordVisible || errorVisible).toBeTruthy();
});
