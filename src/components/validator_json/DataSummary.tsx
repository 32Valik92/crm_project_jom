// components/validator_json/DataSummary.tsx
"use client";

import type { AnyBlockValue, BlockKey } from "@/lib/schemas";
import { motion } from "framer-motion";

type Props = {
    data: Partial<Record<BlockKey, AnyBlockValue>>;
    BLOCK_META: Record<BlockKey, { label: string; file: string }>;
};

const DataSummary = ({ data, BLOCK_META }: Props) => {
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
        "sportsbook_about_primary",
        "sportsbook_hero",
        "sportsbook_basketball_about_primary",
        "sportsbook_football_about_primary",
        "home_about",
        "home_about_primary",
        "home_bonuses",
        "home_casino",
        "home_faq",
        "home_feature_cards",
        "home_hero",
        "home_how_to_start",
        "home_mobile_app",
        "home_payments",
        "home_registration_guide",
        "home_sports",
        "home_support",
        "home_top_feature",
        "home_verification",
        "seo_seo",
    ];

    return (
        <section className="rounded-2xl border border-slate-700 bg-slate-800 p-5 shadow-md text-slate-50">
            <header className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold tracking-tight text-sky-400">
                    Поточні дані
                </h2>
                <div className="text-xs text-slate-300">
                    {Object.keys(data).length} блоків
                </div>
            </header>

            <ul className="divide-y divide-slate-700 text-sm">
                {order.map((b, i) => {
                    const filled = Boolean(data[b]);
                    return (
                        <motion.li
                            key={b}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.01, duration: 0.2 }}
                            className="flex items-center justify-between py-2 px-2 transition-colors hover:bg-slate-700/60 rounded-lg"
                        >
              <span className="font-medium text-slate-100">
                {BLOCK_META[b]?.label || b}
              </span>

                            <span
                                className={
                                    filled
                                        ? "inline-flex items-center gap-1.5 rounded-full bg-green-600/20 border border-green-500 text-[13px] text-green-400 px-2 py-0.5"
                                        : "inline-flex items-center gap-1.5 rounded-full bg-slate-700 border border-slate-600 text-[13px] text-slate-300 px-2 py-0.5"
                                }
                            >
                {filled ? (
                    <>
                        <svg
                            className="size-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        заповнено
                    </>
                ) : (
                    <>
                        <svg
                            className="size-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <circle cx="12" cy="12" r="10" />
                        </svg>
                        порожньо
                    </>
                )}
              </span>
                        </motion.li>
                    );
                })}
            </ul>
        </section>
    );
};

export default DataSummary;
