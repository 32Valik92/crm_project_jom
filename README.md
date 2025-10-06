This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# SEO Tools — як додавати нові сторінки/блоки

## Додати НОВУ СТОРІНКУ (наприклад, `promo`)
1) Схеми блоку(ів):
    - Створи теку: `src/lib/schemas/promo/`
    - Додай файли схем з `_templates/block_template.ts` (перейменуй експорт).
2) Реєстр:
    - Відкрий `src/lib/schemas/catalog.ts`
        - Додай ключ сторінки у `PageKey` (`| "promo"`)
        - Додай блоки у `PAGES.promo = { label: "Promo page", blocks: ["promo_primary", ...] }`
        - Додай кожен блок у `BLOCK_META` з правильним `file`.
3) Barrel + мапа схем:
    - Відкрий `src/lib/schemas/index.ts`
        - Додай імпорти типів/схем з `./promo/...`
        - Додай їх у `BLOCK_SCHEMAS`
        - Додай тип у `AnyBlockValue` (через `|`).
4) Генератор для сторінки:
    - Створи `src/lib/generators/promo.ts` на базі `_templates/page_template.ts`.
    - Додай експорт у `src/lib/generators/index.ts`:
      ```ts
      export { indexForPromo } from "./promo";
      ```
5) UI (за потреби):
    - Якщо потрібно видиме меню — додай пункт у `src/lib/ui/nav.ts`:
      ```ts
      { href: "/promo", label: "Promo", startsWith: true }
      ```
    - Сторінку під інструмент (якщо це інший інструмент, не валідатор) — створити у `src/app/<route>/page.tsx`.

6) Перевірка:
    - Вибери сторінку у валідаторі — повинні з’явитись нові блоки.
    - Експорт у ZIP має містити: `<locale>/<page>/*.json` та `index.ts` сторінки, а також `<locale>/index.ts`.

## Додати НОВИЙ БЛОК до існуючої сторінки (наприклад, `/app -> app_features`)
1) Схема:
    - Створи `src/lib/schemas/app/app_features.ts` (копія з шаблону; перейменуй на `app_features_schema`).
2) Реєстр:
    - `catalog.ts`: додай `"app_features"` у `PAGES.app.blocks`.
    - `catalog.ts`: `BLOCK_META.app_features = { label: "App / Features", file: "app_features.json" }`.
3) Barrel + мапа схем:
    - `schemas/index.ts`: імпорт типу та схеми, додай у `BLOCK_SCHEMAS` і `AnyBlockValue`.
4) UI форма (валідатор):
    - У `src/app/validator/page.tsx` в компоненті `FormDialogContent` додай секцію для рендеру інпутів нового блоку.
    - Якщо блок містить масиви об’єктів — використай `useFieldArray` (аналогічно `cards`, `compare.rows`).
5) Експорт:
    - За потреби онови генератор сторінки, щоб включав новий JSON у `indexForApp()` (або відповідної сторінки).

## Нюанси
- Імена `BlockKey` мають 1:1 відповідати ключам у `BLOCK_SCHEMAS` і до імен файлів JSON (через `BLOCK_META[block].file`).
- Валідація робиться через Zod; повідомлення про помилки — у схемах.
- Для нових масивів — додавай кнопки “+ додати” через `useFieldArray`.
