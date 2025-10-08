"use client";

import { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import {
    type AnyBlockValue,
    BLOCK_META,
    BLOCK_SCHEMAS,
    type BlockKey,
    type PageKey,
    PAGES,
} from "@/lib/schemas";

import { indexForAbout, indexForApp, rootIndex } from "@/lib/generators";
import type { ZodTypeAny } from "zod";

import DataSummary from "@/components/validator_json/DataSummary";
import SelectorsBar from "@/components/validator_json/SelectorsBar";
import BlockFormDialog from "@/components/validator_json/BlockFormDialog";

const ValidatorPage = () => {
    const [localeFolder, setLocaleFolder] = useState<string>("cs");
    const [page, setPage] = useState<PageKey | "">("");
    const [block, setBlock] = useState<BlockKey | "">("");
    const [data, setData] = useState<Partial<Record<BlockKey, AnyBlockValue>>>({});

    const availableBlocks: BlockKey[] = page ? PAGES[page].blocks : [];

    function openBlock(): void {
        if (!block) return;
        (document.getElementById("formDialog") as HTMLDialogElement | null)?.showModal();
    }

    function saveBlock(values: AnyBlockValue): void {
        if (!block) return;
        setData((prev) => ({ ...prev, [block]: values }));
        (document.getElementById("formDialog") as HTMLDialogElement | null)?.close();
    }

    async function generateZip(): Promise<void> {
        if (!localeFolder) return;
        const zip = new JSZip();

        if (data.about_primary) {
            const about = zip.folder(`${localeFolder}/about`)!;
            about.file("about_primary.json", JSON.stringify(data.about_primary, null, 2));
            about.file("index.ts", indexForAbout());
        }

        const hasApp = Boolean(data.app_about_primary || data.mobile_app);
        if (hasApp) {
            const app = zip.folder(`${localeFolder}/app`)!;
            if (data.app_about_primary)
                app.file("about_primary.json", JSON.stringify(data.app_about_primary, null, 2));
            if (data.mobile_app)
                app.file("mobile_app.json", JSON.stringify(data.mobile_app, null, 2));
            app.file("index.ts", indexForApp());
        }

        zip.file(`${localeFolder}/index.ts`, rootIndex(Boolean(data.about_primary), hasApp));
        const blob = await zip.generateAsync({ type: "blob" });
        saveAs(blob, `${localeFolder}.zip`);
    }

    const schema: ZodTypeAny | null = block ? BLOCK_SCHEMAS[block] : null;
    const draft: AnyBlockValue | undefined = block ? data[block] : undefined;

    return (
        <div style={{ display: "flex", flexDirection: "column", rowGap: "24px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: 700, lineHeight: "32px" }}>
                Валідатор JSON
            </h1>

            <SelectorsBar
                localeFolder={localeFolder}
                setLocaleFolder={setLocaleFolder}
                page={page}
                setPage={(p) => {
                    setPage(p);
                    setBlock("");
                }}
                block={block}
                setBlock={setBlock}
                availableBlocks={availableBlocks}
            />

            <div style={{ display: "flex", columnGap: "12px" }}>
                <button
                    style={{
                        borderRadius: "4px",
                        backgroundColor: "#000000",
                        padding: "8px 16px",
                        color: "#ffffff",
                        opacity: block ? 1 : 0.5,
                    }}
                    onClick={openBlock}
                    disabled={!block}
                >
                    Відкрити форму блоку
                </button>

                <button
                    style={{
                        borderRadius: "4px",
                        border: "1px solid #e5e7eb",
                        padding: "8px 16px",
                    }}
                    onClick={generateZip}
                >
                    Згенерувати ZIP
                </button>
            </div>

            <DataSummary data={data} BLOCK_META={BLOCK_META} />

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
};

export default ValidatorPage;
