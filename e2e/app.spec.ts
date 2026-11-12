import { test, expect } from '@playwright/test';

test.describe('App smoke', () => {
  test('renders ion-app shell', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('ion-app')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('ion-router-outlet')).toBeAttached();
    await expect(page).toHaveTitle('SkiApp Report');
  });

  test('no JS errors on home route', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto('/#/tabs/home');
    await expect(page.locator('ion-app')).toBeVisible({ timeout: 15_000 });
    expect(errors).toHaveLength(0);
  });
});
