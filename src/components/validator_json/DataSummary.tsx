// components/validator_json/DataSummary.tsx
"use client";

import type { AnyBlockValue, BlockKey } from "@/lib/schemas";

type Props = {
    data: Partial<Record<BlockKey, AnyBlockValue>>;
    BLOCK_META: Record<BlockKey, { label: string; file: string }>;
};

const DataSummary = ({ data, BLOCK_META }: Props)=> {
    // Визначаємо порядок блоків, у якому вони відображаються
    const order: BlockKey[] = [
        "about_primary",
        "app_about_primary",
        "mobile_app",
        "bonus_about_primary",
        "bonus_bonuses",
        "bonus_hero",
        "bonus_cashback_about_primary",
        "bonus_deposit_about_primary",
        "bonus_deposit_bonuses",
        "bonus_freebet_about_primary",
        "bonus_freebet_bonuses",
        "bonus_freespin_about_primary",
        "bonus_freespin_bonuses",
        "bonus_promocode_about_primary",
        "bonus_promocode_bonuses",
        "contacts_about_primary",
        "contacts_about_secondary",
        "faq_about_primary",
        "footer_footer",
        "header_header",
        "responsiblegame_about_primary",
        "slots_about_primary",
        "slots_casino",
        "slots_hero",
        "slots_aviator_about_primary",
        "slots_bookofdead_about_primary",
        "slots_bookofradeluxe_about_primary",
        "slots_chickenroad_about_primary",
        "slots_fruitcocktail_about_primary",
        "slots_plinko_about_primary",
        "slots_popular_about_primary",
        "slots_popular_casino",

    ];


    return (
        <section className="rounded-[4px] border bg-white p-[16px]">
            <h2 className="mb-[12px] font-semibold">Поточні дані</h2>

            <ul className="space-y-[4px] text-[14px] leading-[20px]">
                {order.map((b) => (
                    <li key={b}>
                        <span className="font-medium">{BLOCK_META[b].label}:</span>{" "}
                        {data[b] ? "заповнено ✅" : "порожньо"}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default DataSummary;
