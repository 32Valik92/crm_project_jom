"use client";

import type { BlockKey, PageKey } from "@/lib/schemas";
import { BLOCK_META, PAGES } from "@/lib/schemas";

type Props = {
    localeFolder: string;
    setLocaleFolder: (v: string) => void;
    domain: string;
    setDomain: (v: string) => void;
    page: PageKey | "";
    setPage: (p: PageKey | "") => void;
    block: BlockKey | "";
    setBlock: (b: BlockKey | "") => void;
    availableBlocks: BlockKey[];
};

const SelectorsBar = ({
                          localeFolder,
                          setLocaleFolder,
                          domain,
                          setDomain,
                          page,
                          setPage,
                          block,
                          setBlock,
                          availableBlocks,
                      }: Props) => {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            <style jsx>{`
                @keyframes blink {
                    0% {
                        border-color: #ef4444;
                    }
                    50% {
                        border-color: transparent;
                    }
                    100% {
                        border-color: #ef4444;
                    }
                }
                .blink {
                    animation: blink 1s infinite;
                }
            `}</style>

            <label
                className={[
                    "group relative flex flex-col gap-2 rounded-2xl border p-4 bg-slate-900",
                    "shadow-[0_8px_24px_-12px_rgba(56,189,248,0.25)]",
                    "transition hover:shadow-[0_16px_40px_-16px_rgba(56,189,248,0.35)]",
                    "focus-within:border-sky-500",
                    !domain ? "border-red-500 blink" : "border-slate-700",
                ].join(" ")}
            >
                <span className="text-sm leading-5 font-medium text-slate-100">
                    Домен (назва архіву)
                </span>
                <input
                    className={[
                        "rounded-xl border bg-slate-900 px-3 py-2.5 text-slate-50 placeholder:text-slate-400",
                        "outline-none transition",
                        "focus:border-sky-500 focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900",
                        !domain ? "border-red-500 blink" : "border-slate-600",
                    ].join(" ")}
                    value={domain}
                    onChange={(e) => setDomain(e.target.value.trim())}
                    placeholder="napr.: example.com або my-project"
                />
            </label>

            <label
                className={[
                    "group relative flex flex-col gap-2 rounded-2xl border p-4 bg-slate-900",
                    "shadow-[0_8px_24px_-12px_rgba(56,189,248,0.25)]",
                    "transition hover:shadow-[0_16px_40px_-16px_rgba(56,189,248,0.35)]",
                    "focus-within:border-sky-500",
                    !localeFolder ? "border-red-500 blink" : "border-slate-700",
                ].join(" ")}
            >
                <span className="text-sm leading-5 font-medium text-slate-100">
                    Назва кореневої папки (locale)
                </span>
                <input
                    className={[
                        "rounded-xl border bg-slate-900 px-3 py-2.5 text-slate-50 placeholder:text-slate-400",
                        "outline-none transition",
                        "focus:border-sky-500 focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900",
                        !localeFolder ? "border-red-500 blink" : "border-slate-600",
                    ].join(" ")}
                    value={localeFolder}
                    onChange={(e) => setLocaleFolder(e.target.value)}
                    placeholder="pl, cs, ro…"
                />
            </label>

            <label
                className={[
                    "group relative flex flex-col gap-2 rounded-2xl border",
                    "border-slate-700 bg-slate-800 p-4",
                    "shadow-[0_8px_24px_-12px_rgba(56,189,248,0.25)]",
                    "transition hover:shadow-[0_16px_40px_-16px_rgba(56,189,248,0.35)]",
                    "focus-within:border-sky-500 focus-within:bg-slate-900",
                ].join(" ")}
            >
                <span className="text-sm leading-5 font-medium text-slate-100">
                    Сторінка
                </span>
                <div className="relative">
                    <select
                        className={[
                            "w-full appearance-none rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 pr-9",
                            "text-slate-50 outline-none transition",
                            "focus:border-sky-500 focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900",
                        ].join(" ")}
                        value={page}
                        onChange={(e) => setPage(e.target.value as PageKey | "")}
                    >
                        <option value="">—</option>
                        {Object.entries(PAGES).map(([key, v]) => (
                            <option key={key} value={key}>
                                {v.label}
                            </option>
                        ))}
                    </select>
                    <svg
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    >
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </div>
            </label>

            <label
                className={[
                    "group relative flex flex-col gap-2 rounded-2xl border",
                    "border-slate-700 bg-slate-800 p-4",
                    "shadow-[0_8px_24px_-12px_rgba(56,189,248,0.25)]",
                    "transition hover:shadow-[0_16px_40px_-16px_rgba(56,189,248,0.35)]",
                    "focus-within:border-sky-500 focus-within:bg-slate-900",
                ].join(" ")}
            >
                <span className="text-sm leading-5 font-medium text-slate-100">Блок</span>
                <div className="relative">
                    <select
                        className={[
                            "w-full appearance-none rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 pr-9",
                            "text-slate-50 outline-none transition",
                            "focus:border-sky-500 focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900",
                            "disabled:cursor-not-allowed disabled:opacity-60",
                        ].join(" ")}
                        value={block}
                        onChange={(e) => setBlock(e.target.value as BlockKey | "")}
                        disabled={!page}
                    >
                        <option value="">—</option>
                        {availableBlocks.map((b) => (
                            <option key={b} value={b}>
                                {BLOCK_META[b].label}
                            </option>
                        ))}
                    </select>
                    <svg
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    >
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </div>
            </label>
        </div>
    );
};

export default SelectorsBar;