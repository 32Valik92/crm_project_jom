"use client";

import { useMemo, useState } from "react";
import type { AnyBlockValue, BlockKey } from "@/lib/schemas";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Switch } from "@headlessui/react"; // Assuming we install @headlessui/react for a nice switch component

// Винести order за межі компонента
const ORDER: BlockKey[] = [
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

const CheckIcon = () => (
    <svg className="size-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 13l4 4L19 7" />
    </svg>
);

const CircleIcon = () => (
    <svg className="size-4 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
    </svg>
);

const StatusBadge = ({ filled }: { filled: boolean }) => (
    <span
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium shadow-sm transition-all duration-300 ${
            filled
                ? "bg-gradient-to-r from-green-600/30 to-green-500/30 border border-green-500/50 text-green-300 hover:shadow-green-500/20"
                : "bg-gradient-to-r from-slate-700 to-slate-600 border border-slate-600/50 text-slate-400 hover:shadow-slate-500/20"
        }`}
    >
    {filled ? (
        <>
            <CheckIcon />
            заповнено
        </>
    ) : (
        <>
            <CircleIcon />
            порожньо
        </>
    )}
  </span>
);

type Props = {
    data: Partial<Record<BlockKey, AnyBlockValue>>;
    BLOCK_META: Record<BlockKey, { label: string; file: string }>;
};

const DataSummary = ({ data, BLOCK_META }: Props) => {
    const [showAll, setShowAll] = useState(false);

    const items = useMemo(
        () =>
            ORDER.map((b, i) => ({
                key: b,
                label: BLOCK_META[b]?.label || b,
                filled: Boolean(data[b]),
                index: i,
            })),
        [data, BLOCK_META]
    );

    const filteredItems = useMemo(() => (showAll ? items : items.filter((item) => item.filled)), [items, showAll]);

    const needsScroll = filteredItems.length > 10;
    const maxContainerHeight = showAll ? 500 : 350;

    return (
        <section className="rounded-2xl border border-slate-700 bg-slate-800/90 backdrop-blur-sm p-6 shadow-lg shadow-slate-900/50 text-slate-50 transition-all duration-500 hover:shadow-xl hover:border-sky-500/50">
            <header className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                    Поточні дані
                </h2>
                <div className="flex items-center gap-4">
                    <div className="text-sm font-medium text-slate-300">
                        {filteredItems.length} / {items.length} блоків
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-400">Показати всі</span>
                        <Switch
                            checked={showAll}
                            onChange={setShowAll}
                            className={`${showAll ? "bg-sky-500" : "bg-slate-600"} relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 shadow-inner`}
                        >
                            <span className="sr-only">Показати всі блоки</span>
                            <span
                                className={`${showAll ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-md`}
                            />
                        </Switch>
                    </div>
                </div>
            </header>

            <LayoutGroup>
                <motion.div
                    animate={{ maxHeight: maxContainerHeight }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className={`transition-all duration-400 ${needsScroll ? "pr-1" : ""}`}
                >
                    <ul
                        className={`
                                    divide-y divide-slate-700/50 text-sm space-y-1
                                    ${needsScroll ? "scrollbar-custom pr-1" : ""}
                                  `}
                        style={{
                            maxHeight: maxContainerHeight,
                            overflowY: needsScroll ? "auto" : "hidden", // TypeScript щасливий!
                        }}
                    >
                        <AnimatePresence mode="wait">
                            {filteredItems.map(({ key, label, filled, index }) => (
                                <motion.li
                                    key={key}
                                    layout
                                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 25,
                                        delay: index * 0.015,
                                    }}
                                    className="flex items-center justify-between py-3 px-4 transition-all duration-300 hover:bg-slate-700/70 hover:shadow-md rounded-xl cursor-pointer group"
                                >
                  <span className="font-semibold text-slate-100 group-hover:text-sky-300 transition-colors">
                    {label}
                  </span>
                                    <StatusBadge filled={filled} />
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </ul>
                </motion.div>
            </LayoutGroup>
        </section>
    );
};

export default DataSummary;