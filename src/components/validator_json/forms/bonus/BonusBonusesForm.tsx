"use client";

import { JSX, useEffect } from "react";
import { type Control, type UseFormRegister, useFieldArray } from "react-hook-form";

type RowProps = { label: string; name: string; as?: "input" | "textarea" };
type Props = { control: Control; registerAction: UseFormRegister<any>; RowComponent?: (p: RowProps) => JSX.Element };

export default function BonusBonusesForm({ control, registerAction }: Props) {
    const tabsFA = useFieldArray({ control, name: "tabs" as any });
    const cardsFA = useFieldArray({ control, name: "cards" as any });

    useEffect(() => {
        if (tabsFA.fields.length === 0) tabsFA.append("");
        if (cardsFA.fields.length === 0)
            cardsFA.append({ title: "", subtitle: "", items: [{ label: "", value: "" }], ctaLabel: "" });

    }, []);

    return (
        <div className="space-y-5">
            
            <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide">title</span>
                <input
                    className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-50 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                    {...registerAction("title")}
                />
            </label>

            
            <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-800 p-4 shadow-md">
                <div className="text-sm font-semibold text-slate-100">tabs</div>

                {tabsFA.fields.map((f, idx) => (
                    <div className="flex items-center gap-2" key={f.id}>
                        <input
                            className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-50 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                            {...registerAction(`tabs.${idx}`)}
                        />
                        <button
                            type="button"
                            className="rounded-md bg-slate-700 px-2 py-1 text-xs text-slate-100 hover:bg-red-700 transition"
                            onClick={() => tabsFA.remove(idx)}
                        >
                            ×
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-100 hover:bg-slate-700 transition"
                    onClick={() => tabsFA.append("")}
                >
                    Додати таб
                </button>
            </div>

            
            <div className="space-y-4 rounded-xl border border-slate-700 bg-slate-800 p-4 shadow-md">
                <div className="text-sm font-semibold text-slate-100">cards</div>

                {cardsFA.fields.map((card, cIdx) => (
                    <CardEditor
                        key={card.id}
                        control={control}
                        registerAction={registerAction}
                        cIdx={cIdx}
                        onRemove={() => cardsFA.remove(cIdx)}
                    />
                ))}

                <button
                    type="button"
                    className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-100 hover:bg-slate-700 transition"
                    onClick={() =>
                        cardsFA.append({ title: "", subtitle: "", items: [{ label: "", value: "" }], ctaLabel: "" })
                    }
                >
                    Додати картку
                </button>
            </div>

            
            <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-800 p-4 shadow-md">
                <div className="text-sm font-semibold text-slate-100">promocode</div>
                <div className="grid gap-3 md:grid-cols-2">
                    <input
                        className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-50 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                        placeholder="label"
                        {...registerAction("promocode.label")}
                    />
                    <input
                        className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-50 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                        placeholder="code"
                        {...registerAction("promocode.code")}
                    />
                    <input
                        className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-50 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                        placeholder="cta"
                        {...registerAction("promocode.cta")}
                    />
                    <input
                        className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-50 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                        placeholder="copied"
                        {...registerAction("promocode.copied")}
                    />
                    <input
                        className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-50 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                        placeholder="ariaCopy"
                        {...registerAction("promocode.ariaCopy")}
                    />
                </div>
            </div>
        </div>
    );
}

function CardEditor({
                        control,
                        registerAction,
                        cIdx,
                        onRemove,
                    }: {
    control: Control;
    registerAction: UseFormRegister<any>;
    cIdx: number;
    onRemove: () => void;
}) {
    const itemsFA = useFieldArray({ control, name: `cards.${cIdx}.items` as any });

    useEffect(() => {
        if (itemsFA.fields.length === 0) itemsFA.append({ label: "", value: "" });

    }, [cIdx]);

    return (
        <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-900 p-4">
            <label className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">
          cards[{cIdx}].title
        </span>
                <input
                    className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-slate-50 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                    {...registerAction(`cards.${cIdx}.title`)}
                />
            </label>

            <label className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">
          cards[{cIdx}].subtitle
        </span>
                <input
                    className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-slate-50 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                    {...registerAction(`cards.${cIdx}.subtitle`)}
                />
            </label>

            <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-200">items</div>

                {itemsFA.fields.map((it, iIdx) => (
                    <div className="grid grid-cols-2 gap-2" key={it.id}>
                        <input
                            className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-slate-50 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                            placeholder="label"
                            {...registerAction(`cards.${cIdx}.items.${iIdx}.label`)}
                        />
                        <div className="flex items-center gap-2">
                            <input
                                className="w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-slate-50 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                                placeholder="value"
                                {...registerAction(`cards.${cIdx}.items.${iIdx}.value`)}
                            />
                            <button
                                type="button"
                                className="rounded-md bg-slate-700 px-2 py-1 text-xs text-slate-100 hover:bg-red-700 transition"
                                onClick={() => itemsFA.remove(iIdx)}
                            >
                                ×
                            </button>
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-100 hover:bg-slate-700 transition"
                    onClick={() => itemsFA.append({ label: "", value: "" })}
                >
                    Додати item
                </button>
            </div>

            <label className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">
          cards[{cIdx}].ctaLabel
        </span>
                <input
                    className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-slate-50 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                    {...registerAction(`cards.${cIdx}.ctaLabel`)}
                />
            </label>

            <button
                type="button"
                className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-100 hover:bg-red-700 hover:border-red-700 transition"
                onClick={onRemove}
            >
                Видалити картку
            </button>
        </div>
    );
}
