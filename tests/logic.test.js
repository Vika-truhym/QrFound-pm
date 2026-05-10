// tests/logic.test.js
const { checkDataCompleteness, formatItemUrl } = require('../src/logic');

describe('Бізнес-логіка: Управління даними QR-Found (Виконала: Вікторія)', () => {

    // Тест 1 (Assertion) — Перевірка успішної валідації [cite: 44]
    test('повинен повертати true, якщо дані власника (Victoria) заповнені коректно', () => {
        const data = { 
            item_name: 'MacBook Pro', 
            owner_name: 'Victoria' 
        };
        // Використовуємо асерцію expect().toBe() [cite: 46]
        expect(checkDataCompleteness(data)).toBe(true);
    });

    // Тест 2 (Assertion — перевірка обробки винятків) [cite: 56]
    test('повинен викидати помилку, якщо обов’язкові поля відсутні', () => {
        const data = { item_name: 'Гаманець' }; // owner_name відсутнє
        // Перевіряємо обробку помилок throw new Error [cite: 58]
        expect(() => checkDataCompleteness(data)).toThrow("Обов'язкові поля відсутні");
    });

    // Тест 3 (Assertion) — Перевірка логіки формування посилань [cite: 52]
    test('повинен правильно генерувати шлях до предмета для QR-коду', () => {
        const baseUrl = 'http://localhost:3000';
        const itemId = 'vika_qr_777';
        const expectedUrl = 'http://localhost:3000/item/vika_qr_777';
        
        expect(formatItemUrl(baseUrl, itemId)).toBe(expectedUrl);
    });

    // Тест 4 (Використання Mock-об'єкта для ізоляції залежностей) [cite: 60]
    test('повинен викликати функцію логування подій створення QR один раз', () => {
        // Створюємо Mock-об'єкт (шпигуна), як у звіті для БД [cite: 64]
        const mockDbLogger = {
            logAction: jest.fn() 
        };

        const actionName = "Generate QR for Victoria's Item";
        mockDbLogger.logAction(actionName);

        // Перевіряємо взаємодію з моком [cite: 71, 72]
        expect(mockDbLogger.logAction).toHaveBeenCalledTimes(1);
        expect(mockDbLogger.logAction).toHaveBeenCalledWith(actionName);
    });
});