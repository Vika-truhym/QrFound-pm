// src/logic.js

// Функція для розрахунку статусу заповненості даних
function checkDataCompleteness(data) {
    if (!data.item_name || !data.owner_name) {
        throw new Error("Обов'язкові поля відсутні");
    }
    // Якщо все є, повертаємо true
    return true;
}

// Функція для генерації посилання на предмет
function formatItemUrl(baseUrl, id) {
    if (!id) return baseUrl;
    return `${baseUrl}/item/${id}`;
}

module.exports = { checkDataCompleteness, formatItemUrl };