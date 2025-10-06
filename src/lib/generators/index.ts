// Експортуємо генератори для index.ts файлів кожного розділу локалі
export { indexForAbout } from "./about";
export { indexForApp } from "./app";

/**
 * Генератор головного файлу index.ts у кореневій папці локалі.
 *
 * @param hasAbout - чи є згенеровані дані для сторінки "about"
 * @param hasApp - чи є згенеровані дані для сторінки "app"
 * @returns Вміст текстового файлу index.ts як рядок
 *
 * Приклад результату, якщо є обидва розділи:
 *   export { default as about } from './about';
 *   export { default as app } from './app';
 */
export function rootIndex(hasAbout: boolean, hasApp: boolean) {
    // Створюємо масив рядків для майбутнього вмісту index.ts
    const lines: string[] = [];

    // Якщо є about — додаємо рядок для експорту папки "about"
    if (hasAbout) lines.push("export { default as about } from './about';");

    // Якщо є app — додаємо рядок для експорту папки "app"
    if (hasApp) lines.push("export { default as app } from './app';");

    // Об’єднуємо рядки у єдиний текст, додаючи перенос рядка між ними
    // Якщо масив порожній — повертаємо пустий рядок
    return lines.join("\n") + (lines.length ? "\n" : "");
}
