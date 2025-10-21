"use client";

import { useEffect } from "react";
import { useFieldArray, type Control, type UseFormRegister } from "react-hook-form";
import { AppMobileApp } from "@/lib/schemas";
import StepsArray from "@/components/validator_json/forms/StepsArray";

type Props = {
    control: Control; // можна звузити до Control<AppMobileApp>
    registerAction: UseFormRegister<AppMobileApp>;
};

const HomeMobileAppForm = ({ control, registerAction }: Props) => {
    // cards: { title: string; steps: string[] }[]
    const { fields: cardFields, append: addCard, remove: delCard } = useFieldArray({
        control,
        name: "cards",
    });

    // compare.rows: { label: string; items: string[] }[]
    const { fields: rowFields, append: addRow, remove: delRow } = useFieldArray({
        control,
        name: "compare.rows",
    });

    // Мінімум 1 картка
    useEffect(() => {
        if (cardFields.length === 0) {
            addCard({ title: "", steps: [""] });
        }
    }, [cardFields.length, addCard]);

    // Мінімум 1 рядок порівняння
    useEffect(() => {
        if (rowFields.length === 0) {
            addRow({ label: "", items: [""] });
        }
    }, [rowFields.length, addRow]);

    return (
        <div className="space-y-4">
            {/* Заголовок (brand + tail) */}
            <div className="grid gap-2 rounded-xl border border-slate-700 bg-slate-800 p-4 shadow-md">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">title</span>

                <input
                    className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-50 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                    {...registerAction("title.brand")}
                    placeholder="brand"
                />

                <input
                    className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-50 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                    {...registerAction("title.tail")}
                    placeholder="tail"
                />
            </div>

            {/* lead */}
            <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide">lead</span>
                <textarea
                    className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-50 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                    rows={3}
                    {...registerAction("lead")}
                />
            </label>

            {/* Cards */}
            <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-800 p-4 shadow-md">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-100">cards</span>
                    <button
                        type="button"
                        className="rounded-md border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-700 transition"
                        onClick={() => addCard({ title: "", steps: [""] })}
                    >
                        + Додати картку
                    </button>
                </div>

                {cardFields.map((cf, i) => (
                    <div key={cf.id} className="rounded-xl border border-slate-700 bg-slate-900 p-4">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-sm font-semibold text-slate-100">Картка #{i + 1}</span>
                            <button
                                type="button"
                                className="rounded-md bg-slate-700 px-2 py-1 text-xs text-slate-100 hover:bg-red-700 transition"
                                onClick={() => delCard(i)}
                            >
                                Видалити
                            </button>
                        </div>

                        <input
                            className="mb-3 w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-slate-50 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                            {...registerAction(`cards.${i}.title`)}
                            placeholder="title"
                        />

                        {/* steps: string[] */}
                        <StepsArray
                            control={control}
                            registerAction={registerAction}
                            namePrefix={`cards.${i}.steps`}
                            addLabel="+ Додати крок"
                        />
                    </div>
                ))}
            </div>

            {/* Compare */}
            <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-800 p-4 shadow-md">
                {/* compare.title */}
                <label className="flex flex-col gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">compare.title</span>
                    <input
                        className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-50 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                        {...registerAction("compare.title")}
                    />
                </label>

                <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-100">compare.rows</span>
                    <button
                        type="button"
                        className="rounded-md border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-700 transition"
                        onClick={() => addRow({ label: "", items: [""] })}
                    >
                        + Додати рядок
                    </button>
                </div>

                {rowFields.map((rf, i) => (
                    <div key={rf.id} className="rounded-xl border border-slate-700 bg-slate-900 p-4">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-sm font-semibold text-slate-100">Рядок #{i + 1}</span>
                            <button
                                type="button"
                                className="rounded-md bg-slate-700 px-2 py-1 text-xs text-slate-100 hover:bg-red-700 transition"
                                onClick={() => delRow(i)}
                            >
                                Видалити
                            </button>
                        </div>

                        <input
                            className="mb-3 w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-slate-50 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                            {...registerAction(`compare.rows.${i}.label`)}
                            placeholder="label"
                        />

                        {/* items: string[] */}
                        <StepsArray
                            control={control}
                            registerAction={registerAction}
                            namePrefix={`compare.rows.${i}.items`}
                            addLabel="+ Додати пункт"
                        />
                    </div>
                ))}
            </div>

            {/* CTA */}
            <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide">cta</span>
                <input
                    className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-50 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                    {...registerAction("cta")}
                />
            </label>
        </div>
    );
};

export default HomeMobileAppForm;
