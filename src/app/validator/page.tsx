"use client";

import { useState, useMemo, useRef, lazy, Suspense } from "react";
import type { ZodTypeAny } from "zod";
import JSZip from "jszip";
import {saveAs} from "file-saver";

import {
    type AnyBlockValue,
    BLOCK_META,
    BLOCK_SCHEMAS,
    type BlockKey,
    type PageKey,
    PAGES,
} from "@/lib/schemas";
import {
    indexForAbout,
    indexForApp,
    indexForBonus,
    indexForBonusCashback,
    indexForBonusDeposit,
    indexForBonusFreespin,
    indexForBonusPromocode,
    indexForHome,
    indexForResponsibleGame,
    indexForSlots,
    indexForSlotsAviator,
    indexForSlotsBookOfDead,
    indexForSlotsBookOfRaDeluxe,
    indexForSlotsChickenRoad,
    indexForSlotsFruitCocktail,
    indexForSlotsPlinko,
    indexForSlotsPopular,
    indexForSportsbook,
    indexForSportsbookBasketball,
    indexForSportsbookFootball,
    rootIndex,
} from "@/lib/generators";
import { indexForBonusFreebet } from "@/lib/generators/bonus_freebet";
import { indexForContacts } from "@/lib/generators/contacts";
import { indexForFaq } from "@/lib/generators/faq";
import { indexForFooter } from "@/lib/generators/footer";
import { indexForHeader } from "@/lib/generators/header";

const DataSummary = lazy(() => import("@/components/validator_json/DataSummary"));
const SelectorsBar = lazy(() => import("@/components/validator_json/SelectorsBar"));
const BlockFormDialog = lazy(() => import("@/components/validator_json/BlockFormDialog"));

type FolderConfig = {
    folderName: string;
    files: { name: string; data: AnyBlockValue | undefined }[];
    indexGenerator: () => string;
};

const ValidatorPage = () => {
    const [localeFolder, setLocaleFolder] = useState<string>("");
    const [page, setPage] = useState<PageKey | "">("");
    const [block, setBlock] = useState<BlockKey | "">("");
    const [data, setData] = useState<Partial<Record<BlockKey, AnyBlockValue>>>({});
    const [domain, setDomain] = useState<string>("");
    const dialogRef = useRef<HTMLDialogElement>(null);

    const availableBlocks = useMemo(() => (page ? PAGES[page].blocks : []), [page]);

    function openBlock(): void {
        if (!block) return;
        dialogRef.current?.showModal();
    }

    function saveBlock(values: AnyBlockValue): void {
        if (!block) return;
        setData((prev) => ({ ...prev, [block]: values }));
        dialogRef.current?.close();
    }

    function addFolderToZip(zip: any, localeFolder: string, config: FolderConfig): void {
        const folder = zip.folder(`${localeFolder}/${config.folderName}`)!;
        config.files.forEach(({ name, data }) => {
            if (data) folder.file(`${name}.json`, JSON.stringify(data, null, 2));
        });
        folder.file("index.ts", config.indexGenerator());
    }

    async function generateZip(): Promise<void> {
        if (!localeFolder || !domain) return;
        const zip = new JSZip();

        const folderConfigs: FolderConfig[] = [
            {
                folderName: "about",
                files: [{ name: "about_primary", data: data.about_primary }],
                indexGenerator: indexForAbout,
            },
            {
                folderName: "app",
                files: [
                    { name: "about_primary", data: data.app_about_primary },
                    { name: "mobile_app", data: data.mobile_app },
                ],
                indexGenerator: indexForApp,
            },
            {
                folderName: "bonus",
                files: [
                    { name: "about_primary", data: data.bonus_about_primary },
                    { name: "bonuses", data: data.bonus_bonuses },
                    { name: "hero", data: data.bonus_hero },
                ],
                indexGenerator: indexForBonus,
            },
            {
                folderName: "bonus_cashback",
                files: [{ name: "blocks", data: data.bonus_cashback_about_primary }],
                indexGenerator: indexForBonusCashback,
            },
            {
                folderName: "bonus_deposit",
                files: [
                    { name: "about_primary", data: data.bonus_deposit_about_primary },
                    { name: "bonuses", data: data.bonus_deposit_bonuses },
                ],
                indexGenerator: indexForBonusDeposit,
            },
            {
                folderName: "bonus_freebet",
                files: [
                    { name: "about_primary", data: data.bonus_freebet_about_primary },
                    { name: "bonuses", data: data.bonus_freebet_bonuses },
                ],
                indexGenerator: indexForBonusFreebet,
            },
            {
                folderName: "bonus_freespin",
                files: [
                    { name: "about_primary", data: data.bonus_freespin_about_primary },
                    { name: "bonuses", data: data.bonus_freespin_bonuses },
                ],
                indexGenerator: indexForBonusFreespin,
            },
            {
                folderName: "bonus_promocode",
                files: [
                    { name: "about_primary", data: data.bonus_promocode_about_primary },
                    { name: "bonuses", data: data.bonus_promocode_bonuses },
                ],
                indexGenerator: indexForBonusPromocode,
            },
            {
                folderName: "contacts",
                files: [{ name: "about_primary", data: data.contacts_about_primary }],
                indexGenerator: indexForContacts,
            },
            {
                folderName: "faq",
                files: [{ name: "about_primary", data: data.faq_about_primary }],
                indexGenerator: indexForFaq,
            },
            {
                folderName: "footer",
                files: [{ name: "footer", data: data.footer_footer }],
                indexGenerator: indexForFooter,
            },
            {
                folderName: "header",
                files: [{ name: "header", data: data.header_header }],
                indexGenerator: indexForHeader,
            },
            {
                folderName: "home",
                files: [
                    { name: "about", data: data.home_about },
                    { name: "about_primary", data: data.home_about_primary },
                    { name: "bonuses", data: data.home_bonuses },
                    { name: "casino", data: data.home_casino },
                    { name: "faq", data: data.home_faq },
                    { name: "feature_cards", data: data.home_feature_cards },
                    { name: "hero", data: data.home_hero },
                    { name: "how_to_start", data: data.home_how_to_start },
                    { name: "mobile_app", data: data.home_mobile_app },
                    { name: "payments", data: data.home_payments },
                    { name: "registration_guide", data: data.home_registration_guide },
                    { name: "sports", data: data.home_sports },
                    { name: "support", data: data.home_support },
                    { name: "top_feature", data: data.home_top_feature },
                    { name: "verification", data: data.home_verification },
                ],
                indexGenerator: indexForHome,
            },
            {
                folderName: "responsiblegame",
                files: [{ name: "about_primary", data: data.responsiblegame_about_primary }],
                indexGenerator: indexForResponsibleGame,
            },
            {
                folderName: "slots",
                files: [
                    { name: "about_primary", data: data.slots_about_primary },
                    { name: "casino", data: data.slots_casino },
                    { name: "hero", data: data.slots_hero },
                ],
                indexGenerator: indexForSlots,
            },
            {
                folderName: "slots_aviator",
                files: [{ name: "about_primary", data: data.slots_aviator_about_primary }],
                indexGenerator: indexForSlotsAviator,
            },
            {
                folderName: "slots_bookofdead",
                files: [{ name: "about_primary", data: data.slots_bookofdead_about_primary }],
                indexGenerator: indexForSlotsBookOfDead,
            },
            {
                folderName: "slots_bookofradeluxe",
                files: [{ name: "about_primary", data: data.slots_bookofradeluxe_about_primary }],
                indexGenerator: indexForSlotsBookOfRaDeluxe,
            },
            {
                folderName: "slots_chickenroad",
                files: [{ name: "about_primary", data: data.slots_chickenroad_about_primary }],
                indexGenerator: indexForSlotsChickenRoad,
            },
            {
                folderName: "slots_fruitcocktail",
                files: [{ name: "about_primary", data: data.slots_fruitcocktail_about_primary }],
                indexGenerator: indexForSlotsFruitCocktail,
            },
            {
                folderName: "slots_plinko",
                files: [{ name: "about_primary", data: data.slots_plinko_about_primary }],
                indexGenerator: indexForSlotsPlinko,
            },
            {
                folderName: "slots_popular",
                files: [
                    { name: "about_primary", data: data.slots_popular_about_primary },
                    { name: "casino", data: data.slots_popular_casino },
                ],
                indexGenerator: indexForSlotsPopular,
            },
            {
                folderName: "sportsbook",
                files: [
                    { name: "about_primary", data: data.sportsbook_about_primary },
                    { name: "hero", data: data.sportsbook_hero },
                ],
                indexGenerator: indexForSportsbook,
            },
            {
                folderName: "sportsbook_basketball",
                files: [{ name: "about_primary", data: data.sportsbook_basketball_about_primary }],
                indexGenerator: indexForSportsbookBasketball,
            },
            {
                folderName: "sportsbook_football",
                files: [{ name: "about_primary", data: data.sportsbook_football_about_primary }],
                indexGenerator: indexForSportsbookFootball,
            },
        ];

        try {
            folderConfigs.forEach((config) => {
                if (config.files.some(({ data }) => data)) {
                    addFolderToZip(zip, localeFolder, config);
                }
            });

            if (data.seo_seo) {
                zip.file(`${localeFolder}/seo.json`, JSON.stringify(data.seo_seo, null, 2));
            }

            zip.file(
                `${localeFolder}/index.ts`,
                rootIndex(
                    Boolean(data.about_primary),
                    Boolean(data.app_about_primary || data.mobile_app),
                    Boolean(data.bonus_about_primary || data.bonus_bonuses || data.bonus_hero),
                    Boolean(data.bonus_cashback_about_primary),
                    Boolean(data.bonus_deposit_about_primary || data.bonus_deposit_bonuses),
                    Boolean(data.bonus_freebet_about_primary || data.bonus_freebet_bonuses),
                    Boolean(data.bonus_freespin_about_primary || data.bonus_freespin_bonuses),
                    Boolean(data.bonus_promocode_about_primary || data.bonus_promocode_bonuses),
                    Boolean(data.contacts_about_primary),
                    Boolean(data.faq_about_primary),
                    Boolean(data.footer_footer),
                    Boolean(data.header_header),
                    Boolean(
                        data.home_about ||
                        data.home_about_primary ||
                        data.home_bonuses ||
                        data.home_casino ||
                        data.home_faq ||
                        data.home_feature_cards ||
                        data.home_hero ||
                        data.home_how_to_start ||
                        data.home_mobile_app ||
                        data.home_payments ||
                        data.home_registration_guide ||
                        data.home_sports ||
                        data.home_support ||
                        data.home_top_feature ||
                        data.home_verification
                    ),
                    Boolean(data.responsiblegame_about_primary),
                    Boolean(data.slots_about_primary || data.slots_casino || data.slots_hero),
                    Boolean(data.slots_aviator_about_primary),
                    Boolean(data.slots_bookofdead_about_primary),
                    Boolean(data.slots_bookofradeluxe_about_primary),
                    Boolean(data.slots_chickenroad_about_primary),
                    Boolean(data.slots_fruitcocktail_about_primary),
                    Boolean(data.slots_plinko_about_primary),
                    Boolean(data.slots_popular_about_primary || data.slots_popular_casino),
                    Boolean(data.sportsbook_about_primary || data.sportsbook_hero),
                    Boolean(data.sportsbook_basketball_about_primary),
                    Boolean(data.sportsbook_football_about_primary),
                    Boolean(data.seo_seo)
                )
            );

            const blob = await zip.generateAsync({ type: "blob" });
            saveAs(blob, `${domain}.zip`);
        } catch (error) {
            console.error("Error generating ZIP file:", error);
            alert("Не вдалося згенерувати ZIP-файл. Перевірте консоль для деталей.");
        }
    }

    const schema: ZodTypeAny | null = block ? BLOCK_SCHEMAS[block] : null;
    const draft: AnyBlockValue | undefined = block ? data[block] : undefined;

    return (
        <div className="flex flex-col gap-[24px]">
            <h1 className="text-[24px] font-bold leading-[32px]">Валідатор JSON</h1>

            <Suspense fallback={<div>Loading Selectors...</div>}>
                <SelectorsBar
                    localeFolder={localeFolder}
                    setLocaleFolder={setLocaleFolder}
                    domain={domain}
                    setDomain={setDomain}
                    page={page}
                    setPage={(p) => {
                        setPage(p);
                        setBlock("");
                    }}
                    block={block}
                    setBlock={setBlock}
                    availableBlocks={availableBlocks}
                />
            </Suspense>

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

            <Suspense fallback={<div>Loading Summary...</div>}>
                <DataSummary data={data} BLOCK_META={BLOCK_META} />
            </Suspense>

            <Suspense fallback={<div>Loading Form...</div>}>
                <BlockFormDialog
                    schema={schema}
                    block={block}
                    initialValues={draft ?? {}}
                    onCancel={() => dialogRef.current?.close()}
                    onSave={saveBlock}
                    ref={dialogRef}
                />
            </Suspense>
        </div>
    );
};

export default ValidatorPage;