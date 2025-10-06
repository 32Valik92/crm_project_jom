"use client";

import {useState} from "react";
import JSZip from "jszip";
import {saveAs} from "file-saver";

import {type AnyBlockValue, BLOCK_META, BLOCK_SCHEMAS, type BlockKey, type PageKey, PAGES,} from "@/lib/schemas";

import {indexForAbout, indexForApp, rootIndex} from "@/lib/generators";

import type {ZodTypeAny} from "zod";
import DataSummary from "@/components/validator_json/DataSummary";
import SelectorsBar from "@/components/validator_json/SelectorsBar";
import BlockFormDialog from "@/components/validator_json/BlockFormDialog";

const ValidatorPage = () => {
    // Стан для вибору поточної локалі (папки, наприклад "cs", "pl" тощо)
    const [localeFolder, setLocaleFolder] = useState<string>("cs");

    // Стан для вибраної сторінки (наприклад, "about", "app" тощо)
    const [page, setPage] = useState<PageKey | "">("");

    // Стан для вибраного блоку сторінки (наприклад, "about_primary", "mobile_app")
    const [block, setBlock] = useState<BlockKey | "">("");

    // Збереження усіх даних блоків, які користувач уже заповнив
    const [data, setData] = useState<Partial<Record<BlockKey, AnyBlockValue>>>({});

    // Отримуємо список блоків, доступних для поточної сторінки
    const availableBlocks: BlockKey[] = page ? PAGES[page].blocks : [];

    // Функція відкриття модалки для редагування блоку
    function openBlock(): void {
        if (!block) return;
        (document.getElementById("formDialog") as HTMLDialogElement | null)?.showModal();
    }

    // Функція збереження даних із форми блоку
    function saveBlock(values: AnyBlockValue): void {
        if (!block) return;
        setData((prev) => ({...prev, [block]: values}));
        (document.getElementById("formDialog") as HTMLDialogElement | null)?.close();
    }

    async function generateZip(): Promise<void> {
        if (!localeFolder) return;
        const zip = new JSZip();

        // --- ГЕНЕРАЦІЯ ПАПКИ "about" ---
        if (data.about_primary) {
            const about = zip.folder(`${localeFolder}/about`)!;
            // Додаємо файл із даними блока
            about.file("about_primary.json", JSON.stringify(data.about_primary, null, 2));
            about.file("index.ts", indexForAbout());
        }

        // --- ГЕНЕРАЦІЯ ПАПКИ "app" ---
        const hasApp = Boolean(data.app_about_primary || data.mobile_app);
        if (hasApp) {
            const app = zip.folder(`${localeFolder}/app`)!;
            // Якщо заповнено блок app_about_primary — додаємо його JSON
            if (data.app_about_primary)
                app.file("about_primary.json", JSON.stringify(data.app_about_primary, null, 2));
            // Якщо заповнено блок mobile_app — додаємо його JSON
            if (data.mobile_app)
                app.file("mobile_app.json", JSON.stringify(data.mobile_app, null, 2));
            app.file("index.ts", indexForApp());
        }

        // --- ГОЛОВНИЙ index.ts ---
        zip.file(`${localeFolder}/index.ts`, rootIndex(Boolean(data.about_primary), hasApp));

        // Генеруємо ZIP як Blob і зберігаємо на пристрій
        const blob = await zip.generateAsync({type: "blob"});
        saveAs(blob, `${localeFolder}.zip`);
    }

    // Підбираємо схему (zod-схему) під вибраний блок, щоб знати які поля показувати у формі
    const schema: ZodTypeAny | null = block ? BLOCK_SCHEMAS[block] : null;
    // Отримуємо поточний драфт даних для блоку, якщо вже редагувався
    const draft: AnyBlockValue | undefined = block ? data[block] : undefined;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Валідатор JSON</h1>

            {/* Панель вибору мови, сторінки та блоку */}
            <SelectorsBar
                localeFolder={localeFolder}
                setLocaleFolder={setLocaleFolder}
                page={page}
                setPage={(p) => {
                    setPage(p);
                    setBlock(""); // Скидаємо блок при зміні сторінки
                }}
                block={block}
                setBlock={setBlock}
                availableBlocks={availableBlocks}
            />

            {/* Кнопки керування */}
            <div className="flex gap-3">
                <button
                    className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
                    onClick={openBlock}
                    disabled={!block}
                >
                    Відкрити форму блоку
                </button>

                <button className="rounded border px-4 py-2" onClick={generateZip}>
                    Згенерувати ZIP
                </button>
            </div>

            {/* Коротке резюме заповнених даних */}
            <DataSummary data={data} BLOCK_META={BLOCK_META}/>

            {/* Модалка з формою редагування блоку */}
            <BlockFormDialog
                schema={schema}
                block={block}
                initialValues={draft ?? {}}
                onCancel={() =>
                    (document.getElementById("formDialog") as HTMLDialogElement | null)?.close()
                }
                onSave={saveBlock}
            />
        </div>
    );
}

export default ValidatorPage;