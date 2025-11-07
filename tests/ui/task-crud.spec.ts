import { test, expect } from '@playwright/test';
import { getTestUser } from '../utils/test-user';

test('Full Task CRUD Flow', async ({ page }) => {
    const { email, password } = getTestUser();

    const task1 = {
        title: `Task 1 Title`,
        description: 'Task 1 Description',
        updatedTitle: 'Task 1 Title (Edited)',
        updatedDescription: 'Task 1 Description (Edited)',
    };

    const task2 = {
        title: `Task 2 Title`,
        description: 'Task 2 Description',
    };

    await test.step('Login with test user', async () => {
        await page.goto('http://localhost:3001/login');
        await page.locator('input[type="email"]').fill(email);
        await page.locator('input[type="password"]').fill(password);
        await page.getByRole('button', { name: /login/i }).click();
        await expect(page).toHaveURL('http://localhost:3001/tasks');
    });

    await test.step('Create Task 1', async () => {
        await page.getByPlaceholder('Task title').fill(task1.title);
        await page.getByPlaceholder('Task description').fill(task1.description);
        await page.getByRole('button', { name: /add task/i }).click();
        await expect(page.locator(`text=${task1.title}`)).toBeVisible();
    });

    await test.step('Create Task 2', async () => {
        await page.getByPlaceholder('Task title').fill(task2.title);
        await page.getByPlaceholder('Task description').fill(task2.description);
        await page.getByRole('button', { name: /add task/i }).click();
        await expect(page.locator(`text=${task2.title}`)).toBeVisible();
    });

    await test.step('Edit Task 1', async () => {
        const editBtn = page.locator('button:has-text("✏️ Edit")').first();
        await editBtn.click();
        await page.locator(`input[value='${task1.title}']`).fill(task1.updatedTitle);  
        await page.locator(`textarea`, { hasText: task1.description }).fill(task1.updatedDescription);
        await page.click('text=Save');
        await expect(page.locator(`text=${task1.updatedTitle}`)).toBeVisible();
    });

    await test.step('Delete Task B', async () => {
        const deleteBtn = page.locator('button:has-text("🗑 Delete")').first();
        await deleteBtn.click();
        await expect(page.locator(`text=${task2.title}`)).not.toBeVisible();
    });

    await test.step('Delete Task A (edited)', async () => {
        const deleteBtn = page.locator('button:has-text("🗑 Delete")').first();
        await deleteBtn.click();
        await expect(page.locator(`text=${task1.updatedTitle}`)).not.toBeVisible();
    });
});