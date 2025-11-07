import { chromium, FullConfig } from '@playwright/test';
import { saveTestUser } from '../utils/test-user';

export default async function authSetup(_: FullConfig) {
    const email = `user_${Date.now()}@test.com`;
    const password = 'test123';
    
    saveTestUser(email, password);

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('http://localhost:3001/register');
    await page.locator('input[type="email"]').fill(email);
    await page.locator('input[type="password"]').fill(password);
    await page.getByRole('button', { name: /register/i }).click();

    await context.storageState({ path: 'tests/state/auth.json' });
    await browser.close();

    console.log(`User registered as ${email} / ${password}, storage saved.`);
}
