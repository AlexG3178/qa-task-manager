import { test, expect } from '@playwright/test';


test('Register → auto login → logout', async ({ page }) => {
    const email = `user_${Date.now()}@test.com`;
    const password = 'test123';

    await page.goto('http://localhost:3001/register');
    await page.locator('input[type="email"]').fill(email);
    await page.locator('input[type="password"]').fill(password);
    await page.getByRole('button', { name: /register/i }).click();

    await expect(page).toHaveURL('http://localhost:3001/tasks');

    await page.getByRole('button', { name: /logout/i }).click();
    await expect(page).toHaveURL('http://localhost:3001/login');
});
