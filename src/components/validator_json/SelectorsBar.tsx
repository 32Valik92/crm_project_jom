"use client";

import type {BlockKey, PageKey} from "@/lib/schemas";
import {BLOCK_META, PAGES} from "@/lib/schemas";

type Props = {
    localeFolder: string;                      // Назва кореневої папки (наприклад: "cs", "pl")
    setLocaleFolder: (v: string) => void;      // Функція для оновлення вибраної локалі

    page: PageKey | "";                        // Поточна вибрана сторінка (або порожньо)
    setPage: (p: PageKey | "") => void;        // Колбек для зміни сторінки

    block: BlockKey | "";                      // Поточний вибраний блок (або порожньо)
    setBlock: (b: BlockKey | "") => void;      // Колбек для зміни блоку

    availableBlocks: BlockKey[];               // Блоки, доступні для вибраної сторінки
};

const SelectorsBar = ({
                          localeFolder, setLocaleFolder,
                          page, setPage,
                          block, setBlock,
                          availableBlocks
                      }: Props) => {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            {/* --- ВИБІР ЛОКАЛІ --- */}
            <label className="flex flex-col gap-2">
                <span className="text-sm">Назва кореневої папки (locale)</span>
                <input
                    className="rounded border p-2"
                    value={localeFolder}
                    onChange={(e) => setLocaleFolder(e.target.value)}
                />
            </label>

            {/* --- ВИБІР СТОРІНКИ --- */}
            <label className="flex flex-col gap-2">
                <span className="text-sm">Сторінка</span>
                <select
                    className="rounded border p-2"
                    value={page}
                    onChange={(e) => setPage(e.target.value as PageKey | "")}
                >
                    <option value="">—</option>
                    {/* Перебираємо всі доступні сторінки з PAGES */}
                    {Object.entries(PAGES).map(([key, v]) => (
                        <option key={key} value={key}>
                            {v.label}
                        </option>
                    ))}
                </select>
            </label>

            {/* --- ВИБІР БЛОКУ --- */}
            <label className="flex flex-col gap-2">
                <span className="text-sm">Блок</span>
                <select
                    className="rounded border p-2"
                    value={block}
                    onChange={(e) => setBlock(e.target.value as BlockKey | "")}
                    disabled={!page}
                >
                    <option value="">—</option>
                    {/* Відображаємо лише блоки, які доступні для вибраної сторінки */}
                    {availableBlocks.map((b) => (
                        <option key={b} value={b}>
                            {BLOCK_META[b].label}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
}

export default SelectorsBar;
