// app/validator/page.tsx (фрагмент) — оновлення generateZip
"use client";

import {useState} from "react";
import JSZip from "jszip";
import {saveAs} from "file-saver";

import {type AnyBlockValue, BLOCK_META, BLOCK_SCHEMAS, type BlockKey, type PageKey, PAGES,} from "@/lib/schemas";

import {
    indexForAbout,
    indexForApp,
    indexForBonus,
    indexForBonusCashback,
    indexForBonusDeposit,
    indexForBonusFreespin,
    indexForBonusPromocode,
    indexForResponsibleGame,
    indexForSlots,
    indexForSlotsAviator,
    indexForSlotsBookOfDead,
    indexForSlotsBookOfRaDeluxe,
    indexForSlotsChickenRoad,
    indexForSlotsFruitCocktail, indexForSlotsPlinko, indexForSlotsPopular,
    rootIndex
} from "@/lib/generators";

import type {ZodTypeAny} from "zod";
import DataSummary from "@/components/validator_json/DataSummary";
import SelectorsBar from "@/components/validator_json/SelectorsBar";
import BlockFormDialog from "@/components/validator_json/BlockFormDialog";
import {indexForBonusFreebet} from "@/lib/generators/bonus_freebet";
import {indexForContacts} from "@/lib/generators/contacts";
import {indexForFaq} from "@/lib/generators/faq";
import {indexForFooter} from "@/lib/generators/footer";
import {indexForHeader} from "@/lib/generators/header";

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

        const hasBonusFreespin = Boolean(data.bonus_freespin_about_primary || data.bonus_freespin_bonuses);
        if (hasBonusFreespin) {
            const bonusFreespin = zip.folder(`${localeFolder}/bonus_freespin`)!;
            if (data.bonus_freespin_about_primary)
                bonusFreespin.file("about_primary.json", JSON.stringify(data.bonus_freespin_about_primary, null, 2));
            if (data.bonus_freespin_bonuses)
                bonusFreespin.file("bonuses.json", JSON.stringify(data.bonus_freespin_bonuses, null, 2));
            bonusFreespin.file("index.ts", indexForBonusFreespin());
        }

        const hasBonusPromocode = Boolean(data.bonus_promocode_about_primary || data.bonus_promocode_bonuses);
        if (hasBonusPromocode) {
            const bonusPromocode = zip.folder(`${localeFolder}/bonus_promocode`)!;
            if (data.bonus_promocode_about_primary)
                bonusPromocode.file("about_primary.json", JSON.stringify(data.bonus_promocode_about_primary, null, 2));
            if (data.bonus_promocode_bonuses)
                bonusPromocode.file("bonuses.json", JSON.stringify(data.bonus_promocode_bonuses, null, 2));
            bonusPromocode.file("index.ts", indexForBonusPromocode());
        }

        const hasContacts = Boolean(data.contacts_about_primary || data.contacts_about_secondary);
        if (hasContacts) {
            const contacts = zip.folder(`${localeFolder}/contacts`)!;
            if (data.contacts_about_primary)
                contacts.file("about_primary.json", JSON.stringify(data.contacts_about_primary, null, 2));
            if (data.contacts_about_secondary)
                contacts.file("about_secondary.json", JSON.stringify(data.contacts_about_secondary, null, 2));
            contacts.file("index.ts", indexForContacts());
        }

        const hasFaq = Boolean(data.faq_about_primary);
        if (hasFaq) {
            const faq = zip.folder(`${localeFolder}/faq`)!;
            if (data.faq_about_primary)
                faq.file("about_primary.json", JSON.stringify(data.faq_about_primary, null, 2));
            faq.file("index.ts", indexForFaq());
        }

        const hasFooter = Boolean(data.footer_footer);
        if (hasFooter) {
            const footer = zip.folder(`${localeFolder}/footer`)!;
            if (data.footer_footer)
                footer.file("footer.json", JSON.stringify(data.footer_footer, null, 2));
            footer.file("index.ts", indexForFooter());
        }

        const hasHeader = Boolean(data.header_header);
        if (hasHeader) {
            const header = zip.folder(`${localeFolder}/header`)!;
            if (data.header_header)
                header.file("header.json", JSON.stringify(data.header_header, null, 2));
            header.file("index.ts", indexForHeader());
        }

        const hasResponsibleGame = Boolean(data.responsiblegame_about_primary);

        if (hasResponsibleGame) {
            const rg = zip.folder(`${localeFolder}/responsiblegame`)!;
            rg.file("about_primary.json", JSON.stringify(data.responsiblegame_about_primary, null, 2));
            rg.file("index.ts", indexForResponsibleGame());
        }

        const hasSlots = Boolean(data.slots_about_primary || data.slots_casino || data.slots_hero);

        if (hasSlots) {
            const slots = zip.folder(`${localeFolder}/slots`)!;
            if (data.slots_about_primary) slots.file("about_primary.json", JSON.stringify(data.slots_about_primary, null, 2));
            if (data.slots_casino) slots.file("casino.json", JSON.stringify(data.slots_casino, null, 2));
            if (data.slots_hero) slots.file("hero.json", JSON.stringify(data.slots_hero, null, 2));
            slots.file("index.ts", indexForSlots());
        }

        const hasSlotsAviator = Boolean(data.slots_aviator_about_primary);
        if (hasSlotsAviator) {
            const sa = zip.folder(`${localeFolder}/slots_aviator`)!;
            if (data.slots_aviator_about_primary)
                sa.file("about_primary.json", JSON.stringify(data.slots_aviator_about_primary, null, 2));
            sa.file("index.ts", indexForSlotsAviator());
        }

        const hasSlotsBookOfDead = Boolean(data.slots_bookofdead_about_primary);
        if (hasSlotsBookOfDead) {
            const folder = zip.folder(`${localeFolder}/slots_bookofdead`)!;
            folder.file("about_primary.json", JSON.stringify(data.slots_bookofdead_about_primary, null, 2));
            folder.file("index.ts", indexForSlotsBookOfDead());
        }

        const hasSlotsBookOfRaDeluxe = Boolean(data.slots_bookofradeluxe_about_primary);
        if (hasSlotsBookOfRaDeluxe) {
            const folder = zip.folder(`${localeFolder}/slots_bookofradeluxe`)!;
            folder.file("about_primary.json", JSON.stringify(data.slots_bookofradeluxe_about_primary, null, 2));
            folder.file("index.ts", indexForSlotsBookOfRaDeluxe());
        }

        const hasSlotsChickenRoad = Boolean(data.slots_chickenroad_about_primary);
        if (hasSlotsChickenRoad) {
            const folder = zip.folder(`${localeFolder}/slots_chickenroad`)!;
            folder.file("about_primary.json", JSON.stringify(data.slots_chickenroad_about_primary, null, 2));
            folder.file("index.ts", indexForSlotsChickenRoad());
        }

        const hasSlotsFruitCocktail = Boolean(data.slots_fruitcocktail_about_primary);
        if (hasSlotsFruitCocktail) {
            const folder = zip.folder(`${localeFolder}/slots_fruitcocktail`)!;
            folder.file("about_primary.json", JSON.stringify(data.slots_fruitcocktail_about_primary, null, 2));
            folder.file("index.ts", indexForSlotsFruitCocktail());
        }

        const hasSlotsPlinko = Boolean(data.slots_plinko_about_primary);
        if (hasSlotsPlinko) {
            const folder = zip.folder(`${localeFolder}/slots_plinko`)!;
            folder.file("about_primary.json", JSON.stringify(data.slots_plinko_about_primary, null, 2));
            folder.file("index.ts", indexForSlotsPlinko());
        }

        const hasSlotsPopular = Boolean(data.slots_popular_about_primary || data.slots_popular_casino);
        if (hasSlotsPopular) {
            const folder = zip.folder(`${localeFolder}/slots_popular`)!;
            if (data.slots_popular_about_primary)
                folder.file("about_primary.json", JSON.stringify(data.slots_popular_about_primary, null, 2));
            if (data.slots_popular_casino)
                folder.file("casino.json", JSON.stringify(data.slots_popular_casino, null, 2));
            folder.file("index.ts", indexForSlotsPopular());
        }

        zip.file(
            `${localeFolder}/index.ts`,
            rootIndex(
                Boolean(data.about_primary),
                hasApp,
                hasBonus,
                hasBonusCashback,
                hasBonusDeposit,
                hasBonusFreebet,
                hasBonusFreespin,
                hasBonusPromocode,
                hasContacts,
                hasFaq,
                hasFooter,
                hasHeader,
                hasResponsibleGame,
                hasSlots,
                hasSlotsAviator,
                hasSlotsBookOfDead,
                hasSlotsBookOfRaDeluxe,
                hasSlotsChickenRoad,
                hasSlotsFruitCocktail,
                hasSlotsPlinko,
                hasSlotsPopular,

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
