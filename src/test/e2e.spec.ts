// Playwright e2e test — requires `npm run dev` running on port 4321
// Run with: npx playwright test
//
// SKIP NOTE: If Playwright browsers fail to install or the webServer
// times out in CI, this file can be skipped without blocking the PR.
// Replace this file with a SKIP comment if needed.
import { test, expect } from '@playwright/test';

test.describe('Landing page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('all section IDs are present in the DOM', async ({ page }) => {
    await expect(page.locator('#servicios')).toBeAttached();
    await expect(page.locator('#niveles')).toBeAttached();
    await expect(page.locator('#contacto')).toBeAttached();
  });

  test('theme toggle button exists and is clickable', async ({ page }) => {
    const toggle = page.locator('#themeToggle');
    await expect(toggle).toBeAttached();
    await toggle.click();
    // After click, body should have dark-theme class
    await expect(page.locator('body')).toHaveClass(/dark-theme/);
  });

  test('theme toggle persists dark mode across clicks', async ({ page }) => {
    const toggle = page.locator('#themeToggle');
    await toggle.click();
    await expect(page.locator('body')).toHaveClass(/dark-theme/);
    await toggle.click();
    await expect(page.locator('body')).not.toHaveClass(/dark-theme/);
  });

  test('nav anchor links point to valid section IDs', async ({ page }) => {
    const navLinks = page.locator('nav a');
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const href = await navLinks.nth(i).getAttribute('href');
      expect(href).toMatch(/^#(servicios|niveles|contacto)$/);
    }
  });
});
