import { test, expect } from '@playwright/test';
import { getTestUser } from '../utils/test-user';

test('Login with valid saved credentials', async ({ page }) => {
    const { email, password } = getTestUser();
  
    await page.goto('http://localhost:3001/login');
    await page.locator('input[type="email"]').fill(email);
    await page.locator('input[type="password"]').fill(password);
    await page.getByRole('button', { name: /login/i }).click();
  
    await expect(page).toHaveURL('http://localhost:3001/tasks');
});
