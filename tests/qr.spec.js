const { test, expect } = require('@playwright/test');

test.describe('E2E: Система управління QR-Found (Victoria)', () => {

    // НОВИЙ ТЕСТ 1: Перевірка інтерактивності UI та рендеру форми
    test('Відкриття модального вікна та перевірка обов\'язкових полів', async ({ page }) => {
        // 1. Заходимо на головну сторінку
        await page.goto('http://localhost:3000');
        
        // 2. Клікаємо на кнопку відкриття форми
        const createBtn = page.getByRole('button', { name: /Create QR-code/i });
        await createBtn.click();

        // 3. Перевіряємо, що модалка дійсно відкрилася (шукаємо заголовок всередині)
        const modalTitle = page.locator('text=Create your QR code');
        await expect(modalTitle).toBeVisible();

        // 4. Перевіряємо, чи з'явилися інпути для введення даних (це доводить, що форма працює)
        await expect(page.locator('input[name="item_name"]')).toBeVisible();
        await expect(page.locator('input[name="owner_name"]')).toBeVisible();
        await expect(page.locator('input[name="phone"]')).toBeVisible();
        
        // 5. Перевіряємо наявність фінальної кнопки відправки
        const submitBtn = page.getByRole('button', { name: /Generate QR Code/i });
        await expect(submitBtn).toBeVisible();
    });

    // ТЕСТ 2: Перевірка контенту (залишаємо твій робочий варіант)
    test('E2E: Перевірка інформаційної секції "How it works"', async ({ page }) => {
        await page.goto('http://localhost:3000');
        
        const body = page.locator('body');
        // Перевіряємо наявність ключових інструкцій
        await expect(body).toContainText(/How it works\?/i);
        await expect(body).toContainText(/Create your QR-code/i);
        await expect(body).toContainText(/Attach it to your item/i);
    });

});