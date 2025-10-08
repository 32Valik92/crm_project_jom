// app/validator/page.tsx (фрагмент) — оновлення generateZip
"use client";

import {useState} from "react";
import JSZip from "jszip";
import {saveAs} from "file-saver";

import {type AnyBlockValue, BLOCK_META, BLOCK_SCHEMAS, type BlockKey, type PageKey, PAGES,} from "@/lib/schemas";

import { indexForAbout, indexForApp, indexForBonus, indexForBonusCashback, indexForBonusDeposit, rootIndex } from "@/lib/generators";

import type {ZodTypeAny} from "zod";
import DataSummary from "@/components/validator_json/DataSummary";
import SelectorsBar from "@/components/validator_json/SelectorsBar";
import BlockFormDialog from "@/components/validator_json/BlockFormDialog";
import {indexForBonusFreebet} from "@/lib/generators/bonus_freebet";

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
        setData((prev) => ({...prev, [block]: values}));
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

        const hasBonus = Boolean(data.bonus_about_primary || data.bonus_bonuses || data.bonus_hero);
        if (hasBonus) {
            const bonus = zip.folder(`${localeFolder}/bonus`)!;
            if (data.bonus_about_primary)
                bonus.file("about_primary.json", JSON.stringify(data.bonus_about_primary, null, 2));
            if (data.bonus_bonuses)
                bonus.file("bonuses.json", JSON.stringify(data.bonus_bonuses, null, 2));
            if (data.bonus_hero)
                bonus.file("hero.json", JSON.stringify(data.bonus_hero, null, 2));
            bonus.file("index.ts", indexForBonus());
        }

        const hasBonusCashback = Boolean(data.bonus_cashback_about_primary);
        if (hasBonusCashback) {
            const bonusCashback = zip.folder(`${localeFolder}/bonus_cashback`)!;
            bonusCashback.file("blocks.json", JSON.stringify(data.bonus_cashback_about_primary, null, 2));
            bonusCashback.file("index.ts", indexForBonusCashback());
        }

        const hasBonusDeposit = Boolean(data.bonus_deposit_about_primary || data.bonus_deposit_bonuses);
        if (hasBonusDeposit) {
            const bonusDeposit = zip.folder(`${localeFolder}/bonus_deposit`)!;
            if (data.bonus_deposit_about_primary)
                bonusDeposit.file("about_primary.json", JSON.stringify(data.bonus_deposit_about_primary, null, 2));
            if (data.bonus_deposit_bonuses)
                bonusDeposit.file("bonuses.json", JSON.stringify(data.bonus_deposit_bonuses, null, 2));
            bonusDeposit.file("index.ts", indexForBonusDeposit());
        }

        const hasBonusFreebet = Boolean(data.bonus_freebet_about_primary || data.bonus_freebet_bonuses);
        if (hasBonusFreebet) {
            const bonusFreebet = zip.folder(`${localeFolder}/bonus_freebet`)!;
            if (data.bonus_freebet_about_primary)
                bonusFreebet.file("about_primary.json", JSON.stringify(data.bonus_freebet_about_primary, null, 2));
            if (data.bonus_freebet_bonuses)
                bonusFreebet.file("bonuses.json", JSON.stringify(data.bonus_freebet_bonuses, null, 2));
            bonusFreebet.file("index.ts", indexForBonusFreebet());
        }

        zip.file(
            `${localeFolder}/index.ts`,
            rootIndex(
                Boolean(data.about_primary),
                hasApp,
                hasBonus,
                hasBonusCashback,
                hasBonusDeposit,
                hasBonusFreebet
            )
        );
        const blob = await zip.generateAsync({type: "blob"});
        saveAs(blob, `${localeFolder}.zip`);
    }

    const schema: ZodTypeAny | null = block ? BLOCK_SCHEMAS[block] : null;
    const draft: AnyBlockValue | undefined = block ? data[block] : undefined;

    return (
        <div className="flex flex-col gap-[24px]">
            <h1 className="text-[24px] font-bold leading-[32px]">Валідатор JSON</h1>

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

            <div className="flex gap-[12px]">
                <button
                    className="rounded-[4px] bg-[#000000] px-[16px] py-[8px] text-[#ffffff] disabled:opacity-50"
                    onClick={openBlock}
                    disabled={!block}
                >
                    Відкрити форму блоку
                </button>

                <button className="rounded-[4px] border px-[16px] py-[8px]" onClick={generateZip}>
                    Згенерувати ZIP
                </button>
            </div>

            <DataSummary data={data} BLOCK_META={BLOCK_META}/>

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
